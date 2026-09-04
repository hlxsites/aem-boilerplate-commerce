import { h } from '@dropins/tools/preact.js';
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';

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
        await UI.render(Button, {
          children: 'Notify me',
          size: 'medium',
          type: 'submit',
          style: { width: '100%' },
          onClick: async () => {
            await pdpApi.subscribeStockAlert(item.product.sku);
          },
        })(root);
      }
    }

    ctx.replaceWith(root);
  };
}
