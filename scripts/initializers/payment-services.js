import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initialize } from '@dropins/storefront-payment-services/api.js';
import { initializeDropin, getUserTokenCookie } from './index.js';

await initializeDropin(async () => {
  return initializers.mountImmediately(initialize, {
    apiUrl: getConfigValue('commerce-core-endpoint') || getConfigValue('commerce-endpoint'),
    getCustomerToken: getUserTokenCookie,
  });
})();
