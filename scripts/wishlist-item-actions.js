import { h } from '@dropins/tools/preact.js';
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
import { CORE_FETCH_GRAPHQL } from './commerce.js';

// Back-in-stock (Notify Me) alerts are gated on the store config
// catalog/productalert/allow_stock, exposed as storeConfig.product_alert_allow_stock
// on Commerce Core. Fetch it once and reuse the result across item renders.
const STORE_CONFIG_ALERT_QUERY = `
  query {
    storeConfig {
      product_alert_allow_stock
    }
  }
`;

// subscribeProductAlertStock is an authenticated Commerce Core mutation. There
// is no PDP drop-in wrapper for it (PDP is a Catalog Service drop-in), so the
// storefront calls it directly through its Commerce Core fetch, which carries
// the customer token.
const SUBSCRIBE_PRODUCT_ALERT_STOCK = `
  mutation SubscribeProductAlertStock($input: ProductAlertStockInput!) {
    subscribeProductAlertStock(input: $input) {
      success
      message
    }
  }
`;

// Reflects an existing subscription so the button can render its
// already-subscribed state on load instead of resetting to "Notify me".
const IS_SUBSCRIBED_PRODUCT_ALERT_STOCK = `
  query IsSubscribedProductAlertStock($input: ProductAlertStockInput!) {
    isSubscribedProductAlertStock(input: $input) {
      isSubscribed
    }
  }
`;

async function isAlreadySubscribed(sku) {
  try {
    const { data } = await CORE_FETCH_GRAPHQL.fetchGraphQl(
      IS_SUBSCRIBED_PRODUCT_ALERT_STOCK,
      { method: 'GET', variables: { input: { sku } } },
    );
    return Boolean(data?.isSubscribedProductAlertStock?.isSubscribed);
  } catch (error) {
    // On failure, fall back to the actionable state so the shopper can retry.
    return false;
  }
}

let notifyMeEnabledPromise;
function isNotifyMeEnabled() {
  if (!notifyMeEnabledPromise) {
    notifyMeEnabledPromise = CORE_FETCH_GRAPHQL
      .fetchGraphQl(STORE_CONFIG_ALERT_QUERY)
      .then(({ data }) => Boolean(data?.storeConfig?.product_alert_allow_stock))
      .catch(() => false);
  }
  return notifyMeEnabledPromise;
}

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
    const notifyMeEnabled = await isNotifyMeEnabled();

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
      } else if (notifyMeEnabled && isLoggedIn) {
        const alreadySubscribed = await isAlreadySubscribed(item.product.sku);
        const notifyButton = await UI.render(Button, {
          children: alreadySubscribed ? 'Already subscribed' : 'Notify me',
          size: 'medium',
          type: 'submit',
          style: { width: '100%' },
          disabled: alreadySubscribed,
          onClick: async () => {
            try {
              const { data, errors } = await CORE_FETCH_GRAPHQL.fetchGraphQl(
                SUBSCRIBE_PRODUCT_ALERT_STOCK,
                { variables: { input: { sku: item.product.sku } } },
              );
              const result = data?.subscribeProductAlertStock;
              if (errors?.length || !result?.success) {
                throw new Error(
                  result?.message
                    || errors?.[0]?.message
                    || 'Unable to subscribe to stock alert.',
                );
              }
              notifyButton.setProps((prev) => ({
                ...prev,
                children: result.message || 'You will be notified',
                disabled: true,
              }));
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('Notify me subscribe failed:', error);
              notifyButton.setProps((prev) => ({
                ...prev,
                children: 'Something went wrong, try again',
              }));
            }
          },
        })(root);
      }
    }

    ctx.replaceWith(root);
  };
}
