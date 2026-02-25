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
      transformer: (data) => {
        data.results.forEach(result => {
          if (!result.images || result.images.length === 0) {
            result.images = [{
              url: 'https://via.placeholder.com/150', // your default image
              alt: result.name,
            }];
          }
        });
        
        return data;
      },
    },
  };

  // Initialize recommendations
  return initializers.mountImmediately(initialize, { langDefinitions, models });
})();
