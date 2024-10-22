import { initializers } from '@dropins/tools/initializer.js';
import * as cart from '@dropins/storefront-cart/api.js';
import { initializeDropin } from './index.js';

initializeDropin(() => {
  initializers.register(cart.initialize, {});

  // eslint-disable-next-line no-console
  console.log('🟢 Cart Dropin Initialized');
})();
