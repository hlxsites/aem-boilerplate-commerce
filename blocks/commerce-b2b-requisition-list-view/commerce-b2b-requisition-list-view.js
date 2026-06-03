import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import RequisitionListView
  from '@dropins/storefront-requisition-list/containers/RequisitionListView.js';
import { getCustomerData } from '@dropins/storefront-auth/api.js';

import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_REQUISITION_LISTS_PATH,
  rootLink,
} from '../../scripts/commerce.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    // Ensure requisition list is initialized and get required props
    // (getProductData, enrichConfigurableProducts)
    const {
      getProductData,
      enrichConfigurableProducts,
    } = await import('../../scripts/initializers/requisition-list.js');

    // Get current customer email for share functionality (filters logged-in user from
    // the share-with dropdown). getCustomerData uses force-cache so this is served
    // from the browser cache — no extra network request after the initial sign-in.
    const token = getUserTokenCookie();
    const customerData = token ? await getCustomerData(token) : null;
    const currentCustomerEmail = customerData?.email;

    const renderView = async () => {
      const { searchParams } = new URL(window.location.href);
      const requisitionListUid = searchParams.get('requisitionListUid');

      return rlRenderer.render(RequisitionListView, {
        requisitionListUid,
        routeRequisitionListGrid: () => rootLink(`${CUSTOMER_REQUISITION_LISTS_PATH}`),
        getProductData,
        enrichConfigurableProducts,
        currentCustomerEmail,
        routeSharedRequisitionList: (relativeUrl) => `${window.location.origin}${rootLink(relativeUrl)}`,
      })(block);
    };

    await renderView();

    // Show pending alert (e.g. success after importing a shared list)
    try {
      const pending = localStorage.getItem('requisitionListPendingAlert');
      if (pending) {
        const { listName, ...alertPayload } = JSON.parse(pending);
        if (listName) alertPayload.listName = listName;
        localStorage.removeItem('requisitionListPendingAlert');
        const { events } = await import('@dropins/tools/event-bus.js');
        // Delay ensures the dropin is fully mounted and translations are settled
        // before the event is emitted. The dropin's useEffect re-runs when i18n
        // translations load, briefly deregistering the listener; 1500 ms gives
        // enough headroom for that cycle to complete.
        setTimeout(() => events.emit('requisitionList/alert', alertPayload), 1500);
      }
    } catch { /* ignore storage errors */ }
  }
}
