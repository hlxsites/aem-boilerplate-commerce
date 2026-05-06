/**
 * Shared login utility for Cypress tests.
 * Registers a `cy.performLogin` custom command that handles
 * navigation, form filling (Preact-compatible), and redirect verification.
 *
 * @example
 * // Full login flow (navigates + waits for redirect)
 * cy.performLogin('user@example.com', 'password123');
 *
 * @example
 * // Login without navigation (caller already visited login page)
 * cy.performLogin('user@example.com', 'password123', { visit: false });
 *
 * @example
 * // Custom login/redirect URLs
 * cy.performLogin('user@example.com', 'password123', {
 *   loginUrl: '/custom/login',
 *   redirectUrl: '/custom/account',
 * });
 */

/**
 * @typedef {Object} PerformLoginOptions
 * @property {boolean} [visit=true] - Whether to navigate to the login page
 * @property {string} [loginUrl='/customer/login'] - URL of the login page
 * @property {string} [redirectUrl='/customer/account'] - Expected redirect URL after login
 * @property {boolean} [waitForRedirect=true] - Whether to wait for redirect after login
 */

Cypress.Commands.add('performLogin', (email, password, options = {}) => {
  const {
    visit = true,
    loginUrl = '/customer/login',
    redirectUrl = '/customer/account',
    waitForRedirect = true,
  } = options;

  if (visit) {
    cy.visit(loginUrl);
  }

  cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
    cy.fillField('input[name="email"]', email, { delay: 50 });
    cy.fillField('input[name="password"]', password);

    // Preact needs a tick to commit form state after the last input event
    // before the submit handler can read the correct values
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('button[type="submit"]').click({ force: true });
  });

  if (waitForRedirect) {
    cy.url({ timeout: 30000 }).should('include', redirectUrl);
  }
});
