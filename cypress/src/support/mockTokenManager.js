/**
 * Mock TokenManager for local Magento testing
 * 
 * This command allows you to bypass Adobe IMS OAuth and use a local Magento
 * Integration Token directly for testing against local backends.
 * 
 * @example
 * // In your test or before hook:
 * cy.mockTokenManagerForLocal('your_magento_integration_token');
 * 
 * // Now all API calls via ACCSApiClient will use your local token
 */

const TokenManager = require('./tokenManager');

Cypress.Commands.add('mockTokenManagerForLocal', (integrationToken) => {
  if (!integrationToken) {
    throw new Error('Integration token is required for local testing');
  }

  // Override the TokenManager's getValidToken method
  const originalGetValidToken = TokenManager.prototype.getValidToken;
  
  TokenManager.prototype.getValidToken = async function() {
    // Return the integration token directly instead of calling Adobe IMS
    return integrationToken;
  };

  // Store original method for potential restoration
  cy.wrap({
    restore: () => {
      TokenManager.prototype.getValidToken = originalGetValidToken;
    }
  }).as('tokenManagerMock');

  console.log('✅ TokenManager mocked for local testing');
});

Cypress.Commands.add('restoreTokenManager', () => {
  cy.get('@tokenManagerMock').then((mock) => {
    if (mock && mock.restore) {
      mock.restore();
      console.log('✅ TokenManager restored to original');
    }
  });
});

