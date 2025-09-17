import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-purchase-order/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // TODO - After getting access to DA - create proper headers config - purchase-order
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('checkout') }));

  // TODO - After getting access to DA - create proper placeholder config - purchase-order.json
  const labels = await fetchPlaceholders('placeholders/checkout.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
