import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as UI } from '@dropins/tools/components.js';
import {
  CUSTOMER_ORDER_DETAILS_PATH,
  CUSTOMER_ORDERS_PATH,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();

  const headerContainer = document.createElement('div');
  const headerTitle = placeholders?.Global?.CommerceOrderHeader?.orderHeaderTitle || 'Order';
  await UI.render(Header, { title: headerTitle })(headerContainer);

  if (window.location.href.includes(CUSTOMER_ORDER_DETAILS_PATH)) {
    const link = document.createElement('a');

    link.innerText = placeholders?.Global?.CommerceOrderHeader?.backToAllOrders;
    link.href = rootLink(CUSTOMER_ORDERS_PATH);
    link.classList.add('orders-list-link');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  events.on('order/data', (orderData) => {
    UI.render(Header, { title: `Order ${orderData.number}` })(headerContainer);
  }, { eager: true });
}
