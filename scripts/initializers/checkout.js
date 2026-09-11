import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-checkout/api.js';
import {
  CORE_FETCH_GRAPHQL,
  fetchPlaceholders,
  rootLink,
  detectPageType,
} from '../commerce.js';
import { initializeDropin } from './index.js';
import { isCompanyAddressBookEnabled } from './account.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  const pageType = detectPageType();

  // B2B alone is not enough — only a company whose address book is on gets the
  // override below. Everyone else keeps the drop-in's own defaults.
  const isAddressBookEnabled = await isCompanyAddressBookEnabled();

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/checkout.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize checkout
  return initializers.mountImmediately(initialize, {
    // The "bill to shipping" checkbox is hidden here, and BillToShippingAddress
    // only writes this value while it is active. Without an explicit default the
    // drop-in keeps its built-in `true`, routes shipping through
    // setBillingAddressOnCart with same_as_shipping, and the backend rejects that
    // when custom shipping addresses are allowed.
    ...(isAddressBookEnabled && { defaults: { isBillToShipping: false } }),
    features: {
      b2b: {
        quotes: pageType === 'B2B Checkout',
        routeLogin: () => rootLink('/customer/login'),
      },
    },
    langDefinitions,
  });
})();
