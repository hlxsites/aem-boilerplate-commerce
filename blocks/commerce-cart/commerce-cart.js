import { events } from '@dropins/tools/event-bus.js';
import { Icon, provider as UI } from '@dropins/tools/components.js';
import { render as provider } from '@dropins/storefront-cart/render.js';
import * as Cart from '@dropins/storefront-cart/api.js';

// Dropin Containers
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import EstimateShipping from '@dropins/storefront-cart/containers/EstimateShipping.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';

// API
import { publishShoppingCartViewEvent } from '@dropins/storefront-cart/api.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
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
    'promo-banner': promotion,
  } = readBlockConfig(block);

  const cart = Cart.getCartDataFromCache();

  const isEmptyCart = isCartEmpty(cart);

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

    <div class="cart__empty-cart"></div>
  `);

  const $wrapper = fragment.querySelector('.cart__wrapper');
  const $list = fragment.querySelector('.cart__list');
  const $summary = fragment.querySelector('.cart__order-summary');
  const $emptyCart = fragment.querySelector('.cart__empty-cart');

  block.innerHTML = '';
  block.appendChild(fragment);

  // Toggle Empty Cart
  function toggleEmptyCart(state) {
    if (state) {
      $wrapper.setAttribute('hidden', '');
      $emptyCart.removeAttribute('hidden');
    } else {
      $wrapper.removeAttribute('hidden');
      $emptyCart.setAttribute('hidden', '');
    }
  }

  toggleEmptyCart(isEmptyCart);

  // Render Containers
  await Promise.all([
    // Cart List
    provider.render(CartSummaryList, {
      hideHeading: hideHeading === 'true',
      routeProduct: (product) => `/products/${product.url.urlKey}/${product.topLevelSku}`,
      routeEmptyCartCTA: startShoppingURL ? () => startShoppingURL : undefined,
      maxItems: parseInt(maxItems, 10) || undefined,
      attributesToHide: hideAttributes.split(',').map((attr) => attr.trim().toLowerCase()),
      enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
      enableRemoveItem: enableRemoveItem === 'true',
    })($list),

    // Order Summary
    provider.render(OrderSummary, {
      routeProduct: (product) => `/products/${product.url.urlKey}/${product.topLevelSku}`,
      routeCheckout: checkoutURL ? () => checkoutURL : undefined,
      slots: {
        EstimateShipping: async (ctx) => {
          if (enableEstimateShipping === 'true') {
            const wrapper = document.createElement('div');
            await provider.render(EstimateShipping, {})(wrapper);
            ctx.appendChild(wrapper);
          }

          // Promo Banner
          if (promotion) {
            await loadFragment(promotion).then(async (promoFragment) => {
              const $promo = document.createRange().createContextualFragment(`
                <div class="cart__promo-banner">
                  <div class="cart__promo-banner__icon"></div>
                  <div class="cart__promo-banner__content"></div>
                </div>            
              `);

              const $icon = $promo.querySelector('.cart__promo-banner__icon');

              await UI.render(Icon, { source: 'CheckWithCircle' })($icon);

              const content = promoFragment.querySelector('.default-content-wrapper');
              const $content = $promo.querySelector('.cart__promo-banner__content');
              $content.appendChild(content);

              ctx.appendSibling($promo);
            });
          }
        },
        Coupons: (ctx) => {
          const coupons = document.createElement('div');

          provider.render(Coupons)(coupons);

          ctx.appendChild(coupons);
        },
      },
    })($summary),

    // Empty Cart
    provider.render(EmptyCart, {
      routeCTA: startShoppingURL ? () => startShoppingURL : undefined,
    })($emptyCart),
  ]);

  let cartViewEventPublished = false;
  // Events
  events.on('cart/data', (payload) => {
    toggleEmptyCart(isCartEmpty(payload));

    if (!cartViewEventPublished) {
      cartViewEventPublished = true;
      publishShoppingCartViewEvent();
    }
  }, { eager: true });

  return Promise.resolve();
}

function isCartEmpty(cart) {
  return cart ? cart.totalQuantity < 1 : true;
}
