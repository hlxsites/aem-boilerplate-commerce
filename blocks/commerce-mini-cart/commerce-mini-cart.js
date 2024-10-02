import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
    'show-discount': showDiscount = 'false',
    'show-savings': showSavings = 'false',
  } = readBlockConfig(block);

  block.innerHTML = '';

  return provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => startShoppingURL : undefined,
    routeCart: cartURL ? () => cartURL : undefined,
    routeCheckout: checkoutURL ? () => checkoutURL : undefined,
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    showDiscount: showDiscount === 'true',
    showSavings: showSavings === 'true',
  })(block);
}
