import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/auth.js';

function getRedirectAfterSignIn() {
  const redirectUrl = new URL(window.location.href).searchParams.get('redirectUrl');
  if (!redirectUrl) return rootLink(CUSTOMER_ACCOUNT_PATH);

  const destination = new URL(redirectUrl, window.location.origin);
  if (destination.origin !== window.location.origin) return rootLink(CUSTOMER_ACCOUNT_PATH);

  return rootLink(`${destination.pathname}${destination.search}${destination.hash}`);
}

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      routeRedirectOnSignIn: getRedirectAfterSignIn,
    })(block);
  }
}
