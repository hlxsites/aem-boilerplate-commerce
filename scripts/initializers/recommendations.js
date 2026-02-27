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

  // Extend model
  const models = {
    RecommendationUnitModel: {
      transformer: (data) => data.results.map((result) => ({
        items: result.productsView?.map((product) => ({
          // results[0].productsView[0].inStock
          inStock: product.inStock,
          // results[0].productsView[0].attributes
          attributes: product.attributes,
        })),
      })),
    },
  };

  // Initialize recommendations
  return initializers.mountImmediately(initialize, { langDefinitions, models });
})();
