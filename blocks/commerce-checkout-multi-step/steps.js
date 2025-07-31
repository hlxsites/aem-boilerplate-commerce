/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable max-len */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';

// Order Dropin
import * as orderApi from '@dropins/storefront-order/api.js';

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';

// Scripts
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import { fetchPlaceholders } from '../../scripts/commerce.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Block-level utils
import {
  getCartAddress,
  getCartPaymentMethod,
  getCartShippingMethod,
  isDataEmpty,
  isVirtualCart,
  removeModal,
  scrollToElement,
  setMetaTags,
  validateForm,
} from './utils.js';

// Container functions
import {
  CONTAINERS,
  hasContainer,
  renderCartSummaryList,
  renderCustomerBillingAddresses,
  renderCustomerDetails,
  renderCustomerShippingAddresses,
  renderEmptyCart,
  renderMergedCartBanner,
  renderOrderCostSummary,
  renderOrderHeader,
  renderOrderProductList,
  renderOrderStatus,
  renderOrderSummary,
  renderOutOfStock,
  renderPlaceOrder,
  renderServerError,
  renderShippingStatus,
  renderTermsAndConditions,
  unmountContainer,
  unmountEmptyCart,
  updatePlaceOrder,
} from './containers.js';

// Components
import {
  changeCheckoutTitle,
  COMPONENT_IDS,
  removeComponent,
  renderBillingStepTitle,
  renderCheckoutHeader,
  renderOrderConfirmationContinueBtn,
  renderPaymentStepTitle,
  renderShippingMethodStepTitle,
  renderSpinner,
} from './components.js';

// Constants
import {
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  CHECKOUT_EMPTY_CLASS,
  CHECKOUT_STEP_ACTIVE,
  SHIPPING_ADDRESS_DATA_KEY,
  TERMS_AND_CONDITIONS_FORM_NAME,
} from './constants.js';

// Fragments
import {
  createOrderConfirmationFragment,
  createScopedSelector,
  selectors,
} from './fragments.js';

// Step modules
import { createBillingAddressStep } from './steps/billing-address.js';
import { createPaymentMethodsStep } from './steps/payment-methods.js';
import { createShippingMethodsStep } from './steps/shipping-methods.js';
import { createShippingStep } from './steps/shipping.js';

