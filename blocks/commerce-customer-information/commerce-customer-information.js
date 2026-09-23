import CustomerInformation from '@dropins/storefront-account/containers/CustomerInformation.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { redirectIfUnauthenticated } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  if (redirectIfUnauthenticated()) return;
  await accountRenderer.render(CustomerInformation, {})(block);
}
