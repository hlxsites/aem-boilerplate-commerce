import {
  assertCartSummaryProduct,
  assertWishlistEmpty,
  assertWishlistItem,
  assertWishlistTitleHasLink,
  assertWishlistProductImage,
  assertWishlistCount,
  assertCartEmpty,
} from "../../assertions";

describe("Verify user can manage products across cart and wishlist", () => {
  it("Should successfully add product to wishlist, move to cart and return to wishlist", () => {
    cy.visit("");
    cy.get(".wishlist-wrapper").click();
    cy.wait(1000);
    assertWishlistEmpty();
    cy.get(".nav-drop").first().trigger("mouseenter");
    cy.wait(1000);
    cy.contains("Youth Tee").click();
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]').click();
    cy.get(".wishlist-wrapper").click();
    cy.wait(3000);
    assertWishlistCount(1);
    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");
    assertWishlistTitleHasLink(
      "Youth tee", 
      "/products/youth-tee/ADB150"
    )(".commerce-wishlist-wrapper");
    assertWishlistProductImage(Cypress.env("productImageName"))(".commerce-wishlist-wrapper");
    cy.contains("Move To Cart").click();
    assertWishlistEmpty();
    cy.get(".minicart-wrapper").click();
    assertCartSummaryProduct(
      "Youth tee",
      "ADB150",
      "1",
      "$10.00",
      "$10.00",
      "0",
    )(".cart-mini-cart");
    cy.contains("View Cart").click();
    cy.get('.cart__action--wishlist-toggle [data-testid="wishlist-toggle"]').click();
    cy.wait(1000);
    assertCartEmpty();
    cy.get(".wishlist-wrapper").click();
    assertWishlistCount(1);
    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");
  });
});
