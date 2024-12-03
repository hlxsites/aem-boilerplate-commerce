import { products } from "../../../fixtures";
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/add-to-cart.md
 *
 * Required Contexts: page, storefront, shoppingCart
 */

it("is sent on add to cart button click", () => {
  cy.visit(products.configurable.urlPathWithOptions);
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        const pageContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.pageContext
        );
        const storefrontInstanceContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.storefrontInstanceContext
        );
        // page and storefront pushed before spy
        expect(pageContextIndex).to.be.greaterThan(-1);
        expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
      });
  });
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().then((win) => {
      cy.spy(win.adobeDataLayer, "push").as("adl");
      // add to cart
      cy.get(".product-details__buttons__add-to-cart button")
        .should("be.visible")
        .click()
        .then(() => {
          cy.window()
            .its("adobeDataLayer")
            .then(() => {
              cy.get("@adl", { timeout: 1000 }).should((adobeDataLayerPush) => {
                const targetEventIndex = adobeDataLayerPush.args.findIndex(
                  (event) => event[0]?.event === "add-to-cart"
                );
                const shoppingCartContextIndex =
                  adobeDataLayerPush.args.findIndex(
                    (event) => !!event[0]?.shoppingCartContext
                  );
                expect(targetEventIndex).to.be.greaterThan(-1);
                expect(shoppingCartContextIndex).to.be.greaterThan(-1);
              });
            });
        });
    });
  });
});
