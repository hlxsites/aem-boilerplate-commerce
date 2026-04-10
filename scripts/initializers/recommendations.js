import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-recommendations/api.js';
import { initializeDropin } from './index.js';
import { CS_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Inherit Fetch GraphQL Instance (Catalog Service)
  setEndpoint(CS_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/recommendations.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    RecommendationUnitModel: {
      transformer: (response) => {
        const results = response?.results ?? [];
        return results.map((unit) => ({
          items: (unit.productsView ?? []).map((product) => ({
            // Removable when @dropins/storefront-recommendations exposes inStock natively
            inStock: product.inStock ?? false,
          })),
        }));
      },
    },
  };

  // Initialize recommendations
  return initializers.mountImmediately(initialize, { langDefinitions, models });
})();
