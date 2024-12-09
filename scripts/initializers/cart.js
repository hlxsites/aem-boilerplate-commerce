/* eslint-disable import/no-cycle */
import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-cart/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';

await initializeDropin(async () => {
  // Experiment (Challenger 1)
  const isVariantPlaceholder = document.body.classList.contains('experiment-cart001') && document.body.classList.contains('variant-challenger-1');

  const labels = await fetchPlaceholders(isVariantPlaceholder ? '/drafts/marketer' : undefined);

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
