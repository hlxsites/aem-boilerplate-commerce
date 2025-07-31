/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';

// Block-level utils
import {
  getCartAddress,
  isVirtualCart,
  transformAddressFormValues,
  validateForm,
} from '../utils.js';

// Container functions
import {
  CONTAINERS,
  renderCustomerShippingAddresses,
  renderLoginForm,
  renderShippingAddressForm,
  unmountContainer,
} from '../containers.js';

// Components
import {
  COMPONENT_IDS,
  renderStepContinueBtn,
} from '../components.js';

// Fragments
import {
  createAddressSummary,
  createLoginFormSummary,
  selectors,
} from '../fragments.js';

// Constants
import {
  CHECKOUT_STEP_ACTIVE,
  LOGIN_FORM_NAME,
  SHIPPING_FORM_NAME,
} from '../constants.js';

/**
 * Creates shipping step management functions
 */
export const createShippingStep = ({
  activateStep,
  disablePlaceOrderButton,
  displayPaymentStep,
  displayShippingMethodStep,
  formRefs,
  getElement,
  isAuthenticated,
  withOverlaySpinner,
}) => {
  // Shipping-specific DOM elements
  const { checkout } = selectors;

  const elements = {
    $loginForm: getElement(checkout.loginForm),
    $loginFormSummary: getElement(checkout.loginFormSummary),
    $shippingAddressForm: getElement(checkout.shippingAddressForm),
    $shippingAddressFormSummary: getElement(checkout.shippingAddressFormSummary),
    $shippingStep: getElement(checkout.shippingStep),
    $shippingStepContinueBtn: getElement(checkout.shippingStepContinueBtn),
  };

  const isActiveCartVirtual = () => {
    const cart = events.lastPayload('checkout/updated');
    return isVirtualCart(cart);
  };

  const continueFromShippingStep = withOverlaySpinner(async () => {
    const authenticated = isAuthenticated();

    const checkoutValues = events.lastPayload('checkout/values');
    const email = checkoutValues?.email;

    if (!authenticated) {
      if (!validateForm(LOGIN_FORM_NAME)) return;

      try {
        await checkoutApi.setGuestEmailOnCart(email);
      } catch (error) {
        console.error('Error setting guest email on cart:', error);
        return;
      }
    }

    if (isActiveCartVirtual()) {
      // Virtual products: skip shipping address validation and go directly to payment
      await displayShippingStep(false);
      await displayShippingStepSummary(email, null); // No shipping address for virtual
      await displayPaymentStep(true);
      return;
    }

    // Physical products: handle shipping address validation
    if (!validateForm(SHIPPING_FORM_NAME, formRefs.shippingForm)) return;

    // Get shipping address from form ref first, fall back to events if form is unmounted
    const shippingAddress = formRefs.shippingForm.current?.formData
                           || events.lastPayload('checkout/addresses/shipping')?.data;

    try {
      await checkoutApi.setShippingAddress(transformAddressFormValues(shippingAddress));
    } catch (error) {
      console.error('Failed to set email and shipping address:', error);
      return;
    }

    await displayShippingStep(false);
    await displayShippingStepSummary(email, shippingAddress);
    await displayShippingMethodStep(true);

    events.emit('checkout/step/completed', null);
  });

  async function displayShippingStep(active = true, data = null) {
    activateStep(elements.$shippingStep, active);

    await renderLoginForm(elements.$loginForm, {
      onSuccessCallback: withOverlaySpinner(() => new Promise((resolve) => {
        const listener = events.on('checkout/updated', () => {
          listener.off();
          resolve();
        });
      })),
    });

    if (!isActiveCartVirtual()) {
      if (isAuthenticated()) {
        await renderCustomerShippingAddresses(
          elements.$shippingAddressForm,
          formRefs.shippingForm,
          data,
        );
      } else {
        await renderShippingAddressForm(
          elements.$shippingAddressForm,
          formRefs.shippingForm,
          data,
        );
      }
    } else {
      // For virtual products, unmount any existing shipping forms and clear container
      unmountContainer(CONTAINERS.SHIPPING_ADDRESS_FORM);
      unmountContainer(CONTAINERS.CUSTOMER_SHIPPING_ADDRESSES);
      formRefs.shippingForm.current = null;
      elements.$shippingAddressForm.innerHTML = '';
    }

    await renderStepContinueBtn(
      elements.$shippingStepContinueBtn,
      COMPONENT_IDS.SHIPPING_STEP_CONTINUE_BTN,
      continueFromShippingStep,
    );
  }

  async function displayShippingStepSummary(email, shippingAddress = null) {
    const handleEdit = async () => {
      disablePlaceOrderButton();
      await displayShippingStep(true, events.lastPayload('checkout/updated'));
    };

    const loginFormSummary = createLoginFormSummary(email, handleEdit);
    elements.$loginFormSummary.innerHTML = '';
    elements.$loginFormSummary.appendChild(loginFormSummary);

    // Only show shipping address summary for physical products
    if (shippingAddress) {
      const shippingAddressFormSummary = createAddressSummary(shippingAddress, handleEdit);
      elements.$shippingAddressFormSummary.innerHTML = '';
      elements.$shippingAddressFormSummary.appendChild(shippingAddressFormSummary);
    }

    elements.$shippingStep.classList.remove(CHECKOUT_STEP_ACTIVE);
  }

  const isShippingStepComplete = (data) => {
    if (isVirtualCart(data)) {
      // Virtual products: only email required
      return !!data.email;
    }
    // Physical products: email + shipping address required
    const cartShippingAddress = getCartAddress(data, 'shipping');
    return !!(data.email && cartShippingAddress);
  };

  // eslint-disable-next-line max-len
  const isShippingStepActive = () => elements.$shippingStep.classList.contains(CHECKOUT_STEP_ACTIVE);

  return {
    continue: continueFromShippingStep,
    display: displayShippingStep,
    displaySummary: displayShippingStepSummary,
    isActive: isShippingStepActive,
    isComplete: isShippingStepComplete,
  };
};
