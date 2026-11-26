import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { initializers } from '@dropins/tools/initializer.js';

import {
  initialize,
  setEndpoint,
} from '@dropins/storefront-requisition-list/api.js';
import { createRequisitionListAdapters } from '../requisition-list-adapters.js';
import { initializeDropin } from './index.js';
import {
  CORE_FETCH_GRAPHQL,
  CS_FETCH_GRAPHQL,
  fetchPlaceholders,
} from '../commerce.js';

export const {
  getProductData,
  enrichConfigurableProducts,
} = createRequisitionListAdapters(pdpApi);

/**
 * Registers the requisition list drop-in: sets GraphQL endpoint (Core), placeholders,
 * and mounts with getProductData and enrichConfigurableProducts for list/view blocks.
 */
await initializeDropin(async () => {
  pdpApi.setEndpoint(CS_FETCH_GRAPHQL);
  setEndpoint(CORE_FETCH_GRAPHQL);

  const labels = await fetchPlaceholders('placeholders/requisition-list.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const initConfig = {
    langDefinitions,
    getProductData,
    enrichConfigurableProducts,
  };

  await initializers.mountImmediately(initialize, initConfig);
})();
