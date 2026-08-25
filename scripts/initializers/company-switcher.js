import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-company-switcher/api.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Initialize company switcher
  return initializers.mountImmediately(initialize, {
    fetchGraphQlModules: [CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL],
    groupGraphQlModules: [CS_FETCH_GRAPHQL],
    catalogViewGraphQlModules: [CS_FETCH_GRAPHQL],
    catalogViewHeader: 'ac-view-id',
    catalogViewDefault: getHeaders('cs')['ac-view-id'],
  });
})();
