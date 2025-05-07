import { expectsEventWithContext } from "../../../assertions";

const baselineContexts = (adobeDataLayer) => {
  expectsEventWithContext(null, ['pageContext', 'storefrontInstanceContext', 'eventForwardingContext', 'shopperContext'], adobeDataLayer)
};

it('has baseline contexts on homepage', { tags: ['@paas', '@saas'] }, () => {
  cy.visit('/');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});

it('has baseline contexts on PDP', { tags: ['@paas', '@saas'] }, () => {
  cy.visit('/products/frankie-sweatshirt/MH04');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});

it('has baseline contexts on cart', { tags: ['@paas', '@saas'] }, () => {
  cy.visit('/cart');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});

it('has baseline contexts on checkout', { tags: ['@paas', '@saas'] }, () => {
  cy.visit('/checkout');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});
