// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initReCaptcha } from '@dropins/tools/recaptcha.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';

import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';

import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// 1. Import Braintree Payment Gateway
import 'https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js';

// Checkout Dropin Libraries
import {
  createScopedSelector,
  isEmptyCart,
  isVirtualCart,
  setMetaTags,
  validateForms,
} from '@dropins/storefront-checkout/lib/utils.js';

// Local utils
import {
  displayOverlaySpinner,
  removeModal,
  removeOverlaySpinner,
} from './utils.js';

// Constants
import {
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  CHECKOUT_EMPTY_CLASS,
  LOGIN_FORM_NAME,
  PURCHASE_ORDER_FORM_NAME,
  SHIPPING_ADDRESS_DATA_KEY,
  SHIPPING_FORM_NAME,
  TERMS_AND_CONDITIONS_FORM_NAME,
} from './constants.js';

// Fragment functions
import {
  createCheckoutFragment,
  createOrderConfirmationFragment,
  createOrderConfirmationFooter,
  selectors,
} from './fragments.js';

// Container functions
import {
  renderMergedCartBanner,
  renderCheckoutHeader,
  renderServerError,
  renderOutOfStock,
  renderLoginForm,
  renderShippingAddressFormSkeleton,
  renderBillingAddressFormSkeleton,
  renderBillToShippingAddress,
  renderShippingMethods,
  renderTermsAndConditions,
  renderOrderSummary,
  renderCartSummaryList,
  renderPlaceOrder,
  renderGiftOptions,
  renderCustomerShippingAddresses,
  renderCustomerBillingAddresses,
  renderAddressForm,
  renderOrderHeader,
  renderOrderStatus,
  renderShippingStatus,
  renderCustomerDetails,
  renderOrderCostSummary,
  renderOrderProductList,
  renderOrderGiftOptions,
  renderOrderConfirmationFooterButton,
  renderEmptyCart,
  unmountEmptyCart,
} from './containers.js';

