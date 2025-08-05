import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { events } from '@dropins/tools/event-bus.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import {
  InLineAlert,
  Icon,
  provider as UI,
  Button,
  Input,
} from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';

import createModal from '../modal/modal.js';
import createMiniPDP from '../commerce-mini-pdp/commerce-mini-pdp.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { fetchPlaceholders, rootLink } from '../../scripts/commerce.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
    'enable-updating-product': enableUpdatingProduct = 'false',
    'enable-quantity-update': enableQuantityUpdate = 'true', // Enable quantity updates
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
      showMessage(placeholders?.Global?.ProductLoadError);
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
  const getProductLink = (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`);
  await provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL
      ? () => rootLink(startShoppingURL)
      : undefined,
    routeCart: cartURL ? () => rootLink(cartURL) : undefined,
    routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
    routeProduct: getProductLink,
    undo: undo === 'true',
    enableQuantityUpdate: enableQuantityUpdate === 'true',

    slots: {
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

        if (
          item?.itemType === 'ConfigurableCartItem'
          && enableUpdatingProduct === 'true'
        ) {
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
      ItemRemoveAction: (ctx) => {
        // Simple remove button with text
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        // removeButton.className = 'dropin-cart-item__remove'; // Keep default positioning

        // Simple, clean styling using design tokens where possible
        removeButton.style.background = 'transparent';
        removeButton.style.border = 'none';
        removeButton.style.color = 'var(--color-neutral-600, #666)';
        removeButton.style.cursor = 'pointer';
        removeButton.style.fontSize = 'var(--type-body-2-font-size, 14px)';
        removeButton.style.padding = '0';
        removeButton.style.paddingRight = 'var(--spacing-medium, 16px)'; // Add space to right border
        removeButton.style.fontWeight = 'var(--type-body-2-font-weight, normal)';
        removeButton.style.textDecoration = 'underline';
        removeButton.style.fontFamily = 'var(--type-body-font-family, inherit)';
        removeButton.style.float = 'right'; // Position to the right
        removeButton.style.marginLeft = 'auto'; // Push to the right
        removeButton.style.display = 'block';

        // Check if item is being loaded
        const isLoading = ctx.itemsLoading
          && ctx.itemsLoading.has
          && ctx.itemsLoading.has(ctx.item.uid);
        removeButton.disabled = isLoading;

        if (isLoading) {
          removeButton.innerText = 'Removing...';
          removeButton.style.color = 'var(--color-neutral-400, #999)';
          removeButton.style.textDecoration = 'none';
        }

        // Simple hover effect using design tokens
        removeButton.addEventListener('mouseenter', () => {
          if (!removeButton.disabled) {
            removeButton.style.color = 'var(--color-neutral-800, #333)';
          }
        });

        removeButton.addEventListener('mouseleave', () => {
          if (!removeButton.disabled) {
            removeButton.style.color = 'var(--color-neutral-600, #666)';
          }
        });

        // Remove functionality
        removeButton.addEventListener('click', () => {
          if (ctx.handleItemQuantityUpdate) {
            ctx.handleItemQuantityUpdate(ctx.item, 0);
          }
        });

        ctx.replaceWith(removeButton);
      },
      ItemQuantity: (ctx) => {
        const { item, handleItemQuantityUpdate } = ctx;

        // Create container with label and input
        const quantityContainer = document.createElement('div');
        quantityContainer.className = 'cart-item-quantity-container';

        // Add "Qty:" label
        const quantityLabel = document.createElement('span');
        quantityLabel.className = 'cart-item-quantity-label';
        quantityLabel.textContent = 'Qty:';
        quantityLabel.style.marginRight = 'var(--spacing-xsmall, 8px)';
        quantityLabel.style.fontWeight = 'var(--type-body-2-font-weight, normal)';
        quantityLabel.style.color = 'var(--color-neutral-700, #333)';

        // Create input wrapper for SDK Input component
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'cart-item-quantity-input';
        inputWrapper.style.display = 'inline-block';
        inputWrapper.style.width = '60px';

        // Render SDK Input component
        UI.render(Input, {
          value: item.quantity.toString(),
          min: 1,
          size: 'small',
          variant: 'primary',
          onValue: (value) => {
            const newQuantity = parseInt(value, 10);
            if (
              !Number.isNaN(newQuantity)
              && newQuantity > 0
              && newQuantity !== item.quantity
            ) {
              handleItemQuantityUpdate(item, newQuantity);
            }
          },
        })(inputWrapper);

        // // Add custom styling to further reduce height and center text
        // inputWrapper.style.height = '28px'; // Set a specific height

        // // Use setTimeout to ensure the Input component is fully rendered before applying styles
        // setTimeout(() => {
        //   const inputElement = inputWrapper.querySelector('input');
        //   if (inputElement) {
        //     inputElement.style.setProperty('height', '28px', 'important');
        //     inputElement.style.setProperty('padding', '2px 8px', 'important');
        //     inputElement.style.setProperty('text-align', 'center', 'important');
        //     // Additional CSS to ensure centering works
        //     inputElement.style.setProperty(
        //       'box-sizing',
        //       'border-box',
        //       'important',
        //     );
        //   }
        // }, 100);

        // Style the container for inline layout
        quantityContainer.style.display = 'flex';
        quantityContainer.style.alignItems = 'center';
        quantityContainer.style.gap = 'var(--spacing-xsmall, 8px)';

        quantityContainer.appendChild(quantityLabel);
        quantityContainer.appendChild(inputWrapper);

        ctx.replaceWith(quantityContainer);
      },
      ItemTitle: (ctx) => {
        // Create custom title element
        const customTitle = document.createElement('div');
        customTitle.className = 'cart-item-custom-title';
        customTitle.textContent = 'Custom Title';

        // Style the custom title using design tokens
        customTitle.style.fontWeight = 'var(--type-body-2-font-weight, bold)';
        customTitle.style.color = 'var(--color-informational-800)';
        customTitle.style.fontSize = 'var(--type-body-2-font-size, 14px)';
        customTitle.style.lineHeight = 'var(--type-body-2-line-height, 1.4)';
        customTitle.style.marginBottom = 'var(--spacing-xsmall, 4px)';

        ctx.replaceWith(customTitle);
      },
      EmptyCart: (ctx) => {
        // Create custom empty cart container
        const emptyCartContainer = document.createElement('div');
        emptyCartContainer.className = 'custom-empty-cart';

        // Create empty cart message
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Your cart is empty';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.marginBottom = 'var(--spacing-medium, 16px)';
        emptyMessage.style.color = 'var(--color-neutral-600, #666)';
        emptyMessage.style.fontSize = 'var(--type-body-2-font-size, 14px)';

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'empty-cart-buttons';
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.flexDirection = 'column';
        buttonsContainer.style.gap = 'var(--spacing-small, 12px)';
        buttonsContainer.style.alignItems = 'center';

        // Create start shopping button wrapper
        const startShoppingWrapper = document.createElement('div');
        startShoppingWrapper.className = 'start-shopping-button';

        // Render Start Shopping button using SDK
        UI.render(Button, {
          children: 'Start Shopping',
          variant: 'primary',
          size: 'medium',
          onClick: () => {
            if (startShoppingURL) {
              window.location.href = rootLink(startShoppingURL);
            }
          },
        })(startShoppingWrapper);

        // Create test button wrapper
        const testButtonWrapper = document.createElement('div');
        testButtonWrapper.className = 'test-button';

        // Render Test Button using SDK
        UI.render(Button, {
          children: 'Test Button',
          variant: 'secondary',
          size: 'medium',
          onClick: () => {
            alert('Test Button clicked!');
          },
        })(testButtonWrapper);

        // Assemble the empty cart
        buttonsContainer.appendChild(startShoppingWrapper);
        buttonsContainer.appendChild(testButtonWrapper);
        emptyCartContainer.appendChild(emptyMessage);
        emptyCartContainer.appendChild(buttonsContainer);

        // Style the container
        emptyCartContainer.style.padding = 'var(--spacing-large, 24px)';
        emptyCartContainer.style.textAlign = 'center';

        ctx.replaceWith(emptyCartContainer);
      },
      Footer: (ctx) => {
        const footerContent = document.createElement('div');
        footerContent.className = 'mini-cart-custom-footer';
        footerContent.textContent = 'Custom footer content';

        // Add inline styles to make it stand out using design tokens
        footerContent.style.color = 'var(--color-brand-600, #0066cc)'; // Use brand color for better visibility
        footerContent.style.padding = 'var(--spacing-xsmall)';
        footerContent.style.textAlign = 'center';
        // footerContent.style.fontWeight = 'var(--type-body-2-font-weight, bold)';
        footerContent.style.font = 'var(--type-strong-2-font-family, inherit)';
        footerContent.style.borderRadius = 'var(--shape-border-radius-1, 4px)';

        ctx.appendChild(footerContent);
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
