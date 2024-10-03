// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';

// Checkout Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

// Order Confirmation Dropin Modules
import OrderConfirmation from '@dropins/storefront-order-confirmation/containers/OrderConfirmation.js';
import { render as orderConfirmationProvider } from '@dropins/storefront-order-confirmation/render.js';

// Auth Dropin Modules
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import { getUserTokenCookie } from '../../scripts/dropins.js';
import { createModal } from '../modal/modal.js';

import { overlaySpinner } from '../commerce-checkout-heading/commerce-checkout-heading.js';

// const overlaySpinner = document.createElement('div');
// overlaySpinner.classList.add('checkout__overlay-spinner');

/*
 * Event handlers
 */
let modal = null;
function handleCheckoutOrder(orderData, block) {
  const token = getUserTokenCookie();
  const orderRef = token ? orderData.number : orderData.token;
  const encodedOrderRef = encodeURIComponent(orderRef);

  window.history.pushState({}, '', `/order-status?orderRef=${encodedOrderRef}`);

  const onSignUpClick = async ({ inputsDefaultValueSet, addressesData }) => {
    const signUpForm = document.createElement('div');

    authProvider.render(SignUp, {
      routeSignIn: () => '/customer/login',
      routeRedirectOnEmailConfirmationClose: () => '/customer/account',
      inputsDefaultValueSet,
      addressesData,
    })(signUpForm);

    modal = await createModal([signUpForm]);
    modal.showModal();
  };

  orderConfirmationProvider.render(OrderConfirmation, {
    orderRef,
    orderData,
    onSignUpClick,
    routeHome: () => '/',
    routeSupport: () => '/support',
  })(block);
}

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__place-order');

  events.on('checkout/order', (e) => handleCheckoutOrder(e, block));

  return provider.render(PlaceOrder, {
    onPlaceOrder: async () => {
      overlaySpinner.classList.add('checkout__overlay-spinner--shown');

      try {
        await checkoutApi.placeOrder();
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        overlaySpinner.classList.remove('checkout__overlay-spinner--shown');
      }
    },
  })(block);
}
