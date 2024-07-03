/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';

// Checkout Dropin Modules
import { render as checkoutProvider } from '@dropins/storefront-checkout/render.js';
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import Checkout from '@dropins/storefront-checkout/containers/Checkout.js';

// Auth Dropin Modules
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';

import { createModal } from '../modal/modal.js';

export default async function decorate(block) {
  let signInModal = null;

  // Initialize Dropins
  initializers.register(checkoutApi.initialize, {});

  events.on(
    'authenticated',
    (isAuthenticated) => {
      if (isAuthenticated && signInModal) {
        signInModal.removeModal();
        signInModal = null;
      }
    },
    { eager: true },
  );

  const onSignInClick = async (initialEmailValue) => {
    const signInForm = document.createElement('div');

    authProvider.render(AuthCombine, {
      signInFormConfig: { renderSignUpLink: true, initialEmailValue },
      signUpFormConfig: {},
      resetPasswordFormConfig: {},
    })(signInForm);

    signInModal = await createModal([signInForm]);
    signInModal.showModal();
  };

  return checkoutProvider.render(Checkout, {
    onSignInClick,
    onSignOutClick: () => {
      authApi.revokeCustomerToken();
    },
    routeHome: () => '/',
    routeCart: () => '/cart',
    slots: {
      PaymentMethods: async (context) => {
        context.addPaymentMethodHandler('checkmo', {
          render: (ctx, element) => {
            if (element) {
              // clear the element first
              element.innerHTML = '';
            }

            // Optionally, create and render some custom content here.
            // const $content = document.createElement('div');
            // $content.innerText = 'Custom Check / Money order handler';
            // ctx.appendHTMLElement($content);
          },
        });
      },
    },
  })(block);
}
