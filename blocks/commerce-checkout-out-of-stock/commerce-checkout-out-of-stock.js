// Cart Dropin Modules
import * as cartApi from '@dropins/storefront-cart/api.js';

// Checkout Dropin Modules
import OutOfStock from '@dropins/storefront-checkout/containers/OutOfStock.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__out-of-stock');

  return provider.render(OutOfStock, {
    routeCart: () => '/cart',
    onCartProductsUpdate: (items) => {
      cartApi.updateProductsFromCart(items).catch(console.error);
    },
  })(block);
}
