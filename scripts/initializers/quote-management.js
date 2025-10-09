import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-quote-management/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders((prev) => ({ ...prev }));

  const labels = await fetchPlaceholders('placeholders/cart.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Get the quote id from the url
  const quoteId = new URLSearchParams(window.location.search).get('quoteid');

  const config = {
      quoteId,
  };

  return initializers.mountImmediately(initialize, { langDefinitions, ...config });
})();