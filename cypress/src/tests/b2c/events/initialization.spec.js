import { expectsEventWithContext } from "../../../assertions";
import { products } from "../../../fixtures";
import { enableAnalyticsConsent, visitWithAnalyticsConsent, waitForAnalyticsConsent } from "./consentTestSupport";

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

it("preserves opt-in and existing queries across full navigation and reload", () => {
  cy.intercept('https://commerce.adobedc.net/collector/**', { statusCode: 200, body: '' });
  visitWithAnalyticsConsent('/search?q=cypress', { qs: { navigation: 'retained' } });
  cy.location('search').should((search) => {
    const params = new URLSearchParams(search);
    expect(params.get('q')).to.equal('cypress');
    expect(params.get('navigation')).to.equal('retained');
    expect(params.get('consent')).to.equal('accept');
  });
  cy.get('header a[href="/"]').first().click();
  waitForAnalyticsConsent();
  cy.location('pathname').should('equal', '/');
  cy.location('search').should('include', 'consent=accept');
  const productUrl = Cypress.env('productUrlWithOptions');
  const optionsUIDs = new URL(productUrl, Cypress.config('baseUrl')).searchParams.get('optionsUIDs');
  visitWithAnalyticsConsent(productUrl);
  cy.reload();
  waitForAnalyticsConsent();
  cy.location('search').should((search) => {
    const params = new URLSearchParams(search);
    expect(params.get('optionsUIDs')).to.equal(optionsUIDs);
    expect(params.get('consent')).to.equal('accept');
  });
});
