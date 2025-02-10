import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
  } = readBlockConfig(block);

  block.innerHTML = '';

  return provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => startShoppingURL : undefined,
    routeCart: cartURL ? () => cartURL : undefined,
    routeCheckout: checkoutURL ? () => checkoutURL : undefined,
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.topLevelSku}`,
    slots: {
      ProductListFooter: (ctx) => {
        const productListFooter = document.createElement('div');

        // Create a wrapper div for the shadow background
        const shadowWrapper = document.createElement('div');
        shadowWrapper.style.backgroundColor = '#EFF5EF';
        shadowWrapper.style.borderRadius = '5px';

        // Create the content div
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = "<p style='line-height: 1.5;'>Enjoy hassle-free shopping with our 30-day return policy!</p>";
        contentDiv.style.display = 'flex';
        contentDiv.style.flexDirection = 'column';
        contentDiv.style.padding = '12px';

        // Append the content div to the shadow wrapper
        shadowWrapper.appendChild(contentDiv);

        // Append the shadow wrapper to the productListFooter div
        productListFooter.appendChild(shadowWrapper);

        ctx.appendChild(productListFooter);
      },
      PreCheckoutSection: (ctx) => {
        const productListFooter = document.createElement('div');

        // Create a wrapper div for the shadow background
        const shadowWrapper = document.createElement('div');
        shadowWrapper.style.backgroundColor = '#EEEFFB';
        shadowWrapper.style.borderRadius = '5px';

        // Create the content div
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = "<p style='line-height: 1.5;'>Earn rewards every time you shop! Sign up for our free loyalty program today and start earning points on this purchase.</p>";
        contentDiv.style.display = 'flex';
        contentDiv.style.flexDirection = 'column';
        contentDiv.style.padding = '12px';

        // Append the content div to the shadow wrapper
        shadowWrapper.appendChild(contentDiv);

        // Append the shadow wrapper to the productListFooter div
        productListFooter.appendChild(shadowWrapper);

        ctx.appendChild(productListFooter);
      },
    },
  })(block);
}
