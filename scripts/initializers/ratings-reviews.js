import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-ratings-reviews/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

const labels = await fetchPlaceholders('placeholders/ratings-reviews.json');

await initializeDropin(async () => {
  setEndpoint(CORE_FETCH_GRAPHQL);

  return initializers.mountImmediately(initialize, {
    langDefinitions: {
      default: { ...labels },
    },
  });
})();
