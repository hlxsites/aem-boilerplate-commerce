import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { SellerAssistedBuyingActivity } from '@dropins/storefront-account/containers/SellerAssistedBuyingActivity.js';
import { redirectIfUnauthenticated } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  if (redirectIfUnauthenticated()) return;

  const container = document.createElement('div');
  await accountRenderer.render(SellerAssistedBuyingActivity, {
    withWrapper: false,
  })(container);
  block.appendChild(container);
}
