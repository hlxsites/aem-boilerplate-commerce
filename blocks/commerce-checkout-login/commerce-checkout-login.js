// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';

// Checkout Dropin Modules
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

// Auth Dropin Modules
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import { createModal } from '../modal/modal.js';

import { overlaySpinner } from '../commerce-checkout-heading/commerce-checkout-heading.js';

// const overlaySpinner = document.createElement('div');
// overlaySpinner.classList.add('checkout__overlay-spinner');

/*
 * Event handlers
 */
let modal = null;
function handleAuthenticated(isAuthenticated) {
  if (isAuthenticated && modal) {
    modal.removeModal();
    modal = null;
  }

  if (isAuthenticated) {
    overlaySpinner.classList.add('checkout__overlay-spinner--shown');
  }
}

function handleCheckoutCustomer(nextCheckoutCustomer) {
  if (nextCheckoutCustomer) {
    overlaySpinner.classList.remove('checkout__overlay-spinner--shown');
  }
}

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__login');

  events.on('authenticated', handleAuthenticated, { eager: true });
  events.on('checkout/customer', handleCheckoutCustomer, { eager: true });

  return provider.render(LoginForm, {
    onSignInClick: async (initialEmailValue) => {
      const signInForm = document.createElement('div');

      authProvider.render(AuthCombine, {
        signInFormConfig: {
          renderSignUpLink: true,
          initialEmailValue,
          onSuccessCallback: () => {
            overlaySpinner.classList.add('checkout__overlay-spinner--shown');
          },
        },
        signUpFormConfig: {},
        resetPasswordFormConfig: {},
      })(signInForm);

      modal = await createModal([signInForm]);
      modal.showModal();
    },
    onSignOutClick: () => {
      authApi.revokeCustomerToken();
    },
  })(block);
}
