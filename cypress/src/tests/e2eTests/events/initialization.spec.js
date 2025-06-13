import { expectsEventWithContext } from "../../../assertions";

const baselineContexts = (adobeDataLayer) => {
  expectsEventWithContext(
    null,
    [
      "pageContext",
      "storefrontInstanceContext",
      "eventForwardingContext",
      "shopperContext",
    ],
    adobeDataLayer,
  );
};

it("has baseline contexts on homepage", () => {
  cy.visit("/");
  cy.waitForResource("/scripts/__/__adobe/magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on PDP", () => {
  cy.visit("/products/frankie-sweatshirt/MH04");
  cy.waitForResource("/scripts/__/__adobe/magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on cart", () => {
  cy.visit("/cart");
  cy.waitForResource("/scripts/__/__adobe/magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on checkout", () => {
  cy.visit("/checkout");
  cy.waitForResource("/scripts/__/__adobe/magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});
