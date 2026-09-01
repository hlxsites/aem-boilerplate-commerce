import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initialize, setEndpoint } from '@dropins/storefront-checkout/api.js';
import {
  CORE_FETCH_GRAPHQL,
  fetchPlaceholders,
  rootLink,
  detectPageType,
} from '../commerce.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  const pageType = detectPageType();
  const isB2BEnabled = getConfigValue('commerce-b2b-enabled') === true;

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/checkout.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize checkout
  return initializers.mountImmediately(initialize, {
    // The "bill to shipping" checkbox is hidden for B2B, and BillToShippingAddress
    // only writes this value while it is active — so without an explicit default
    // the drop-in keeps its built-in `true`, routes the shipping address through
    // setBillingAddressOnCart with same_as_shipping, and the backend rejects that
    // when custom shipping addresses are allowed. Keep this condition in sync with
    // the one passed to renderBillToShippingAddress in commerce-checkout.js.
    ...(isB2BEnabled && { defaults: { isBillToShipping: false } }),
    features: {
      b2b: {
        quotes: pageType === 'B2B Checkout',
        routeLogin: () => rootLink('/customer/login'),
      },
    },
    langDefinitions,
  });
})();
