import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-payment-services/api.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => {
  // Initialize payment services with minimal configuration
  return initializers.mountImmediately(initialize, {});
})();