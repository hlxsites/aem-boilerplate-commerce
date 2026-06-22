const PAY_PATH = '/drafts/aries/pay';
const VALID_TOKEN = '4d6b20e9f8ed98dcb4287ad80b2e82206c71e4abe0bc3e04015c9ca5ec629d59';

function stubPayByLinkOrder(body) {
  cy.intercept('POST', '**/graphql*', (req) => {
    const query = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || '');
    if (query.includes('PAY_BY_LINK_ORDER')) {
      const responseBody = typeof body === 'function' ? body(req) : body;
      req.reply({ body: responseBody });
      return;
    }
    req.reply({ body: { data: {} } });
  }).as('payByLinkOrder');
}

function assertErrorCard(state, { cta = 'contactSupport' } = {}) {
  cy.get(`.pay-by-link.pay-by-link--error[data-state="${state}"]`).should('be.visible');
  cy.get('.pay-by-link__error-card[role="alert"]').should('be.visible');
  cy.get('.pay-by-link__error-card').should('have.attr', 'aria-live', 'assertive');

  cy.get('.pay-by-link__error-title')
    .should('exist')
    .should('have.attr', 'tabindex', '-1');

  cy.get('.pay-by-link__error-body').should('exist');

  if (cta === 'none') {
    cy.get('[data-testid="pay-by-link-error-cta"]').should('not.exist');
    return;
  }

  cy.get('[data-testid="pay-by-link-error-cta"]').should('be.visible');

  if (cta === 'contactSupport') {
    cy.get('[data-testid="pay-by-link-error-cta"]').then(($el) => {
      const hasHref = $el.is('a[href]') || $el.find('a[href]').length > 0;
      expect(hasHref, 'contact support CTA should link to support').to.be.true;
    });
    return;
  }

  if (cta === 'tryAgain') {
    cy.get('[data-testid="pay-by-link-error-cta"]').then(($el) => {
      const isButton = $el.is('button') || $el.find('button').length > 0;
      expect(isButton, 'try again CTA should be a button').to.be.true;
    });
  }
}

describe('Pay By Link — API-driven error states', () => {
  it('renders the not-found token error state', () => {
    stubPayByLinkOrder({
      data: { payByLinkOrder: null },
      errors: [{
        message: 'Pay By Link token was not found.',
        extensions: { code: 'TOKEN_NOT_FOUND', category: 'graphql-input' },
      }],
    });

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    assertErrorCard('not-found', { cta: 'contactSupport' });
  });

  it('renders the expired token error state', () => {
    stubPayByLinkOrder({
      data: { payByLinkOrder: null },
      errors: [{
        message: 'Pay By Link token has expired.',
        extensions: { code: 'TOKEN_EXPIRED', category: 'graphql-input' },
      }],
    });

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    assertErrorCard('expired', { cta: 'contactSupport' });
  });

  it('renders the already-completed token error state', () => {
    stubPayByLinkOrder({
      data: { payByLinkOrder: null },
      errors: [{
        message: 'Order has already been paid.',
        extensions: { code: 'ORDER_ALREADY_PAID', category: 'graphql-input' },
      }],
    });

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    assertErrorCard('already-completed', { cta: 'none' });
  });

  it('renders the generic / unexpected error state', () => {
    stubPayByLinkOrder({
      data: { payByLinkOrder: null },
      errors: [{ message: 'internal error' }],
    });

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    assertErrorCard('generic', { cta: 'tryAgain' });
  });

  it('retries the payByLinkOrder query when Try again is clicked on generic error', () => {
    cy.fixture('payByLinkOrder').then((fixture) => {
      let callCount = 0;

      stubPayByLinkOrder(() => {
        callCount += 1;
        if (callCount === 1) {
          return {
            data: { payByLinkOrder: null },
            errors: [{ message: 'internal error' }],
          };
        }
        return fixture;
      });

      cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
      cy.wait('@payByLinkOrder');
      assertErrorCard('generic', { cta: 'tryAgain' });

      cy.get('[data-testid="pay-by-link-error-cta"]').click();
      cy.wait('@payByLinkOrder');

      cy.get('.pay-by-link--error').should('not.exist');
      cy.get('.pay-by-link__order-summary').should('be.visible');
      cy.then(() => expect(callCount).to.eq(2));
    });
  });
});
