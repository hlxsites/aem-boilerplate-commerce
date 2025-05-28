import { products } from "../../../fixtures";
import { expectsEventWithContext } from "../../../assertions";
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/add-to-cart.md
 *
 * Required Contexts: page, storefront, product, shoppingCart, changedProducts
 */

it("is sent on add to cart button click", () => {
  cy.visit(products.configurable.urlPathWithOptions);
  // add to cart
  cy.get(".product-details__buttons__add-to-cart button")
    .should("be.visible")
    .click();

  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        expectsEventWithContext(
          "add-to-cart",
          [
            "pageContext",
            "storefrontInstanceContext",
            "productContext",
            "shoppingCartContext",
            "changedProductsContext",
          ],
          adobeDataLayer,
        );
      });
  });
});

it.skip("open-cart includes changedProductsContext with items", () => {
  cy.visit(products.configurable.urlPathWithOptions);
  
  cy.get(".product-details__buttons__add-to-cart button")
    .should("be.visible")
    .click();
  
  cy.get('button[data-count="1"]').should("be.visible").click();

  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        const openCartEvent = adobeDataLayer.find(
          (event) => event?.event === "open-cart"
        );
        expect(openCartEvent).to.exist;
        
        expect(openCartEvent.changedProductsContext).to.exist;
        expect(openCartEvent.changedProductsContext.items.length).to.be.greaterThan(0);
      });
  });
});
