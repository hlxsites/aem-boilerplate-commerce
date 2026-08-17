import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { getCustomerRolePermissions } from '@dropins/storefront-auth/api.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  CUSTOMER_ADDRESS_PATH,
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

const COMPANY_ADDRESS_PERMISSION = 'Magento_CompanyAddressStorefrontCompatibility::company_address';

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
    const hasCompanyAddressBook = Boolean(
      permissions.admin || permissions[COMPANY_ADDRESS_PERMISSION],
    );

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
