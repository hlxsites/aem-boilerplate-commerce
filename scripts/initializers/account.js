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
 * Whether the company address book is enabled for the active company.
 *
 * Lives here rather than in a block so the call happens behind the top-level
 * await above, which guarantees setEndpoint() has already run.
 *
 * Fails closed to `false` (address book off) so that any error leaves the
 * standard Addresses affordances in place — a B2C customer or an older backend
 * must never end up with no address item at all.
 *
 * TODO: this costs one request per page that asks for it. There is no reusable
 * cached-fetch helper in this project — every cache is ad-hoc (see
 * getConfigFromSession in ../commerce.js, blocks/header/renderSellerAssistedBuyingBanner.js,
 * blocks/product-recommendations/product-recommendations.js) — so no cache is added
 * for now. If the extra request becomes a problem, cache it in sessionStorage under a
 * key that includes DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT (otherwise switching
 * company serves the previous company's answer) and clear it on logout next to the
 * SYNC_KEYS cleanup in ./index.js.
 *
 * @returns {Promise<boolean>} True only when the backend reports it enabled.
 */
/**
 * In-flight/settled result for the current page. The account page renders both
 * the nav and the addresses block, and each needs this answer — without the
 * memo that is two blocking round trips before either can paint, which measurably
 * slowed the account pages down.
 *
 * Deliberately per page load: an EDS navigation is a full reload, so this resets
 * on its own and cannot serve a stale answer after a company switch or a logout.
 * See the TODO above for the cross-page cache, which needs real invalidation.
 */
let addressBookEnabledPromise = null;

export const isCompanyAddressBookEnabled = async () => {
  if (getConfigValue('commerce-b2b-enabled') !== true) return false;
  if (!checkIsAuthenticated()) return false;

  if (!addressBookEnabledPromise) {
    // Store the promise, not the resolved value: concurrent callers on the same
    // page then share one request instead of racing two.
    addressBookEnabledPromise = getCompanyAddressBookConfig()
      .then(({ addressBookEnabled }) => addressBookEnabled === true)
      .catch(() => false);
  }

  return addressBookEnabledPromise;
};
