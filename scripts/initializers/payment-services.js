import { initializers } from '@dropins/tools/initializer.js';
import * as paymentServicesApi from '@dropins/storefront-payment-services/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // TODO(jortola): Once approved, copy payment-services.json file in Document Authoring to
  //            ... /placeholders/payment-services.json update path below accordingly.
  const labels = await fetchPlaceholders('drafts/jortola/placeholders/payment-services.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(paymentServicesApi.initialize, {
    langDefinitions,
  });
})();
