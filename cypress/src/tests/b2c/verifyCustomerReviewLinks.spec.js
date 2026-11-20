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
    export const checkIsAuthenticated = () => window.reviewTest.authenticated;
    export const getProductLink = () => undefined;
    export function rootLink(link) {
      const root = window.reviewTest.root;
      return link.startsWith(root) ? link : root + link;
    }
  `,
};

function visitHarness({ missingFragment = false, realAccountApi = false } = {}) {
  const imports = realAccountApi
    ? { '@dropins/tools/': '/scripts/__dropins__/tools/' }
    : Object.fromEntries(Object.entries(moduleSources).map(([name, source]) => [
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
  cy.visit('T-100 [FR-014] /__customer-review-links-test', {
    onBeforeLoad(win) {
      win.reviewTest = {
        root: '/en', reviewsEnabled: true, authenticated: true, unsubscribed: false,
      };
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

describe('SPEC-ratings-reviews-storefront', () => {
  [
    { minified: false, pageSize: 10 },
    { minified: true, pageSize: 3 },
  ].forEach(({ minified, pageSize }, index) => {
    it(`T-${String(40 + index).padStart(3, '0')} [FR-012] uses the ${minified ? 'minified' : 'full'} customer history defaults`, () => {
      visitHarness();
      cy.window().then(async (win) => {
        const block = createBlock(win, 'Minified view', String(minified));
        await decorateBlock(win, 'commerce-customer-reviews', block);
        expect(win.reviewTest.view.props.minifiedView).to.equal(minified);
        expect(win.reviewTest.view.props.pageSize).to.equal(pageSize);
        expect(win.reviewTest.view.props.enabled).to.equal(true);
        expect(win.reviewTest.view.props.authenticated).to.equal(true);
      });
    });
  });

  [1, 50].forEach((pageSize, index) => {
    it(`T-${String(42 + index).padStart(3, '0')} [FR-012] accepts page size ${pageSize}`, () => {
      visitHarness();
      cy.window().then(async (win) => {
        await decorateBlock(win, 'commerce-customer-reviews', createBlock(win, 'Page size', String(pageSize)));
        expect(win.reviewTest.view.props.pageSize).to.equal(pageSize);
      });
    });
  });

  ['0', '51', '1.5', 'not-a-number', ''].forEach((pageSize, index) => {
    it(`T-${String(44 + index).padStart(3, '0')} [FR-012] rejects invalid page size "${pageSize}"`, () => {
      visitHarness();
      cy.window().then((win) => expectFailure(
        decorateBlock(win, 'commerce-customer-reviews', createBlock(win, 'Page size', pageSize)),
        'Customer review page size must be an integer from 1 to 50.',
      ));
    });
  });

  it('T-101 [FR-014] redirects signed-out shoppers before rendering customer history', () => {
    visitHarness();
    cy.intercept('GET', '**/en/customer/login', '<!doctype html><title>Sign in</title>');
    cy.window().then((win) => {
      win.reviewTest.authenticated = false;
      return decorateBlock(win, 'commerce-customer-reviews', createBlock(win));
    });
    cy.location('pathname').should('equal', '/en/customer/login');
  });

  it('T-102 [FR-014] redirects on logout after invalidating the customer context', () => {
    visitHarness();
    cy.intercept('GET', '**/en/customer/login', '<!doctype html><title>Sign in</title>');
    cy.window().then(async (win) => {
      await decorateBlock(win, 'commerce-customer-reviews', createBlock(win));
      win.reviewTest.authenticated = false;
      win.reviewTest.authenticate(false);
      expect(win.reviewTest.view.props.authenticated).to.equal(false);
      expect(win.reviewTest.view.props.contextKey).to.equal('1');
    });
    cy.location('pathname').should('equal', '/en/customer/login');
  });

  ['', '/en'].forEach((root, index) => {
    it(`T-${String(60 + index).padStart(3, '0')} [FR-015] loads the production sidebar for storefront root "${root || '/'}"`, () => {
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

  it('T-103 [FR-015] hides only the review sidebar entry when merchant reviews are disabled', () => {
    visitHarness();
    cy.window().then(async (win) => {
      win.reviewTest.reviewsEnabled = false;
      const block = createBlock(win);
      await decorateBlock(win, 'commerce-account-sidebar', block);
      expect([...block.querySelectorAll('a')].map((link) => link.getAttribute('href')))
        .to.deep.equal(['/en/customer/orders']);
    });
  });

  it('T-104 [FR-015] reports an unavailable fragment instead of dereferencing null', () => {
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
  ].forEach(({ title, value, hyperlink, expected }, index) => {
    it(`T-${String(70 + index).padStart(3, '0')} [FR-012] preserves the ${title}`, () => {
      visitHarness();
      cy.window().then(async (win) => {
        const block = createBlock(win, 'Reviews page', value, hyperlink);
        await decorateBlock(win, 'commerce-customer-reviews', block);
        expect(win.reviewTest.view.props.routeReviewsList()).to.equal(expected(win));
      });
    });
  });

  it('T-105 [FR-012] keeps the default route without a locale prefix', () => {
    visitHarness();
    cy.window().then(async (win) => {
      win.reviewTest.root = '';
      await decorateBlock(win, 'commerce-customer-reviews', createBlock(win));
      expect(win.reviewTest.view.props.routeReviewsList()).to.equal('/customer/reviews');
    });
  });

  it('T-106 [FR-014] invalidates the customer context when authentication changes', () => {
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

  it('T-107 [FR-014] reconciles authentication changes while the view is mounting', () => {
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

  ['configError', 'renderError'].forEach((failure, index) => {
    it(`T-${String(80 + index).padStart(3, '0')} [FR-014] unsubscribes and preserves the original ${failure}`, () => {
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

  it('T-108 [FR-014] removes the mounted view and unsubscribes if reconciliation fails', () => {
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

  describe('Customer history approved-only query', () => {
    [false, true].forEach((unsupportedFilter) => {
      it(`T-${String(90 + Number(unsupportedFilter)).padStart(3, '0')} [FR-013] ${unsupportedFilter ? 'does not retry without an unsupported approval filter' : 'requests approved history with server-side pagination'}`, () => {
        visitHarness({ realAccountApi: true });
        let requests = 0;
        cy.intercept('**/__customer-reviews/graphql*', (req) => {
          requests += 1;
          const url = new URL(req.url);
          const query = req.body?.query ?? url.searchParams.get('query');
          const variables = req.body?.variables ?? JSON.parse(url.searchParams.get('variables'));
          expect(query).to.match(/filter:\s*\{\s*status:\s*\[APPROVED\]\s*\}/);
          expect(variables).to.deep.equal({ pageSize: 2, currentPage: 2 });
          req.reply(unsupportedFilter ? { errors: [{ message: 'Approval filter unsupported.' }] } : {
            data: {
              customer: {
                reviews: { items: [], page_info: { current_page: 2, page_size: 2, total_pages: 2 } },
              },
            },
          });
        }).as('customerReviews');
        cy.window().then((win) => new Cypress.Promise((resolve, reject) => {
          const script = win.document.createElement('script');
          script.type = 'module';
          const source = `
            import { getCustomerReviews, setEndpoint } from '${win.location.origin}/scripts/__dropins__/storefront-account/api.js';
            setEndpoint('${win.location.origin}/__customer-reviews/graphql');
            window.reviewTest.request = getCustomerReviews({ pageSize: 2, currentPage: 2 })
              .then(() => ({ success: true }), error => ({ success: false, message: error.message }));
          `;
          const url = win.URL.createObjectURL(new win.Blob([source], { type: 'text/javascript' }));
          script.src = url;
          const cleanup = () => {
            script.remove();
            win.URL.revokeObjectURL(url);
          };
          script.onload = () => {
            cleanup();
            resolve();
          };
          script.onerror = () => {
            cleanup();
            reject(new Error('Unable to load the Account API.'));
          };
          win.document.head.append(script);
        }));
        cy.wait('@customerReviews');
        cy.window().then((win) => win.reviewTest.request).then((result) => {
          expect(result.success).to.equal(!unsupportedFilter);
          if (unsupportedFilter) expect(result.message).to.include('Approval filter unsupported.');
          expect(requests).to.equal(1);
        });
      });
    });
  });
});
