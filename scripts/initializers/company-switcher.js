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

// Gated catalog views are a B2B-only concern, so the barrier that guards them
// lives here in the company switcher initializer, which is imported only when
// companies are enabled. The gated catalog view headers (AC-View-Id /
// AC-Catalog-View-Access-Token) are resolved asynchronously, but PDP/PLP/search/
// recommendations fire their own Catalog Service requests as soon as they mount
// and can race ahead, intermittently omitting the headers. This beforeHook holds
// every Catalog Service request until the context has been resolved and applied.
// The context query uses the dropin's own fetch client, not CS_FETCH_GRAPHQL, so
// this cannot deadlock that request. Non-B2B storefronts never load this module,
// so nothing changes for them.
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

    // Initialize company switcher. This configures the catalog view header
    // manager to target CS_FETCH_GRAPHQL.
    await initializers.mountImmediately(initialize, {
      fetchGraphQlModules: [CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL],
      groupGraphQlModules: [CS_FETCH_GRAPHQL],
      catalogViewGraphQlModules: [CS_FETCH_GRAPHQL],
      catalogViewHeader: catalogViewKey,
      catalogViewDefault: csHeaders[catalogViewKey],
    });

    // Resolve the catalog view context in this awaited init and apply the headers
    // before releasing the barrier, so Catalog Service consumers never race it.
    // Skip when there is no user token (guest) — removeCatalogViewHeaders in the
    // dropin already applies the default public view. Skip too if the switcher's
    // own 'authenticated' handler already won and applied the headers.
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
