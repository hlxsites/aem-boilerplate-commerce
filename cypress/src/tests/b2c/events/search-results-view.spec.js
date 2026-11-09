import { expectsEventWithContext } from "../../../assertions";
import { enableAnalyticsConsent, visitWithAnalyticsConsent } from "./consentTestSupport";

enableAnalyticsConsent();
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/search-results-view.md
 *
 * Required Contexts: page, storefront, searcResults
 */
it("is sent on search bar view/render", { tags: "@skipSaas" }, () => {
  visitWithAnalyticsConsent("/");
  cy.get(".nav-search-button").should("be.visible").click();
  cy.get("#search").should("be.visible").type("cypress");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .should((adobeDataLayer) => {
        expectsEventWithContext(
          "search-response-received",
          ["pageContext", "storefrontInstanceContext", "searchResultsContext"],
          adobeDataLayer,
        );
      });
  });
});

it(
  "is sent on search results page on view/render",
  { tags: "@skipSaas" },
  () => {
    visitWithAnalyticsConsent("/search?q=cypress");
    cy.waitForResource("commerce-events-collector.js").then(() => {
      cy.window()
        .its("adobeDataLayer")
        .should((adobeDataLayer) => {
          expectsEventWithContext(
            "search-results-view",
            [
              "pageContext",
              "storefrontInstanceContext",
              "searchResultsContext",
            ],
            adobeDataLayer,
          );
        });
    });
  },
);
