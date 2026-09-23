import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setEndpoint,
  getCatalogViewContext,
  getCatalogViewHeaderManager,
} from '@dropins/storefront-company-switcher/api.js';
import { getConfigValue, getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin, getUserTokenCookie } from './index.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from '../commerce.js';

// Hold Catalog Service requests until the catalog view headers are applied, and re-apply
// them per request — FetchGraphQL snapshots headers before beforeHooks run.
let resolveCatalogViewReady;
const catalogViewReady = new Promise((resolve) => { resolveCatalogViewReady = resolve; });
CS_FETCH_GRAPHQL.addBeforeHook(async (request) => {
  await catalogViewReady;
  const { fetchGraphQlHeaders } = CS_FETCH_GRAPHQL.getConfig();
  return { ...request, headers: { ...request.headers, ...fetchGraphQlHeaders } };
});

await initializeDropin(async () => {
  try {
    // Set Fetch GraphQL (Core)
    setEndpoint(CORE_FETCH_GRAPHQL);

    // Resolve the actual-cased catalog view header key from the CS config, since
    // config.json may seed it with different casing (e.g. 'AC-View-Id').
    const csHeaders = getHeaders('cs');
    const catalogViewIdKey = 'ac-view-id';
    const catalogViewKey = Object.keys(csHeaders).find(
      (key) => key.toLowerCase() === catalogViewIdKey,
    ) || catalogViewIdKey;

    // In ACO mode AC-Price-Book-ID already encodes the customer group, so also sending
    // Magento-Customer-Group double-resolves it and drops the group price to regular.
    const acoMode = getConfigValue('adobe-commerce-optimizer') === true;
    await initializers.mountImmediately(initialize, {
      fetchGraphQlModules: [CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL],
      groupGraphQlModules: acoMode ? [] : [CS_FETCH_GRAPHQL],
      catalogViewGraphQlModules: [CS_FETCH_GRAPHQL],
      catalogViewHeader: catalogViewKey,
      catalogViewDefault: csHeaders[catalogViewKey],
    });

    // Apply the context before releasing the barrier; skip guests, and guard on a non-null
    // context so a transient failure doesn't strip an authed buyer to the public view.
    const headerManager = getCatalogViewHeaderManager();
    if (getUserTokenCookie() && !headerManager.isCatalogViewHeaderSet()) {
      const context = await getCatalogViewContext();
      if (context && !headerManager.isCatalogViewHeaderSet()) {
        headerManager.setCatalogViewHeaders(context);
      }
    }
  } catch (error) {
    console.error('Unable to resolve catalog view context:', error);
  } finally {
    // Always release the barrier so Catalog Service requests never hang.
    resolveCatalogViewReady();
  }
})();
