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
  const isAuthenticated = !!getCookie('auth_dropin_user_token') || false;

  await orderRenderer.render(OrderSearch, {
    isAuth: isAuthenticated,
    renderSignIn: async ({ render, formValues }) => {
      console.log('render', render);
      if (render) {
        const { email, number } = formValues;

        renderSignIn(block, email, number);

        return false;
      }

      return true;
    },
    routeCustomerOrderDetails: () => '/customer/order-details',
    routeOrderDetails: () => '/order-details',
    onError: async (errorInformation) => {},
  })(block);

  // const checkIsOrderBelongsToCustomer = async (orderEmail) => {
  //   try {
  //     const customerData = await authApi.getCustomerData();
  //     return customerData.email === orderEmail;
  //   } catch {
  //     return false;
  //   }
  // };

  // events.on('order/data', async (orderData) => {
  //   const isAuthenticatedOnDataEvent = !!getCookie('auth_dropin_user_token');

  //   if (isAuthenticatedOnDataEvent) {
  //     const isOrderBelongsToCustomer = await checkIsOrderBelongsToCustomer(orderData.email);

  //     if (isOrderBelongsToCustomer) {
  //       window.location.href = `/customer/order-details?orderRef=${orderData.number}`;
  //     } else if (!orderToken) {
  //       window.location.href = `/order-details?orderRef=${orderData.token}`;
  //     }
  //   } else if (!orderToken) {
  //     window.location.href = `/order-details?orderRef=${orderData.token}`;
  //   }
  // });

  // if (orderToken) {
  //   window.location.href = `/order-details?orderRef=${orderToken}`;
  // } else if (orderNumber) {
  //   if (isAuthenticated) {
  //     window.location.href = `/customer/order-details?orderRef=${orderNumber}`;
  //   } else {
  //     await renderSignIn(block, '', orderNumber);
  //   }
  // } else {
  //   await orderRenderer.render(OrderSearch, {
  //     onError: async (errorInformation) => {
  //       const { error, formValues } = errorInformation;

  //       if (error === 'Please login to view the order.') {
  //         const { email, number } = formValues;

  //         const isOrderBelongsToCustomer = await checkIsOrderBelongsToCustomer(email);

  //         if (isOrderBelongsToCustomer) {
  //           window.location.href = `/customer/order-details?orderRef=${number}`;
  //         } else {
  //           // TODO add url param without reload orderRef - number
  //           await renderSignIn(block, email, number);
  //         }

  //         // Hide error message
  //         return false;
  //       }

  //       return true;
  //     },
  //   })(block);
  // }
}
