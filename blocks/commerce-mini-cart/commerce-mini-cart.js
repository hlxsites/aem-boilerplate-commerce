import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { events } from '@dropins/tools/event-bus.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';

const MESSAGES = {
  ADDED: 'Product(s) added to your cart',
  UPDATED: 'Your cart has been updated',
};

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
  } = readBlockConfig(block);

  block.innerHTML = '';

  // Render MiniCart first
  await provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    routeCart: cartURL ? () => rootLink(cartURL) : undefined,
    routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
    routeProduct: (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
  })(block);

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'cart-mini-cart__overlay';

  // Create message container
  const messageContainer = document.createElement('div');
  messageContainer.className = 'cart-mini-cart__message';

  overlay.appendChild(messageContainer);
  block.appendChild(overlay);

  const showMessage = (message) => {
    messageContainer.textContent = message;
    overlay.classList.add('cart-mini-cart__overlay--visible');
    setTimeout(() => {
      overlay.classList.remove('cart-mini-cart__overlay--visible');
    }, 3000);
  };

  // Add event listeners for cart updates
  events.on('cart/product/added', () => showMessage(MESSAGES.ADDED), {
    eager: true,
  });
  events.on('cart/product/updated', () => showMessage(MESSAGES.UPDATED), {
    eager: true,
  });

  return block;
}
