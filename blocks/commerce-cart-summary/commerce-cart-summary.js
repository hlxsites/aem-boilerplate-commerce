import { render as provider } from '@dropins/storefront-cart/render.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    'hide-heading': hideHeading = 'false',
    'start-shopping-url': startShoppingURL = '',
    'max-items': maxItems,
    'hide-attributes': hideAttributes = '',
    'enable-item-quantity-update': enableUpdateItemQuantity = 'false',
    'enable-item-remove': enableRemoveItem = 'true',
  } = readBlockConfig(block);

  block.innerHTML = '';

  return provider.render(CartSummaryList, {
    hideHeading: hideHeading === 'true',
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    routeEmptyCartCTA: startShoppingURL ? () => startShoppingURL : undefined,
    maxItems: parseInt(maxItems, 10) || undefined,
    attributesToHide: hideAttributes
      .split(',')
      .map((attr) => attr.trim().toLowerCase()),
    enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
    enableRemoveItem: enableRemoveItem === 'true',
    slots: {
      ProductAttributes: (ctx) => {
        // Prepend Product Attributes
        const productAttributes = ctx.item?.productAttributes;

        productAttributes?.forEach((attr) => {
          if ((attr.code === 'Activity') || (attr.code === 'Style Bags')) {
            if (attr.selected_options) {
              const selectedOptions = attr.selected_options
                .filter((option) => option.label.trim() !== '')
                .map((option) => option.label)
                .join(', ');

              if (selectedOptions) {
                const productAttribute = document.createElement('div');
                productAttribute.innerText = `${attr.code}: ${selectedOptions}`;
                return ctx.appendChild(productAttribute);
              }
            } else if (attr.value) {
              const productAttribute = document.createElement('div');
              productAttribute.innerText = `${attr.code}: ${attr.value}`;
              return ctx.appendChild(productAttribute);
            }
          }
          return null;
        });
      },
    },
  })(block);
}
