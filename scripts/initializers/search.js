/* eslint-disable import/no-unresolved */
import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setEndpoint,
} from '@dropins/storefront-search/api.js';
// eslint-disable-next-line import/no-cycle
import { initializeDropin } from './index.js';
import { getConfigValue } from '../configs.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  const labels = await fetchPlaceholders();

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  setEndpoint(await getConfigValue('commerce-endpoint'));

  return initializers.mountImmediately(initialize, {
    langDefinitions,
  });
})();
