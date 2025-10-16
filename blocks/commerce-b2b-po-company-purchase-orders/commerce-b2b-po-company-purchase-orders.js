import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { CompanyPurchaseOrders } from '@dropins/storefront-purchase-order/containers/CompanyPurchaseOrders.js';
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
 * Initializes and decorates the Company Purchase Orders block
 * Redirects unauthenticated users and handles permission updates
 */
const renderCompanyPurchaseOrders = async (blockElement, permissions = {}) => {
  const SUBORDINATES_PO_PERMISSION = 'Magento_PurchaseOrder::view_purchase_orders_for_subordinates';
  const COMPANY_PO_PERMISSION = 'Magento_PurchaseOrder::view_purchase_orders_for_company';

  const hasAccess = permissions.admin
    || permissions[SUBORDINATES_PO_PERMISSION]
    || permissions[COMPANY_PO_PERMISSION];

  // Hide the entire block container when the user doesn't have access
  blockElement.parentElement.style.display = hasAccess ? 'block' : 'none';
  if (!hasAccess) {
    blockElement.innerHTML = '';
    return;
  }

  await purchaseOrderRenderer.render(CompanyPurchaseOrders, {
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
  await renderCompanyPurchaseOrders(block, initialPermissions);

  // React to permission updates
  events.on('auth/permissions', async (updatedPermissions) => {
    await renderCompanyPurchaseOrders(block, updatedPermissions);
  });

  // Handle logout during interaction
  events.on('authenticated', (isAuthenticated) => {
    if (!isAuthenticated) redirectToLogin();
  });
}
