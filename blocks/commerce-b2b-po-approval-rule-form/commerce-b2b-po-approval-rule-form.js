import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { ApprovalRuleForm } from '@dropins/storefront-purchase-order/containers/ApprovalRuleForm.js';
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

const redirectToApprovalRulesList = () => {
  window.location.href = rootLink(CUSTOMER_PO_RULES_PATH);
};

/**
 * Initializes and decorates the Approval Rule Form block
 * Redirects unauthenticated users and handles permission updates
 */
const renderApprovalRuleForm = async (
  blockElement,
  permissions = {},
) => {
  const hasAccess = permissions.admin || permissions[PO_PERMISSIONS.MANAGE_RULES];
  if (!hasAccess) {
    redirectToAccountDashboard();
  }

  const approvalRuleID = new URLSearchParams(window.location.search).get('ruleRef') || '';
  if (!approvalRuleID) {
    redirectToApprovalRulesList();
  }

  await purchaseOrderRenderer.render(ApprovalRuleForm, {
    approvalRuleID,
    routeApprovalRulesList: () => rootLink(CUSTOMER_PO_RULES_PATH),
  })(blockElement);
};

export default async function decorate(block) {
  // Redirect guest users
  if (!checkIsAuthenticated()) {
    redirectToLogin();
  }

  // Initial permissions check
  const initialPermissions = events.lastPayload('auth/permissions');
  await renderApprovalRuleForm(block, initialPermissions);

  // React to permission updates
  events.on('auth/permissions', async (updatedPermissions) => {
    await renderApprovalRuleForm(block, updatedPermissions);
  });

  // Handle logout during interaction
  events.on('authenticated', (isAuthenticated) => {
    if (!isAuthenticated) redirectToLogin();
  });
}
