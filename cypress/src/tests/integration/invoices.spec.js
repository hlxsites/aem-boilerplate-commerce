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
const page = `<!doctype html><html><head>
  <script type="importmap">{"imports":{
    "@dropins/storefront-order/":"/scripts/__dropins__/storefront-order/",
    "@dropins/tools/":"/scripts/__dropins__/tools/"
  }}</script></head><body><main id="invoice-block"></main>
  <script type="module">
    const name = location.pathname.endsWith('/invoice-details')
      ? 'commerce-invoice-details' : 'commerce-order-invoices';
    const { default: decorate } = await import('/blocks/' + name + '/' + name + '.js');
    await decorate(document.querySelector('main'));
  </script></body></html>`;

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
