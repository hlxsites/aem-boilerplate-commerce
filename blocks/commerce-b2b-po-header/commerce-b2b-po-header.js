import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as UI } from '@dropins/tools/components.js';
import {
  CUSTOMER_B2B_PURCHASE_ORDER_DETAILS_PATH,
  CUSTOMER_B2B_PURCHASE_ORDERS_PATH,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/purchase-order.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const headerContainer = document.createElement('div');
  await UI.render(Header, { title: 'Purchase Order' })(headerContainer);

  if (window.location.href.includes(CUSTOMER_B2B_PURCHASE_ORDER_DETAILS_PATH)) {
    const placeholders = await fetchPlaceholders();

    const link = document.createElement('a');

    link.innerText = placeholders?.Global?.CommerceOrderHeader?.backToAllOrders;
    link.href = rootLink(CUSTOMER_B2B_PURCHASE_ORDERS_PATH);
    link.classList.add('po-list-link');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  events.on(
    'order/data',
    (orderData) => {
      UI.render(Header, { title: `Purchase Order ${orderData.poNumber}` })(
        headerContainer,
      );
    },
    { eager: true },
  );
}
