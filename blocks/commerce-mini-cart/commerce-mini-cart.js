import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { events } from '@dropins/tools/event-bus.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import {
  Icon,
  Button,
  provider as UI,
} from '@dropins/tools/components.js';

// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';

// Recommendations Dropin
import ProductList from '@dropins/storefront-recommendations/containers/ProductList.js';
import { render as RecommendationsProvider } from '@dropins/storefront-recommendations/render.js';

// API
import { addProductsToCart } from '@dropins/storefront-cart/api.js';

// Block-level
import createModal from '../modal/modal.js';

// Initializers
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/recommendations.js';
import '../../scripts/initializers/wishlist.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { fetchPlaceholders, rootLink } from '../../scripts/commerce.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
    'enable-updating-product': enableUpdatingProduct = 'false',
  } = readBlockConfig(block);

  // In this initial phase of the Storefront Recommendations drop-in, the 'recid' and 'currentsku'
  // values are mandatory, so we need to hardcode them for now (on the Apparel page, those values
  // are configured in the block's config section).
  // TODO: Remove the following two lines once we have a way to get the 'recid' from cart, and
  // Storefront Recommendations drop-in is able to retrieve products list using 'cartSkus' prop.
  const recid = 'cf042e53-7efb-4a7e-b1bd-4f87d5c6ca84';
  const currentsku = 'ADB150';

  // Get translations for custom messages
  const placeholders = await fetchPlaceholders();

  const MESSAGES = {
    ADDED: placeholders?.Global?.MiniCartAddedMessage,
    UPDATED: placeholders?.Global?.MiniCartUpdatedMessage,
  };

  // Create a container for the update message
  const updateMessage = document.createElement('div');
  updateMessage.className = 'commerce-mini-cart__update-message';

  // Create shadow wrapper
  const shadowWrapper = document.createElement('div');
  shadowWrapper.className = 'commerce-mini-cart__message-wrapper';
  shadowWrapper.appendChild(updateMessage);

  const showMessage = (message) => {
    updateMessage.textContent = message;
    updateMessage.classList.add('commerce-mini-cart__update-message--visible');
    shadowWrapper.classList.add('commerce-mini-cart__message-wrapper--visible');
    setTimeout(() => {
      updateMessage.classList.remove(
        'commerce-mini-cart__update-message--visible',
      );
      shadowWrapper.classList.remove(
        'commerce-mini-cart__message-wrapper--visible',
      );
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

  let modal = null;

  // Dynamic containers and components
  const showModal = async (content) => {
    modal = await createModal([content]);
    modal.showModal();
  };

  const removeModal = () => {
    if (!modal) return;
    modal.removeModal();
    modal = null;
  };

  const getProductLink = (item) => rootLink(`/products/${item.urlKey}/${item.sku}`);

  function showProductRecommendations() {
    // Create container for modal content
    const $modalContent = document.createElement('div');

    const $recommendationsContent = document.createElement('div');
    RecommendationsProvider.render(ProductList, {
      routeProduct: getProductLink,
      recId: recid,
      currentSku: currentsku,
      slots: {
        Footer: (ctx) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'footer__wrapper';

          const addToCart = document.createElement('div');
          addToCart.className = 'footer__button--add-to-cart';
          wrapper.appendChild(addToCart);

          if (ctx.item.itemType === 'SimpleProductView') {
            // Add to Cart Button
            UI.render(Button, {
              children: placeholders.Global?.AddProductToCart,
              icon: Icon({ source: 'Cart' }),
              onClick: () => addProductsToCart([{ sku: ctx.item.sku, quantity: 1 }]),
              variant: 'primary',
            })(addToCart);
          } else {
            // Select Options Button
            UI.render(Button, {
              children:
              placeholders.Global?.SelectProductOptions,
              href: rootLink(`/products/${ctx.item.urlKey}/${ctx.item.sku}`),
              variant: 'tertiary',
            })(addToCart);
          }

          // Wishlist Button
          const $wishlistToggle = document.createElement('div');
          $wishlistToggle.classList.add('footer__button--wishlist-toggle');

          // Render Icon
          wishlistRender.render(WishlistToggle, {
            product: ctx.item,
          })($wishlistToggle);

          // Append to Cart Item
          wrapper.appendChild($wishlistToggle);

          ctx.replaceWith(wrapper);
        },

        Thumbnail: (ctx) => {
          const { item, defaultImageProps } = ctx;
          const wrapper = document.createElement('a');
          wrapper.href = getProductLink(item);

          tryRenderAemAssetsImage(ctx, {
            alias: item.sku,
            imageProps: defaultImageProps,
            wrapper,

            params: {
              width: defaultImageProps.width,
              height: defaultImageProps.height,
            },
          });
        },
      },
    })($recommendationsContent);

    // real Checkout Button
    const $checkoutButton = document.createElement('div');
    $checkoutButton.classList.add('cart-order-summary__entry', 'cart-order-summary__primaryAction');
    UI.render(Button, {
      children: 'Checkout',
      'data-testid': 'checkout-button',
      variant: 'primary',
      onClick: () => {
        removeModal();
        window.location.href = checkoutURL ? rootLink(checkoutURL) : undefined;
      },
    })($checkoutButton);

    $modalContent.appendChild($recommendationsContent);
    $modalContent.appendChild($checkoutButton);

    // Display modal with combined content
    showModal($modalContent);
  }

  // Render MiniCart
  await provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    routeCart: cartURL ? () => rootLink(cartURL) : undefined,
    // routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
    routeProduct: getProductLink,

    slots: {
      PreCheckoutSection: (ctx) => {
        // TODO: this is a workaround to show the checkout button as routeCheckout expects
        // an string, but we want to show a modal with the product recommendations container.
        const $checkoutButton = document.createElement('div');
        $checkoutButton.classList.add('cart-order-summary__entry', 'cart-order-summary__primaryAction');
        UI.render(Button, {
          children: 'Checkout',
          'data-testid': 'checkout-button',
          variant: 'primary',
          onClick: showProductRecommendations,
        })($checkoutButton);
        ctx.appendChild($checkoutButton);
      },
      Thumbnail: (ctx) => {
        const { item, defaultImageProps } = ctx;
        const anchorWrapper = document.createElement('a');
        anchorWrapper.href = getProductLink(item);

        tryRenderAemAssetsImage(ctx, {
          alias: item.sku,
          imageProps: defaultImageProps,
          wrapper: anchorWrapper,

          params: {
            width: defaultImageProps.width,
            height: defaultImageProps.height,
          },
        });

        if (item?.itemType === 'ConfigurableCartItem' && enableUpdatingProduct === 'true') {
          const editLinkContainer = document.createElement('div');
          editLinkContainer.className = 'cart-item-edit-container';

          const editButton = document.createElement('button');
          editButton.className = 'cart-item-edit-link';
          editButton.textContent = 'Edit';

          editButton.addEventListener('click', () => {
            const productUrl = getProductLink(item);
            const params = new URLSearchParams();

            if (item.selectedOptionsUIDs) {
              const optionsValues = Object.values(item.selectedOptionsUIDs);
              if (optionsValues.length > 0) {
                const joinedValues = optionsValues.join(',');
                params.append('optionsUIDs', joinedValues);
              }
            }

            params.append('quantity', item.quantity);
            params.append('itemUid', item.uid);

            const finalUrl = `${productUrl}?${params.toString()}`;
            window.location.href = finalUrl;
          });

          editLinkContainer.appendChild(editButton);
          ctx.appendChild(editLinkContainer);
        }
      },
    },
  })(block);

  // Find the products container and add the message div at the top
  const productsContainer = block.querySelector('.cart-mini-cart__products');
  if (productsContainer) {
    productsContainer.insertBefore(shadowWrapper, productsContainer.firstChild);
  } else {
    console.info('Products container not found, appending message to block');
    block.appendChild(shadowWrapper);
  }

  return block;
}
