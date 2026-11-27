const sheet = (Key, Value) => ({
  total: 1,
  offset: 0,
  limit: 1,
  data: [{ Key, Value }],
});

const sheets = {
  global: sheet('Global.marker', 'global label'),
  auth: sheet('Auth.marker', 'auth label'),
  cart: sheet('Cart.marker', 'cart label'),
};

function expectLoadedLabels(cartLabel = 'cart label') {
  cy.window().its('placeholders._merged').should((labels) => {
    expect(labels.Global?.marker).to.equal('global label');
    expect(labels.Auth?.marker).to.equal('auth label');
    expect(labels.Cart?.marker).to.equal(cartLabel);
  });
}

function visitWithOverrides() {
  cy.intercept({ pathname: '/' }, (request) => {
    request.continue((response) => {
      response.body = response.body.replace(
        '</head>',
        '<meta name="placeholders" content="/test-overrides.json"></head>',
      );
    });
  });
  cy.intercept({ pathname: '/test-overrides.json' }, {
    body: sheet('Cart.marker', 'custom cart label'),
    headers: { 'cache-control': 'no-store' },
  }).as('overrides');
  cy.visit('/');
}

describe('Commerce placeholder sources', () => {
  let individualRequests;

  beforeEach(() => {
    individualRequests = [];
    cy.intercept('GET', '**/placeholders/*.json*', (request) => {
      const { pathname } = new URL(request.url);
      individualRequests.push(pathname);
      request.reply({
        body: sheet('Cart.marker', 'legacy cart label'),
        headers: { 'cache-control': 'no-store' },
      });
    });
    cy.intercept({ pathname: '/placeholders.json' }, {
      body: { ...sheets, ':type': 'multi-sheet', ':names': Object.keys(sheets) },
      headers: { 'cache-control': 'no-store' },
    }).as('consolidated');
  });

  it('loads named sheets once and gives metadata overrides priority', () => {
    visitWithOverrides();
    cy.wait('@consolidated');
    cy.wait('@overrides');
    expectLoadedLabels('custom cart label');
    cy.get('@consolidated.all').should('have.length', 1);
    cy.then(() => expect(individualRequests).to.deep.equal([]));
  });

  it('supports a separate file when its path is supplied explicitly', () => {
    cy.visit('/');
    cy.wait('@consolidated');
    expectLoadedLabels();
    cy.document().then((doc) => {
      const script = doc.createElement('script');
      script.type = 'module';
      script.textContent = `
        import { fetchPlaceholders } from '/scripts/commerce.js';
        window.legacyLabels = await fetchPlaceholders('placeholders/cart.json');
      `;
      doc.head.append(script);
    });
    cy.window().its('legacyLabels.Cart.marker').should('equal', 'legacy cart label');
    cy.then(() => {
      expect(individualRequests).to.deep.equal(['/placeholders/cart.json']);
    });
  });

  it('keeps metadata overrides when the consolidated request fails', () => {
    cy.intercept({ pathname: '/placeholders.json' }, {
      statusCode: 503,
      headers: { 'cache-control': 'no-store' },
    }).as('failedConsolidated');
    visitWithOverrides();
    cy.wait('@failedConsolidated');
    cy.wait('@overrides');
    cy.window().its('placeholders._merged.Cart.marker').should('equal', 'custom cart label');
    cy.then(() => expect(individualRequests).to.deep.equal([]));
  });
});
