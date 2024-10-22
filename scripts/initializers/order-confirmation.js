import { initializers } from '@dropins/tools/initializer.js';
import * as OrderConfirmation from '@dropins/storefront-order-confirmation/api.js';
import { initializeDropin } from './index.js';

initializeDropin(() => {
  initializers.register(OrderConfirmation.initialize, {});

  // eslint-disable-next-line no-console
  console.log('🟢 Order Confirmation Dropin Initialized');
})();
