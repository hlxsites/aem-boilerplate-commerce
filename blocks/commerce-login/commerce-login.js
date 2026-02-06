import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  checkIsAuthenticated,
  rootLink,
  getElementFromRow,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  const header = getElementFromRow(block, 'content-header');
  const footer = getElementFromRow(block, 'content-footer');

  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
      renderSignUpLink: true,
      slots: {
        Title: (ctx) => {
          if (header) {
            ctx.appendSibling(header);
          }
        },

        Buttons: (ctx) => {
          if (footer) {
            ctx.prependSibling(footer);
          }
        },

      },
    })(block);
  }
}
