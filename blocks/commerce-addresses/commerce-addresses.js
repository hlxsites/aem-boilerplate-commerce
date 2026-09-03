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
    // Company address book permission decides which title the container renders.
    const permissions = isB2BEnabled
      ? await getCustomerRolePermissions().catch(() => ({}))
      : {};
    // The ACLs below are granted by the customer's role and arrive whether or
    // not the company actually uses an address book, so permissions alone would
    // title the page "Company Addresses" while it is listing personal ones.
    // The company setting decides which dataset is on screen; the permissions
    // decide whether this customer may see it at all.
    const addressBookEnabled = await isCompanyAddressBookEnabled();
    const hasCompanyAddressBook = Boolean(
      addressBookEnabled
      && (permissions.admin || permissions[COMPANY_ADDRESS_PERMISSIONS.VIEW]),
    );

    // Once the company runs an address book, personal addresses are gone and the
    // company ones need the view ACL — so a company user without it has nothing
    // to do here. The nav already hides the entry; this covers the direct URL,
    // which is the only way left to reach the page.
    //
    // Deliberately narrow: B2C and companies without an address book keep their
    // personal addresses, admins carry the permission implicitly, and guests
    // were already sent to login above.
    if (addressBookEnabled && !hasCompanyAddressBook) {
      window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
      return;
    }

    await accountRenderer.render(Addresses, {
      title: hasCompanyAddressBook ? 'Company Addresses' : 'Addresses',
      b2bEnabled: isB2BEnabled,
      minifiedView: minifiedViewConfig === 'true',
      withActionsInMinifiedView: false,
      withActionsInFullSizeView: true,
      routeAddressesPage: () => rootLink(CUSTOMER_ADDRESS_PATH),
    })(block);
  }
}
