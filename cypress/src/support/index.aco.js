/**
 * ACO-specific Cypress support file.
 * Extends the base support file for tests running against an ACO + PaaS
 * storefront (b2b--boilerplate-aco-b2b--adobe-commerce.aem.live).
 *
 * The upstream storefront already serves the correct ACO config (ac-view-id,
 * commerce endpoints) so no config interception is needed — matching the
 * pattern used by PAAS and SAAS test suites.
 *
 * The ACO catalog service may return null prices for some products.
 * Suppress the resulting uncaught exception so tests are not failed by
 * this known data gap.
 */
import './index';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of null (reading 'final')")) {
    return false;
  }
  return true;
});
