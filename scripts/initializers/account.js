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
export const isCompanyAddressBookEnabled = async () => {
  if (getConfigValue('commerce-b2b-enabled') !== true) return false;
  if (!checkIsAuthenticated()) return false;

  const { addressBookEnabled } = await getCompanyAddressBookConfig();
  return addressBookEnabled === true;
};
