import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { SellerAssistedBuyingSettings } from '@dropins/storefront-account/containers/SellerAssistedBuyingSettings.js';
import { SellerAssistedBuyingActivity } from '@dropins/storefront-account/containers/SellerAssistedBuyingActivity.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const container = document.createElement('div');

  const purchasingContainer = document.createElement('div');
  const buyingContainer = document.createElement('div');

  const purchasing = await accountRenderer.render(
    SellerAssistedBuyingSettings,
    {},
  )(purchasingContainer);

  if (purchasing) {
    await accountRenderer.render(SellerAssistedBuyingActivity, {})(buyingContainer);
  }

  container.appendChild(purchasingContainer);
  container.appendChild(buyingContainer);
  block.appendChild(container);
}
