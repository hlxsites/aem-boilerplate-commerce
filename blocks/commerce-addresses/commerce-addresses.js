import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  CUSTOMER_ADDRESS_PATH,
  redirectIfUnauthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  if (redirectIfUnauthenticated()) return;

  const {
    'minified-view': minifiedViewConfig = 'false',
  } = readBlockConfig(block);

  await accountRenderer.render(Addresses, {
    minifiedView: minifiedViewConfig === 'true',
    withActionsInMinifiedView: false,
    withActionsInFullSizeView: true,
    routeAddressesPage: () => rootLink(CUSTOMER_ADDRESS_PATH),
  })(block);
}
