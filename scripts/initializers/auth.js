/* eslint-disable import/no-cycle */
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-auth/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';
import { getHeaders } from '../configs.js';

await initializeDropin(async () => {
  const headers = await getHeaders('auth');
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...headers }));

  const labels = await fetchPlaceholders();
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
