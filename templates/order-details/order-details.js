import { initializers } from '@dropins/tools/initializer.js';
import { events } from '@dropins/tools/event-bus.js';
import * as Order from '@dropins/storefront-order/api.js';
import {
  CUSTOMER_ORDER_DETAILS_PATH,
  CUSTOMER_ORDERS_PATH,
  ORDER_DETAILS_PATH,
  ORDER_STATUS_PATH,
  CUSTOMER_PATH,
} from '../../scripts/constants.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';

export default function buildTemplateOrderDetails() {
  const initializeOrderApi = (orderRef) => {
    initializers.register(Order.initialize, {
      orderRef,
    });
  };

  const currentUrl = new URL(window.location.href);
  const isAccountPage = currentUrl.pathname.includes(CUSTOMER_PATH);
  const orderRef = currentUrl.searchParams.get('orderRef');
  const isTokenProvided = orderRef && orderRef.length > 20;

  let targetPath = null;
  if (currentUrl.pathname.includes(CUSTOMER_ORDERS_PATH)) {
    return;
  }

  if (checkIsAuthenticated()) {
    if (!orderRef) {
      targetPath = CUSTOMER_ORDERS_PATH;
    } else if (isAccountPage) {
      targetPath = isTokenProvided
        ? `${ORDER_DETAILS_PATH}?orderRef=${orderRef}`
        : null;
    } else {
      targetPath = isTokenProvided
        ? null
        : `${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderRef}`;
    }
  } else {
    targetPath = !orderRef ? ORDER_STATUS_PATH : null;
  }

  if (targetPath) {
    window.location.href = targetPath;
  } else {
    initializeOrderApi(orderRef);
  }

  // Events
  events.on('order/error', () => {
    if (checkIsAuthenticated()) {
      window.location.href = CUSTOMER_ORDERS_PATH;
    } else if (isTokenProvided) {
      window.location.href = ORDER_STATUS_PATH;
    } else {
      window.location.href = `${ORDER_STATUS_PATH}?orderRef=${orderRef}`;
    }
  });
}
