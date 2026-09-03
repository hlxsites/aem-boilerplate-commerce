import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { SellerAssistedBuyingSettings } from '@dropins/storefront-account/containers/SellerAssistedBuyingSettings.js';
import { redirectIfUnauthenticated } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  if (redirectIfUnauthenticated()) return;

  const container = document.createElement('div');
  await accountRenderer.render(SellerAssistedBuyingSettings, {})(container);
  block.appendChild(container);
}
