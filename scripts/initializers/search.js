import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setFetchGraphQlHeaders,
  setEndpoint,
} from '@dropins/storefront-product-discovery/api.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders, commerceEndpointWithQueryParams } from '../commerce.js';

await initializeDropin(async () => {
  setEndpoint(await commerceEndpointWithQueryParams());
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

  const labels = await fetchPlaceholders('placeholders/search.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    Product: {
      // We must extend the Product model with the new data fetched from the API in the build.mjs file.
      // The `data` object is the raw API response. The returned object will be merged into the Product model,
      // which will then be available via the `ctx` object in the `ProductActions` slot.
      transformer: (data) => {
        return {
          options: data?.options,
        }
      },
    }
  };

  return initializers.mountImmediately(initialize, { langDefinitions, models });
})();
