/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { events } from '@dropins/tools/event-bus.js';
import { render as provider } from '@dropins/storefront-cart/render.js';
import * as Cart from '@dropins/storefront-cart/api.js';

// Dropin Containers
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import EstimateShipping from '@dropins/storefront-cart/containers/EstimateShipping.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';

import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Initialize Dropins – already initialized in scripts/dropins.js

  // Configuration
  const {
    'hide-heading': hideHeading = 'false',
    'max-items': maxItems,
    'hide-attributes': hideAttributes = '',
    'enable-item-quantity-update': enableUpdateItemQuantity = 'false',
    'enable-item-remove': enableRemoveItem = 'true',
    'enable-estimate-shipping': enableEstimateShipping = 'false',
    'start-shopping-url': startShoppingURL = '',
    'checkout-url': checkoutURL = '',
  } = readBlockConfig(block);

  const cart = Cart.getCartDataFromCache();

  const isEmptyCart = cart?.totalQuantity < 1;

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="cart__wrapper">
      <div class="cart__left-column">
        <div class="cart__list"></div>
      </div>
      <div class="cart__right-column">
        <div class="cart__order-summary"></div>
      </div>
    </div>
  `);

  const $wrapper = fragment.querySelector('.cart__wrapper');
  const $list = fragment.querySelector('.cart__list');
  const $summary = fragment.querySelector('.cart__order-summary');

  block.innerHTML = '';
  block.appendChild(fragment);

  // Render Empty Cart
  if (isEmptyCart) {
    return renderEmptyCart({ wrapper: $wrapper, startShoppingURL });
  }

  // Cart List
  await provider.render(CartSummaryList, {
    hideHeading: hideHeading === 'true',
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    routeEmptyCartCTA: startShoppingURL ? () => startShoppingURL : undefined,
    maxItems: parseInt(maxItems, 10) || undefined,
    attributesToHide: hideAttributes.split(',').map((attr) => attr.trim().toLowerCase()),
    enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
    enableRemoveItem: enableRemoveItem === 'true',
  })($list);

  // Order Summary
  await provider.render(OrderSummary, {
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    routeCheckout: checkoutURL ? () => checkoutURL : undefined,
    slots: {
      EstimateShipping: async (ctx) => {
        if (enableEstimateShipping === 'true') {
          const wrapper = document.createElement('div');
          await provider.render(EstimateShipping, {})(wrapper);
          ctx.replaceWith(wrapper);
        }
      },
    },
  })($summary);

  // Events
  events.on('cart/data', (payload) => {
    const next = payload?.totalQuantity < 1;

    if (next !== isEmptyCart) {
      renderEmptyCart({ wrapper: $wrapper, startShoppingURL });
    }
  }, { eager: true });

  return Promise.resolve();
}

async function renderEmptyCart({ wrapper, startShoppingURL }) {
  return provider.render(EmptyCart, {
    routeCTA: startShoppingURL ? () => startShoppingURL : undefined,
  })(wrapper);
}
