import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { PurchaseOrderApprovalRulesList } from '@dropins/storefront-purchase-order/containers/PurchaseOrderApprovalRulesList.js';
import { events } from '@dropins/tools/event-bus.js';
import { checkIsAuthenticated, CUSTOMER_LOGIN_PATH, rootLink } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/purchase-order.js';

const redirectToLogin = () => {
  window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
};

/**
 * Initializes and decorates the Purchase Order Approval Rules List block
 * Redirects unauthenticated users and handles permission updates
 */
const renderPurchaseOrderApprovalRulesList = async (blockElement, permissions = {}) => {
  const VIEW_APPROVAL_RULES_PO_PERMISSION = 'Magento_PurchaseOrderRule::view_approval_rules';

  const hasAccess = permissions.admin
    || permissions[VIEW_APPROVAL_RULES_PO_PERMISSION];

  // Hide the entire block container when the user doesn't have access
  blockElement.parentElement.style.display = hasAccess ? 'block' : 'none';
  if (!hasAccess) {
    blockElement.innerHTML = '';
    return;
  }

  await purchaseOrderRenderer.render(PurchaseOrderApprovalRulesList, {
    routeCreateApprovalRule: () => rootLink('/customer/approval-rule'),
    routeEditApprovalRule: (ruleRef) => rootLink(`/customer/approval-rule?ruleRef=${ruleRef}`),
    routeApprovalRuleDetails: () => rootLink('/customer/approval-rule-details'),
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
  await renderPurchaseOrderApprovalRulesList(block, initialPermissions);

  // React to permission updates
  events.on('auth/permissions', async (updatedPermissions) => {
    await renderPurchaseOrderApprovalRulesList(block, updatedPermissions);
  });

  // Handle logout during interaction
  events.on('authenticated', (isAuthenticated) => {
    if (!isAuthenticated) redirectToLogin();
  });
}
