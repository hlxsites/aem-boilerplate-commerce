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
    'show-discount': showDiscount = 'false',
    'show-savings': showSavings = 'false',
    'quantity-type': quantityType = 'stepper',
  } = readBlockConfig(block);

  const DROPDOWN_MAX_QUANTITY = 20;

  const dropdownOptions = Array.from(
    { length: parseInt(DROPDOWN_MAX_QUANTITY, 10) },
    (_, i) => {
      const quantityOption = i + 1;
      return {
        value: `${quantityOption}`,
        text: `${quantityOption}`,
      };
    },
  );

  block.innerHTML = '';

  return provider.render(CartSummaryList, {
    hideHeading: hideHeading === 'true',
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    routeEmptyCartCTA: startShoppingURL ? () => startShoppingURL : undefined,
    maxItems: parseInt(maxItems, 10) || undefined,
    attributesToHide: hideAttributes.split(',').map((attr) => attr.trim().toLowerCase()),
    enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
    enableRemoveItem: enableRemoveItem === 'true',
    showDiscount: showDiscount === 'true',
    showSavings: showSavings === 'true',
    quantityType,
    dropdownOptions,
  })(block);
}
