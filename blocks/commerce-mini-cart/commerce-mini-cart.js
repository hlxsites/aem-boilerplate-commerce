import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { events } from '@dropins/tools/event-bus.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';

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
  updateMessage.style.color = '#2ecc71';
  updateMessage.textContent = 'Cart updated';

  // Add event listener for cart updates
  events.on(
    'cart/updated',
    () => {
      updateMessage.style.display = 'block';
      setTimeout(() => {
        updateMessage.style.display = 'none';
      }, 3000);
    },
    { eager: true },
  );

  block.innerHTML = '';

  // Render MiniCart first
  await provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    routeCart: cartURL ? () => rootLink(cartURL) : undefined,
    routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
    routeProduct: (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
    // slots: {
    //   PreCheckoutSection: (ctx) => {
    //     ctx.appendChild(updateMessage);
    //   },
    // },
  })(block);

  // Find the header and add the message div after it
  const header = block.querySelector('.cart-cart-summary-list__heading-text');
  if (header) {
    header.parentNode.insertBefore(updateMessage, header.nextSibling);
  } else {
    console.info('Header not found, appending message to block');
    block.appendChild(updateMessage);
  }

  return block;
}
