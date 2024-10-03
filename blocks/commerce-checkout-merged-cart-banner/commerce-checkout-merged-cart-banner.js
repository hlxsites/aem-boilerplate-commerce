// Checkout Dropin Modules
import MergedCartBanner from '@dropins/storefront-checkout/containers/MergedCartBanner.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__merged-cart-banner');

  return provider.render(MergedCartBanner, {})(block);
}
