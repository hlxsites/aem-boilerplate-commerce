/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';

// Block-level utils
import {
  getCartShippingMethod,
  isVirtualCart,
} from '../utils.js';

// Container functions
import {
  renderShippingMethods,
} from '../containers.js';

// Components
import {
  COMPONENT_IDS,
  renderStepContinueBtn,
} from '../components.js';

// Fragments
import {
  createShippingMethodsSummary,
  selectors,
} from '../fragments.js';

// Constants
import {
  CHECKOUT_STEP_ACTIVE,
} from '../constants.js';

/**
 * Creates shipping methods step management functions
 */
export const createShippingMethodsStep = ({
  disablePlaceOrderButton,
  displayPaymentStep,
  getElement,
  withOverlaySpinner,
}) => {
  // Shipping methods specific DOM elements
  const { checkout } = selectors;
  const elements = {
    $shippingMethodStep: getElement(checkout.shippingMethodStep),
    $shippingMethodList: getElement(checkout.shippingMethodList),
    $shippingMethodContinueBtn: getElement(checkout.shippingMethodContinueBtn),
    $shippingMethodSummary: getElement(checkout.shippingMethodSummary),
  };

  const continueFromShippingMethodStep = withOverlaySpinner(async () => {
    const checkoutValues = events.lastPayload('checkout/values');

    // set shipping method on cart
    const shippingMethod = checkoutValues?.selectedShippingMethod;

    if (shippingMethod?.value) {
      try {
        await checkoutApi.setShippingMethodsOnCart([{
          carrier_code: shippingMethod.carrier.code,
          method_code: shippingMethod.code,
        }]);
      } catch (error) {
        console.error('Failed to set shipping method:', error);
        return;
      }
    }

    await displayShippingMethodStep(false);
    await displayShippingMethodStepSummary(shippingMethod);
    await displayPaymentStep(true);

    events.emit('checkout/step/completed', null);
  });

  async function displayShippingMethodStep(active = true) {
    await renderShippingMethods(elements.$shippingMethodList);

    await renderStepContinueBtn(
      elements.$shippingMethodContinueBtn,
      COMPONENT_IDS.SHIPPING_METHOD_STEP_CONTINUE_BTN,
      continueFromShippingMethodStep,
    );

    elements.$shippingMethodStep.classList.toggle(CHECKOUT_STEP_ACTIVE, active);
  }

  async function displayShippingMethodStepSummary(shippingMethod = null) {
    if (!shippingMethod) {
      console.warn('No shipping method available for summary');
      return;
    }

    // Transform shipping method data to match expected format
    const summaryData = {
      label: shippingMethod.carrier?.title || shippingMethod.carrier?.code || 'Unknown Carrier',
      description: shippingMethod.title || shippingMethod.description || '',
    };

    const handleEdit = async () => {
      disablePlaceOrderButton();
      await displayShippingMethodStep(true);
    };

    // Create and append the summary
    const summary = createShippingMethodsSummary(summaryData, handleEdit);
    elements.$shippingMethodSummary.innerHTML = '';
    elements.$shippingMethodSummary.appendChild(summary);

    elements.$shippingMethodStep.classList.remove(CHECKOUT_STEP_ACTIVE);
  }

  function isShippingMethodStepComplete(data) {
    if (isVirtualCart(data)) return true;
    const shippingMethod = getCartShippingMethod(data);
    return !!shippingMethod;
  }

  function isShippingMethodStepActive() {
    return elements.$shippingMethodStep.classList.contains(CHECKOUT_STEP_ACTIVE);
  }

  return {
    continue: continueFromShippingMethodStep,
    display: displayShippingMethodStep,
    displaySummary: displayShippingMethodStepSummary,
    isActive: isShippingMethodStepActive,
    isComplete: isShippingMethodStepComplete,
  };
};
