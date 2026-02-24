import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize as initializePdp,
  setEndpoint as setPdpEndpoint,
} from '@dropins/storefront-pdp/api.js';
import {
  initialize as initializeSearch,
  setEndpoint as setSearchEndpoint,
} from '@dropins/storefront-product-discovery/api.js';
import {
  initialize as initializeQuickOrder,
  setEndpoint as setQuickOrderEndpoint,
} from '../__dropins__/storefront-quick-order/api.js';
import { initializeDropin } from './index.js';
import {
  CORE_FETCH_GRAPHQL,
  CS_FETCH_GRAPHQL,
  fetchPlaceholders,
} from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL for Quick Order (Core Service)
  setQuickOrderEndpoint(CORE_FETCH_GRAPHQL);

  // Set Fetch GraphQL for Search (Catalog Service) - used by QuickOrderItems
  setSearchEndpoint(CS_FETCH_GRAPHQL);

  // Set Fetch GraphQL for PDP (Catalog Service) - used by QuickOrderItems
  setPdpEndpoint(CS_FETCH_GRAPHQL);

  // Fetch placeholders
  const [searchLabels, pdpLabels] = await Promise.all([
    fetchPlaceholders('placeholders/search.json'),
    fetchPlaceholders('placeholders/pdp.json'),
  ]);

  const searchLangDefinitions = {
    default: {
      ...searchLabels,
    },
  };

  const pdpLangDefinitions = {
    default: {
      ...pdpLabels,
    },
  };

  const quickOrderLangDefinitions = {
    default: {
      // ...labels,
    },
  };

  // Initialize Search for quick order context
  await initializers.mountImmediately(initializeSearch, {
    langDefinitions: searchLangDefinitions,
  });

  // Initialize PDP for quick order context
  await initializers.mountImmediately(initializePdp, {
    langDefinitions: pdpLangDefinitions,
  });

  // Initialize quick order
  return initializers.mountImmediately(initializeQuickOrder, {
    langDefinitions: quickOrderLangDefinitions,
  });
})();
