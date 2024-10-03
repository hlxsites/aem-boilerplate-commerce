// Cart Dropin Modules
import { render as cartProvider } from '@dropins/storefront-cart/render.js';
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

  block.classList.add('cart-summary-list');

  return cartProvider.render(CartSummaryList, {
    hideHeading: hideHeading === 'true',
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    routeEmptyCartCTA: startShoppingURL ? () => startShoppingURL : undefined,
    maxItems: parseInt(maxItems, 10) || undefined,
    attributesToHide: hideAttributes.split(',').map((attr) => attr.trim().toLowerCase()),
    enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
    enableRemoveItem: enableRemoveItem === 'true',
    slots: {
      Heading: (headingCtx) => {
        // TODO: Update this to use the dictionary
        const title = 'Your Cart ({count})';

        const cartSummaryListHeading = document.createElement('div');
        cartSummaryListHeading.classList.add('cart-summary-list__heading');

        const cartSummaryListHeadingText = document.createElement('div');
        cartSummaryListHeadingText.classList.add(
          'cart-summary-list__heading-text',
        );

        cartSummaryListHeadingText.innerText = title.replace(
          '({count})',
          headingCtx.count ? `(${headingCtx.count})` : '',
        );
        const editCartLink = document.createElement('a');
        editCartLink.classList.add('cart-summary-list__edit');
        editCartLink.href = '/cart';
        editCartLink.rel = 'noreferrer';
        editCartLink.innerText = 'Edit';

        cartSummaryListHeading.appendChild(cartSummaryListHeadingText);
        cartSummaryListHeading.appendChild(editCartLink);
        headingCtx.appendChild(cartSummaryListHeading);

        headingCtx.onChange((nextHeadingCtx) => {
          cartSummaryListHeadingText.innerText = title.replace(
            '({count})',
            nextHeadingCtx.count ? `(${nextHeadingCtx.count})` : '',
          );
        });
      },
    },

  })(block);
}
