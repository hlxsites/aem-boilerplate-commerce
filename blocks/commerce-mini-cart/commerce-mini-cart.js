import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { events } from '@dropins/tools/event-bus.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import {
  AlertBanner,
  InLineAlert,
  Icon,
  provider as UI,
  Button,
} from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';

// Payment Services Dropin
import ApplePay from '@dropins/storefront-payment-services/containers/ApplePay.js';
import PayPalButtons from '@dropins/storefront-payment-services/containers/PayPalButtons.js';
import { render as PaymentServices } from '@dropins/storefront-payment-services/render.js';

// Order Dropin
import * as orderApi from '@dropins/storefront-order/api.js';

import createModal from '../modal/modal.js';
import createMiniPDP from '../../scripts/components/commerce-mini-pdp/commerce-mini-pdp.js';

// Block-level
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Initializers
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/order.js';
import '../../scripts/initializers/payment-services.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { fetchPlaceholders, rootLink, getProductLink } from '../../scripts/commerce.js';

// Checkout success block import and CSS preload
import { renderCheckoutSuccess, preloadCheckoutSuccess } from '../commerce-checkout-success/commerce-checkout-success.js';

preloadCheckoutSuccess();

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
    'enable-updating-product': enableUpdatingProduct = 'false',
    'undo-remove-item': undo = 'false',
  } = readBlockConfig(block);

  // Get translations for custom messages
  const placeholders = await fetchPlaceholders();

  const MESSAGES = {
    ADDED: placeholders?.Global?.MiniCartAddedMessage,
    UPDATED: placeholders?.Global?.MiniCartUpdatedMessage,
  };

  // Modal state
  let currentModal = null;
  let currentCartNotification = null;
  let currentPaymentErrorMessage = null;

  // Create a container for the update message
  const updateMessage = document.createElement('div');
  updateMessage.className = 'commerce-mini-cart__update-message';

  // Create shadow wrapper
  const shadowWrapper = document.createElement('div');
  shadowWrapper.className = 'commerce-mini-cart__message-wrapper';
  shadowWrapper.appendChild(updateMessage);

  // Create a container for Apple Pay errors
  const $applePayError = document.createElement('div');
  $applePayError.className = 'commerce-mini-cart__apple-pay-error';

  const showMessage = (message, { type = 'success', duration = 3000 } = {}) => {
    updateMessage.textContent = message;
    shadowWrapper.classList.toggle('commerce-mini-cart__message-wrapper--error', type === 'error');
    updateMessage.classList.add('commerce-mini-cart__update-message--visible');
    shadowWrapper.classList.add('commerce-mini-cart__message-wrapper--visible');
    // setTimeout(() => {
    //   updateMessage.classList.remove(
    //     'commerce-mini-cart__update-message--visible',
    //   );
    //   shadowWrapper.classList.remove(
    //     'commerce-mini-cart__message-wrapper--visible',
    //   );
    // }, duration);
  };

  // Handle Edit Button Click
  async function handleEditButtonClick(cartItem) {
    try {
      // Create mini PDP content
      const miniPDPContent = await createMiniPDP(
        cartItem,
        async (_updateData) => {
          const productName = cartItem.name
            || cartItem.product?.name
            || placeholders?.Global?.CartUpdatedProductName;
          const message = placeholders?.Global?.CartUpdatedProductMessage?.replace(
            '{product}',
            productName,
          );

          // Show message in the main cart page
          const cartNotification = document.querySelector(
            '.cart__notification',
          );
          if (cartNotification) {
            // Clear any existing cart notifications
            currentCartNotification?.remove();

            currentCartNotification = await UI.render(InLineAlert, {
              heading: message,
              type: 'success',
              variant: 'primary',
              icon: h(Icon, { source: 'CheckWithCircle' }),
              'aria-live': 'assertive',
              role: 'alert',
              onDismiss: () => {
                currentCartNotification?.remove();
              },
            })(cartNotification);

            // Auto-dismiss after 5 seconds
            setTimeout(() => {
              currentCartNotification?.remove();
            }, 5000);
          }

          // Also trigger message in the mini-cart
          showMessage(message);
        },
        () => {
          if (currentModal) {
            currentModal.removeModal();
            currentModal = null;
          }
        },
      );

      currentModal = await createModal([miniPDPContent]);

      if (currentModal.block) {
        currentModal.block.setAttribute('id', 'mini-pdp-modal');
      }

      currentModal.showModal();
    } catch (error) {
      console.error('Error opening mini PDP modal:', error);

      // Show error message using mini-cart's message system
      showMessage(
        placeholders?.Global?.ProductLoadError,
        { type: 'error', duration: 6000 },
      );
    }
  }

  // Add event listeners for cart updates
  events.on('cart/product/added', () => showMessage(MESSAGES.ADDED), {
    eager: true,
  });
  events.on('cart/product/updated', () => showMessage(MESSAGES.UPDATED), {
    eager: true,
  });

  // Prevent mini cart from closing when undo is enabled
  if (undo === 'true') {
    // Add event listener to prevent event bubbling from remove buttons
    block.addEventListener('click', (e) => {
      // Check if click is on a remove button or within an undo-related element
      const isRemoveButton = e.target.closest('[class*="remove"]')
        || e.target.closest('[data-testid*="remove"]')
        || e.target.closest('[class*="undo"]')
        || e.target.closest('[data-testid*="undo"]');

      if (isRemoveButton) {
        // Stop the event from bubbling up to document level
        e.stopPropagation();
      }
    });
  }

  block.innerHTML = '';

  // Render MiniCart
  const createProductLink = (product) => getProductLink(product.url.urlKey, product.topLevelSku);
  await provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    routeCart: cartURL ? () => rootLink(cartURL) : undefined,
    routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
    routeProduct: createProductLink,
    undo: undo === 'true',
    slots: {
      PreCheckoutSection: (ctx) => {
        const $applePay = document.createElement('div');
        const $payPal = document.createElement('div');
        $payPal.className = 'commerce-mini-cart__paypal';

        const onPaymentSuccess = ({ cartId }) => orderApi.placeOrder(cartId).then((orderData) => {
          handleOrderPlaced(orderData).catch(console.error);
        });

        // TODO: Update default error messages in drop-in, then use 'localizedError.message'.
        const showPaymentError = (message) => {
          currentPaymentErrorMessage?.remove();

          UI.render(AlertBanner, {
            variant: 'warning',
            icon: h(Icon, { source: 'OrderError' }),
            message: h('span', null, message),
            'aria-live': 'assertive',
            role: 'alert',
            onDismiss: () => currentPaymentErrorMessage?.remove(),
          })($applePayError)
            .then((banner) => {
              currentPaymentErrorMessage = banner;
            })
            .catch(console.error);
        };

        PaymentServices.render(ApplePay, {
          location: 'MINICART',
          getCartId: () => events.lastPayload('cart/data')?.id,
          isVirtualCart: events.lastPayload('cart/data')?.isVirtual,
          onSuccess: onPaymentSuccess,
          onError: () => showPaymentError('An unexpected error occurred during checkout with Apple Pay. Please try another payment method or contact support.'),
        })($applePay);

        PaymentServices.render(PayPalButtons, {
          location: 'MINICART',
          onSuccess: onPaymentSuccess,
          onError: () => showPaymentError('An unexpected error occurred during checkout with PayPal. Please try another payment method or contact support.'),
        })($payPal);

        ctx.appendSibling($applePay);
        ctx.appendSibling($payPal);
      },
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

        if (item?.itemType === 'ConfigurableCartItem' && enableUpdatingProduct === 'true') {
          const editLinkContainer = document.createElement('div');
          editLinkContainer.className = 'cart-item-edit-container';

          const editLink = document.createElement('div');
          editLink.className = 'cart-item-edit-link';

          UI.render(Button, {
            children: placeholders?.Global?.CartEditButton,
            variant: 'tertiary',
            size: 'medium',
            icon: h(Icon, { source: 'Edit' }),
            onClick: () => handleEditButtonClick(item),
          })(editLink);

          editLinkContainer.appendChild(editLink);
          ctx.appendChild(editLinkContainer);
        }
      },
    },
  })(block);

  // Find the products container and add the message div at the top
  const productsContainer = block.querySelector('.cart-mini-cart__products');
  if (productsContainer) {
    productsContainer.insertBefore(shadowWrapper, productsContainer.firstChild);
    productsContainer.insertBefore($applePayError, productsContainer.firstChild);
  } else {
    console.info('Products container not found, appending message to block');
    block.appendChild($applePayError);
    block.appendChild(shadowWrapper);
  }

  return block;
}

/**
 * Handle an order placed from the mini-cart. Unlike PDP/checkout, the mini-cart block is only a
 * small flyout, not the page's content area, so the success view is rendered into
 * <main> (the page content root on every template) instead of the mini-cart block.
 * @param {Object} orderData - The order data
 */
async function handleOrderPlaced(orderData) {
  const token = getUserTokenCookie();
  const orderRef = token ? orderData.number : orderData.token;
  const orderNumber = orderData.number;
  const encodedOrderRef = encodeURIComponent(orderRef);
  const encodedOrderNumber = encodeURIComponent(orderNumber);

  const url = token
    ? rootLink(`/order-details?orderRef=${encodedOrderRef}`)
    : rootLink(`/order-details?orderRef=${encodedOrderRef}&orderNumber=${encodedOrderNumber}`);

  window.history.pushState({}, '', url);

  await renderCheckoutSuccess(document.querySelector('main'), { orderData });

  window.scrollTo({ top: 0 });
}
