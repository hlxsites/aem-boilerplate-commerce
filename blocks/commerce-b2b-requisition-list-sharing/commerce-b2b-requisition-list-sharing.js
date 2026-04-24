import { render as provider } from '@dropins/storefront-requisition-list/render.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import SharedRequisitionList from '@dropins/storefront-requisition-list/containers/SharedRequisitionList.js';

import '../../scripts/initializers/auth.js';
import '../../scripts/initializers/requisition-list.js';

import {
  checkIsAuthenticated,
  CUSTOMER_REQUISITION_LIST_DETAILS_PATH,
  CUSTOMER_REQUISITION_LISTS_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  rootLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  const token = new URL(window.location.href).searchParams.get('requisition_id');
  if (!token) { window.location.href = rootLink(CUSTOMER_REQUISITION_LISTS_PATH); return; }

  if (!checkIsAuthenticated()) {
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      routeRedirectOnSignIn: () => window.location.href,
    })(block);
    return;
  }

  provider.render(SharedRequisitionList, {
    token,
    routeRequisitionList: (uid, listName) => {
      try {
        localStorage.setItem('requisitionListPendingAlert', JSON.stringify({
          action: 'import', type: 'success', context: 'requisitionList', listName,
        }));
      } catch { /* ignore storage errors (quota exceeded, private mode) */ }
      window.location.href = rootLink(`${CUSTOMER_REQUISITION_LIST_DETAILS_PATH}?requisitionListUid=${uid}`);
    },
  })(block);
}
