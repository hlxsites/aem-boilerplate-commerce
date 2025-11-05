import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { CompanyPurchaseOrders } from '@dropins/storefront-purchase-order/containers/CompanyPurchaseOrders.js';
import { events } from '@dropins/tools/event-bus.js';
import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_PATH,
  PO_PERMISSIONS,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/purchase-order.js';

const redirectToLogin = () => {
  window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
};

const redirectToAccountDashboard = () => {
  window.location.href = rootLink(CUSTOMER_PATH);
};

/**
 * Initializes and decorates the Company Purchase Orders block
 * Redirects unauthenticated users and handles permission updates
 */
const renderCompanyPurchaseOrders = async (blockElement, permissions = {}) => {
  /**
   * Redirect only if the customer lacks access to all PO containers
   * Some pages may have multiple PO blocks - hidden ones should not trigger a redirect
   */
  const hasAccessToPurchaseOrders = permissions.admin
    || permissions[PO_PERMISSIONS.PO_ALL]
    || permissions[PO_PERMISSIONS.VIEW_CUSTOMER]
    || permissions[PO_PERMISSIONS.VIEW_SUBORDINATES]
    || permissions[PO_PERMISSIONS.VIEW_COMPANY];

  if (!hasAccessToPurchaseOrders) {
    redirectToAccountDashboard();
    return;
  }

  // Check access to this specific block
  const hasAccessToBlock = permissions.admin
    || permissions[PO_PERMISSIONS.VIEW_SUBORDINATES]
    || permissions[PO_PERMISSIONS.VIEW_COMPANY];

  // Hide the entire block container when the user doesn't have access (prevent layout issues)
  blockElement.parentElement.style.display = hasAccessToBlock
    ? 'block'
    : 'none';
  if (!hasAccessToBlock) {
    blockElement.innerHTML = '';
    return;
  }

  await purchaseOrderRenderer.render(CompanyPurchaseOrders, {
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
