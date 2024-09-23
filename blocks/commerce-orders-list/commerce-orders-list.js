/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { OrdersList } from '@dropins/storefront-account/containers/OrdersList.js';
import { getCookie } from '../../scripts/configs.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const isAuthenticated = !!getCookie('auth_dropin_user_token');

  const {
    'minified-view': minifiedViewConfig = 'false',
  } = readBlockConfig(block);

  if (!isAuthenticated) {
    window.location.href = '/customer/login';
  } else {
    await accountRenderer.render(OrdersList, {
      minifiedView: minifiedViewConfig === 'true',
      routeOrdersList: () => '/customer/orders',
      routeOrderDetails: (orderNumber) => `/customer/order-details?orderRef=${orderNumber}`,
      slots: {
        // OrdersListCard: (ctx) => {
        //   console.log('OrdersListCard', ctx);
        // },
        // OrdersListAction: (ctx) => {
        //   console.log('OrdersListAction', ctx);
        // },
      },
    })(block);
  }
}
