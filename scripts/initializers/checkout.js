import { initializers } from '@dropins/tools/initializer.js';
import * as Checkout from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';

initializeDropin(async () => {
  await initializers.mountImmediately(Checkout.initialize, {});

  // eslint-disable-next-line no-console
  console.log('🟢 Checkout Dropin Initialized');
})();
