const moduleSources = {
  '@dropins/storefront-account/render.js': `
    export const render = { render: (_, props) => async () => {
      const view = {
        props,
        remove() { this.removed = true; },
        setProps(update) {
          if (window.reviewTest.updateError) throw window.reviewTest.updateError;
          this.props = update(this.props);
        },
      };
      window.reviewTest.view = view;
      window.reviewTest.onRender?.();
      await window.reviewTest.renderGate;
      if (window.reviewTest.renderError) throw window.reviewTest.renderError;
      return view;
    } };
  `,
  '@dropins/storefront-account/containers/ProductReviews.js': 'export const ProductReviews = {};',
  '@dropins/storefront-account/api.js': `
    export async function getStoreConfig() {
      if (window.reviewTest.configError) throw window.reviewTest.configError;
      return { productReviewsEnabled: window.reviewTest.reviewsEnabled };
    }
  `,
  '@dropins/tools/components.js': 'export const Icon = {}; export const provider = { render: () => () => {} };',
  '@dropins/tools/event-bus.js': `
    export const events = { on: (_, handler) => {
      window.reviewTest.authenticate = handler;
      return { off() { window.reviewTest.unsubscribed = true; } };
    } };
  `,
  '@dropins/tools/lib/aem/configs.js': `
    export const getRootPath = () => window.reviewTest.root;
  `,
  '/scripts/initializers/account.js': '',
  '/scripts/scripts.js': 'export function decorateMain() {}',
  '/scripts/commerce.js': `
    export const CUSTOMER_ORDERS_PATH = '/customer/orders';
    export const CUSTOMER_LOGIN_PATH = '/customer/login';
    export const CUSTOMER_REVIEWS_PATH = '/customer/reviews';
    export const checkIsAuthenticated = () => true;
    export const getProductLink = () => undefined;
    export function rootLink(link) {
      const root = window.reviewTest.root;
      return link.startsWith(root) ? link : root + link;
    }
  `,
};

function visitHarness({ missingFragment = false } = {}) {
  const imports = Object.fromEntries(Object.entries(moduleSources).map(([name, source]) => [
    name, `data:text/javascript,${encodeURIComponent(source)}`,
  ]));
  cy.intercept('GET', '**/*.plain.html', {
    statusCode: missingFragment ? 404 : 200,
    body: `<div class="default-content-wrapper"><ol><li>Orders<ol>
      <li>Your orders</li><li>/customer/orders</li><li>ShoppingBag</li>
      </ol></li><li>My Product Reviews<ol>
      <li>Your reviews</li><li>/customer/reviews</li><li>Star</li>
      </ol></li></ol></div>`,
    headers: { 'content-type': 'text/html' },
  }).as('sidebarFragment');
  cy.intercept('GET', '**/__customer-review-links-test', {
    body: `<!doctype html><html><head>
      <script type="importmap">${JSON.stringify({ imports })}</script>
      </head><body></body></html>`,
    headers: { 'content-type': 'text/html' },
  });
  cy.visit('/__customer-review-links-test', {
    onBeforeLoad(win) {
      win.reviewTest = { root: '/en', reviewsEnabled: true, unsubscribed: false };
    },
  });
}

function createBlock(win, key, value, hyperlink = false) {
  const block = win.document.createElement('div');
  if (value !== undefined) {
    const row = win.document.createElement('div');
    const label = win.document.createElement('div');
    label.textContent = key;
    const cell = win.document.createElement('div');
    if (hyperlink) {
      const link = win.document.createElement('a');
      link.href = value;
      link.textContent = 'Authored destination';
      cell.append(link);
    } else {
      cell.textContent = value;
    }
    row.append(label, cell);
    block.append(row);
  }
  win.document.body.append(block);
  return block;
}

function decorateBlock(win, name, block) {
  return new Cypress.Promise((resolve, reject) => {
    const script = win.document.createElement('script');
    script.type = 'module';
    const moduleUrl = new win.URL(`/blocks/${name}/${name}.js`, win.location.href).href;
    const source = `import decorate from '${moduleUrl}';
      window.reviewTest.decorate = decorate;`;
    const url = win.URL.createObjectURL(new win.Blob([source], { type: 'text/javascript' }));
    script.src = url;
    const cleanup = () => {
      script.remove();
      win.URL.revokeObjectURL(url);
    };
    script.onload = () => {
      cleanup();
      resolve(win.reviewTest.decorate(block));
    };
    script.onerror = () => {
      cleanup();
      reject(new Error(`Unable to import ${name}.`));
    };
    win.document.head.append(script);
  });
}

function expectFailure(promise, message) {
  return promise.then(
    () => { throw new Error('Expected block decoration to reject.'); },
    (error) => { expect(error.message).to.equal(message); },
  );
}

function delayRender(win) {
  let complete;
  const started = new Cypress.Promise((resolve) => {
    win.reviewTest.onRender = resolve;
  });
  win.reviewTest.renderGate = new Cypress.Promise((resolve) => {
    complete = resolve;
  });
  return { started, complete };
}

