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
  cy.waitForResource("magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on PDP", () => {
  cy.visit("/products/frankie-sweatshirt/mh04");
  cy.waitForResource("magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on cart", () => {
  cy.visit("/cart");
  cy.waitForResource("magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on checkout", () => {
  cy.visit("/checkout");
  cy.waitForResource("magento-storefront-event-collector/dist/index.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});
