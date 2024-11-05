/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderReturns } from '@dropins/storefront-order/containers/OrderReturns.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import {
  CUSTOMER_RETURN_DETAILS_PATH,
  RETURN_DETAILS_PATH,
} from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  const returnDetailsPath = checkIsAuthenticated()
    ? CUSTOMER_RETURN_DETAILS_PATH
    : RETURN_DETAILS_PATH;

  await orderRenderer.render(OrderReturns, {
    routeReturnDetails: ({ orderNumber, returnNumber }) => `${returnDetailsPath}?orderRef=${orderNumber}&returnRef=${returnNumber}`,
    routeProductDetails: (productData) => (productData ? `/products/${productData.product.urlKey}/${productData.product.sku}` : '#'),
  })(block);
}
