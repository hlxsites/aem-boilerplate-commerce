import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';
import { showToast } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),

      // tab the container's callback to defer the error message to the toast
      onErrorCallback: (error) => {
        const wrapper = document.createElement('div');
        wrapper.innerText = error;

        showToast(wrapper, { type: 'error' });
      },
    })(block);
  }
}
