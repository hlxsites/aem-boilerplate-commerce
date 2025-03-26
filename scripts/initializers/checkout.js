import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';
import { getHeaders } from '../configs.js';

await initializeDropin(async () => {
  const headers = await getHeaders('checkout');
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...headers }));

  const labels = await fetchPlaceholders();
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
