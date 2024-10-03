// Checkout Dropin Modules
import BillingForm from '@dropins/storefront-checkout/containers/BillingForm.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__billing-form');

  return provider.render(BillingForm, {})(block);
}
