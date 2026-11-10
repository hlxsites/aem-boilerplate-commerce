import { render as orderRenderer } from '@dropins/storefront-order/render.js';
// Requires an Order drop-in release exporting the invoice containers.
// eslint-disable-next-line import/no-unresolved
import { OrderInvoices } from '@dropins/storefront-order/containers/OrderInvoices.js';
import { rootLink } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderInvoices, {
    routeInvoiceDetails: (invoice, orderNumber) => {
      const { pathname } = new URL(window.location.href);
      const invoiceDetailsPath = pathname.replace(/\/order-details\/?$/, '/invoice-details');
      const params = new URLSearchParams({
        orderRef: orderNumber,
        invoiceRef: invoice.number,
      });

      return rootLink(`${invoiceDetailsPath}?${params.toString()}`);
    },
  })(block);
}
