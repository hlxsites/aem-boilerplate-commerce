import { render as accountRenderer } from '@dropins/storefront-account/render.js';
// TODO: Remove comment when version will be published
// eslint-disable-next-line
import { SellerAssistedPurchasing } from '@dropins/storefront-account/containers/SellerAssistedPurchasing.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const container = document.createElement('div');

  await accountRenderer.render(SellerAssistedPurchasing, {})(container);

  block.appendChild(container);
}
