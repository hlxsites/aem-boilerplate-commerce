/**
 * Custom Cypress command for retrying an action until a condition is met.
 *
 * Generalizes the retry-with-reload pattern used in waitForUserInGrid.js
 * for backend cache/indexing delays where no observable network signal exists.
 *
 * @example
 * // Retry until an element appears, reloading between attempts
 * cy.retryUntil(
 *   () => cy.get('body').then(($body) => $body.find('.user-row').length > 0),
 *   { reload: true, maxRetries: 5, delay: 3000, errorMessage: 'User never appeared' }
 * );
 *
 * @example
 * // Retry without reload
 * cy.retryUntil(
 *   () => cy.get('.status').then(($el) => $el.text().includes('Active')),
 *   { maxRetries: 3, delay: 2000 }
 * );
 *
 * @param {function} checkFn - Function that returns a Cypress chainable resolving to a truthy/falsy value.
 * @param {object} [options]
 * @param {number} [options.maxRetries=5] - Maximum number of retry attempts.
 * @param {number} [options.delay=2000] - Delay in ms between retries.
 * @param {boolean} [options.reload=false] - Whether to cy.reload() before each retry.
 * @param {string} [options.errorMessage] - Custom error message on exhaustion.
 */
Cypress.Commands.add('retryUntil', (checkFn, options = {}) => {
  const {
    maxRetries = 5,
    delay = 2000,
    reload = false,
    errorMessage = `Condition not met after ${maxRetries} retries`,
  } = options;

  let attempt = 0;

  function tryOnce() {
    return checkFn().then((result) => {
      if (result) {
        return result;
      }

      attempt += 1;

      if (attempt >= maxRetries) {
        throw new Error(`${errorMessage} (tried ${attempt} times)`);
      }

      cy.logToTerminal(
        `⏳ Condition not met, retrying (${attempt}/${maxRetries})...`,
      );

      if (reload) {
        cy.reload();
      }

      cy.wait(delay);

      return tryOnce();
    });
  }

  return tryOnce();
});
