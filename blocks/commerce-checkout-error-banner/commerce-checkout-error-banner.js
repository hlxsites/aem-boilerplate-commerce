// Checkout Dropin Modules
import ErrorBanner from '@dropins/storefront-checkout/containers/ErrorBanner.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__error-banner');

  return provider.render(ErrorBanner, {})(block);
}
