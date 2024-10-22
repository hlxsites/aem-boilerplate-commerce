import { initializers } from '@dropins/tools/initializer.js';
import * as Account from '@dropins/storefront-account/api.js';
import { initializeDropin } from './index.js';

initializeDropin(() => {
  initializers.register(Account.initialize, {});

  // eslint-disable-next-line no-console
  console.log('🟢 Account Dropin Initialized');
})();
