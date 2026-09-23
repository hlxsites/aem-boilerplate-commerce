import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-company-switcher/api.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Resolve the actual-cased catalog view header key from the CS config, since
  // config.json may seed it with different casing (e.g. 'AC-View-Id').
  const csHeaders = getHeaders('cs');
  const catalogViewIdKey = 'ac-view-id';
  const catalogViewKey = Object.keys(csHeaders).find(
    (key) => key.toLowerCase() === catalogViewIdKey,
  ) || catalogViewIdKey;

  // Initialize company switcher
  return initializers.mountImmediately(initialize, {
    fetchGraphQlModules: [CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL],
    groupGraphQlModules: [CS_FETCH_GRAPHQL],
    catalogViewGraphQlModules: [CS_FETCH_GRAPHQL],
    catalogViewHeader: catalogViewKey,
    catalogViewDefault: csHeaders[catalogViewKey],
  });
})();
