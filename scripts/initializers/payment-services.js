import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initialize } from '@dropins/storefront-payment-services/api.js';
import { initializeDropin, getUserTokenCookie } from './index.js';

await initializeDropin(async () => {
  const coreEndpoint = await getConfigValue('commerce-core-endpoint');

  return initializers.mountImmediately(initialize, {
    apiUrl: coreEndpoint,
    getCustomerToken: getUserTokenCookie,
  });
})();
