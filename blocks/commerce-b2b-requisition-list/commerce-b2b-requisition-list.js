import * as rlApi from '@dropins/storefront-requisition-list/api.js';
import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import RequisitionListGrid from '@dropins/storefront-requisition-list/containers/RequisitionListGrid.js';

import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    const isEnabled = await rlApi.isRequisitionListEnabled();
    if (!isEnabled) {
      return;
    }
    await rlRenderer.render(RequisitionListGrid, {
      requisitionLists: await rlApi.getRequisitionLists(),
      slots: {},
    })(block);
  }
}
