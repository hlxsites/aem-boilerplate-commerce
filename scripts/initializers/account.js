import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import {
  initialize,
  setEndpoint,
  getCompanyAddressBookConfig,
} from '@dropins/storefront-account/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, checkIsAuthenticated, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/account.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize account
  return initializers.mountImmediately(initialize, { langDefinitions });
})();

/**
 * Memoized per page load. Several blocks on the account pages need this answer
 * and would otherwise each fire their own blocking request. An EDS navigation
 * is a full reload, so it cannot go stale across a company switch or a logout.
 *
 * TODO: caching across page loads would need a key that includes the active
 * company, or a switch serves the previous company's answer.
 */
let addressBookEnabledPromise = null;

/**
 * Whether the company address book is enabled for the active company.
 *
 * Lives here rather than in a block so the call happens behind the top-level
 * await above, which guarantees setEndpoint() has already run. Fails closed to
 * `false`, so an error leaves the standard Addresses affordances in place and a
 * B2C customer never ends up with no address item at all.
 *
 * @returns {Promise<boolean>} True only when the backend reports it enabled.
 */
export const isCompanyAddressBookEnabled = async () => {
  if (getConfigValue('commerce-b2b-enabled') !== true) return false;
  if (!checkIsAuthenticated()) return false;

  if (!addressBookEnabledPromise) {
    // The promise, not the resolved value: concurrent callers share one request.
    addressBookEnabledPromise = getCompanyAddressBookConfig()
      .then(({ addressBookEnabled }) => addressBookEnabled === true)
      .catch(() => false);
  }

  return addressBookEnabledPromise;
};
