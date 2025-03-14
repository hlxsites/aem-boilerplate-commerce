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
  overlay.className = 'cart-overlay';
  overlay.style.cssText = `
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    position: absolute;
    inset: 0;
    z-index: 1000;
    border-radius: 5px;
  `;

  // Create message container
  const messageContainer = document.createElement('div');
  messageContainer.className = 'cart-message';
  messageContainer.style.cssText = `
    background-color: #EFF5EF;
    border-radius: 5px;
    padding: 16px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.4rem;
    line-height: 2rem;
    letter-spacing: 0.04em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    text-align: center;
  `;

  overlay.appendChild(messageContainer);
  block.appendChild(overlay);

  const showMessage = (message) => {
    messageContainer.textContent = message;
    overlay.style.display = 'block';
    setTimeout(() => {
      overlay.style.display = 'none';
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
