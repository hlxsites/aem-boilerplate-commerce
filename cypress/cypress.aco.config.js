const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.base.config');
const { buildPrexPages } = require('./prexPages.config');

// A private user used with AEM Assets testing suite.
const AEM_ASSETS_PRIVATE_USER = JSON.parse(
  process.env.AEM_ASSETS_PRIVATE_USER ?? '{}'
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
      'https://mcstaging.t35oyq7dhw7ti.dummycachetest.com/graphql',
    graphqlCatalogEndPoint: 'https://na1.api.commerce.adobe.com/WbqPAxMhK9b37TKrp8htRx/graphql',
    // ACO Catalog Service credentials for mcstaging
    catalogApiKey: '4dfa19c9fe6f4cccade55cc5b3da94f7',
    catalogEnvironmentId: 'f38a0de0-764b-41fa-bd2c-5bc2f3c7b39a',
    giftCardA: '02R7NXP5HJI5',
    productUrlWithOptions:
      '/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzIzMA==',
    stateShippingId: 'TX,57',
    stateBillingId: 'NY,43',
    productImageName: 'ADB150_1.jpg',
    productImageNameConfigurable: 'adb124.jpg',
    productWithOptionImageNameConfigurable: 'adb192.jpg',

    // Tenant-specific da.live draft paths — see prexPages.config.js
    prexPages: buildPrexPages('aco'),

    aemAssetsConfig: {
      commerceConfig: {
        endpoint: 'https://na1.api.commerce.adobe.com/WbqPAxMhK9b37TKrp8htRx/graphql',
        coreEndpoint:
          'https://mcstaging.t35oyq7dhw7ti.dummycachetest.com/graphql',
      },
      author: {
        programId: '', // TODO: AEM Assets program ID if configured
        environmentId: '', // TODO: AEM Assets environment ID
        isStage: false,
      },
      credentials: {
        xPublicApiKey: '',
        magentoEnvironmentId: '',
      },
      user: {
        ...AEM_ASSETS_PRIVATE_USER,
        order: '', // TODO: add a completed test order number
        returnedOrder: '', // TODO: add a returned test order number
      },
      prexDraft: '/drafts/tests/products/aco/adb125',
    },
  },
});
