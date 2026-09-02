import { readBlockConfig } from '../../scripts/aem.js';
import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ORDER_DETAILS_PATH,
  CUSTOMER_ORDERS_PATH,
  CUSTOMER_RETURN_DETAILS_PATH,
  UPS_TRACKING_URL,
  rootLink,
  getProductLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  const { 'minified-view': minifiedViewConfig = 'false' } = readBlockConfig(block);
  const createProductLink = (productData) => {
    // If product is null/undefined, it's been deleted from catalog
    if (!productData?.product) {
      return rootLink('#');
    }

    // Product exists in catalog, validate it has the required fields
    const { urlKey, topLevelSku } = productData;
    if (urlKey && topLevelSku) {
      return getProductLink(urlKey, topLevelSku);
    }
    return rootLink('#');
  };

  // Load the drop-in lazily, after the guard, so logged-out users don't download it.
  const [
    { render: accountRenderer },
    { OrdersList },
    { tryRenderAemAssetsImage },
  ] = await Promise.all([
    import('@dropins/storefront-account/render.js'),
    import('@dropins/storefront-account/containers/OrdersList.js'),
    import('@dropins/tools/lib/aem/assets.js'),
    import('../../scripts/initializers/account.js'),
  ]);

  await accountRenderer.render(OrdersList, {
    minifiedView: minifiedViewConfig === 'true',
    routeTracking: ({ carrier, number }) => {
      if (carrier === 'ups') {
        return `${UPS_TRACKING_URL}?tracknum=${number}`;
      }
      return '';
    },
    routeOrdersList: () => rootLink(CUSTOMER_ORDERS_PATH),
    routeOrderDetails: (orderNumber) => rootLink(`${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderNumber}`),
    routeReturnDetails: ({ orderNumber, returnNumber }) => rootLink(`${CUSTOMER_RETURN_DETAILS_PATH}?orderRef=${orderNumber}&returnRef=${returnNumber}`),
    routeOrderProduct: createProductLink,
    slots: {
      OrderItemImage: (ctx) => {
        const { data, defaultImageProps } = ctx;
        const anchor = document.createElement('a');
        anchor.href = createProductLink(ctx.data);

        tryRenderAemAssetsImage(ctx, {
          alias: data.product.sku,
          imageProps: defaultImageProps,
          wrapper: anchor,

          params: {
            width: defaultImageProps.width,
            height: defaultImageProps.height,
          },
        });
      },
    },
  })(block);
}
