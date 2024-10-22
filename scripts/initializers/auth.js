/* eslint-disable import/no-cycle */
import { initializers } from '@dropins/tools/initializer.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { initializeDropin } from './index.js';

initializeDropin(() => {
  initializers.register(authApi.initialize, {});

  // eslint-disable-next-line no-console
  console.log('🟢 Auth Dropin Initialized');
})();
