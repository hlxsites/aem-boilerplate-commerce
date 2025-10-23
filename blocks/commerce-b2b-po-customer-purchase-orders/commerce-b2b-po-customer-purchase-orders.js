import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { CustomerPurchaseOrders } from '@dropins/storefront-purchase-order/containers/CustomerPurchaseOrders.js';
import { events } from '@dropins/tools/event-bus.js';
import { checkIsAuthenticated, CUSTOMER_LOGIN_PATH, rootLink } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/purchase-order.js';

const PAGE_SIZE_OPTIONS = [
  { text: '10', value: '10', selected: true },
  { text: '20', value: '20', selected: false },
  { text: '30', value: '30', selected: false },
];

const redirectToLogin = () => {
  window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
};

/**
 * Initializes and decorates the Customer Purchase Orders block
 * Redirects unauthenticated users and handles permission updates
 */
const renderCustomerPurchaseOrders = async (blockElement, permissions = {}) => {
  const CUSTOMER_PO_PERMISSION = 'Magento_PurchaseOrder::view_purchase_orders';
  const hasAccess = permissions.admin || permissions[CUSTOMER_PO_PERMISSION];

  // Hide the entire block container when the user doesn't have access
  blockElement.parentElement.style.display = hasAccess ? 'block' : 'none';
  if (!hasAccess) {
    blockElement.innerHTML = '';
    return;
  }

  await purchaseOrderRenderer.render(CustomerPurchaseOrders, {
    initialPageSize: PAGE_SIZE_OPTIONS,
    skeletonRowCount: 5,
  })(blockElement);
};

export default async function decorate(block) {
  // Redirect guest users
  if (!checkIsAuthenticated()) {
    redirectToLogin();
    return;
  }

  // Initial permissions check
  const initialPermissions = events.lastPayload('auth/permissions');
  await renderCustomerPurchaseOrders(block, initialPermissions);

  // React to permission updates
  events.on('auth/permissions', async (updatedPermissions) => {
    await renderCustomerPurchaseOrders(block, updatedPermissions);
  });

  // Handle logout during interaction
  events.on('authenticated', (isAuthenticated) => {
    if (!isAuthenticated) redirectToLogin();
  });
}
