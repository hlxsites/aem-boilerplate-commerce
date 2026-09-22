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
// so PDP/PLP/search don't race ahead and send requests without them. B2B-only:
// this module loads only when companies are enabled.
let resolveCatalogViewReady;
const catalogViewReady = new Promise((resolve) => { resolveCatalogViewReady = resolve; });
CS_FETCH_GRAPHQL.addBeforeHook(async (request) => {
  await catalogViewReady;
  return request;
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
    await initializers.mountImmediately(initialize, {
      fetchGraphQlModules: [CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL],
      groupGraphQlModules: [CS_FETCH_GRAPHQL],
      catalogViewGraphQlModules: [CS_FETCH_GRAPHQL],
      catalogViewHeader: catalogViewKey,
      catalogViewDefault: csHeaders[catalogViewKey],
    });

    // Apply the context before releasing the barrier. Skip guests (dropin keeps the
    // default view) and skip if the switcher's own handler already applied it.
    const headerManager = getCatalogViewHeaderManager();
    if (getUserTokenCookie() && !headerManager.isCatalogViewHeaderSet()) {
      headerManager.setCatalogViewHeaders(await getCatalogViewContext());
    }
  } catch (error) {
    console.debug('Unable to resolve catalog view context:', error);
  } finally {
    // Always release the barrier so Catalog Service requests never hang.
    resolveCatalogViewReady();
  }
})();
