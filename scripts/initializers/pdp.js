// import { initializers } from '@dropins/tools/initializer.js';
// import * as PDP from '@dropins/storefront-pdp/api.js';
import { initializeDropin } from './index.js';

initializeDropin(() => {
  // initializers.register(PDP.initialize, {});
  // TODO: currently initialized at the Block
})();
