import { h } from '@dropins/tools/preact.js';
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from './commerce.js';

// TODO(ACCS-1630): replace with the real storeConfig `catalog/productalert/allow_stock` flag.
const NOTIFY_ME_ENABLED = true;

const DISCONTINUED_ATTRIBUTE_ID = 'discontinued_product';

function isDiscontinued(product) {
  return !!product?.attributes?.some(
    (attribute) => attribute.id === DISCONTINUED_ATTRIBUTE_ID
      && ['yes', '1'].includes(attribute.value?.toLowerCase()),
  );
}

// Guests never see Notify Me — ACCS-1628's backend is authenticated-only.
export function renderWishlistItemActions(isLoggedIn) {
  return async (ctx) => {
    const { item, onMoveToCart } = ctx;
    const discontinued = isDiscontinued(item.product);
    const inStock = item.product?.inStock;

    const root = document.createElement('div');
    root.className = 'wishlist-item-actions';

    if (!discontinued) {
      if (inStock) {
        await UI.render(Button, {
          children: 'Move to cart',
          size: 'medium',
          type: 'submit',
          icon: h(Icon, { source: 'Cart' }),
          style: { width: '100%' },
          onClick: () => onMoveToCart?.(),
        })(root);
      } else if (NOTIFY_ME_ENABLED && isLoggedIn) {
        const notifyButton = await UI.render(Button, {
          children: 'Notify me',
          size: 'medium',
          type: 'submit',
          style: { width: '100%' },
          onClick: async () => {
            // subscribeStockAlert is an authenticated Commerce Core mutation,
            // but the PDP api is pinned to Catalog Service (for product
            // hydration), whose headers lack the customer Authorization token.
            // Route this one call through Core (which carries the token), then
            // restore CS for hydration.
            pdpApi.setEndpoint(CORE_FETCH_GRAPHQL);
            try {
              const result = await pdpApi.subscribeStockAlert(item.product.sku);
              notifyButton.setProps((prev) => ({
                ...prev,
                children: result?.message || 'You will be notified',
                disabled: true,
              }));
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('Notify me subscribe failed:', error);
              notifyButton.setProps((prev) => ({
                ...prev,
                children: 'Something went wrong, try again',
              }));
            } finally {
              pdpApi.setEndpoint(CS_FETCH_GRAPHQL);
            }
          },
        })(root);
      }
    }

    ctx.replaceWith(root);
  };
}
