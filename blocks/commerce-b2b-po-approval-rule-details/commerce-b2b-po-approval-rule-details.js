import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { ApprovalRuleDetails } from '@dropins/storefront-purchase-order/containers/ApprovalRuleDetails.js';
import { events } from '@dropins/tools/event-bus.js';
import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_PATH,
  CUSTOMER_PO_RULES_PATH,
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
 * Initializes and decorates the Purchase Order Approval Rules List block
 * Redirects unauthenticated users and handles permission updates
 */
const renderPurchaseOrderApprovalRulesList = async (
  blockElement,
  permissions = {},
) => {
  const hasAccess = permissions.admin || permissions[PO_PERMISSIONS.VIEW_RULES];

  if (!hasAccess) {
    redirectToAccountDashboard();
  }

  const approvalRuleID = new URLSearchParams(window.location.search).get('ruleRef') || '';

  if (!approvalRuleID) {
    window.location.href = rootLink(CUSTOMER_PO_RULES_PATH);
  }

  await purchaseOrderRenderer.render(ApprovalRuleDetails, {
    approvalRuleID,
    routeApprovalRulesList: () => {
      const redirectURL = rootLink(CUSTOMER_PO_RULES_PATH);

      return redirectURL;
    },
  })(blockElement);
};

export default async function decorate(block) {
  // Redirect guest users
  if (!checkIsAuthenticated()) {
    redirectToLogin();
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
