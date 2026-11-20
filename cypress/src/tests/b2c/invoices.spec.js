const order = {
  id: 'order-1',
  number: '000123',
  orderDate: '2026-11-01',
  status: 'Complete',
  isVirtual: false,
  payments: [{ name: 'Check / Money order' }],
  shippingMethod: 'Flat Rate',
  billingAddress: null,
  shippingAddress: null,
};

const invoice = {
  id: 'invoice-1',
  number: 'INV0001',
  status: 'Paid',
  comments: [],
  items: [{
    id: 'item-1',
    product_name: 'Invoice smoke product',
    product_sku: 'INVOICE-SMOKE',
    quantity_invoiced: 1,
    product_sale_price: { value: 10, currency: 'USD' },
    tax_amount: { value: 0, currency: 'USD' },
    row_total: { value: 10, currency: 'USD' },
    discounts: [],
  }],
  total: {
    subtotal: { value: 10, currency: 'USD' },
    grand_total: { value: 10, currency: 'USD' },
    base_grand_total: { value: 10, currency: 'USD' },
    taxes: [],
    discounts: [],
  },
};

// Serve deterministic page markup, but load the checked-in host blocks,
// renderer, containers, branding adapter, and PDF generator unchanged.
const testPage = `<!doctype html><html><head>
  <script type="importmap">{"imports":{
    "@dropins/storefront-order/":"/scripts/__dropins__/storefront-order/",
    "@dropins/storefront-auth/":"/scripts/__dropins__/storefront-auth/",
    "@dropins/tools/":"/scripts/__dropins__/tools/"
  }}</script></head><body><main id="invoice-block"></main></body></html>`;

const page = testPage.replace('</body>', `
  <script type="module">
    const name = location.pathname.endsWith('/invoice-details')
      ? 'commerce-invoice-details' : 'commerce-order-invoices';
    const { default: decorate } = await import('/blocks/' + name + '/' + name + '.js');
    await decorate(document.querySelector('main'));
  </script></body>`);

// Import native application modules in the AUT, not the Cypress spec bundle.
function loadModules(...paths) {
  return cy.window().then((win) => new Cypress.Promise((resolve, reject) => {
    win.invoiceModulesLoaded = resolve;
    win.invoiceModulesFailed = reject;
    const script = win.document.createElement('script');
    script.type = 'module';
    script.textContent = `
      Promise.all(${JSON.stringify(paths)}.map(path => import(path)))
        .then(window.invoiceModulesLoaded, window.invoiceModulesFailed);
    `;
    script.onerror = () => reject(new Error('Unable to load invoice test modules'));
    win.document.head.appendChild(script);
  }));
}

function visitTestPage(path = '/__invoice-tests') {
  cy.intercept('GET', /\/(?:__invoice-tests|fr\/|order-details|invoice-details)/, (request) => {
    if (request.headers.accept?.includes('text/html')) {
      request.reply({ headers: { 'content-type': 'text/html' }, body: testPage });
    } else {
      request.continue();
    }
  });
  cy.visit(path);
}

beforeEach(() => {
  // Native ES module responses must not outlive the intercepts for their test.
  cy.intercept({ url: '**', middleware: true }, (request) => {
    request.on('before:response', (response) => {
      response.headers['cache-control'] = 'no-store';
    });
  });
});

