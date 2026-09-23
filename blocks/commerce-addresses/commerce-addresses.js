import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import { COMPANY_ADDRESS_PERMISSIONS } from '@dropins/storefront-account/api.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { getCustomerRolePermissions } from '@dropins/storefront-auth/api.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_ADDRESS_PATH,
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import { isCompanyAddressBookEnabled } from '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const isB2BEnabled = getConfigValue('commerce-b2b-enabled');
  const {
    'minified-view': minifiedViewConfig = 'false',
  } = readBlockConfig(block);

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    const permissions = isB2BEnabled
      ? await getCustomerRolePermissions().catch(() => ({}))
      : {};
    // Both are needed: the company setting decides which dataset is on screen,
    // the permissions decide whether this customer may see it at all. The ACLs
    // arrive from the role whether or not the company uses an address book, so
    // on their own they would title a personal list "Company Addresses".
    const addressBookEnabled = await isCompanyAddressBookEnabled();
    const hasCompanyAddressBook = Boolean(
      addressBookEnabled
      && (permissions.admin || permissions[COMPANY_ADDRESS_PERMISSIONS.VIEW]),
    );

    const isMinifiedView = minifiedViewConfig === 'true';

    // A company user without the view ACL has nothing to do here. The nav
    // already hides the entry; this covers the direct URL.
    if (addressBookEnabled && !hasCompanyAddressBook) {
      // The minified instance is the summary on the account page, which is where
      // the redirect points — sending it away would bounce the page off itself
      // forever, so there it just renders nothing.
      if (!isMinifiedView) {
        window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
      }
      return;
    }

    // The drop-in already ships a localized default title for the personal
    // list ("Addresses"), so it is only overridden for the company case,
    // which the drop-in has no wording for on its own. `companyContainerTitle`
    // sits next to the drop-in's own `containerTitle` key, nested per view size
    // the same way every other Addresses string in placeholders/account.json is.
    const viewKey = isMinifiedView ? 'minifiedView' : 'fullSizeView';
    const placeholders = hasCompanyAddressBook
      ? await fetchPlaceholders('placeholders/account.json')
      : undefined;

    await accountRenderer.render(Addresses, {
      title: hasCompanyAddressBook
        ? placeholders?.Account?.[viewKey]?.Addresses?.companyContainerTitle
        : undefined,
      b2bEnabled: isB2BEnabled,
      minifiedView: isMinifiedView,
      withActionsInMinifiedView: false,
      withActionsInFullSizeView: true,
      routeAddressesPage: () => rootLink(CUSTOMER_ADDRESS_PATH),
    })(block);
  }
}
