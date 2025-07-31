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
  transformAddressFormValues,
  validateForm,
} from '../utils.js';

// Container functions
import {
  renderCustomerBillingAddresses,
  renderBillingAddressForm,
} from '../containers.js';

// Components
import {
  COMPONENT_IDS,
  renderStepContinueBtn,
} from '../components.js';

// Fragments
import {
  createAddressSummary,
  selectors,
} from '../fragments.js';

// Constants
import {
  CHECKOUT_STEP_ACTIVE,
  BILLING_FORM_NAME,
} from '../constants.js';

/**
 * Creates billing address step management functions
 */
export const createBillingAddressStep = ({
  disablePlaceOrderButton,
  formRefs,
  getElement,
  isAuthenticated,
  withOverlaySpinner,
}) => {
  // Billing address specific DOM elements
  const { checkout } = selectors;

  const elements = {
    $billingForm: getElement(checkout.billingForm),
    $billingFormSummary: getElement(checkout.billingFormSummary),
    $billingStep: getElement(checkout.billingStep),
    $billingStepContinueBtn: getElement(checkout.billingStepContinueBtn),
  };

  const continueFromBillingStep = withOverlaySpinner(async () => {
    const checkoutValues = events.lastPayload('checkout/values');

    if (!checkoutValues?.isBillToShipping) {
      if (!validateForm(BILLING_FORM_NAME, formRefs.billingForm)) return;

      // Get billing address from form ref first, fall back to events if form is unmounted
      const billingAddress = formRefs.billingForm.current?.formData
                                 || events.lastPayload('checkout/addresses/billing')?.data;

      try {
        await checkoutApi.setBillingAddress(transformAddressFormValues(billingAddress));

        await displayBillingStep(false);
      } catch (error) {
        console.error('Failed to set billing address:', error);
        return;
      }

      if (billingAddress) {
        await displayBillingStepSummary(billingAddress, !checkoutValues?.isBillToShipping);
      }
    } else {
      await displayBillingStep(false);
    }

    events.emit('checkout/step/completed', null);
  });

  async function displayBillingStep(active = true, data = null) {
    if (isAuthenticated()) {
      await renderCustomerBillingAddresses(
        elements.$billingForm,
        formRefs.billingForm,
        data,
      );
    } else {
      await renderBillingAddressForm(
        elements.$billingForm,
        formRefs.billingForm,
      );
    }

    await renderStepContinueBtn(
      elements.$billingStepContinueBtn,
      COMPONENT_IDS.BILLING_STEP_CONTINUE_BTN,
      continueFromBillingStep,
    );

    elements.$billingStep.classList.toggle(CHECKOUT_STEP_ACTIVE, active);
  }

  async function displayBillingStepSummary(data, showEditLink = true) {
    const handleEdit = showEditLink ? async () => {
      disablePlaceOrderButton();
      await displayBillingStep(true);
    } : null;

    const summary = createAddressSummary(data, handleEdit);
    elements.$billingFormSummary.innerHTML = '';
    elements.$billingFormSummary.appendChild(summary);

    elements.$billingStep.classList.remove(CHECKOUT_STEP_ACTIVE);
  }

  const isBillingStepComplete = (data) => {
    const cartBillingAddress = getCartAddress(data, 'billing');
    const sameAsBilling = data?.shippingAddresses?.[0]?.sameAsBilling;
    return !!(cartBillingAddress || sameAsBilling);
  };

  const isBillingStepActive = () => elements.$billingStep.classList.contains(CHECKOUT_STEP_ACTIVE);

  return {
    continue: continueFromBillingStep,
    display: displayBillingStep,
    displaySummary: displayBillingStepSummary,
    isActive: isBillingStepActive,
    isComplete: isBillingStepComplete,
  };
};