describe('Customer review account links', () => {
  ['', '/en'].forEach((root) => {
    it(`loads the production sidebar for storefront root "${root || '/'}"`, () => {
      visitHarness();
      cy.window().then(async (win) => {
        win.reviewTest.root = root;
        const block = createBlock(win);
        await decorateBlock(win, 'commerce-account-sidebar', block);
        expect([...block.querySelectorAll('a')].map((link) => link.getAttribute('href')))
          .to.deep.equal([`${root}/customer/orders`, `${root}/customer/reviews`]);
      });
      cy.wait('@sidebarFragment').then(({ request }) => {
        expect(new URL(request.url).pathname).to.equal(`${root}/customer/sidebar-fragment.plain.html`);
      });
    });
  });

  it('hides only the review sidebar entry when merchant reviews are disabled', () => {
    visitHarness();
    cy.window().then(async (win) => {
      win.reviewTest.reviewsEnabled = false;
      const block = createBlock(win);
      await decorateBlock(win, 'commerce-account-sidebar', block);
      expect([...block.querySelectorAll('a')].map((link) => link.getAttribute('href')))
        .to.deep.equal(['/en/customer/orders']);
    });
  });

  it('reports an unavailable fragment instead of dereferencing null', () => {
    visitHarness({ missingFragment: true });
    cy.window().then((win) => expectFailure(
      decorateBlock(win, 'commerce-account-sidebar', createBlock(win)),
      'Unable to load account sidebar fragment: /customer/sidebar-fragment',
    ));
  });

  [
    { title: 'default reviews route', expected: () => '/en/customer/reviews' },
    { title: 'plain relative route', value: '/customer/reviews', expected: () => '/en/customer/reviews' },
    { title: 'localized plain route', value: '/en/customer/reviews', expected: () => '/en/customer/reviews' },
    {
      title: 'localized hyperlinked route',
      value: '/en/customer/reviews?source=account#history',
      hyperlink: true,
      expected: (win) => `${win.location.origin}/en/customer/reviews?source=account#history`,
    },
    {
      title: 'absolute HTTP route',
      value: 'http://store.example/en/customer/reviews',
      expected: () => 'http://store.example/en/customer/reviews',
    },
    {
      title: 'absolute HTTPS route',
      value: 'https://store.example/en/customer/reviews',
      expected: () => 'https://store.example/en/customer/reviews',
    },
  ].forEach(({ title, value, hyperlink, expected }) => {
    it(`preserves the ${title}`, () => {
      visitHarness();
      cy.window().then(async (win) => {
        const block = createBlock(win, 'Reviews page', value, hyperlink);
        await decorateBlock(win, 'commerce-customer-reviews', block);
        expect(win.reviewTest.view.props.routeReviewsList()).to.equal(expected(win));
      });
    });
  });

  it('keeps the default route without a locale prefix', () => {
    visitHarness();
    cy.window().then(async (win) => {
      win.reviewTest.root = '';
      await decorateBlock(win, 'commerce-customer-reviews', createBlock(win));
      expect(win.reviewTest.view.props.routeReviewsList()).to.equal('/customer/reviews');
    });
  });

  it('invalidates the customer context when authentication changes', () => {
    visitHarness();
    cy.window().then(async (win) => {
      const block = createBlock(win);
      await decorateBlock(win, 'commerce-customer-reviews', block);
      win.reviewTest.authenticate(true);
      expect(win.reviewTest.view.props.contextKey).to.equal('1');
      expect(win.reviewTest.view.props.authenticated).to.equal(true);
      win.reviewTest.authenticate(true);
      expect(win.reviewTest.view.props.contextKey).to.equal('2');
    });
  });

  it('reconciles authentication changes while the view is mounting', () => {
    visitHarness();
    cy.window().then(async (win) => {
      const { started, complete } = delayRender(win);
      const mounting = decorateBlock(win, 'commerce-customer-reviews', createBlock(win));
      await started;
      expect(win.reviewTest.view.props.contextKey).to.equal('0');
      win.reviewTest.authenticate(true);
      complete();
      await mounting;
      expect(win.reviewTest.view.props.contextKey).to.equal('1');
      expect(win.reviewTest.view.props.authenticated).to.equal(true);
    });
  });

  ['configError', 'renderError'].forEach((failure) => {
    it(`unsubscribes and preserves the original ${failure}`, () => {
      visitHarness();
      cy.window().then(async (win) => {
        const error = new win.Error('Customer reviews unavailable.');
        win.reviewTest[failure] = error;
        const result = await decorateBlock(win, 'commerce-customer-reviews', createBlock(win))
          .then(() => { throw new Error('Expected block decoration to reject.'); }, (caught) => caught);
        expect(result).to.equal(error);
        expect(win.reviewTest.unsubscribed).to.equal(true);
      });
    });
  });

  it('removes the mounted view and unsubscribes if reconciliation fails', () => {
    visitHarness();
    cy.window().then(async (win) => {
      const error = new win.Error('Unable to update the customer context.');
      win.reviewTest.updateError = error;
      const { started, complete } = delayRender(win);
      const mounting = decorateBlock(win, 'commerce-customer-reviews', createBlock(win));
      await started;
      win.reviewTest.authenticate(true);
      complete();
      const result = await mounting
        .then(() => { throw new Error('Expected block decoration to reject.'); }, (caught) => caught);
      expect(result).to.equal(error);
      expect(win.reviewTest.view.removed).to.equal(true);
      expect(win.reviewTest.unsubscribed).to.equal(true);
    });
  });
});
