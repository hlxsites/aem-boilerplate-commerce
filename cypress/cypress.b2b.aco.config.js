const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.base.config');

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    specPattern: 'src/tests/b2b/**/*.spec.js',
    supportFile: 'src/support/index.aco.js',
  },
  env: {
    ...baseConfig.env,
    graphqlEndPoint:
      'https://mcstaging.t35oyq7dhw7ti.dummycachetest.com/graphql',
    graphqlCatalogEndPoint: 'https://na1.api.commerce.adobe.com/WbqPAxMhK9b37TKrp8htRx/graphql',
    giftCardA: '02R7NXP5HJI5',
    productUrlWithOptions:
      '/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzY3',
    stateShippingId: 'TX,57',
    stateBillingId: 'NY,43',
    productImageName: 'ADB150_1.jpg',
    productImageNameConfigurable: 'ADB124_1_1.jpg',
    productWithOptionImageNameConfigurable: 'ADB124_1_1.jpg',
    // Purchase Orders URLs
    poUrls: {
      login: '/customer/login',
      account: '/customer/account',
      product: '/products/women-s-script-crewneck/adb374',
      cheapProduct: '/products/ben-at-adobe-pin/adb346',
      checkout: '/checkout',
      purchaseOrders: '/customer/purchase-orders',
      approvalRules: '/customer/approval-rules',
    },
    // Address Book (B2B) URLs — see cypress.b2b.saas.config.js for notes on
    // the unconfirmed dedicated address-book route.
    addressBookUrls: {
      login: '/customer/login',
      account: '/customer/account',
      companyProfile: '/customer/company',
      // Both the standard "Addresses" and the B2B "Company Addresses" nav items
      // point here; which dataset the page shows follows the customer's
      // permissions, so the suite navigates straight to it instead of relying on
      // a nav item that is not authored in every content source.
      addresses: '/customer/address',
    },
  },
});
