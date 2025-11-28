/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

// Dropin Tools
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initReCaptcha } from '@dropins/tools/recaptcha.js';

// Checkout Dropin Libraries
import {
  createScopedSelector,
  isEmptyCart,
  isVirtualCart,
  setMetaTags,
  validateForms,
} from '@dropins/storefront-checkout/lib/utils.js';

import * as orderApi from '@dropins/storefront-order/api.js';

// Dropin components for Adyen-specific payment methods
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import CreditCard from '@dropins/storefront-payment-services/containers/CreditCard.js';
import { render as PaymentServices } from '@dropins/storefront-payment-services/render.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';
import { loadCSS, loadScript } from '../../scripts/aem.js';

// Block-level imports from local utils (functions not available in dropin lib)
import {
  displayOverlaySpinner,
  removeModal,
  removeOverlaySpinner,
} from './utils.js';

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

import {
  SUPPORT_PATH,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  // Adobe Commerce GraphQL endpoint
  const commerceCoreEndpoint = getConfigValue('commerce-core-endpoint') || getConfigValue('commerce-endpoint');

  // Adyen-specific variable
  let adyenCard;

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

  setMetaTags('Checkout');
  document.title = 'Checkout';

  events.on('order/placed', () => {
    setMetaTags('Order Confirmation');
    document.title = 'Order Confirmation';
  });

  // Create the checkout layout using shared fragments
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

  // eslint-disable-next-line consistent-return
  const handlePlaceOrder = async ({ cartId, code }) => {
    await displayOverlaySpinner(loaderRef, $loader);
    try {
      const isAdyen = code === 'adyen_cc';

      // Validate Adyen component before any network activity
      if (isAdyen) {
        if (!adyenCard) {
          console.error('Adyen card not rendered.');
          return false;
        }

        if (!adyenCard.state?.isValid) {
          adyenCard.showValidation?.();
          return false;
        }
      }

      // Adyen-specific payment handling
      if (isAdyen) {
        return new Promise((resolve, reject) => {
          // eslint-disable-next-line no-underscore-dangle
          adyenCard._orderPromise = { resolve, reject };
          adyenCard.submit();
        });
      }

      // Default payment handling
      await orderApi.placeOrder(cartId);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      removeOverlaySpinner(loaderRef, $loader);
    }
  };

  // Adyen-specific payment methods renderer
  async function renderAdyenPaymentMethods(container) {
    return CheckoutProvider.render(PaymentMethods, {
      slots: {
        Methods: {
          adyen_cc: {
            autoSync: false,
            render: async (ctx) => {
              // Create container in the slot render
              const $adyenCardContainer = document.createElement('div');
              $adyenCardContainer.className = 'adyen-card-container';

              // Append the container to the slot
              ctx.appendChild($adyenCardContainer);

              // Initialize Adyen each time the slot renders
              ctx.onRender(async () => {
                // Check if Adyen is already mounted to this specific container
                if ($adyenCardContainer.hasChildNodes()) {
                  return;
                }

                // Clear any previous adyenCard reference since we're mounting to a new container
                adyenCard = null;

                try {
                  // Dynamically import Adyen Web v6.x as an ES module
                  await loadScript('https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/6.16.0/adyen.js', {});
                  // Load Adyen CSS from CDN if not already loaded
                  await loadCSS('https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/6.16.0/adyen.css');

                  // Access AdyenWeb safely without optional-chaining to satisfy ESLint
                  const { AdyenCheckout, Card } = (window.AdyenWeb) || {};

                  if (!AdyenCheckout) {
                    console.error('AdyenCheckout not available after import.');
                    return;
                  }

                  const checkout = await AdyenCheckout({
                    clientKey: 'test_UJLHEXDC5JDOZBLAHE7EB4XCAEANSI6H',
                    locale: 'en_US',
                    environment: 'test',
                    countryCode: 'US',
                    paymentMethodsResponse: {
                      paymentMethods: [
                        {
                          name: 'Cards',
                          type: 'scheme',
                          brand: null,
                          brands: [
                            'visa',
                            'mc',
                            'amex',
                            'discover',
                            'cup',
                            'diners',
                          ],
                          configuration: null,
                        },
                      ],
                    },
                    onSubmit: async (state, component) => {
                      const additionalData = {
                        stateData: JSON.stringify(state.data),
                      };
                      try {
                        const paymentMethod = {
                          code: 'adyen_cc',
                          adyen_additional_data_cc: additionalData,
                        };

                        const currentCartId = ctx.cartId;
                        await orderApi.setPaymentMethodAndPlaceOrder(currentCartId, paymentMethod);

                        // Resolve the promise in handlePlaceOrder
                        // eslint-disable-next-line no-underscore-dangle
                        adyenCard._orderPromise.resolve();
                      } catch (error) {
                        // Reject the promise in handlePlaceOrder
                        component.setStatus('ready');
                        // eslint-disable-next-line no-underscore-dangle
                        adyenCard._orderPromise.reject(error);
                      }
                    },
                  });

                  // Create and mount Adyen card
                  adyenCard = new Card(checkout, {
                    showPayButton: false,
                  });
                  adyenCard.mount($adyenCardContainer);
                } catch (error) {
                  console.error('Failed to initialize Adyen:', error);
                }
              });
            },
          },
          [PaymentMethodCode.CREDIT_CARD]: {
            render: (ctx) => {
              const $creditCard = document.createElement('div');

              PaymentServices.render(CreditCard, {
                apiUrl: commerceCoreEndpoint,
                getCustomerToken: getUserTokenCookie,
                getCartId: () => ctx.cartId,
                creditCardFormRef,
              })($creditCard);

              ctx.replaceHTML($creditCard);
            },
          },
          [PaymentMethodCode.SMART_BUTTONS]: {
            enabled: false,
          },
          [PaymentMethodCode.APPLE_PAY]: {
            enabled: false,
          },
          [PaymentMethodCode.GOOGLE_PAY]: {
            enabled: false,
          },
          [PaymentMethodCode.VAULT]: {
            enabled: false,
          },
          [PaymentMethodCode.FASTLANE]: {
            enabled: false,
          },
        },
      },
    })(container);
  }

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

    renderCheckoutHeader($heading, 'Adyen Checkout'),

    renderServerError($serverError, $content),

    renderOutOfStock($outOfStock),

    renderLoginForm($login),

    renderShippingAddressFormSkeleton($shippingForm),

    renderBillToShippingAddress($billToShipping, placeOrder),

    renderShippingMethods($delivery),

    renderAdyenPaymentMethods($paymentMethods),

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
