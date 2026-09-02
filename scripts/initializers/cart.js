import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-cart/api.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

// Instances without the Magento_SalesRuleFreeGiftGraphQl backend module must not
// enable this, so it's opt-in per site via the commerce-free-gifts-enabled config key.
function isFreeGiftsEnabled() {
  const value = getConfigValue('commerce-free-gifts-enabled');
  return value === true || (typeof value === 'string' && value.toLowerCase() === 'true');
}

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/cart.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize cart
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    features: {
      isFreeGiftsCartPriceRulesEnabled: isFreeGiftsEnabled(),
    },
  });
})();
