// Initialize
// TODO - Add quick order initializer
import { Button, provider as UI } from '@dropins/tools/components.js';
import * as searchApi from '@dropins/storefront-product-discovery/api.js';
// CART
import * as cartApi from '@dropins/storefront-cart/api.js';

// PDP
import { render as pdpProvider } from '@dropins/storefront-pdp/render.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';

import { render as quickOrderProvider } from '@dropins/storefront-quick-order/render.js';
import QuickOrderMultipleSku from '@dropins/storefront-quick-order/containers/QuickOrderMultipleSku.js';
import QuickOrderCsvUpload from '@dropins/storefront-quick-order/containers/QuickOrderCsvUpload.js';
import QuickOrderItems from '@dropins/storefront-quick-order/containers/QuickOrderItems.js';

import '../../scripts/initializers/quick-order.js';
import '../../scripts/initializers/cart.js';

export default async function decorate(block) {
  // Create fragment with container structure
  const fragment = document.createRange().createContextualFragment(`
    <h1 class="quick-order-title">Quick Order</h1>
    <div class="quick-order-main-container">
      <div class="quick-order-items-container"></div>
      <div class="quick-order-right-side">
        <div class="quick-order-multiple-sku-container"></div>
        <div class="quick-order-csv-upload-container"></div>
      </div>
    </div>
  `);

  block.appendChild(fragment);

  // Find containers by class
  const quickOrderItemsContainer = block.querySelector(
    '.quick-order-items-container',
  );
  const quickOrderMultipleSkuContainer = block.querySelector(
    '.quick-order-multiple-sku-container',
  );
  const quickOrderCsvUploadContainer = block.querySelector(
    '.quick-order-csv-upload-container',
  );

  // ADD SLOT button
  // Return error and render backend error message in notification
  quickOrderProvider.render(QuickOrderItems, {
    getProductsData: pdpApi.getProductsData,
    productsSearch: searchApi.search,
    searchFilter: [
      {
        attribute: 'categoryPath',
        eq: '',
      },
      {
        attribute: 'visibility',
        in: ['Search', 'Catalog, Search'],
      },
    ],
    className: 'quick-order-items',
    handleAddToCart: async (values) => {
      if (!values.length) return undefined;

      try {
        await cartApi.addProductsToCart(values);

        // TODO - Hardcoded URL
        window.location.href = '/cart';

        // Return undefined for success
        return undefined;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding products to cart:', error);
        // Return error message string
        return (
          error.message || 'Failed to add products to cart. Please try again.'
        );
      }
    },
    slots: {
      // EXAMPLE
      // QuickOrderSearchAutocompleteItem: (ctx) => {
      //   const elem = document.createElement('div');
      //   elem.className = 'quick-order-search-autocomplete-item';
      //   elem.innerHTML = ctx.item.name;
      //   elem.addEventListener(
      //     'click',
      //     ctx.createItemClickHandler(ctx.item)
      //   );
      //
      //   ctx.replaceWith(elem);
      // },
      AddToListButton: (ctx) => {
        const buttonText = ctx.dictionary.QuickOrder.SkuListInput.button;
        const elem = document.createElement('button');
        elem.className = 'add-to-list-button';
        elem.style.marginBottom = '10px';
        elem.disabled = ctx.loading || ctx.isDisabledButton;

        UI.render(Button, {
          children: buttonText,

          onClick: async () => {
            ctx.handleAddToList();
          },
        })(elem);

        ctx.replaceWith(elem);
      },
      ProductPrice: (ctx) => {
        const priceContainer = document.createElement('div');
        priceContainer.className = 'product-price-slot';
        pdpProvider.render(ProductPrice, {
          scope: ctx.scope,
          initialData: ctx.item,
        })(priceContainer);

        ctx.replaceWith(priceContainer);
      },
      ProductOptions: (ctx) => {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'product-options-slot';
        pdpProvider.render(ProductOptions, {
          scope: ctx.scope,
        })(optionsContainer);

        ctx.replaceWith(optionsContainer);
      },
    },
  })(quickOrderItemsContainer);

  // Render QuickOrderMultipleSku on the right (second container)
  quickOrderProvider.render(QuickOrderMultipleSku, {
    className: 'quick-order-multiple-sku',
    onChange: () => {},
    onAddToList: () => {},
  })(quickOrderMultipleSkuContainer);

  // Render QuickOrderCsvUpload on the right below MultipleSku (third container)
  quickOrderProvider.render(QuickOrderCsvUpload, {
    className: 'quick-order-csv-upload',
  })(quickOrderCsvUploadContainer);
}
