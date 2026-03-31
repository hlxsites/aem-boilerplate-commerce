import { PaymentMethods } from '@dropins/storefront-account/containers/PaymentMethods.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const {
    'minified-view': minifiedViewConfig = 'false',
    'with-header': withHeaderConfig = 'true',
  } = readBlockConfig(block);

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    await accountRenderer.render(PaymentMethods, {
      withHeader: withHeaderConfig === 'true',
      minifiedView: minifiedViewConfig === 'true',
    })(block);
  }
}
