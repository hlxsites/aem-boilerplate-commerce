import { events } from '@dropins/tools/event-bus.js';
import { render as provider } from '@dropins/storefront-cart/render.js';
import * as Cart from '@dropins/storefront-cart/api.js';

// Dropin Containers
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import EstimateShipping from '@dropins/storefront-cart/containers/EstimateShipping.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';
import GiftCards from '@dropins/storefront-cart/containers/GiftCards.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';

// API
import { publishShoppingCartViewEvent } from '@dropins/storefront-cart/api.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';
import { tryRenderAemAssetsImage } from '../../scripts/assets.js';

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
        <div class="cart__gift-options"></div>
      </div>
    </div>

    <div class="cart__empty-cart"></div>
  `);

  const $wrapper = fragment.querySelector('.cart__wrapper');
  const $list = fragment.querySelector('.cart__list');
  const $summary = fragment.querySelector('.cart__order-summary');
  const $emptyCart = fragment.querySelector('.cart__empty-cart');
  const $giftOptions = fragment.querySelector('.cart__gift-options');

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
  const productLink = (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`);
  await Promise.all([
    // Cart List
    provider.render(CartSummaryList, {
      hideHeading: hideHeading === 'true',
      routeProduct: productLink,
      routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
      maxItems: parseInt(maxItems, 10) || undefined,
      attributesToHide: hideAttributes
        .split(',')
        .map((attr) => attr.trim().toLowerCase()),
      enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
      enableRemoveItem: enableRemoveItem === 'true',
      slots: {
        Thumbnail: (ctx) => {
          const { item, defaultImageProps } = ctx;
          const anchorWrapper = document.createElement('a');
          anchorWrapper.href = productLink(item);

          tryRenderAemAssetsImage(ctx, {
            alias: item.sku,
            imageProps: defaultImageProps,
            wrapper: anchorWrapper,
          });
        },

        Footer: (ctx) => {
          const giftOptions = document.createElement('div');

          provider.render(GiftOptions, {
            item: ctx.item,
            view: 'product',
            dataSource: 'cart',
            handleItemsLoading: ctx.handleItemsLoading,
            handleItemsError: ctx.handleItemsError,
            onItemUpdate: ctx.onItemUpdate,
            slots: {
              SwatchImage: swatchImageSlot,
            },
          })(giftOptions);

          ctx.appendChild(giftOptions);
        },
      },
    })($list),

    // Order Summary
    provider.render(OrderSummary, {
      routeProduct: productLink,
      routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
      slots: {
        EstimateShipping: async (ctx) => {
          if (enableEstimateShipping === 'true') {
            const wrapper = document.createElement('div');
            await provider.render(EstimateShipping, {})(wrapper);
            ctx.replaceWith(wrapper);
          }
        },
        Coupons: (ctx) => {
          const coupons = document.createElement('div');

          provider.render(Coupons)(coupons);

          ctx.appendChild(coupons);
        },
        GiftCards: (ctx) => {
          const giftCards = document.createElement('div');

          provider.render(GiftCards)(giftCards);

          ctx.appendChild(giftCards);
        },
      },
    })($summary),

    // Empty Cart
    provider.render(EmptyCart, {
      routeCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    })($emptyCart),

    provider.render(GiftOptions, {
      view: 'order',
      dataSource: 'cart',

      slots: {
        SwatchImage: swatchImageSlot,
      },
    })($giftOptions),
  ]);

  let cartViewEventPublished = false;
  // Events
  events.on(
    'cart/data',
    (payload) => {
      toggleEmptyCart(isCartEmpty(payload));

      if (!cartViewEventPublished) {
        cartViewEventPublished = true;
        publishShoppingCartViewEvent();
      }
    },
    { eager: true },
  );

  return Promise.resolve();
}

function isCartEmpty(cart) {
  return cart ? cart.totalQuantity < 1 : true;
}

function swatchImageSlot(ctx) {
  const { imageSwatchContext, defaultImageProps } = ctx;
  tryRenderAemAssetsImage(ctx, {
    alias: imageSwatchContext.label,
    imageProps: defaultImageProps,
    wrapper: document.createElement('span'),
  });
}
