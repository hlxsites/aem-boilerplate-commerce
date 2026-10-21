import { render as orderRenderer } from '@dropins/storefront-order/render.js';
// The browser import map uses the locally copied branch build, which exports this container.
// eslint-disable-next-line import/no-unresolved
import { InvoiceDetails } from '@dropins/storefront-order/containers/InvoiceDetails.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { rootLink } from '../../scripts/commerce.js';
import loadInvoicePdfBranding from './invoice-pdf-branding.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  const { pathname, searchParams } = new URL(window.location.href);
  const invoiceRef = searchParams.get('invoiceRef') ?? '';
  const orderRef = searchParams.get('orderRef') ?? '';
  const orderDetailsPath = pathname.replace(/\/invoice-details\/?$/, '/order-details');
  const orderDetailsQuery = new URLSearchParams({ orderRef });

  await orderRenderer.render(InvoiceDetails, {
    invoiceRef,
    routeInvoicesList: () => rootLink(`${orderDetailsPath}?${orderDetailsQuery}`),
    getInvoicePdfBranding: async () => {
      try {
        return await loadInvoicePdfBranding(getConfigValue('invoice-pdf-branding'));
      } catch (error) {
        console.error('Unable to prepare invoice PDF branding.', error);
        throw error;
      }
    },
  })(block);
}
