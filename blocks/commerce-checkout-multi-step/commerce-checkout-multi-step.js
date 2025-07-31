// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';

// Block-level utils
import { setMetaTags } from './utils.js';

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
