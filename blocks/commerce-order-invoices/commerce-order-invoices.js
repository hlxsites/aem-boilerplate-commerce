import { render as orderRenderer } from '@dropins/storefront-order/render.js';
// The browser import map uses the local branch build, which is newer than npm's
// installed package.
// eslint-disable-next-line import/no-unresolved
import { OrderInvoices } from '@dropins/storefront-order/containers/OrderInvoices.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderInvoices, {})(block);
}