const createStepsManager = (block) => {
  // Global state
  let isInProgress = false;

  // Create a scoped selector for the block
  const getElement = createScopedSelector(block);

  // Form references
  const formRefs = {
    shippingForm: { current: null },
    billingForm: { current: null },
    creditCardForm: { current: null },
  };

  const { checkout, orderConfirmation } = selectors;

  // Get block elements using the checkout selectors (excluding step-specific elements)
  const elements = {
    $content: getElement(checkout.content),
    $emptyCart: getElement(checkout.emptyCart),
    $loader: getElement(checkout.loader),
    $header: getElement(checkout.header),
    $cartSummary: getElement(checkout.cartSummary),
    $orderSummary: getElement(checkout.orderSummary),
    $shippingAddressForm: getElement(checkout.shippingAddressForm),
    $billingStepTitle: getElement(checkout.billingStepTitle),
    $billingForm: getElement(checkout.billingForm),
    $mergedCartBanner: getElement(checkout.mergedCartBanner),
    $outOfStock: getElement(checkout.outOfStock),
    $paymentStepTitle: getElement(checkout.paymentStepTitle),
    $placeOrder: getElement(checkout.placeOrder),
    $serverError: getElement(checkout.serverError),
    $shippingMethodStepTitle: getElement(checkout.shippingMethodStepTitle),
    $termsAndConditions: getElement(checkout.termsAndConditions),
  };

  // Helper methods
  const isAuthenticated = () => !!getUserTokenCookie();

  const withOverlaySpinner = (callback) => async (...args) => {
    elements.$loader.innerHTML = '';
    await renderSpinner(elements.$loader, COMPONENT_IDS.CHECKOUT_LOADER);

    try {
      return await callback(...args);
    } finally {
      removeComponent(COMPONENT_IDS.CHECKOUT_LOADER);
    }
  };

  const activateStep = (stepElement, active = true) => {
    stepElement.classList.toggle(CHECKOUT_STEP_ACTIVE, active);
  };

  const disablePlaceOrderButton = () => {
    updatePlaceOrder({ disabled: true });
  };

  // Steps
  const displayEmptyCart = async () => {
    await renderEmptyCart(elements.$emptyCart);
    elements.$content.classList.add(CHECKOUT_EMPTY_CLASS);
  };

  const hideEmptyCart = async () => {
    if (!hasContainer(CONTAINERS.EMPTY_CART)) return;
    unmountEmptyCart();
    changeCheckoutTitle('Guest Checkout');
    elements.$content.classList.remove(CHECKOUT_EMPTY_CLASS);
  };

  // Initialize step modules with their dependencies
  const sharedDependencies = {
    activateStep,
    disablePlaceOrderButton,
    formRefs,
    getElement,
    isAuthenticated,
    withOverlaySpinner,
  };

  // Create step modules
  const steps = {
    shipping: createShippingStep({
      ...sharedDependencies,
      displayShippingMethodStep: (active) => steps.shippingMethods.display(active),
      displayPaymentStep: (active) => steps.paymentMethods.display(active),
    }),
    shippingMethods: createShippingMethodsStep({
      ...sharedDependencies,
      displayPaymentStep: (active) => steps.paymentMethods.display(active),
    }),
    paymentMethods: createPaymentMethodsStep({
      ...sharedDependencies,
      displayBillingStep: (active, data) => steps.billingAddress.display(active, data),
      displayBillingStepSummary: (data, showEditLink) => steps.billingAddress.displaySummary(data, showEditLink),
    }),
    billingAddress: createBillingAddressStep(sharedDependencies),
  };

  const displayOrderConfirmation = async (orderData) => {
    setMetaTags('Order Confirmation');
    document.title = 'Order Confirmation';

    const labels = await fetchPlaceholders();
    const langDefinitions = { default: { ...labels } };

    await initializers.mountImmediately(orderApi.initialize, { orderData, langDefinitions });

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    block.replaceChildren(createOrderConfirmationFragment());

    const getElement = createScopedSelector(block);

    // Order confirmation elements
    const $header = getElement(orderConfirmation.header);
    const $orderStatus = getElement(orderConfirmation.orderStatus);
    const $shippingStatus = getElement(orderConfirmation.shippingStatus);
    const $customerDetails = getElement(orderConfirmation.customerDetails);
    const $orderCostSummary = getElement(orderConfirmation.orderCostSummary);
    const $orderProductList = getElement(orderConfirmation.orderProductList);
    const $footerContinueBtn = getElement(orderConfirmation.continueBtn);

    await renderOrderHeader($header, { orderData });
    await renderOrderStatus($orderStatus);
    await renderShippingStatus($shippingStatus);
    await renderCustomerDetails($customerDetails);
    await renderOrderCostSummary($orderCostSummary);
    await renderOrderProductList($orderProductList);
    await renderOrderConfirmationContinueBtn($footerContinueBtn);
  };

  // Container props and handlers
  const handleValidation = () => {
    let success = true;
    if (success) {
      success = validateForm(BILLING_FORM_NAME, formRefs.billingForm);
    }

    if (success) {
      success = validateForm(TERMS_AND_CONDITIONS_FORM_NAME);
      if (!success) scrollToElement(elements.$termsAndConditions);
    }

    return success;
  };

  const handlePlaceOrder = withOverlaySpinner(async ({ cartId, code }) => {
    try {
      // Payment Services credit card submission
      if (code === PaymentMethodCode.CREDIT_CARD) {
        if (!formRefs.creditCardForm.current) {
          console.error('Credit card form not rendered.');
          return;
        }
        // Validation already done in payment step, just submit
        await formRefs.creditCardForm.current.submit();
      }
      // Place order
      await orderApi.placeOrder(cartId);
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  });

  // Track auth state to detect changes
  let wasAuthenticated = isAuthenticated();

  const handleAuthenticated = async (authenticated) => {
    if (!authenticated) return;
    removeModal();
  };

  // Unified checkout flow handler for both virtual and physical products
  const handleCheckoutFlow = async (data) => {
    // Step 1: Shipping/Contact Information
    if (!steps.shipping.isComplete(data)) {
      await steps.shipping.display(true, data);
      return;
    }

    const cartShippingAddress = getCartAddress(data, 'shipping');
    await steps.shipping.display(false, data);
    await steps.shipping.displaySummary(data.email, cartShippingAddress);

    // Step 2: Shipping Methods (physical products only)
    if (!isVirtualCart(data)) {
      if (!steps.shippingMethods.isComplete(data)) {
        await steps.shippingMethods.display(true);
        return;
      }

      const shippingMethod = getCartShippingMethod(data);
      await steps.shippingMethods.display(false);
      await steps.shippingMethods.displaySummary(shippingMethod);
    }

    // Step 3: Payment
    if (!steps.paymentMethods.isComplete(data)) {
      await steps.paymentMethods.display(true);
      return;
    }

    const paymentMethod = getCartPaymentMethod(data);
    await steps.paymentMethods.display(false);
    await steps.paymentMethods.displaySummary(paymentMethod);

    // Step 4: Billing
    if (!steps.billingAddress.isComplete(data)) {
      await steps.paymentMethods.displaySummary(paymentMethod);
      await steps.billingAddress.display(true, data);
      return;
    }

    await steps.paymentMethods.displaySummary(paymentMethod);

    const cartBillingAddress = getCartAddress(data, 'billing');
    const sameAsBilling = data?.shippingAddresses?.[0]?.sameAsBilling;

    if (cartBillingAddress) {
      await steps.billingAddress.displaySummary(cartBillingAddress, !sameAsBilling);
    }

    updatePlaceOrder({ disabled: false });
  };

  const handleCheckoutUpdate = async (data) => {
    if (isDataEmpty(data)) {
      isInProgress = false;
      await displayEmptyCart();
      return;
    }

    await hideEmptyCart();

    // Manage shipping method title based on cart type
    if (isVirtualCart(data)) {
      removeComponent(COMPONENT_IDS.SHIPPING_METHOD_STEP_TITLE);
    } else {
      await renderShippingMethodStepTitle(elements.$shippingMethodStepTitle);
    }

    // Handle authentication status changes
    const currentAuthState = isAuthenticated();
    if (wasAuthenticated !== currentAuthState && currentAuthState) {
      formRefs.shippingForm.current = null;
      formRefs.billingForm.current = null;

      // User logged in - switch to customer address forms
      unmountContainer(CONTAINERS.SHIPPING_ADDRESS_FORM);
      await renderCustomerShippingAddresses(elements.$shippingAddressForm, formRefs.shippingForm, data);

      unmountContainer(CONTAINERS.BILLING_ADDRESS_FORM);
      await renderCustomerBillingAddresses(elements.$billingForm, formRefs.billingForm, data);
    }
    wasAuthenticated = currentAuthState;

    if (isInProgress) {
      // During checkout progress, only update existing containers if needed
      // Don't show new steps - that's handled by handleCheckoutFlow
      return;
    }

    isInProgress = true;

    // Execute unified checkout flow
    await handleCheckoutFlow(data);
  };

  const handleCheckoutStepCompleted = () => {
    const checkoutSteps = Object.values(steps);

    if (checkoutSteps.some((step) => step.isActive())) return;

    const data = events.lastPayload('checkout/updated');

    const areAllStepsCompleted = checkoutSteps
      .every((step) => step.isComplete(data));

    if (areAllStepsCompleted) {
      updatePlaceOrder({ disabled: false });
    }
  };

  const handleOrderPlaced = async (orderData) => {
    // Clear address form data
    sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const orderNumber = orderData.number;
    const encodedOrderRef = encodeURIComponent(orderRef);
    const encodedOrderNumber = encodeURIComponent(orderNumber);

    const url = token
      ? `/order-details?orderRef=${encodedOrderRef}`
      : `/order-details?orderRef=${encodedOrderRef}&orderNumber=${encodedOrderNumber}`;

    window.history.pushState({}, '', url);

    await displayOrderConfirmation(orderData);
  };

  async function init() {
    events.on('authenticated', handleAuthenticated);
    events.on('checkout/initialized', handleCheckoutUpdate, { eager: true });
    events.on('checkout/updated', handleCheckoutUpdate);
    events.on('order/placed', handleOrderPlaced);
    events.on('checkout/step/completed', handleCheckoutStepCompleted);

    // Render the initial view
    await Promise.all([
      renderMergedCartBanner(elements.$mergedCartBanner),
      renderOutOfStock(elements.$outOfStock),
      renderServerError(elements.$serverError, block),
      renderCheckoutHeader(elements.$header),
      renderShippingMethodStepTitle(elements.$shippingMethodStepTitle),
      renderPaymentStepTitle(elements.$paymentStepTitle),
      renderBillingStepTitle(elements.$billingStepTitle),
      renderOrderSummary(elements.$orderSummary),
      renderCartSummaryList(elements.$cartSummary),
      renderTermsAndConditions(elements.$termsAndConditions),
      renderPlaceOrder(elements.$placeOrder, { handleValidation, handlePlaceOrder }),
    ]);
  }

  return { init };
};

export default createStepsManager;
