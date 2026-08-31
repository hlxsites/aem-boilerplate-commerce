import { events } from '@dropins/tools/event-bus.js';
import { render as provider } from '@dropins/storefront-cart/render.js';
import * as Cart from '@dropins/storefront-cart/api.js';
import { h } from '@dropins/tools/preact.js';
import {
  InLineAlert,
  Icon,
  Button,
  provider as UI,
} from '@dropins/tools/components.js';

// Dropin Containers
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import EstimateShipping from '@dropins/storefront-cart/containers/EstimateShipping.js';
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';
import GiftCards from '@dropins/storefront-cart/containers/GiftCards.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { WishlistAlert } from '@dropins/storefront-wishlist/containers/WishlistAlert.js';
import Wishlist from '@dropins/storefront-wishlist/containers/Wishlist.js';
import * as WishlistApi from '@dropins/storefront-wishlist/api.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';

// API
import { publishShoppingCartViewEvent } from '@dropins/storefront-cart/api.js';

// Modal and Mini PDP
import createMiniPDP from '../../scripts/components/commerce-mini-pdp/commerce-mini-pdp.js';
import createModal from '../modal/modal.js';

// Initializers
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/wishlist.js';

import { readBlockConfig } from '../../scripts/aem.js';
import {
  fetchPlaceholders, rootLink, getProductLink, CS_FETCH_GRAPHQL,
} from '../../scripts/commerce.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';
import { renderWishlistItemActions } from '../../scripts/wishlist-item-actions.js';

