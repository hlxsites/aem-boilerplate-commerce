import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-product-discovery/api.js';
import { initializeDropin } from './index.js';
import { CS_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Inherit Fetch GraphQL Instance (Catalog Service)
  setEndpoint(CS_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/search.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    Product: {
      transformer: (data) => {
        // If images array is empty, add a default image
        if (!data.images || data.images.length === 0) {
          data.images = [{
            url: 'https://via.placeholder.com/150', // your default image
            alt: data.name,
          }];
        }
        
        return data;
      },
    },
  }

  // Initialize search
  return initializers.mountImmediately(initialize, { langDefinitions, models });
})();
