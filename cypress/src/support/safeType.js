/**
 * Types into a React controlled input with a single retry on value mismatch.
 * First attempt uses native speed; if keystrokes are dropped, a single retry
 * at a known-reliable delay avoids the cost of repeated full retypes.
 *
 * @param {string} selector - The CSS selector for the input element
 * @param {string} value - The text to type
 * @param {object} [options]
 * @param {number} [options.delay=0] - Delay between keystrokes for the first attempt (ms)
 * @param {number} [options.fallbackDelay=100] - Delay used on the retry attempt (ms)
 *
 * @example
 * cy.safeType('input[name="email"]', 'user@example.com');
 */
Cypress.Commands.add(
  'safeType',
  (selector, value, { delay = 0, fallbackDelay = 100 } = {}) => {
    cy.get(selector).clear();
    cy.get(selector).type(value, { delay });
    cy.get(selector).then(($input) => {
      if ($input.val() !== value) {
        cy.get(selector).clear();
        cy.get(selector).type(value, { delay: fallbackDelay });
      }
    });
    cy.get(selector).should('have.value', value);
  },
);
