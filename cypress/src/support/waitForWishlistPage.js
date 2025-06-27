/**
 * Custom command to wait for wishlist page to be fully loaded
 * This command ensures the page is ready before running assertions
 */
Cypress.Commands.add('waitForWishlistPageLoaded', () => {
  // Wait for generic loading to disappear
  cy.get('body').should('not.contain', 'Loading...');

  // Ensure we're on the wishlist page
  cy.url().should('include', '/wishlist');

  // Wait for the wishlist wrapper to exist (but don't check visibility since it can have height: 0)
  cy.get('.commerce-wishlist-wrapper').should("exist");

  // Wait specifically for wishlist loading indicator to disappear
  cy.get('[data-testid="loader-wishlist-heading"]').should('not.exist');
}); 