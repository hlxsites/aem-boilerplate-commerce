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

  // Only a company whose address book is switched on gets the override below —
  // B2B alone is not enough. Everyone else keeps the drop-in's own defaults,
  // exactly as before this existed: B2C, guests (the check returns false when
  // unauthenticated), and B2B companies running without an address book.
  //
  // No extra cost on this page: commerce-checkout.js already imports
  // ./account.js and already calls getCompanyAddressBook() for its Place Order
  // gate, so the account drop-in is mounted here either way.
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
    // only writes this value while it is active — so without an explicit default
    // the drop-in keeps its built-in `true`, routes the shipping address through
    // setBillingAddressOnCart with same_as_shipping, and the backend rejects that
    // when custom shipping addresses are allowed.
    //
    // Fails safe rather than silently: if the config read fails,
    // isCompanyAddressBookEnabled() returns false, this override is skipped and
    // the drop-in behaves as it did before.
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
