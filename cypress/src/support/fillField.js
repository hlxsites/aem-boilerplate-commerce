/**
 * Custom Cypress command for filling Preact-controlled input fields.
 *
 * Controlled inputs in Preact may not update state synchronously with
 * Cypress's synthetic events. This command ensures the value is accepted
 * by asserting on the resulting input value, leveraging Cypress's built-in
 * retry mechanism instead of static cy.wait() calls.
 *
 * @example
 * cy.fillField('input[name="email"]', 'user@example.com');
 *
 * @example
 * // With blur to trigger onChange handlers
 * cy.fillField('input[name="email"]', 'user@example.com', { blur: true });
 *
 * @param {string} selector - CSS selector for the input element
 * @param {string} value - Value to type into the field
 * @param {Object} [options] - Optional configuration
 * @param {boolean} [options.blur=false] - Whether to blur after typing
 * @param {number} [options.delay=30] - Delay between keystrokes in ms (Preact needs time to re-render between keystrokes)
 * @param {number} [options.timeout=10000] - Timeout for visibility/value assertions
 */
Cypress.Commands.add('fillField', (selector, value, options = {}) => {
  const { blur = false, delay = 30, timeout = 10000 } = options;

  cy.get(selector, { timeout }).should('be.visible');
  cy.get(selector).clear();
  cy.get(selector).type(value, { delay });
  cy.get(selector).should('have.value', value);

  if (blur) {
    cy.get(selector).blur();
  }
});
