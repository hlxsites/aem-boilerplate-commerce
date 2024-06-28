/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

// Dropin Providers
import { render as provider } from '@dropins/storefront-cart/render.js';

// Dropin Containers
import Cart from '@dropins/storefront-cart/containers/Cart.js';

export default async function decorate(block) {
  // Initialize Dropins – already initialized in scripts/dropins.js

  // Render Containers
  return provider.render(Cart, {
    routeEmptyCartCTA: () => '/',
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    routeCheckout: () => '/checkout',
  })(block);
}
