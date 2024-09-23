/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as uiProvider } from '@dropins/tools/components.js';

export default function decorate(block) {
  block.innerHTML = '';

  return new Promise((resolve) => {
    events.on('order/data', async (orderData) => {
      const headerContainer = document.createElement('div');
      await uiProvider.render(Header, { title: `Order ${orderData.number}` })(headerContainer);

      if (window.location.href.includes('customer/order-details')) {
        const link = document.createElement('a');
        link.innerText = '< Back to all orders';
        link.href = '/customer/orders';
        link.classList.add('orders-list-link');

        block.appendChild(link);
      }

      block.appendChild(headerContainer);

      resolve();
    }, { eager: true });
  });
}
