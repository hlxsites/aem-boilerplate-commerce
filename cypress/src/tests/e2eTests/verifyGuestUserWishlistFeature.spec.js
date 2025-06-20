import {
  assertCartSummaryProduct,
  assertWishlistEmpty,
  assertWishlistItem,
  assertWishlistTitleHasLink,
  assertWishlistProductImage,
  assertWishlistCount,
  assertCartEmpty,
} from "../../assertions";

describe("Verify guest user can manage products across wishlist and cart", { tags: "@skipSaas" }, () => {
  it("Should successfully add simple product to wishlist, move product to cart and return product to wishlist", () => {
    cy.visit("");
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist page to load and assert empty state
    cy.wait(1000);
    assertWishlistEmpty();

    // Navigate to product with proper hover and wait
    cy.get(".nav-drop").first().should('be.visible').trigger("mouseenter");
    cy.contains("Youth Tee").should('be.visible').click();

    // Wait for container to exist
    cy.get('.product-details__buttons__add-to-wishlist').should('exist');

    // Wait for button to be rendered
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Click the wishlist button
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .click();

    // Wait for wishlist operation to complete by checking for success indicators
    // Give it a moment for the state to change, then proceed
    cy.wait(1000);

    // Navigate back to wishlist and verify item was added
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCount(1);

    // Verify wishlist item details
    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");

    assertWishlistTitleHasLink(
      "Youth tee",
      "/products/youth-tee/ADB150"
    )(".commerce-wishlist-wrapper");

    assertWishlistProductImage(Cypress.env("productImageName"))(".commerce-wishlist-wrapper");

    // Move item to cart with proper waiting
    cy.contains("Move To Cart").should('be.visible').and('not.be.disabled').click();

    // Wait for move operation to complete by checking wishlist becomes empty
    cy.wait(1000);
    assertWishlistEmpty();

    // Check cart has the item
    cy.get(".minicart-wrapper").should('be.visible').click();

    // Wait for cart to load
    cy.get(".cart-mini-cart", { timeout: 10000 }).should('be.visible');
    assertCartSummaryProduct(
      "Youth tee",
      "ADB150",
      "1",
      "$10.00",
      "$10.00",
      "0",
    )(".cart-mini-cart");

    // Navigate to full cart view
    cy.contains("View Cart").should('be.visible').click();

    // Wait for cart page to load
    cy.get('.cart__action--wishlist-toggle').should('exist');

    // Wait for wishlist button to be available
    cy.get('.cart__action--wishlist-toggle [data-testid="wishlist-toggle"]', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for move to wishlist operation to complete by checking for empty cart
    assertCartEmpty();

    // Verify item is back in wishlist
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCount(1);

    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");
  });

it("Should successfully remove simple product from wishlist", () => {
    cy.visit("");
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist page to load and assert empty state
    cy.wait(1000);
    assertWishlistEmpty();

    // Navigate to product with proper hover and wait
    cy.get(".nav-drop").first().should('be.visible').trigger("mouseenter");
    cy.contains("Youth Tee").should('be.visible').click();

    // Wait for container to exist
    cy.get('.product-details__buttons__add-to-wishlist').should('exist');

    // Wait for button to be rendered
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
        .should('be.visible')
        .and('not.be.disabled');

    // Click the wishlist button
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
        .click();

    // Wait for wishlist operation to complete by checking for success indicators
    // Give it a moment for the state to change, then proceed
    cy.wait(2000);

    // Navigate back to wishlist and verify item was added
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCount(1);

    // Verify wishlist item details
    assertWishlistItem(
        "Youth tee",
        "$10.00",
    )(".wishlist-wishlist__content");

    assertWishlistTitleHasLink(
        "Youth tee",
        "/products/youth-tee/ADB150"
    )(".commerce-wishlist-wrapper");

    assertWishlistProductImage(Cypress.env("productImageName"))(".commerce-wishlist-wrapper");

    // Remove item from wishlist with proper waiting
    cy.get('[data-testid="wishlist-product-item-remove-button"]', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for move operation to complete by checking wishlist becomes empty
    cy.wait(1000);
    assertWishlistEmpty();
  });
});
