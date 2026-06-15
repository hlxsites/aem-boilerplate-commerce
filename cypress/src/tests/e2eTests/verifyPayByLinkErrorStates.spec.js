const PAY_PATH = '/drafts/aries/pay';

const runner = Cypress.env('payByLinkQueryWired') ? describe : describe.skip;

function interceptPayByLinkOrder(response) {
  cy.intercept('**/graphql*', (req) => {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || '');
    if (body.includes('payByLinkOrder')) {
      req.reply(response);
    }
  }).as('payByLinkOrder');
}

function assertApiErrorCard(state, { expectCta = true } = {}) {
  cy.get(`.pay-by-link.pay-by-link--error[data-state="${state}"]`).should('be.visible');
  cy.get('.pay-by-link__error-card[role="alert"]').should('be.visible');
  cy.get('.pay-by-link__error-card').should('have.attr', 'aria-live', 'assertive');

  cy.get('.pay-by-link__error-title')
    .should('be.visible')
    .should('have.attr', 'tabindex', '-1')
    .should('have.focus')
    .invoke('text')
    .should('match', /\S/);

  cy.get('.pay-by-link__error-body').invoke('text').should('match', /\S/);

  if (expectCta) {
    cy.get('[data-testid="pay-by-link-error-cta"]').should('be.visible');
  } else {
    cy.get('[data-testid="pay-by-link-error-cta"]').should('not.exist');
  }
}

runner('Pay By Link — API-driven error states', () => {
  // 64-char lowercase hex — required for the block to attempt the query at all.
  const VALID_TOKEN = '4d6b20e9f8ed98dcb4287ad80b2e82206c71e4abe0bc3e04015c9ca5ec629d59';

  it('renders the expired token error state', () => {
    // Backend codes mirror BACKEND_CODE_TO_STATE in errors/error-states.js.
    interceptPayByLinkOrder({
      statusCode: 200,
      body: {
        errors: [{ message: 'token expired', extensions: { code: 'PAY_BY_LINK_TOKEN_EXPIRED' } }],
        data: { payByLinkOrder: null },
      },
    });

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    assertApiErrorCard('expired');
  });

  it('renders the already-completed token error state', () => {
    interceptPayByLinkOrder({
      statusCode: 200,
      body: {
        errors: [{ message: 'already completed', extensions: { code: 'PAY_BY_LINK_ALREADY_COMPLETED' } }],
        data: { payByLinkOrder: null },
      },
    });

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    assertApiErrorCard('already-completed', { expectCta: false });
  });

  it('renders the generic / unexpected error state', () => {
    interceptPayByLinkOrder({
      statusCode: 500,
      body: {
        errors: [{ message: 'internal error' }],
      },
    });

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    assertApiErrorCard('generic');
  });
});
