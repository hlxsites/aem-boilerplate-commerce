/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { Header } from '@dropins/tools/components.js';

export default async function decorate(block) {
  block.innerHTML = '';

  events.on('order/data', (orderData) => {
    orderRenderer.render(Header, { title: `Order ${orderData.number}` })(block);
  });
}
