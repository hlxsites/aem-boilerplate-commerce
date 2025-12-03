const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.base.config');

module.exports = defineConfig({
  ...baseConfig,
  // Disable retries for faster local iteration
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    ...baseConfig.e2e,
    specPattern: 'src/tests/b2b/**/*.spec.js',
  },
  env: {
    ...baseConfig.env,
    graphqlEndPoint: 'http://mage2.local/graphql',
    API_ENDPOINT: 'http://mage2.local',
    LOCAL_INTEGRATION_TOKEN: '7h5dmcddkjf0uiaawwapc2oot8jqjj2c',
    giftCardA: '00GO12SK6WF3',
    productUrlWithOptions:
      '/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzI3OS8zOQ%3D%3D',
    stateShippingId: 'TX,171',
    stateBillingId: 'NY,129',
    productImageName: '/ADB150.jpg',
    productImageNameConfigurable: '/adb124.jpg',
    productWithOptionImageNameConfigurable: '/adb192.jpg',
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

