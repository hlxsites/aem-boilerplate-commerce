import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { RequireApprovalPurchaseOrders } from '@dropins/storefront-purchase-order/containers/RequireApprovalPurchaseOrders.js';
import { events } from '@dropins/tools/event-bus.js';
import { checkIsAuthenticated, CUSTOMER_LOGIN_PATH, rootLink } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/purchase-order.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  }

  const permissions = events.lastPayload('auth/permissions');
  console.log('commerce-b2b-require-approval-purchase-orders', permissions);
  //
  // const ACCESS_TO_PO = 'Magento_PurchaseOrder::all';
  // const ACCESS_CUSTOMER_PO = 'Magento_PurchaseOrder::view_purchase_orders';
  // const ACCESS_SUBORDINATES_PO = 'Magento_PurchaseOrder::view_purchase_orders_for_subordinates';
  // const ACCESS_COMPANY_PO = 'Magento_PurchaseOrder::view_purchase_orders_for_company';
  //
  // const mappedPermissions = {
  //   accessToPurchaseOrders: !!permissions.admin || !!permissions[ACCESS_TO_PO],
  //   accessToCustomerPurchaseOrders: !!permissions.admin || !!permissions[ACCESS_CUSTOMER_PO],
  //   accessToCompanyPurchaseOrders:
  //     !!permissions.admin
  //     || !!permissions[ACCESS_SUBORDINATES_PO]
  //     || !!permissions[ACCESS_COMPANY_PO],
  // };

  const pageSizeConfig = [
    {
      text: '10',
      value: '10',
      selected: true,
    },
    {
      text: '20',
      value: '20',
      selected: false,
    },
    {
      text: '30',
      value: '30',
      selected: false,
    },
  ];
  const skeletonRowCount = 5;

  await purchaseOrderRenderer.render(
    RequireApprovalPurchaseOrders,
    { initialPageSize: pageSizeConfig, skeletonRowCount },
  )(block);
}