describe('Invoice host integration with the pinned Order assets', () => {
  beforeEach(() => {
    cy.intercept('GET', /\/__invoice_graphql(?:\?|$)/, {
      body: { data: { customer: { orders: { items: [{ number: order.number, invoices: [invoice] }] } } } },
    }).as('invoices');
    cy.intercept('GET', '**/scripts/commerce.js', {
      headers: { 'content-type': 'application/javascript' },
      body: 'export const rootLink = (path) => path;',
    });

    cy.intercept('GET', '**/scripts/initializers/order.js', {
      headers: { 'content-type': 'application/javascript' },
      body: `
        import { initialize, setEndpoint } from '@dropins/storefront-order/api.js';
        import { initializers } from '@dropins/tools/initializer.js';
        import { initializeConfig } from '@dropins/tools/lib/aem/configs.js';
        initializeConfig({ public: { default: {} } });
        setEndpoint(location.origin + '/__invoice_graphql');
        await initializers.mountImmediately(initialize, { orderData: ${JSON.stringify(order)} });
      `,
    });
    cy.intercept('GET', /\/customer\/(?:order-details|invoice-details)\?/, {
      headers: { 'content-type': 'text/html' },
      body: page,
    });
  });

  it('navigates from the invoice list to details, downloads a PDF, and links back', () => {
    cy.visit(`/customer/order-details?orderRef=${order.number}`);
    cy.wait('@invoices');
    cy.contains('a', invoice.number)
      .should('have.attr', 'href', `/customer/invoice-details?orderRef=${order.number}&invoiceRef=${invoice.number}`)
      .click();
    cy.wait('@invoices');
    cy.get('[data-testid="invoice-details-number"]').should('have.text', invoice.number);
    cy.contains('Invoice smoke product').should('be.visible');
    cy.get('[data-testid="invoice-details-back-link"]')
      .should('have.attr', 'href', `/customer/order-details?orderRef=${order.number}`);
    cy.window().then((win) => {
      cy.spy(win.URL, 'createObjectURL').as('pdfDownload');
    });
    cy.get('[data-testid="invoice-details-download-pdf"]').click();
    cy.get('@pdfDownload').should('have.been.called').then((spy) => {
      expect(spy.lastCall.args[0].type).to.equal('application/pdf');
    });
    cy.readFile(`downloads/invoice-${invoice.number}.pdf`, 'binary')
      .should('match', /^%PDF-/);
    cy.get('[data-testid="invoice-details-back-link"]').click();
    cy.contains('a', invoice.number).should('be.visible');
  });
});

describe('Invoice PDF branding adapter', () => {
  let win;
  let loadBranding;

  beforeEach(() => {
    visitTestPage();
    cy.window().then((window) => { win = window; });
    loadModules('/blocks/commerce-invoice-details/invoice-pdf-branding.js')
      .then(([module]) => { loadBranding = module.default; });
  });

  it('keeps absent branding optional and supports name/address-only configurations', () => {
    cy.then(async () => {
      expect(await loadBranding(undefined)).to.equal(undefined);
      expect(await loadBranding(null)).to.equal(undefined);
      const config = { storeName: 'Example Merchant', addressLines: ['Street', 'City'] };
      expect(await loadBranding(config)).to.deep.equal(config);
    });
  });

  it('loads a real logo with CORS, scales it, and converts it to PNG without mutating config', () => {
    cy.intercept('GET', '/media/invoice-test-logo.svg', {
      headers: { 'content-type': 'image/svg+xml' },
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="800"><rect width="2400" height="800" fill="red"/></svg>',
    });
    cy.then(() => {
      const draw = cy.spy(win.CanvasRenderingContext2D.prototype, 'drawImage');
      const config = {
        logoUrl: '/media/invoice-test-logo.svg',
        storeName: 'A',
        addressLines: ['A address'],
      };
      return loadBranding(config).then(async (branding) => {
        expect(branding.logoDataUrl).to.match(/^data:image\/png;base64,/);
        expect(branding.storeName).to.equal('A');
        expect(branding.addressLines).to.deep.equal(['A address']);
        expect(config).not.to.have.property('logoDataUrl');
        const image = draw.firstCall.args[0];
        expect(image.src).to.equal(`${win.location.origin}/media/invoice-test-logo.svg`);
        expect(image.crossOrigin).to.equal('anonymous');
        expect(draw.firstCall.thisValue.canvas.width).to.equal(1200);
        expect(draw.firstCall.thisValue.canvas.height).to.equal(400);
        expect(await loadBranding({ storeName: 'B', addressLines: ['B address'] }))
          .to.deep.equal({ storeName: 'B', addressLines: ['B address'] });
      });
    });
  });

  it('rejects malformed configuration and non-HTTP logo URLs', () => {
    cy.then(async () => {
      for (const config of [
        false, [], { storeName: 42 }, { addressLines: 'Street' },
        { addressLines: [42] }, { logoUrl: 42 }, { logoUrl: ' ' },
        { logoUrl: 'javascript:alert(1)' },
      ]) {
        const error = await loadBranding(config).then(
          () => { throw new Error('Expected invalid branding to reject'); },
          (reason) => reason,
        );
        expect(error.message).to.match(/Invalid invoice-pdf-branding|HTTP\(S\)/);
      }
    });
  });

  it('rejects inaccessible logos instead of silently omitting them', () => {
    cy.intercept('GET', '/missing-invoice-logo.png', { statusCode: 404 });
    cy.then(() => loadBranding({ logoUrl: '/missing-invoice-logo.png' }).then(
      () => { throw new Error('Expected image loading to reject'); },
      (error) => { expect(error.message).to.match(/URL and CORS/); },
    ));
  });

  for (const failure of ['dimensions', 'context', 'conversion']) {
    it(`rejects invalid image ${failure}`, () => {
      cy.then(() => {
        cy.stub(win, 'Image').callsFake(function imageFixture() {
          this.naturalWidth = failure === 'dimensions' ? 0 : 20;
          this.naturalHeight = 20;
          Object.defineProperty(this, 'src', {
            set() { win.queueMicrotask(() => this.onload()); },
          });
        });
        if (failure === 'context') {
          cy.stub(win.HTMLCanvasElement.prototype, 'getContext').returns(null);
        } else if (failure === 'conversion') {
          cy.stub(win.CanvasRenderingContext2D.prototype, 'drawImage');
          cy.stub(win.HTMLCanvasElement.prototype, 'toDataURL')
            .throws(new Error('Canvas is tainted'));
        }
        return loadBranding({ logoUrl: '/logo.png' }).then(
          () => { throw new Error('Expected image processing to reject'); },
          (error) => { expect(error.message).to.match(/dimensions|convert|tainted/); },
        );
      });
    });
  }
});

