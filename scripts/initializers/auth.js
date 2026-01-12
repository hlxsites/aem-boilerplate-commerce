import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-auth/api.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/auth.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize auth
  return initializers.mountImmediately(initialize, { langDefinitions, adobeCommerceOptimizer: getConfigValue('adobe-commerce-optimizer') });
})();
