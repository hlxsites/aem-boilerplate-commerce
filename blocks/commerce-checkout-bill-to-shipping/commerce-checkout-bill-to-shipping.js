// Checkout Dropin Modules
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__bill-to-shipping-address');

  return provider.render(BillToShippingAddress, {
    hideOnVirtualCart: true,
  })(block);
}
