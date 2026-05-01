import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { SellerAssistedPurchasing } from '@dropins/storefront-account/containers/SellerAssistedPurchasing.js';
import { SellerAssistedBuying } from '@dropins/storefront-account/containers/SellerAssistedBuying.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const container = document.createElement('div');

  const purchasingContainer = document.createElement('div');
  const buyingContainer = document.createElement('div');

  const purchasing = await accountRenderer.render(
    SellerAssistedPurchasing,
    {},
  )(purchasingContainer);

  if (purchasing) {
    await accountRenderer.render(SellerAssistedBuying, {})(buyingContainer);
  }

  container.appendChild(purchasingContainer);
  container.appendChild(buyingContainer);
  block.appendChild(container);
}
