const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.base.config');
const { buildPrexPages } = require('./prexPages.config');

const AEM_ASSETS_PRIVATE_USER = JSON.parse(
  process.env.AEM_ASSETS_PRIVATE_USER ?? '{}',
);

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    supportFile: 'src/support/index.aco.js',
  },
  env: {
    ...baseConfig.env,
    graphqlEndPoint:
      'https://integration2-hohc4oi-t35oyq7dhw7ti.us-3.magentosite.cloud/graphql',
    graphqlCatalogEndPoint:
      'https://na1.api.commerce.adobe.com/WbqPAxMhK9b37TKrp8htRx/graphql',
    giftCardA: '02R7NXP5HJI5',
    productUrlWithOptions:
      '/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzIzMA==',
    stateShippingId: 'TX,57',
    stateBillingId: 'NY,43',
    productImageName: 'ADB150_1.jpg',
    productImageNameConfigurable: 'adb124.jpg',
    productWithOptionImageNameConfigurable: 'adb192.jpg',

    prexPages: buildPrexPages('aco'),

    aemAssetsConfig: {
      commerceConfig: {
        endpoint: 'https://na1.api.commerce.adobe.com/WbqPAxMhK9b37TKrp8htRx/graphql',
        coreEndpoint:
          'https://integration2-hohc4oi-t35oyq7dhw7ti.us-3.magentosite.cloud/graphql',
      },
      author: {
        programId: '',
        environmentId: '',
        isStage: false,
      },
      credentials: {
        xPublicApiKey: '',
        magentoEnvironmentId: '',
      },
      user: {
        ...AEM_ASSETS_PRIVATE_USER,
        order: '',
        returnedOrder: '',
      },
      prexDraft: '/drafts/decepticons/products/aco/adb125',
    },
  },
});
