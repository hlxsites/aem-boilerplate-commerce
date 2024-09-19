/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { OrderSearch } from '@dropins/storefront-order/containers/OrderSearch.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { getCookie } from '../../scripts/configs.js';

const renderSignIn = async (element, email, orderNumber) => authRenderer.render(SignIn, {
  initialEmailValue: email,
  renderSignUpLink: false,
  labels: {
    formTitleText: email
      ? 'Enter your password to view order details'
      : 'Sign in to view order details',
    primaryButtonText: 'View order',
  },
  routeForgotPassword: () => 'reset-password.html',
  routeRedirectOnSignIn: () => `/customer/order-details?orderRef=${orderNumber}`,
})(element);

export default async function decorate(block) {
  block.innerHTML = '';

  const renderComponent = async () => {
    const isAuthenticated = !!getCookie('auth_dropin_user_token') || false;

    await orderRenderer.render(OrderSearch, {
      isAuth: isAuthenticated,
      renderSignIn: async ({ render, formValues }) => {
        if (render) {
          renderSignIn(
            block,
            formValues?.email ?? '',
            formValues?.number ?? ''
          );

          return false;
        }

        return true;
      },
      routeCustomerOrder: () => '/customer/order-details',
      routeGuestOrder: () => {
        block.innerHTML = '';

        return '/order-details';
      },
      onError: async (errorInformation) => {
        console.info('errorInformation', errorInformation);
      },
    })(block);
  };

  renderComponent();

  const handlePopState = () => {
    renderComponent();
  };

  window.addEventListener('popstate', handlePopState);
}