import {
  SUPPORT_PATH,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';

// Braintree-specific constants
const BRAINTREE_AUTHORIZATION_TOKEN = 'sandbox_cstz6tw9_sbj9bzvx2ngq77n4';

// Braintree-specific container renderer
async function renderBraintreePaymentMethods(container, braintreeInstanceRef) {
  return CheckoutProvider.render(PaymentMethods, {
    slots: {
      Methods: {
        braintree: {
          autoSync: false,
          render: async (ctx) => {
            const braintreeContainer = document.createElement('div');

            window.braintree.dropin.create({
              authorization: BRAINTREE_AUTHORIZATION_TOKEN,
              container: braintreeContainer,
            }, (err, dropinInstance) => {
              if (err) {
                console.error(err);
              }

              braintreeInstanceRef.current = dropinInstance;
            });

            ctx.replaceHTML(braintreeContainer);
          },
        },
      },
    },
  })(container);
}

export default async function decorate(block) {
  // Container and component references
  let emptyCart;
  let shippingForm;
  let billingForm;
  let shippingAddresses;
  let billingAddresses;

  // Braintree-specific variable reference
  const braintreeInstanceRef = { current: null };

  const shippingFormRef = { current: null };
  const billingFormRef = { current: null };
  const loaderRef = { current: null };

  setMetaTags('Checkout');
  document.title = 'Braintree Checkout';

  events.on('order/placed', () => {
    setMetaTags('Order Confirmation');
    document.title = 'Braintree Order Confirmation';
  });

  // Create the checkout layout using fragments
  const checkoutFragment = createCheckoutFragment();

  // Create scoped selector for the checkout fragment
  const getElement = createScopedSelector(checkoutFragment);

  // Get all checkout elements using centralized selectors
  const $content = getElement(selectors.checkout.content);
  const $loader = getElement(selectors.checkout.loader);
  const $mergedCartBanner = getElement(selectors.checkout.mergedCartBanner);
  const $heading = getElement(selectors.checkout.heading);
  const $emptyCart = getElement(selectors.checkout.emptyCart);
  const $serverError = getElement(selectors.checkout.serverError);
  const $outOfStock = getElement(selectors.checkout.outOfStock);
  const $login = getElement(selectors.checkout.login);
  const $shippingForm = getElement(selectors.checkout.shippingForm);
  const $billToShipping = getElement(selectors.checkout.billToShipping);
  const $delivery = getElement(selectors.checkout.delivery);
  const $paymentMethods = getElement(selectors.checkout.paymentMethods);
  const $billingForm = getElement(selectors.checkout.billingForm);
  const $orderSummary = getElement(selectors.checkout.orderSummary);
  const $cartSummary = getElement(selectors.checkout.cartSummary);
  const $placeOrder = getElement(selectors.checkout.placeOrder);
  const $giftOptions = getElement(selectors.checkout.giftOptions);
  const $termsAndConditions = getElement(selectors.checkout.termsAndConditions);

  block.appendChild(checkoutFragment);

  // Create validation and place order handlers
  const handleValidation = () => validateForms([
    { name: LOGIN_FORM_NAME },
    { name: SHIPPING_FORM_NAME, ref: shippingFormRef },
    { name: BILLING_FORM_NAME, ref: billingFormRef },
    { name: PURCHASE_ORDER_FORM_NAME },
    { name: TERMS_AND_CONDITIONS_FORM_NAME },
  ]);

  const handlePlaceOrder = async ({ cartId, code }) => {
    await displayOverlaySpinner(loaderRef, $loader);
    try {
      switch (code) {
        case 'braintree': {
          braintreeInstanceRef.current.requestPaymentMethod(async (err, payload) => {
            if (err) {
              removeOverlaySpinner(loaderRef, $loader);
              console.error(err);
              return;
            }

            await checkoutApi.setPaymentMethod({
              code: 'braintree',
              braintree: {
                is_active_payment_token_enabler: false,
                payment_method_nonce: payload.nonce,
              },
            });

            await orderApi.placeOrder(cartId);
          });

          break;
        }

        default: {
          // Place order
          await orderApi.placeOrder(cartId);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      removeOverlaySpinner(loaderRef, $loader);
    }
  };

  // First, render the place order component
  const placeOrder = await renderPlaceOrder($placeOrder, { handleValidation, handlePlaceOrder });

  // Render the remaining containers
  const [
    _mergedCartBanner,
    _header,
    _serverError,
    _outOfStock,
    _loginForm,
    shippingFormSkeleton,
    _billToShipping,
    _shippingMethods,
    _paymentMethods,
    billingFormSkeleton,
    _orderSummary,
    _cartSummary,
    _termsAndConditions,
    _giftOptions,
  ] = await Promise.all([
    renderMergedCartBanner($mergedCartBanner),

    renderCheckoutHeader($heading, 'Braintree Checkout'),

    renderServerError($serverError, $content),

    renderOutOfStock($outOfStock),

    renderLoginForm($login),

    renderShippingAddressFormSkeleton($shippingForm),

    renderBillToShippingAddress($billToShipping, placeOrder),

    renderShippingMethods($delivery),

    renderBraintreePaymentMethods($paymentMethods, braintreeInstanceRef),

    renderBillingAddressFormSkeleton($billingForm),

    renderOrderSummary($orderSummary),

    renderCartSummaryList($cartSummary),

    renderTermsAndConditions($termsAndConditions),

    renderGiftOptions($giftOptions),
  ]);

  // Dynamic containers and components

  async function displayEmptyCart() {
    if (!emptyCart) {
      emptyCart = await renderEmptyCart($emptyCart);
      $content.classList.add(CHECKOUT_EMPTY_CLASS);
    }

    removeOverlaySpinner(loaderRef, $loader);
  }

  function removeEmptyCart() {
    if (!emptyCart) return;

    unmountEmptyCart();
    emptyCart = null;

    $content.classList.remove(CHECKOUT_EMPTY_CLASS);
  }

  async function initializeCheckout(data) {
    removeEmptyCart();
    await initReCaptcha(0);
    if (data.isGuest) await displayGuestAddressForms(data);
    else {
      removeOverlaySpinner(loaderRef, $loader);
      await displayCustomerAddressForms(data);
    }
  }

  async function displayGuestAddressForms(data) {
    if (isVirtualCart(data)) {
      shippingForm?.remove();
      shippingForm = null;
      $shippingForm.innerHTML = '';
    } else if (!shippingForm) {
      shippingFormSkeleton.remove();

      shippingForm = await renderAddressForm($shippingForm, shippingFormRef, data, placeOrder, 'shipping');
    }

    if (!billingForm) {
      billingFormSkeleton.remove();

      billingForm = await renderAddressForm($billingForm, billingFormRef, data, placeOrder, 'billing');
    }
  }

  async function displayCustomerAddressForms(data) {
    if (isVirtualCart(data)) {
      shippingAddresses?.remove();
      shippingAddresses = null;
      $shippingForm.innerHTML = '';
    } else if (!shippingAddresses) {
      shippingForm?.remove();
      shippingForm = null;
      shippingFormRef.current = null;

      shippingAddresses = await renderCustomerShippingAddresses(
        $shippingForm,
        shippingFormRef,
        data,
        placeOrder,
      );
    }

    if (!billingAddresses) {
      billingForm?.remove();
      billingForm = null;
      billingFormRef.current = null;

      billingAddresses = await renderCustomerBillingAddresses(
        $billingForm,
        billingFormRef,
        data,
        placeOrder,
      );
    }
  }

  // Define the Layout for the Order Confirmation
  async function displayOrderConfirmation(orderData) {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Create order confirmation layout using fragments
    const orderConfirmationFragment = createOrderConfirmationFragment();

    // Create scoped selector for order confirmation fragment (following multi-step pattern)
    const getOrderElement = createScopedSelector(orderConfirmationFragment);

    // Get all order confirmation elements using centralized selectors
    const $orderConfirmationHeader = getOrderElement(selectors.orderConfirmation.header);
    const $orderStatus = getOrderElement(selectors.orderConfirmation.orderStatus);
    const $shippingStatus = getOrderElement(selectors.orderConfirmation.shippingStatus);
    const $customerDetails = getOrderElement(selectors.orderConfirmation.customerDetails);
    const $orderCostSummary = getOrderElement(selectors.orderConfirmation.orderCostSummary);
    const $orderGiftOptions = getOrderElement(selectors.orderConfirmation.giftOptions);
    const $orderProductList = getOrderElement(selectors.orderConfirmation.orderProductList);
    const $orderConfirmationFooter = getOrderElement(selectors.orderConfirmation.footer);

    const labels = await fetchPlaceholders();
    const langDefinitions = {
      default: {
        ...labels,
      },
    };
    await initializers.mountImmediately(orderApi.initialize, { orderData, langDefinitions });

    block.replaceChildren(orderConfirmationFragment);

    await Promise.all([
      renderOrderHeader($orderConfirmationHeader, { orderData }),
      renderOrderStatus($orderStatus),
      renderShippingStatus($shippingStatus),
      renderCustomerDetails($customerDetails),
      renderOrderCostSummary($orderCostSummary),
      renderOrderProductList($orderProductList),
      renderOrderGiftOptions($orderGiftOptions),
    ]);

    // Create footer content using fragments
    $orderConfirmationFooter.innerHTML = createOrderConfirmationFooter(rootLink(SUPPORT_PATH));

    const $continueButton = selectors.orderConfirmation.continueButton;
    const $orderConfirmationFooterBtn = $orderConfirmationFooter.querySelector($continueButton);

    await renderOrderConfirmationFooterButton($orderConfirmationFooterBtn);
  }

  // Define the event handlers
  async function handleCartInitialized(data) {
    if (isEmptyCart(data)) await displayEmptyCart();
  }

  async function handleCheckoutInitialized(data) {
    if (isEmptyCart(data)) return;
    await initializeCheckout(data);
  }

  async function handleCheckoutUpdated(data) {
    if (isEmptyCart(data)) {
      await displayEmptyCart();
      return;
    }

    await initializeCheckout(data);
  }

  function handleAuthenticated(authenticated) {
    if (!authenticated) return;
    removeModal();
    displayOverlaySpinner(loaderRef, $loader);
  }

  function handleCheckoutValues(payload) {
    const { isBillToShipping } = payload;
    $billingForm.style.display = isBillToShipping ? 'none' : 'block';
  }

  async function handleOrderPlaced(orderData) {
    // Clear address form data
    sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const orderNumber = orderData.number;
    const encodedOrderRef = encodeURIComponent(orderRef);
    const encodedOrderNumber = encodeURIComponent(orderNumber);

    const url = token
      ? rootLink(`/order-details?orderRef=${encodedOrderRef}`)
      : rootLink(`/order-details?orderRef=${encodedOrderRef}&orderNumber=${encodedOrderNumber}`);

    window.history.pushState({}, '', url);

    await displayOrderConfirmation(orderData);
  }

  events.on('authenticated', handleAuthenticated);
  events.on('cart/initialized', handleCartInitialized, { eager: true });
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  events.on('checkout/values', handleCheckoutValues);
  events.on('order/placed', handleOrderPlaced);
}
