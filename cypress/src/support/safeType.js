/**
 * Types into a React controlled input with automatic retry on value mismatch.
 * Starts with a fast delay and increases it on each retry to handle
 * React components that drop keystrokes under rapid input.
 *
 * @param {string} selector - The CSS selector for the input element
 * @param {string} value - The text to type
 * @param {object} [options]
 * @param {number} [options.initialDelay=50] - Starting delay between keystrokes (ms)
 * @param {number} [options.maxDelay=200] - Maximum delay between keystrokes (ms)
 * @param {number} [options.step=50] - Delay increase per retry (ms)
 *
 * @example
 * cy.safeType('input[name="email"]', 'user@example.com');
 * cy.safeType('input[name="email"]', 'user@example.com', { initialDelay: 80 });
 */
Cypress.Commands.add(
  'safeType',
  (selector, value, { initialDelay = 50, maxDelay = 200, step = 50 } = {}) => {
    const attempt = (delay) => {
      cy.get(selector).clear();
      cy.get(selector).type(value, { delay });
      cy.get(selector).then(($input) => {
        if ($input.val() !== value && delay < maxDelay) {
          attempt(delay + step);
        } else {
          cy.get(selector).should('have.value', value);
        }
      });
    };

    attempt(initialDelay);
  },
);
