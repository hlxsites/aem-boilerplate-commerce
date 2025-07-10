import { events } from '@dropins/tools/event-bus.js';
import { render as pdpRender } from '@dropins/storefront-pdp/render.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { initializers } from '@dropins/tools/initializer.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import {
  InLineAlert,
  Icon,
  Button,
  Image,
  provider as UI,
} from '@dropins/tools/components.js';
import * as Cart from '@dropins/storefront-cart/api.js';

// PDP Containers for Mini PDP
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';
import ProductQuantity from '@dropins/storefront-pdp/containers/ProductQuantity.js';

// Initializers
import '../../scripts/initializers/cart.js';

import {
  fetchPlaceholders,
  commerceEndpointWithQueryParams,
} from '../../scripts/commerce.js';

/**
 * Creates a mini PDP component for modal display
 * @param {Object} cartItem - The cart item to edit
 * @param {Function} onUpdate - Callback when item is updated
 * @param {Function} onClose - Callback when modal should close
 * @returns {Promise<HTMLElement>} The mini PDP element
 */

// Helper functions for alerts
function showAlert(type, message, $alert) {
  const existingAlert = $alert.querySelector('.dropin-alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  const iconSource = type === 'success' ? 'CheckWithCircle' : 'AlertWithCircle';

  return UI.render(InLineAlert, {
    heading: message,
    type,
    variant: 'primary',
    icon: Icon({ source: iconSource }),
    'aria-live': 'assertive',
    role: 'alert',
    onDismiss: () => {
      const alert = $alert.querySelector('.dropin-alert');
      if (alert) alert.remove();
    },
  })($alert);
}

export default async function createMiniPDP(cartItem, onUpdate, onClose) {
  const placeholders = await fetchPlaceholders();

  // Initialize PDP API with the product SKU
  const sku = cartItem.topLevelSku || cartItem.sku;

  const langDefinitions = {
    default: placeholders,
  };

  const models = {
    ProductDetails: {
      fallbackData: (parent, refinedData) => ({
        ...parent,
        ...refinedData,
        images:
          refinedData.images?.length > 0 ? refinedData.images : parent.images,
        description:
          refinedData.description && refinedData.description !== ''
            ? refinedData.description
            : parent.description,
      }),
    },
  };

  try {
    // Configure PDP API endpoint and headers (same as main PDP initializer)
    pdpApi.setEndpoint(await commerceEndpointWithQueryParams());
    pdpApi.setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

    // Fetch product data first
    const productData = await pdpApi.fetchProductData(sku, {
      skipTransform: true,
    });

    if (!productData?.sku) {
      throw new Error('Product data not available');
    }

    // Update models with the fetched product data
    models.ProductDetails.initialData = { ...productData };

    // Initialize PDP API
    await initializers.mountImmediately(pdpApi.initialize, {
      sku,
      langDefinitions,
      models,
      acdl: false,
      persistURLParams: false,
    });

    // Get product data from PDP API
    const product = events.lastPayload('pdp/data');

    if (!product) {
      throw new Error('Product data not available');
    }

    // Create the mini PDP container
    const miniPDPContainer = document.createElement('div');
    miniPDPContainer.className = 'commerce-mini-pdp';

    // Layout structure
    const fragment = document.createRange().createContextualFragment(`
      <div class="mini-pdp__wrapper">
        <div class="mini-pdp__alert"></div>
        <div class="mini-pdp__header">
          <a href="/products/${product.urlKey}/${product.sku}" class="quick-view__close">
          ${product.name}
          </a>
        </div>
        <div class="mini-pdp__price"></div>
        <div class="mini-pdp__left-column">
          <div class="mini-pdp__gallery"></div>
        </div>
        <div class="mini-pdp__right-column">
          <div class="mini-pdp__configuration">
            <div class="mini-pdp__options"></div>
            <div class="mini-pdp__quantity-wrapper">
              <div class="mini-pdp__quantity-label">
                Quantity
              </div>
              <div class="mini-pdp__quantity"></div>
            </div>
          </div>
        </div>
        <div class="mini-pdp__buttons">
          <div class="mini-pdp__update-button"></div>
          <div class="mini-pdp__cancel-button"></div>
          <div class="mini-pdp__buttons__redirect-to-pdp">
            <a href="/products/${product.urlKey}/${product.sku}">
            </a>
          </div>
        </div>
      </div>
    `);

    const $alert = fragment.querySelector('.mini-pdp__alert');
    const $header = fragment.querySelector('.mini-pdp__header');
    const $price = fragment.querySelector('.mini-pdp__price');
    const $gallery = fragment.querySelector('.mini-pdp__gallery');
    const $options = fragment.querySelector('.mini-pdp__options');
    const $quantity = fragment.querySelector('.mini-pdp__quantity');
    const $updateButton = fragment.querySelector('.mini-pdp__update-button');
    const $cancelButton = fragment.querySelector('.mini-pdp__cancel-button');

    miniPDPContainer.appendChild(fragment);

    // Get the redirect button after fragment is appended otherwise it will be null
    const $redirectButton = miniPDPContainer.querySelector(
      '.mini-pdp__buttons__redirect-to-pdp',
    );

    // State management
    let isLoading = false;
    let inlineAlert = null;

    // Render components
    const [
      _galleryInstance,
      _headerInstance,
      _priceInstance,
      _optionsInstance,
      _quantityInstance,
      updateButton,
      _cancelButton,
      _viewDetailsButton,
    ] = await Promise.all([
      // Gallery - Simple image for now
      UI.render(Image, {
        src: product.images?.[0]?.url || cartItem.image,
        alt: product.images?.[0]?.label || product.name,
        width: 400,
        height: 400,
        imageParams: {
          width: 400,
          height: 400,
        },
      })($gallery),

      // Header - just set the content, no special rendering needed
      Promise.resolve($header),

      // Price
      pdpRender.render(ProductPrice, {})($price),

      // Options
      pdpRender.render(ProductOptions, {
        hideSelectedValue: false,
      })($options),

      // Quantity
      pdpRender.render(ProductQuantity, {
        initialValue: cartItem.quantity || 1,
      })($quantity),

      // Update button
      UI.render(Button, {
        children: placeholders?.Global?.UpdateProductInCart || 'Update Cart',
        variant: 'primary',
        size: 'medium',
        onClick: async () => {
          if (isLoading) return;

          try {
            isLoading = true;
            updateButton.setProps((prev) => ({
              ...prev,
              children: placeholders?.Global?.Updating || 'Updating...',
              disabled: true,
            }));

            // Get current product configuration
            const values = pdpApi.getProductConfigurationValues();
            const valid = pdpApi.isProductConfigurationValid();

            if (!valid) {
              throw new Error('Please select all required options');
            }

            // Update cart item with new configuration
            const updateData = {
              uid: cartItem.uid,
              quantity: values.quantity || cartItem.quantity,
              ...(values.optionsUIDs
                && values.optionsUIDs.length > 0 && {
                optionsUIDs: values.optionsUIDs,
              }),
            };

            const updateResponse = await Cart.updateProductsFromCart([
              updateData,
            ]);

            // Trigger cart refresh to ensure UI updates
            events.emit('cart/updated', updateResponse);

            // Show success message
            inlineAlert?.remove();
            // inlineAlert = showAlert(
            //   'success',
            //   placeholders?.Global?.CartUpdatedProductMessage?.replace(
            //     '{product}',
            //     product.name,
            //   ) || 'Product updated successfully',
            //   $alert,
            // );

            // Notify parent component
            if (onUpdate) {
              onUpdate(updateData);
            }

            // Close modal after short delay
            setTimeout(() => {
              onClose();
            }, 1000);
          } catch (error) {
            inlineAlert?.remove();
            inlineAlert = showAlert(
              'error',
              error.message || 'Failed to update product',
              $alert,
            );
          } finally {
            isLoading = false;
            updateButton.setProps((prev) => ({
              ...prev,
              children:
                placeholders?.Global?.UpdateProductInCart || 'Update Cart',
              disabled: false,
            }));
          }
        },
        disabled: isLoading,
      })($updateButton),

      // Cancel button
      UI.render(Button, {
        children: placeholders?.Global?.Cancel || 'Cancel',
        variant: 'secondary',
        size: 'medium',
        onClick: onClose,
      })($cancelButton),

      // View all details button
      UI.render(Button, {
        children: placeholders?.Global?.ViewAllDetails || 'View all details',
        variant: 'tertiary',
        size: 'medium',
        onClick: () => {
          // Close modal first
          onClose();
          // Navigate to full PDP page
          window.location.href = `/products/${product.urlKey}/${product.sku}`;
        },
      })($redirectButton),
    ]);

    // Handle PDP validation events
    events.on(
      'pdp/valid',
      (valid) => {
        updateButton.setProps((prev) => ({
          ...prev,
          disabled: !valid || isLoading,
        }));
      },
      { eager: true },
    );

    return miniPDPContainer;
  } catch (error) {
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'commerce-mini-pdp commerce-mini-pdp--error';
    errorContainer.innerHTML = `
      <div class="mini-pdp__error">
        <h3>Error</h3>
        <p>${error.message || 'Failed to load product details'}</p>
        <button onclick="arguments[0]()" class="mini-pdp__close-button">Close</button>
      </div>
    `;

    const closeButton = errorContainer.querySelector('.mini-pdp__close-button');
    closeButton.onclick = onClose;

    return errorContainer;
  }
}
