import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-auth/api.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin, isStaticPriceBookEnabled } from './index.js';
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
  // Skip the Adobe Commerce Optimizer tenant lookup when a static price book is
  // configured: catalog-service-only endpoints don't have a provisioned ACO
  // tenant, so that lookup would fail and strip the static AC-Price-Book-ID header.
  const adobeCommerceOptimizer = !isStaticPriceBookEnabled() && getConfigValue('adobe-commerce-optimizer');
  return initializers.mountImmediately(initialize, { langDefinitions, adobeCommerceOptimizer });
})();
