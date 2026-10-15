import { expectsEventWithContext } from "../../../assertions";
import { products } from "../../../fixtures";
import { enableAnalyticsConsent, visitWithAnalyticsConsent } from "./consentTestSupport";

enableAnalyticsConsent();

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
  visitWithAnalyticsConsent("/");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").should(baselineContexts);
  });
});

it("has baseline contexts on PDP", () => {
  visitWithAnalyticsConsent(products.simple.urlPath);
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").should(baselineContexts);
  });
});

it("has baseline contexts on cart", () => {
  visitWithAnalyticsConsent("/cart");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").should(baselineContexts);
  });
});

it("has baseline contexts on checkout", () => {
  visitWithAnalyticsConsent("/checkout");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().its("adobeDataLayer").should(baselineContexts);
  });
});
