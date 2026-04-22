import { expectsEventWithContext } from "../../../assertions";
import { products } from "../../../fixtures";

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
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on PDP", () => {
  cy.visit(products.simple.urlPath);
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on cart", () => {
  cy.visit("/cart");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});

it("has baseline contexts on checkout", () => {
  cy.visit("/checkout");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").then(baselineContexts);
  });
});
