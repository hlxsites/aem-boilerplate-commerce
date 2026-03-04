import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-wishlist/api.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Catalog Service)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/wishlist.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const storeCode = getConfigValue('headers.cs.Magento-Store-View-Code');

  // Initialize wishlist
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    isGuestWishlistEnabled: true,
    storeCode,
  });
})();
