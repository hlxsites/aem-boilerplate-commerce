/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { CreateReturn } from '@dropins/storefront-order/containers/CreateReturn.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { ORDER_DETAILS_PATH, CUSTOMER_ORDER_DETAILS_PATH } from '../../scripts/constants.js';
import { rootLink } from '../../scripts/scripts.js';
import { tryRenderAemAssetsImage } from '../../scripts/assets.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(CreateReturn, {
    slots: {
      ReturnReasonFormImage: (ctx) => {
        const { data, defaultImageProps } = ctx;
        tryRenderAemAssetsImage(ctx, {
          alias: data.product.sku,
          imageProps: defaultImageProps,
        });
      },
      CartSummaryItemImage: (ctx) => {
        const { data, defaultImageProps } = ctx;
        tryRenderAemAssetsImage(ctx, {
          alias: data.product.sku,
          imageProps: defaultImageProps,
        });
      },
    },
    routeReturnSuccess: (orderData) => {
      const orderRef = checkIsAuthenticated() ? orderData.number : orderData.token;
      const encodedOrderRef = encodeURIComponent(orderRef);
      const path = checkIsAuthenticated() ? CUSTOMER_ORDER_DETAILS_PATH : ORDER_DETAILS_PATH;

      return rootLink(`${path}?orderRef=${encodedOrderRef}`);
    },
  })(block);
}
