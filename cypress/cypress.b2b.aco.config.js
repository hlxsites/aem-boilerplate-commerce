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
  },
});
