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

  // Create a container for the update message
  const updateMessage = document.createElement('div');
  updateMessage.className = 'cart-update-message';
  updateMessage.style.display = 'none';
  updateMessage.style.fontSize = '1.4rem';
  updateMessage.style.lineHeight = '2rem';
  updateMessage.style.letterSpacing = '0.04em';

  // Create shadow wrapper
  const shadowWrapper = document.createElement('div');
  shadowWrapper.style.backgroundColor = '#EFF5EF';
  shadowWrapper.style.borderRadius = '5px';
  shadowWrapper.style.padding = '8px';
  shadowWrapper.style.display = 'none';
  shadowWrapper.appendChild(updateMessage);

  const showMessage = (message) => {
    updateMessage.textContent = message;
    updateMessage.style.display = 'block';
    shadowWrapper.style.display = 'block';
    setTimeout(() => {
      updateMessage.style.display = 'none';
      shadowWrapper.style.display = 'none';
    }, 3000);
  };

  // Add event listeners for cart updates
  events.on('cart/product/added', () => showMessage(MESSAGES.ADDED), {
    eager: true,
  });
  events.on('cart/product/updated', () => showMessage(MESSAGES.UPDATED), {
    eager: true,
  });

  block.innerHTML = '';

  // Render MiniCart first
  await provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    routeCart: cartURL ? () => rootLink(cartURL) : undefined,
    routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
    routeProduct: (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
  })(block);

  // Find the header and add the message div after it
  const header = block.querySelector('.cart-cart-summary-list__heading-text');
  if (header) {
    header.parentNode.insertBefore(shadowWrapper, header.nextSibling);
  } else {
    console.info('Header not found, appending message to block');
    block.appendChild(shadowWrapper);
  }

  return block;
}
