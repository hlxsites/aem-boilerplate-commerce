const { defineConfig } = require('cypress')
const baseConfig = require('./cypress.base.config')

const SAAS_AEM_ASSETS_CONFIG = JSON.parse(process.env.SAAS_AEM_ASSETS_CONFIG);

module.exports = defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    graphqlEndPoint: 'https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz/graphql',
    giftCardA: '00419VQ5C341',
    productUrlWithOptions: '/products/cypress-configurable-product-latest/CYPRESS456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzEz',
    stateShippingId: 'TX,57',
    stateBillingId: 'NY,43',
    productImageName: '/adb150.jpg',
    productImageNameConfigurable: '/adb124_1.jpg',

    aemAssetsConfig: {
      ...SAAS_AEM_ASSETS_CONFIG,
      user: {
        ...SAAS_AEM_ASSETS_CONFIG.user,

        order: "000000006",
        returnedOrder: "000000004",
      }
    }
  },
});