describe('Invoice host routing and initialization', () => {
  beforeEach(() => {
    // Keep host modules, commerce routing helpers, config selection and auth
    // cookie detection real; replace only drop-in rendering and initialization.
    cy.intercept('GET', '**/scripts/initializers/index.js', {
      headers: { 'content-type': 'application/javascript' },
      body: 'export const initializeDropin = callback => callback; export default () => {};',
    });
    cy.intercept('GET', '**/scripts/initializers/auth.js', {
      headers: { 'content-type': 'application/javascript' },
      body: 'export {};',
    });
    cy.intercept('GET', '**/scripts/__dropins__/tools/initializer.js', {
      headers: { 'content-type': 'application/javascript' },
      body: 'export const initializers = { mountImmediately: async (_, config) => { window.invoiceMount = config; } };',
    });
    cy.intercept('GET', '**/scripts/__dropins__/storefront-order/api.js', {
      headers: { 'content-type': 'application/javascript' },
      body: 'export const initialize = () => {}; export const setEndpoint = () => {};',
    });
    for (const dropin of ['storefront-order', 'storefront-auth']) {
      cy.intercept('GET', `**/scripts/__dropins__/${dropin}/render.js`, {
        headers: { 'content-type': 'application/javascript' },
        body: 'export const render = { render: (_, props) => async () => { window.invoiceProps = props; } };',
      });
    }
    for (const [dropin, container] of [
      ['storefront-order', 'OrderInvoices'],
      ['storefront-order', 'InvoiceDetails'],
      ['storefront-auth', 'SignIn'],
    ]) {
      cy.intercept('GET', `**/scripts/__dropins__/${dropin}/containers/${container}.js`, {
        headers: { 'content-type': 'application/javascript' },
        body: `export const ${container} = () => {};`,
      });
    }
    cy.intercept('GET', '**/placeholders/order.json', { body: { data: [] } });
  });

  afterEach(() => {
    cy.clearCookie('auth_dropin_user_token');
  });

  function configure({ authenticated = false, branding } = {}) {
    return loadModules('/scripts/__dropins__/tools/lib/aem/configs.js').then(([config]) => {
      config.initializeConfig({ public: { default: {}, '/fr': { 'invoice-pdf-branding': branding } } });
      if (authenticated) {
        return cy.window().then((win) => {
          win.document.cookie = 'auth_dropin_user_token=invoice-test-token; path=/';
        });
      }
      return undefined;
    });
  }

  for (const suffix of ['', '/']) {
    it(`preserves roots and encoded invoice references with trailing slash "${suffix}"`, () => {
      visitTestPage(`/fr/customer/order-details${suffix}?orderRef=ORDER%2F1`);
      configure({ authenticated: true });
      loadModules('/blocks/commerce-order-invoices/commerce-order-invoices.js').then(([block]) => cy.window().then(async (win) => {
        await block.default(win.document.querySelector('main'));
        const destination = win.invoiceProps.routeInvoiceDetails({ number: 'INV & 2' }, 'ORDER/1');
        const parsed = new URL(destination, win.location.origin);
        expect(parsed.pathname).to.equal('/fr/customer/invoice-details');
        expect(parsed.searchParams.get('orderRef')).to.equal('ORDER/1');
        expect(parsed.searchParams.get('invoiceRef')).to.equal('INV & 2');
        win.history.replaceState(null, '', destination.replace('/invoice-details?', `/invoice-details${suffix}?`));
      }));
      loadModules('/blocks/commerce-invoice-details/commerce-invoice-details.js').then(([block]) => cy.window().then(async (win) => {
        await block.default(win.document.querySelector('main'));
        expect(win.invoiceProps.invoiceRef).to.equal('INV & 2');
        expect(win.invoiceProps.routeInvoicesList())
          .to.equal('/fr/customer/order-details?orderRef=ORDER%2F1');
        expect(await win.invoiceProps.getInvoicePdfBranding()).to.equal(undefined);
      }));
    });
  }

  it('preserves the full invoice destination through the sign-in routing callbacks', () => {
    const destination = '/fr/invoice-details?orderRef=000123&invoiceRef=INV%2F2#items';
    visitTestPage(destination);
    configure();
    loadModules('/scripts/initializers/order.js');
    cy.location('pathname').should('equal', '/fr/customer/login');
    cy.location('search').then((search) => {
      expect(new URLSearchParams(search).get('redirectUrl')).to.equal(destination);
    });
    configure();
    loadModules('/blocks/commerce-login/commerce-login.js').then(([block]) => cy.window().then(async (win) => {
      await block.default(win.document.querySelector('main'));
      expect(win.invoiceProps.routeRedirectOnSignIn()).to.equal(destination);
      expect(win.invoiceMount).to.equal(undefined);
    }));
  });

  it('initializes authenticated invoice details without redirecting', () => {
    const destination = '/fr/invoice-details?orderRef=000123&invoiceRef=INV2';
    visitTestPage(destination);
    configure({ authenticated: true });
    loadModules('/scripts/initializers/order.js');
    cy.location('pathname').should('equal', '/fr/invoice-details');
    cy.window().its('invoiceMount.orderRef').should('equal', '000123');
  });

  it('preserves guest-token order-details initialization', () => {
    const token = 'guest-order-token-longer-than-twenty';
    visitTestPage(`/order-details?orderRef=${token}`);
    configure();
    loadModules('/scripts/initializers/order.js');
    cy.location('pathname').should('equal', '/order-details');
    cy.window().its('invoiceMount.orderRef').should('equal', token);
  });

  it('logs and propagates branding callback failures', () => {
    visitTestPage('/fr/invoice-details?orderRef=000123&invoiceRef=INV2');
    configure({ authenticated: true, branding: { storeName: 42 } });
    loadModules('/blocks/commerce-invoice-details/commerce-invoice-details.js').then(([block]) => cy.window().then(async (win) => {
      const errorLog = cy.stub(win.console, 'error');
      await block.default(win.document.querySelector('main'));
      await win.invoiceProps.getInvoicePdfBranding().then(
        () => { throw new Error('Expected branding callback to reject'); },
        (error) => { expect(error.message).to.match(/Invalid invoice-pdf-branding/); },
      );
      expect(errorLog).to.have.been.calledOnce;
      expect(errorLog.firstCall.args[0]).to.equal('Unable to prepare invoice PDF branding.');
    }));
  });
});
