/**
 * ACO-specific Cypress support file.
 * Extends the base support file for tests running against an ACO-configured storefront.
 */
import './index';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of null (reading 'final')")) {
    return false;
  }
  if (err.message.includes("Cannot read properties of null (reading 'dataset')")) {
    return false;
  }
  return true;
});
