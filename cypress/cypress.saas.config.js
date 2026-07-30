const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.base.config");
const { buildPrexPages } = require('./prexPages.config');

// A private user used with AEM Assets testing suite.
const AEM_ASSETS_PRIVATE_USER = JSON.parse(
  process.env.AEM_ASSETS_PRIVATE_USER ?? "{}",
);

module.exports = defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    graphqlEndPoint:
      process.env.CYPRESS_GRAPHQL_ENDPOINT ??
      "https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz/graphql",
    API_ENDPOINT: process.env.CYPRESS_API_ENDPOINT,
    IMS_CLIENT_ID: process.env.CYPRESS_IMS_CLIENT_ID,
    IMS_CLIENT_SECRET: process.env.CYPRESS_IMS_CLIENT_SECRET,
    IMS_ORG_ID: process.env.CYPRESS_IMS_ORG_ID,
    giftCardA:
      process.env.IS_PROD_RELEASE === "true" ? "01J2UN97NBO0" : "00419VQ5C341",
    productUrlWithOptions:
      "/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzEz",
    stateShippingId: "TX,57",
    stateBillingId: "NY,43",
    productImageName: "/adb150.jpg",
    productImageNameConfigurable: "/adb124_1.jpg",
    productWithOptionImageNameConfigurable: "/adb192_1.jpg",

    // Tenant-specific da.live draft paths — see prexPages.config.js
    // Prod releases run against a different SaaS ACCS tenant, whose rec units live
    // on the saas-prod draft pages (recIds differ from the sandbox saas pages).
    prexPages: buildPrexPages(
      process.env.IS_PROD_RELEASE === "true" ? "saas-prod" : "saas",
    ),

    aemAssetsConfig: {
      commerceConfig: {
        coreEndpoint:
          "https://na1-sandbox.api.commerce.adobe.com/QhUjcEq9dMrdCF7h8a4e5g/graphql",
        endpoint:
          "https://na1-sandbox.api.commerce.adobe.com/QhUjcEq9dMrdCF7h8a4e5g/graphql",
      },

      author: {
        programId: 'p150710',
        environmentId: 'e1553109',
        isStage: false,
      },

      credentials: {
        xPublicApiKey: '',
        magentoEnvironmentId: '',
      },

      user: {
        ...AEM_ASSETS_PRIVATE_USER,
        order: '000000001',
        returnedOrder: '000000002',
      },

      // For PREX we need a custom recommendation unit id.
      // Because AEM Assets uses a different Commerce instance
      // the hardcoded one in the default content source will not work.
      // To test PREX, we will render a custom draft page with our own recommendation unit id.
      prexDraft:
        process.env.IS_PROD_RELEASE === "true"
          ? "/drafts/tests/products/saas-prod/adb125"
          : "/drafts/tests/products/saas/adb125",
    },
  },
});
