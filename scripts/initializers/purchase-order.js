import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setFetchGraphQlHeaders,
} from '@dropins/storefront-purchase-order/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializeDropin } from './index.js';
import {
  checkIsAuthenticated,
  CUSTOMER_B2B_PURCHASE_ORDER_DETAILS_PATH,
  CUSTOMER_B2B_PURCHASE_ORDERS_PATH,
  CUSTOMER_LOGIN_PATH,
  fetchPlaceholders,
  rootLink,
} from '../commerce.js';

await initializeDropin(async () => {
  let poRef = '';
  const { pathname, searchParams } = new URL(window.location.href);

  // TODO - After getting access to DA - create proper headers config - purchase-order
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('checkout') }));

  // TODO - After getting access to DA - create proper placeholder config - purchase-order.json
  const labels = await fetchPlaceholders('placeholders/checkout.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // TODO POref
  // if (!checkIsAuthenticated() && !pathname.includes(CUSTOMER_LOGIN_PATH)) {
  //   window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  // }

  events.on(
    'purchase-order/error',
    () => {
      if (!pathname.includes(CUSTOMER_B2B_PURCHASE_ORDERS_PATH)) {
        window.location.href = rootLink(CUSTOMER_B2B_PURCHASE_ORDERS_PATH);
      }
    },
    { eager: true },
  );

  // TODO PORef
  if (pathname.includes(CUSTOMER_B2B_PURCHASE_ORDER_DETAILS_PATH)) {
    searchParams.get('poRef');
    poRef = searchParams.get('poRef') || '';
  }

  return initializers.mountImmediately(initialize, { langDefinitions, poRef });
})();
