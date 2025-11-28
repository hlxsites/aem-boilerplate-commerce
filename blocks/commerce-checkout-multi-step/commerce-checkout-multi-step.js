/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';

import { setMetaTags } from '@dropins/storefront-checkout/lib/utils.js';

// Fragments
import {
  createCheckoutFragment,
} from './fragments.js';
import createStepsManager from './steps.js';

export default async function decorate(block) {
  setMetaTags('Checkout');
  document.title = 'Checkout';

  block.replaceChildren(createCheckoutFragment());

  const stepsManager = createStepsManager(block);
  await stepsManager.init();
}
