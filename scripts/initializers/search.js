/* eslint-disable import/no-unresolved */
import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setEndpoint,
  setFetchGraphQlHeaders,
} from '@dropins/storefront-search/api.js';
// eslint-disable-next-line import/no-cycle
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';
import { getHeaders, getConfigValue } from '../configs.js';

await initializeDropin(async () => {
  const labels = await fetchPlaceholders();

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  setEndpoint(await getConfigValue('commerce-endpoint'));
  setFetchGraphQlHeaders(await getHeaders('cs'));

  return initializers.mountImmediately(initialize, {
    langDefinitions,
  });
})();
