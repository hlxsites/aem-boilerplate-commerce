/**
 * Types into an input with a configurable delay between keystrokes.
 *
 * @param {string} selector - The CSS selector for the input element
 * @param {string} value - The text to type
 * @param {number} [delay=50] - Delay between keystrokes in ms
 *
 * @example
 * cy.delayedType('input[name="email"]', 'user@example.com');
 * cy.delayedType('input[name="email"]', 'user@example.com', 100);
 */
Cypress.Commands.add('delayedType', (selector, value, delay = 100) => {
  cy.get(selector).clear();
  cy.get(selector).type(value, { delay });
});