// Point the PDP API at the Catalog Service so the SFL section can hydrate
// full product data (price, stock) for its items.
pdpApi.setEndpoint(CS_FETCH_GRAPHQL);

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
    'enable-updating-product': enableUpdatingProduct = 'false',
    'undo-remove-item': undo = 'false',
  } = readBlockConfig(block);

  const placeholders = await fetchPlaceholders();

  const _cart = Cart.getCartDataFromCache();

  // Modal state
  let currentModal = null;
  let currentNotification = null;

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="cart__notification"></div>
    <div class="cart__wrapper">
      <div class="cart__left-column">
        <div class="cart__list"></div>
        <h2 class="cart__save-for-later-title" hidden>Save for later</h2>
        <div class="cart__save-for-later"></div>
      </div>
      <div class="cart__right-column">
        <div class="cart__order-summary"></div>
        <div class="cart__gift-options"></div>
      </div>
    </div>

    <div class="cart__empty-cart"></div>
  `);

  const $wrapper = fragment.querySelector('.cart__wrapper');
  const $notification = fragment.querySelector('.cart__notification');
  const $list = fragment.querySelector('.cart__list');
  const $summary = fragment.querySelector('.cart__order-summary');
  const $emptyCart = fragment.querySelector('.cart__empty-cart');
  const $giftOptions = fragment.querySelector('.cart__gift-options');
  const $rightColumn = fragment.querySelector('.cart__right-column');
  const $sfl = fragment.querySelector('.cart__save-for-later');
  const $sflTitle = fragment.querySelector('.cart__save-for-later-title');

  block.innerHTML = '';
  block.appendChild(fragment);

  // Wishlist variables
  const routeToWishlist = rootLink('/wishlist');

  // Toggle Empty Cart
  function toggleEmptyCart(_state) {
    $wrapper.removeAttribute('hidden');
    $emptyCart.setAttribute('hidden', '');
  }

  // Handle Edit Button Click
  async function handleEditButtonClick(cartItem) {
    try {
      // Create mini PDP content
      const miniPDPContent = await createMiniPDP(
        cartItem,
        async (_updateData) => {
          // Show success message when mini-PDP updates item
          const productName = cartItem.name
            || cartItem.product?.name
            || placeholders?.Global?.CartUpdatedProductName;
          const message = placeholders?.Global?.CartUpdatedProductMessage?.replace(
            '{product}',
            productName,
          );

          // Clear any existing notifications
          currentNotification?.remove();

          currentNotification = await UI.render(InLineAlert, {
            heading: message,
            type: 'success',
            variant: 'primary',
            icon: h(Icon, { source: 'CheckWithCircle' }),
            'aria-live': 'assertive',
            role: 'alert',
            onDismiss: () => {
              currentNotification?.remove();
            },
          })($notification);

          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            currentNotification?.remove();
          }, 5000);
        },
        () => {
          if (currentModal) {
            currentModal.removeModal();
            currentModal = null;
          }
        },
      );

      // Create and show modal
      currentModal = await createModal([miniPDPContent]);

      if (currentModal.block) {
        currentModal.block.setAttribute('id', 'mini-pdp-modal');
      }

      currentModal.showModal();
    } catch (error) {
      console.error('Error opening mini PDP modal:', error);

      // Clear any existing notifications
      currentNotification?.remove();

      // Show error notification
      currentNotification = await UI.render(InLineAlert, {
        heading: placeholders?.Global?.ProductLoadError,
        type: 'error',
        variant: 'primary',
        icon: h(Icon, { source: 'AlertWithCircle' }),
        'aria-live': 'assertive',
        role: 'alert',
        onDismiss: () => {
          currentNotification?.remove();
        },
      })($notification);
    }
  }

  // Render Containers
  const createProductLink = (product) => getProductLink(product.url.urlKey, product.topLevelSku);

  // ---- Save for Later (SFL) ----
  // SFL is a distinct, reserved wishlist that is only surfaced in the cart.
  // For authenticated shoppers it is a server list identified by a reserved
  // name (SFL_LIST_NAME), reused if present and created otherwise. For guests
  // there are no server lists, so SFL is a reserved *local* list keyed by
  // GUEST_SFL_KEY; the wishlist drop-in persists it in localStorage and applies
  // the configured guest TTL. The same value is passed as `wishlistId`
  // throughout, so the rest of the SFL code path is auth-agnostic.
  let sflId = null;

  // Reserved name used to identify the SFL list for authenticated shoppers.
  // Matched exactly, so an existing SFL list is reused rather than duplicated.
  const SFL_LIST_NAME = 'Save for Later';

  // Reserved guest list key. Must match the key configured for guest expiry in
  // scripts/initializers/wishlist.js (guestWishlistTtl: { 'save-for-later': 14 }).
  const GUEST_SFL_KEY = 'save-for-later';

  // Event scope for the SFL container instance. The drop-in emits/listens for
  // this list's data and alerts on this scope, so the SFL section never
  // collides with the main wishlist's events on the page.
  const SFL_SCOPE = 'save-for-later';

  async function ensureSflList() {
    const lists = await WishlistApi.getWishlists();
    // getWishlists() returns a plain object (the single local list) for guests
    // and an array for authenticated shoppers.
    if (!Array.isArray(lists)) return GUEST_SFL_KEY; // guest -> reserved local key
    let sfl = lists.find((w) => w.name === SFL_LIST_NAME);
    if (!sfl) {
      sfl = await WishlistApi.createWishlist(SFL_LIST_NAME);
    }
    return sfl?.id ?? null;
  }

  // On login, fold the guest SFL list into the shopper's server SFL list. The
  // wishlist drop-in owns the read/dedup(by sku + options)/add/clear mechanics
  // via mergeWishlists(serverList, listKey); this block just resolves the
  // server list and passes it in. The fetch is scoped to the SFL section, so it
  // feeds only that container. Best-effort: failures are logged and swallowed.
  async function mergeGuestSflIntoServer(serverSflId) {
    if (!serverSflId || serverSflId === GUEST_SFL_KEY) return;
    const serverSfl = await WishlistApi.getWishlistById(serverSflId, 200, 1, {
      scope: SFL_SCOPE,
    });
    if (serverSfl) {
      await WishlistApi.mergeWishlists(serverSfl, GUEST_SFL_KEY);
    }
  }

  // Keep the "Saved for later (N)" heading in sync and hide the section when
  // empty. The count is driven by the scoped wishlist/data event below, so this
  // just applies a known count.
  function setSflCount(count) {
    const hasItems = count > 0;
    $sflTitle.hidden = !hasItems;
    $sfl.hidden = !hasItems;
    $sflTitle.textContent = `Saved for later (${count})`;
  }

  function renderSfl() {
    $sfl.innerHTML = '';
    if (!sflId) {
      $sflTitle.hidden = true;
      $sfl.hidden = true;
      return;
    }
    wishlistRender.render(Wishlist, {
      wishlistId: sflId,
      scope: SFL_SCOPE,
      moveProdToCart: Cart.addProductsToCart,
      routeProdDetailPage: (product) => getProductLink(product.urlKey, product.sku),
      getProductData: pdpApi.getProductData,
      getRefinedProduct: pdpApi.getRefinedProduct,
      slots: {
        actions: renderWishlistItemActions(!!getUserTokenCookie()),
      },
    })($sfl);
  }

  // The SFL count/visibility is driven entirely by this list's scoped data
  // event: every load, add, remove, and move re-emits on SFL_SCOPE, and the
  // eager replay covers the current value on (re)subscribe.
  events.on(
    'wishlist/data',
    (wl) => setSflCount(wl?.items_count ?? 0),
    { eager: true, scope: SFL_SCOPE },
  );

  sflId = await ensureSflList();
  // If the shopper is already authenticated on load (e.g. login triggered a
  // page reload), fold any leftover guest SFL blob into their server list.
  if (sflId && sflId !== GUEST_SFL_KEY) {
    await mergeGuestSflIntoServer(sflId);
  }
  renderSfl();

  await Promise.all([
    // Cart List
    provider.render(CartSummaryList, {
      hideHeading: hideHeading === 'true',
      routeProduct: createProductLink,
      routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
      maxItems: parseInt(maxItems, 10) || undefined,
      attributesToHide: hideAttributes
        .split(',')
        .map((attr) => attr.trim().toLowerCase()),
      enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
      enableRemoveItem: enableRemoveItem === 'true',
      undo: undo === 'true',
      slots: {
        Thumbnail: (ctx) => {
          const { item, defaultImageProps } = ctx;
          const anchorWrapper = document.createElement('a');
          anchorWrapper.href = createProductLink(item);

          tryRenderAemAssetsImage(ctx, {
            alias: item.sku,
            imageProps: defaultImageProps,
            wrapper: anchorWrapper,

            params: {
              width: defaultImageProps.width,
              height: defaultImageProps.height,
            },
          });
        },

        Footer: (ctx) => {
          // Edit Link
          if (ctx.item?.itemType === 'ConfigurableCartItem' && enableUpdatingProduct === 'true') {
            const editLink = document.createElement('div');
            editLink.className = 'cart-item-edit-link';

            UI.render(Button, {
              children: placeholders?.Global?.CartEditButton,
              // Every cart item renders its own Edit button, so the accessible
              // name must include the product name to distinguish them.
              'aria-label': `${placeholders?.Global?.CartEditButton} ${ctx.item.name}`,
              variant: 'tertiary',
              size: 'medium',
              icon: h(Icon, { source: 'Edit' }),
              onClick: () => handleEditButtonClick(ctx.item),
            })(editLink);

            ctx.appendChild(editLink);
          }

          // Wishlist Button (if product is not configurable)
          const $wishlistToggle = document.createElement('div');
          $wishlistToggle.classList.add('cart__action--wishlist-toggle');

          wishlistRender.render(WishlistToggle, {
            product: ctx.item,
            size: 'medium',
            labelToWishlist: placeholders?.Global?.CartMoveToWishlist,
            labelWishlisted: placeholders?.Global?.CartRemoveFromWishlist,
            removeProdFromCart: Cart.updateProductsFromCart,
          })($wishlistToggle);

          ctx.appendChild($wishlistToggle);

          // Save for Later button: add the item to the reserved SFL list, then
          // remove it from the active cart.
          if (sflId) {
            const $saveForLater = document.createElement('div');
            $saveForLater.classList.add('cart__action--save-for-later');

            UI.render(Button, {
              children: 'Save for later',
              variant: 'secondary',
              size: 'medium',
              onClick: async () => {
                const productName = ctx.item.name;
                await WishlistApi.addProductsToWishlist(
                  [{ sku: ctx.item.sku, quantity: ctx.item.quantity || 1 }],
                  sflId,
                );
                await Cart.updateProductsFromCart([
                  { uid: ctx.item.uid, quantity: 0 },
                ]);
                renderSfl();

                // Saving to SFL is a targeted (non-emitting) add, so no
                // wishlist/alert fires. Show a cart notification here.
                currentNotification?.remove();
                currentNotification = await UI.render(InLineAlert, {
                  heading: 'Saved for later',
                  description: `${productName} has been saved for later`,
                  type: 'success',
                  variant: 'primary',
                  icon: h(Icon, { source: 'CheckWithCircle' }),
                  'aria-live': 'polite',
                  onDismiss: () => {
                    currentNotification?.remove();
                  },
                })($notification);
                setTimeout(() => {
                  currentNotification?.remove();
                }, 5000);
              },
            })($saveForLater);

            ctx.appendChild($saveForLater);
          }

          // Gift Options
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
    (cartData) => {
      toggleEmptyCart(isCartEmpty(cartData));

      const isEmpty = !cartData || cartData.totalQuantity < 1;
      $giftOptions.style.display = isEmpty ? 'none' : '';
      $rightColumn.style.display = isEmpty ? 'none' : '';

      if (!cartViewEventPublished) {
        cartViewEventPublished = true;
        publishShoppingCartViewEvent();
      }
    },
    { eager: true },
  );

  // In-page login (no reload): migrate the guest SFL into the server list and
  // re-render the section against the server list.
  events.on('authenticated', async (authenticated) => {
    if (!authenticated) return;
    try {
      const serverSflId = await ensureSflList();
      await mergeGuestSflIntoServer(serverSflId);
      sflId = serverSflId;
      renderSfl();
    } catch (e) {
      console.error('SFL guest -> server merge failed:', e);
    }
  });

  function showWishlistToast({ action, item }) {
    wishlistRender.render(WishlistAlert, {
      action,
      item,
      routeToWishlist,
    })($notification);

    setTimeout(() => {
      $notification.innerHTML = '';
    }, 5000);
  }

  // Main wishlist (heart toggle on cart items) emits unscoped alerts.
  events.on('wishlist/alert', showWishlistToast);

  // The SFL section emits on its own scope. Toast here; the count updates via
  // the scoped wishlist/data event the reload triggers.
  events.on('wishlist/alert', showWishlistToast, { scope: SFL_SCOPE });

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

    params: {
      width: defaultImageProps.width,
      height: defaultImageProps.height,
    },
  });
}
