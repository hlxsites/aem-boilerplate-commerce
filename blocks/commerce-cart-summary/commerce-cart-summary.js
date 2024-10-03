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
      Footer: (ctx) => {
        // Runs on mount
        const wrapper = document.createElement('div');
        ctx.appendChild(wrapper);

        // Append Product Promotions on every update
        ctx.onChange((next) => {
          wrapper.innerHTML = '';

          next.item?.discount?.label?.forEach((label) => {
            const discount = document.createElement('div');
            discount.style.color = '#3d3d3d';
            discount.innerText = label;
            wrapper.appendChild(discount);
          });
        });
      },
    },
  })(block);
}
