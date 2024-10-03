// Cart Dropin Modules
import * as cartApi from '@dropins/storefront-cart/api.js';

// Checkout Dropin Modules
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__shipping-methods');

  return provider.render(ShippingMethods, {
    hideOnVirtualCart: true,
    // onShippingMethodSelect: (shippingMethod) => {},
    onCheckoutDataUpdate: () => {
      cartApi.refreshCart().catch(console.error);
    },
  })(block);
}
