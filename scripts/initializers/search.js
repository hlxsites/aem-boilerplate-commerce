/* eslint-disable import/no-unresolved */
import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
} from '@dropins/storefront-search/api.js';
// eslint-disable-next-line import/no-cycle
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';

await initializeDropin(async () => {
  const labels = await fetchPlaceholders();

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, {
    langDefinitions,
  });
})();
