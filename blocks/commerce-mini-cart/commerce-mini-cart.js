import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { events } from '@dropins/tools/event-bus.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig, fetchPlaceholders } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
  } = readBlockConfig(block);

  // Get translations for custom messages
  const placeholders = await fetchPlaceholders();

  const MESSAGES = {
    ADDED: placeholders?.Cart?.MiniCart?.Message?.added,
    UPDATED: placeholders?.Cart?.MiniCart?.Message?.updated,
  };

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
  overlay.className = 'commerce-mini-cart__overlay';

  // Create message container
  const messageContainer = document.createElement('div');
  messageContainer.className = 'commerce-mini-cart__message';

  overlay.appendChild(messageContainer);
  block.appendChild(overlay);

  const showMessage = (message) => {
    messageContainer.textContent = message;
    overlay.classList.add('commerce-mini-cart__overlay--visible');
    setTimeout(() => {
      overlay.classList.remove('commerce-mini-cart__overlay--visible');
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
