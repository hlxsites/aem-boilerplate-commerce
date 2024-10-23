// Dropin Tools
import { initializers } from '@dropins/tools/initializer.js';

// Order Confirmation Dropin Modules
import * as orderConfirmationApi from '@dropins/storefront-order-confirmation/api.js';
import OrderConfirmation from '@dropins/storefront-order-confirmation/containers/OrderConfirmation.js';
import { render as orderConfirmationProvider } from '@dropins/storefront-order-confirmation/render.js';

// Auth Dropin Modules
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import { getUserTokenCookie } from '../../../scripts/dropins.js';

// Block-level modules
import { eventState, Events } from '../lib/event-state.js';
import { showModal } from '../lib/modal.js';
import {
  SHIPPING_ADDRESS_DATA_KEY,
  BILLING_ADDRESS_DATA_KEY,
} from '../constants.js';

const orderConfirmationViewHandler = { layout, init, cleanup };

function layout() {}

function init({ block }) {
  // clear address form data
  sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
  sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

  const orderData = eventState[Events.CheckoutOrder].current;
  const token = getUserTokenCookie();
  const orderRef = token ? orderData.number : orderData.token;
  const encodedOrderRef = encodeURIComponent(orderRef);

  window.history.pushState({}, '', `/order-status?orderRef=${encodedOrderRef}`);

  initializers.register(orderConfirmationApi.initialize, {});

  const onSignUpClick = async ({ inputsDefaultValueSet, addressesData }) => {
    const signUpForm = document.createElement('div');

    authProvider.render(SignUp, {
      routeSignIn: () => '/customer/login',
      routeRedirectOnEmailConfirmationClose: () => '/customer/account',
      inputsDefaultValueSet,
      addressesData,
    })(signUpForm);

    showModal(signUpForm);
  };

  orderConfirmationProvider.render(OrderConfirmation, {
    orderRef,
    orderData,
    onSignUpClick,
    routeHome: () => '/',
    routeSupport: () => '/support',
  })(block);
}

function cleanup() {}

export default orderConfirmationViewHandler;
