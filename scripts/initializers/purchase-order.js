import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-purchase-order/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializeDropin } from './index.js';
import {
  CUSTOMER_B2B_PURCHASE_ORDER_DETAILS_PATH,
  CUSTOMER_B2B_PURCHASE_ORDERS_PATH,
  CORE_FETCH_GRAPHQL,
  fetchPlaceholders,
  rootLink,
} from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/purchase-order.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  let poRef = '';
  const { pathname, searchParams } = new URL(window.location.href);

  // TODO POref
  // if (!checkIsAuthenticated() && !pathname.includes(CUSTOMER_LOGIN_PATH)) {
  //   window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  // }

  // TODO PORef
  if (pathname.includes(CUSTOMER_B2B_PURCHASE_ORDER_DETAILS_PATH)) {
    searchParams.get('poRef');
    poRef = searchParams.get('poRef') || '';
  }

  events.on(
    'purchase-order/error',
    () => {
      if (!pathname.includes(CUSTOMER_B2B_PURCHASE_ORDERS_PATH)) {
        window.location.href = rootLink(CUSTOMER_B2B_PURCHASE_ORDERS_PATH);
      }
    },
    { eager: true },
  );

  // Initialize purchase order
  return initializers.mountImmediately(initialize, { langDefinitions, poRef });
})();
