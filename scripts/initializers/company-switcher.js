import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setEndpoint,
  getCatalogViewContext,
  getCatalogViewHeaderManager,
} from '@dropins/storefront-company-switcher/api.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin, getUserTokenCookie } from './index.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from '../commerce.js';

// Hold Catalog Service requests until the gated catalog view headers are applied,
// then refresh the request's headers before it sends — FetchGraphQL snapshots headers
// before beforeHooks run, so delaying alone wouldn't update a request built before the
// headers were set. B2B-only: loaded only when companies are enabled.
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

    // Initialize company switcher; points the catalog view header manager at CS_FETCH_GRAPHQL.
    // Catalog Service is intentionally excluded from groupGraphQlModules: the ACO price book
    // (AC-Price-Book-ID) already carries the customer group, so a Magento-Customer-Group header
    // would double-resolve the group and drop the group price back to regular.
    await initializers.mountImmediately(initialize, {
      fetchGraphQlModules: [CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL],
      groupGraphQlModules: [],
      catalogViewGraphQlModules: [CS_FETCH_GRAPHQL],
      catalogViewHeader: catalogViewKey,
      catalogViewDefault: csHeaders[catalogViewKey],
    });

    // Apply the context before releasing the barrier. Skip guests (dropin keeps the
    // default view). Guard on a non-null context so a transient fetch failure doesn't
    // strip an authenticated buyer to the public view, and re-check after the await in
    // case the switcher's own handler applied headers during the round-trip.
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
