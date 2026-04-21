/**
 * Custom Cypress command to intercept and wait for a specific GraphQL operation.
 *
 * Eliminates repeated boilerplate of cy.intercept + cy.wait for GraphQL calls.
 * Matches operations by checking if the request body query string contains
 * the given keyword.
 *
 * @example
 * // Wait for a mutation to complete
 * cy.waitForGraphQL('generateCustomerToken');
 *
 * @example
 * // With custom alias and timeout
 * cy.waitForGraphQL('placeOrder', { alias: 'placeOrder', timeout: 30000 });
 *
 * @param {string} operationOrKeyword - String matched against req.body.query via .includes()
 * @param {object} [options]
 * @param {string} [options.alias] - Intercept alias name (default: derived from operationOrKeyword)
 * @param {number} [options.timeout=15000] - Timeout for cy.wait()
 * @param {string} [options.method='POST'] - HTTP method for the intercept
 */
Cypress.Commands.add(
  'waitForGraphQL',
  (operationOrKeyword, options = {}) => {
    const {
      alias = operationOrKeyword.replace(/[^a-zA-Z0-9]/g, ''),
      timeout = 15000,
      method = 'POST',
    } = options;

    cy.intercept(method, '**/graphql', (req) => {
      const body = req.body || {};
      if (body.query && body.query.includes(operationOrKeyword)) {
        req.alias = alias;
      }
    });

    return cy.wait(`@${alias}`, { timeout });
  },
);
