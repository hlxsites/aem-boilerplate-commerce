import * as rlApi from '@dropins/storefront-requisition-list/api.js';

export default async function decorate(block) {
  const isEnabled = await rlApi.isRequisitionListEnabled();
  if (isEnabled) {
    block.innerText = 'Requisition List is enabled';
  } else {
    block.innerText = 'Requisition List is disabled';
  }
}
