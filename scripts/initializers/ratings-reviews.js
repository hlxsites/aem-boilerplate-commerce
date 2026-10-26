import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-ratings-reviews/api.js';
import { initializeDropin } from './index.js';
import { CS_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

export const labels = await fetchPlaceholders('placeholders/ratings-reviews.json');

await initializeDropin(async () => {
  setEndpoint(CS_FETCH_GRAPHQL);

  return initializers.mountImmediately(initialize, {
    langDefinitions: {
      default: { ...labels },
    },
  });
})();
