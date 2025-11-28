/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initReCaptcha } from '@dropins/tools/recaptcha.js';

// Dropin Components for BOPIS functionality
import {
  RadioButton,
  ToggleButton,
  provider as UI,
} from '@dropins/tools/components.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import {
  createScopedSelector,
  isEmptyCart,
  isVirtualCart,
  setMetaTags,
  validateForms,
} from '@dropins/storefront-checkout/lib/utils.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Checkout Dropin Libraries

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
  renderPaymentMethods,
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

// 4. Fetching Pickup Locations
async function fetchPickupLocations() {
  return checkoutApi
    .fetchGraphQl(
      `query pickupLocations {
        pickupLocations {
          items {
            name
            pickup_location_code
          }
          total_count
        }
      }`,
      { method: 'GET', cache: 'no-cache' },
    )
    .then((res) => res.data.pickupLocations.items);
}

export default async function decorate(block) {
  setMetaTags('Checkout');
  document.title = 'Checkout';

  events.on('order/placed', () => {
    setMetaTags('Order Confirmation');
    document.title = 'Order Confirmation';
  });

  // Create the checkout layout using fragments - BOPIS-specific with delivery method selection
  const checkoutFragment = createCheckoutFragment();

  // Create scoped selector for the checkout fragment
  const getElement = createScopedSelector(checkoutFragment);

  // Add BOPIS-specific delivery method blocks to checkout__main
  const deliveryMethodHTML = `
    <div class="checkout__block checkout__delivery-method">
      <h2 class="checkout__block checkout-delivery-method__title">Delivery Method</h2>
      <div class="checkout__block checkout-delivery-method__toggle-buttons">
        <div class="checkout__block checkout-delivery-method__delivery-button"></div>
        <div class="checkout__block checkout-delivery-method__in-store-pickup-button"></div>
      </div>
    </div>
    <div class="checkout__block checkout__in-store-pickup"></div>
  `;

  // Insert delivery method after login block
  const $login = getElement(selectors.checkout.login);
  $login.insertAdjacentHTML('afterend', deliveryMethodHTML);

  // Get all checkout elements using centralized selectors
  const $content = getElement(selectors.checkout.content);
  const $loader = getElement(selectors.checkout.loader);
  const $mergedCartBanner = getElement(selectors.checkout.mergedCartBanner);
  const $heading = getElement(selectors.checkout.heading);
  const $emptyCart = getElement(selectors.checkout.emptyCart);
  const $serverError = getElement(selectors.checkout.serverError);
  const $outOfStock = getElement(selectors.checkout.outOfStock);
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

  // BOPIS-specific elements
  const $deliveryButton = getElement('.checkout-delivery-method__delivery-button');
  const $inStorePickupButton = getElement('.checkout-delivery-method__in-store-pickup-button');
  const $inStorePickup = getElement('.checkout__in-store-pickup');

  block.appendChild(checkoutFragment);

  // Container and component references
  let emptyCart;
  let shippingForm;
  let billingForm;
  let shippingAddresses;
  let billingAddresses;

  const shippingFormRef = { current: null };
  const billingFormRef = { current: null };
  const creditCardFormRef = { current: null };
  const loaderRef = { current: null };

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
      // Payment Services credit card
      if (code === PaymentMethodCode.CREDIT_CARD) {
        if (!creditCardFormRef.current) {
          console.error('Credit card form not rendered.');
          return;
        }
        if (!creditCardFormRef.current.validate()) {
          // Credit card form invalid; abort order placement
          return;
        }
        // Submit Payment Services credit card form
        await creditCardFormRef.current.submit();
      }
      // Place order
      await orderApi.placeOrder(cartId);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      removeOverlaySpinner(loaderRef, $loader);
    }
  };

  // First, render the place order component
  const placeOrder = await renderPlaceOrder($placeOrder, { handleValidation, handlePlaceOrder });

  // Render the initial containers
  const [
    _mergedCartBanner,
    _header,
    _serverError,
    _outOfStock,
    _loginForm,
    // 2. UI Components for Delivery and In-Store Pickup
    deliveryButton,
    inStorePickupButton,
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

    renderCheckoutHeader($heading, 'BOPIS Checkout'),

    renderServerError($serverError, $content),

    renderOutOfStock($outOfStock),

    renderLoginForm($login),

    // 2. UI Components for Delivery and In-Store Pickup
    UI.render(ToggleButton, {
      label: 'Delivery',
      onChange: () => onToggle('delivery'),
    })($deliveryButton),

    UI.render(ToggleButton, {
      label: 'In-store Pickup',
      onChange: () => onToggle('in-store-pickup'),
    })($inStorePickupButton),

    renderShippingAddressFormSkeleton($shippingForm),

    renderBillToShippingAddress($billToShipping, placeOrder),

    renderShippingMethods($delivery),

    renderPaymentMethods($paymentMethods, creditCardFormRef),

    renderBillingAddressFormSkeleton($billingForm),

    renderOrderSummary($orderSummary),

    renderCartSummaryList($cartSummary),

    renderTermsAndConditions($termsAndConditions),

    renderGiftOptions($giftOptions),
  ]);

  // 3. Toggle Between Delivery and In-Store Pickup
  async function onToggle(type) {
    if (type === 'delivery') {
      deliveryButton.setProps((prev) => ({ ...prev, selected: true }));
      inStorePickupButton.setProps((prev) => ({ ...prev, selected: false }));
      $shippingForm.removeAttribute('hidden');
      $delivery.removeAttribute('hidden');
      $inStorePickup.setAttribute('hidden', '');
    } else {
      inStorePickupButton.setProps((prev) => ({ ...prev, selected: true }));
      deliveryButton.setProps((prev) => ({ ...prev, selected: false }));
      $shippingForm.setAttribute('hidden', '');
      $delivery.setAttribute('hidden', '');
      $inStorePickup.removeAttribute('hidden');
    }
  }

  onToggle('delivery');

  // 5. Rendering the Pickup Location Options
  const pickupLocations = await fetchPickupLocations();

  pickupLocations.forEach((location) => {
    const { name, pickup_location_code: pickupLocationCode } = location;
    const locationRadiobutton = document.createElement('div');

    UI.render(RadioButton, {
      label: name,
      name: 'pickup-location',
      value: name,
      onChange: () => {
        checkoutApi.setShippingAddress({
          address: {},
          pickupLocationCode,
        });
      },
    })(locationRadiobutton);

    $inStorePickup.appendChild(locationRadiobutton);
  });

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

    // TODO cleanup checkout containers
    await displayOrderConfirmation(orderData);
  }

  events.on('authenticated', handleAuthenticated);
  events.on('cart/initialized', handleCartInitialized, { eager: true });
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  events.on('checkout/values', handleCheckoutValues);
  events.on('order/placed', handleOrderPlaced);
}
