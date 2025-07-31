/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';

// Block-level utils
import {
  getCartPaymentMethod,
  isValidPaymentMethod,
} from '../utils.js';

// Container functions
import {
  renderPaymentMethods,
  renderBillToShippingAddress,
} from '../containers.js';

// Components
import {
  COMPONENT_IDS,
  renderStepContinueBtn,
} from '../components.js';

// Fragments
import {
  createPaymentMethodsSummary,
  selectors,
} from '../fragments.js';

// Constants
import {
  CHECKOUT_STEP_ACTIVE,
} from '../constants.js';

/**
 * Creates payment methods step management functions
 */
export const createPaymentMethodsStep = ({
  disablePlaceOrderButton,
  displayBillingStep,
  displayBillingStepSummary,
  formRefs,
  getElement,
  withOverlaySpinner,
}) => {
  // Payment methods specific DOM elements
  const { checkout } = selectors;
  const elements = {
    $paymentMethodsList: getElement(checkout.paymentMethodsList),
    $paymentMethodsSummary: getElement(checkout.paymentMethodsSummary),
    $paymentStep: getElement(checkout.paymentStep),
    $paymentStepContinueBtn: getElement(checkout.paymentStepContinueBtn),
    $billToShipping: getElement(checkout.billToShipping),
  };

  function hasRequiredFields(method) {
    if (!method) return false;
    return method.code !== '' && method.title !== '';
  }

  const continueFromPaymentStep = withOverlaySpinner(async () => {
    const checkoutValues = events.lastPayload('checkout/values');

    // Validate payment method, if failed, abort continuation
    if (!isValidPaymentMethod(checkoutValues, formRefs.creditCardForm)) return;

    const selectedPaymentMethod = checkoutValues?.selectedPaymentMethod;

    if (selectedPaymentMethod?.code) {
      try {
        await checkoutApi.setPaymentMethod({ code: selectedPaymentMethod.code });

        // Make the payment methods step inactive since it's now completed
        await displayPaymentStep(false);
        // Show the payment summary
        await displayPaymentStepSummary(selectedPaymentMethod);
      } catch (error) {
        console.error('Failed to set payment method:', error);
        return;
      }
    }

    if (checkoutValues?.isBillToShipping) {
      // Bill to shipping address is checked - set billing address and show summary
      try {
        await checkoutApi.setBillingAddress({ sameAsShipping: true });

        // Use shipping address data for billing summary since they're the same
        const { data: shippingAddress } = events.lastPayload('checkout/addresses/shipping');

        if (shippingAddress) {
          await displayBillingStepSummary(shippingAddress, false);
        }
      } catch (error) {
        console.error('Failed to set billing address (same as shipping):', error);
        return;
      }
    } else {
      // Bill to shipping address is NOT checked - show billing form
      await displayBillingStep(true);
    }

    events.emit('checkout/step/completed', null);
  });

  async function displayPaymentStep(active = true) {
    await renderPaymentMethods(
      elements.$paymentMethodsList,
      formRefs.creditCardForm,
    );

    await renderBillToShippingAddress(elements.$billToShipping);

    await renderStepContinueBtn(
      elements.$paymentStepContinueBtn,
      COMPONENT_IDS.PAYMENT_STEP_CONTINUE_BTN,
      continueFromPaymentStep,
    );

    elements.$paymentStep.classList.toggle(CHECKOUT_STEP_ACTIVE, active);
  }

  async function displayPaymentStepSummary(paymentMethod = null) {
    if (!hasRequiredFields(paymentMethod)) {
      return;
    }

    const handleEdit = async () => {
      disablePlaceOrderButton();
      await displayPaymentStep(true);
    };

    const summary = createPaymentMethodsSummary(paymentMethod, handleEdit);
    elements.$paymentMethodsSummary.innerHTML = '';
    elements.$paymentMethodsSummary.appendChild(summary);

    elements.$paymentStep.classList.remove(CHECKOUT_STEP_ACTIVE);
  }

  const isPaymentStepComplete = (data) => {
    const paymentMethod = getCartPaymentMethod(data);
    return !!paymentMethod;
  };

  const isPaymentStepActive = () => elements.$paymentStep.classList.contains(CHECKOUT_STEP_ACTIVE);

  return {
    continue: continueFromPaymentStep,
    display: displayPaymentStep,
    displaySummary: displayPaymentStepSummary,
    isActive: isPaymentStepActive,
    isComplete: isPaymentStepComplete,
  };
};
