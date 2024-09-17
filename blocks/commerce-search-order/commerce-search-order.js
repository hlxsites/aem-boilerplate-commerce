/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { OrderSearch } from '@dropins/storefront-order/containers/OrderSearch.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { getCookie } from '../../scripts/configs.js';

const checkIsOrderBelongsToCustomer = async (orderEmail) => {
  try {
    const customerData = await authApi.getCustomerData();
    return customerData.email === orderEmail;
  } catch {
    return false;
  }
};

const renderSignIn = async (element, email, orderNumber) => authRenderer.render(SignIn, {
  initialEmailValue: email,
  renderSignUpLink: false,
  labels: {
    formTitleText: email ? 'Enter your password to view order details' : 'Sign in to view order details',
    primaryButtonText: 'View order',
  },
  routeForgotPassword: () => 'reset-password.html',
  routeRedirectOnSignIn: () => `/customer/order-details?orderRef=${orderNumber}`,
})(element);

export default async function decorate(block) {
  const isAuthenticated = !!getCookie('auth_dropin_user_token');

  const currentUrl = new URL(window.location.href);
  const orderRef = currentUrl.searchParams.get('orderRef');
  const orderToken = orderRef && orderRef.length > 20 ? orderRef : null;
  const orderNumber = orderRef && orderRef.length < 20 ? orderRef : null;

  events.on('order/data', async (orderData) => {
    const isAuthenticatedOnDataEvent = !!getCookie('auth_dropin_user_token');

    if (isAuthenticatedOnDataEvent) {
      const isOrderBelongsToCustomer = await checkIsOrderBelongsToCustomer(orderData.email);

      if (isOrderBelongsToCustomer) {
        window.location.href = `/customer/order-details?orderRef=${orderData.number}`;
      } else if (!orderToken) {
        window.location.href = `/order-details?orderRef=${orderData.token}`;
      }
    } else if (!orderToken) {
      window.location.href = `/order-details?orderRef=${orderData.token}`;
    }
  });

  if (orderToken) {
    window.location.href = `/order-details?orderRef=${orderToken}`;
  } else if (orderNumber) {
    if (isAuthenticated) {
      window.location.href = `/customer/order-details?orderRef=${orderNumber}`;
    } else {
      await renderSignIn(block, '', orderNumber);
    }
  } else {
    await orderRenderer.render(OrderSearch, {
      onError: async (errorInformation) => {
        const { error, formValues } = errorInformation;

        if (error === 'Please login to view the order.') {
          const { email, number } = formValues;

          const isOrderBelongsToCustomer = await checkIsOrderBelongsToCustomer(email);

          if (isOrderBelongsToCustomer) {
            window.location.href = `/customer/order-details?orderRef=${number}`;
          } else {
            // TODO add url param without reload orderRef - number
            await renderSignIn(block, email, number);
          }

          // Hide error message
          return false;
        }

        return true;
      },
    })(block);
  }
}
