// Checkout Dropin Modules
import ShippingForm from '@dropins/storefront-checkout/containers/ShippingForm.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__shipping-form');

  return provider.render(ShippingForm, {
    hideOnVirtualCart: true,
  })(block);
}
