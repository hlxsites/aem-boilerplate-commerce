/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import MergedCartBanner from '@dropins/storefront-checkout/containers/MergedCartBanner.js';
import OutOfStock from '@dropins/storefront-checkout/containers/OutOfStock.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ServerError from '@dropins/storefront-checkout/containers/ServerError.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import TermsAndConditions from '@dropins/storefront-checkout/containers/TermsAndConditions.js';
import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Auth Dropin
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as AuthProvider } from '@dropins/storefront-auth/render.js';

// Account Dropin
import Addresses from '@dropins/storefront-account/containers/Addresses.js';
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as AccountProvider } from '@dropins/storefront-account/render.js';

// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import CreditCard from '@dropins/storefront-payment-services/containers/CreditCard.js';
import { render as PaymentServices } from '@dropins/storefront-payment-services/render.js';

// Order Dropin
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderHeader from '@dropins/storefront-order/containers/OrderHeader.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import ShippingStatus from '@dropins/storefront-order/containers/ShippingStatus.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';

// Tools
import { events } from '@dropins/tools/event-bus.js';
import { getCookie, debounce } from '@dropins/tools/lib.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';

// Utils
import {
  estimateShippingCost,
  getCartAddress,
  showModal,
} from './utils.js';

// Slots
import { authPrivacyPolicyConsentSlot } from '../../scripts/commerce.js';

// Fragments
import { selectors } from './fragments.js';

// Constants
import {
  BILLING_FORM_NAME,
  DEBOUNCE_TIME,
  DEFAULT_COUNTRY_CODE,
  LOGIN_FORM_NAME,
  SHIPPING_FORM_NAME,
  USER_TOKEN_COOKIE_NAME,
} from './constants.js';

/**
 * Container IDs for registry management
 * @enum {string}
 */
export const CONTAINERS = Object.freeze({
  BILL_TO_SHIPPING: 'billToShipping',
  BILLING_ADDRESS_FORM: 'billingAddressForm',
  CART_COUPONS: 'cartCoupons',
  CART_SUMMARY_LIST: 'cartSummaryList',
  CUSTOMER_BILLING_ADDRESSES: 'customerBillingAddresses',
  CUSTOMER_DETAILS: 'customerDetails',
  CUSTOMER_SHIPPING_ADDRESSES: 'customerShippingAddresses',
  EMPTY_CART: 'emptyCart',
  ESTIMATE_SHIPPING: 'estimateShipping',
  LOGIN_FORM: 'loginForm',
  MERGED_CART_BANNER: 'mergedCartBanner',
  ORDER_COST_SUMMARY: 'orderCostSummary',
  ORDER_HEADER: 'orderHeader',
  ORDER_PRODUCT_LIST: 'orderProductList',
  ORDER_STATUS: 'orderStatus',
  ORDER_SUMMARY: 'orderSummary',
  OUT_OF_STOCK: 'outOfStock',
  PAYMENT_METHODS: 'paymentMethods',
  PLACE_ORDER_BUTTON: 'placeOrderButton',
  SERVER_ERROR: 'serverError',
  SHIPPING_ADDRESS_FORM: 'shippingAddressForm',
  SHIPPING_METHODS: 'shippingMethods',
  SHIPPING_STATUS: 'shippingStatus',
  SIGN_UP_FORM: 'signUpForm',
  TERMS_AND_CONDITIONS: 'termsAndConditions',
});

/**
 * A Map to store the API of rendered containers.
 * The key is a unique string ID, and the value is the containers's API object.
 * (e.g., { setProps: (props) => {...}, remove: () => {...} })
 */
const registry = new Map();

/**
 * Checks if a container with the given ID has been rendered.
 * This is used to prevent multiple instances of the same container from being rendered.
 * @param {string} id - The unique ID of the container to check.
 * @returns {boolean} - Returns true if the container has been rendered, false otherwise.
 */
export const hasContainer = (id) => registry.has(id);

/**
 * Retrieves a container from the registry.
 * @param {string} id - The unique ID of the container to retrieve.
 * @returns {Object} - The container API object.
 */
export const getContainer = (id) => registry.get(id);

/**
 * Helper to get a container from the registry or render and register it if not present.
 * @async
 * @param {string} id - Unique identifier for the container.
 * @param {Function} renderFn - Async function that renders the container.
 * @returns {Promise<Object>} - The rendered container API.
 */
const renderContainer = async (id, renderFn) => {
  if (registry.has(id)) {
    return registry.get(id);
  }

  const container = await renderFn();
  registry.set(id, container);
  return container;
};

/**
 * Unmounts and removes a container from the registry.
 * This function checks if the container is registered, removes it from the DOM,
 * and deletes its reference from the registry.
 * @param {string} id - The unique ID of the container to unmount.
 * @return {void}
 */
export const unmountContainer = (id) => {
  if (!registry.has(id)) {
    return;
  }

  const containerApi = registry.get(id);
  containerApi.remove();
  registry.delete(id);
};

/**
 * Renders the empty cart container if it hasn't been rendered already.
 * Utilizes a registry to ensure only one instance is created and reused.
 *
 * @async
 * @param {HTMLElement} container - The DOM element where the empty cart should be rendered.
 * @returns {Promise<Object>} A promise that resolves to the API of the rendered empty cart container.
 */
export const renderEmptyCart = async (container) => renderContainer(
  CONTAINERS.EMPTY_CART,
  async () => CartProvider.render(EmptyCart, {
    routeCTA: () => '/',
  })(container),
);

export const unmountEmptyCart = () => {
  unmountContainer(CONTAINERS.EMPTY_CART);
};

/**
 * Displays the login form for guest checkout with authentication options
 * @param {HTMLElement} container - DOM element to render the login form in
 * @returns {Promise<Object>} - The rendered login form component
 */
export const renderLoginForm = async (container, { onSuccessCallback } = {}) => renderContainer(
  CONTAINERS.LOGIN_FORM,
  async () => CheckoutProvider.render(LoginForm, {
    name: LOGIN_FORM_NAME,
    autoSync: false,
    onSignInClick: async () => {
      const signInForm = document.createElement('div');
      AuthProvider.render(AuthCombine, {
        signInFormConfig: {
          renderSignUpLink: true,
          onSuccessCallback,
        },
        signUpFormConfig: {
          slots: {
            ...authPrivacyPolicyConsentSlot,
          },
        },
        resetPasswordFormConfig: {},
      })(signInForm);
      showModal(signInForm);
    },
    onSignOutClick: () => {
      authApi.revokeCustomerToken();
    },
  })(container),
);

/**
 * Renders the shipping address form if it hasn't been rendered already.
 * Utilizes a registry to ensure only one instance is created and reused.
 *
 * @async
 * @param {HTMLElement} container - The DOM element where the shipping address form should be rendered.
 * @param {Object} formRef - React-style ref object to store form reference.
 * @param {Object} cartData - Optional cart data to determine if address exists.
 * @returns {Promise<Object>} A promise that resolves to the API of the rendered shipping address form.
 */
export const renderShippingAddressForm = async (container, formRef, cartData = null) => renderContainer(
  CONTAINERS.SHIPPING_ADDRESS_FORM,
  async () => {
    const storeConfig = checkoutApi.getStoreConfigCache();
    const countryCode = storeConfig?.defaultCountry || DEFAULT_COUNTRY_CODE;

    const estimateShippingCostOnCart = estimateShippingCost({
      api: checkoutApi.estimateShippingMethods,
      debounceMs: DEBOUNCE_TIME,
    });

    const notifyValues = debounce((values) => {
      events.emit('checkout/addresses/shipping', values);
    }, DEBOUNCE_TIME);

    const hasCartAddress = !!cartData?.shippingAddresses?.[0];

    const handleChange = (values) => {
      notifyValues(values);
      if (!hasCartAddress && cartData) {
        estimateShippingCostOnCart(values);
      }
    };

    return AccountProvider.render(AddressForm, {
      addressesFormTitle: 'Shipping address',
      className: 'checkout-shipping-form__address-form',
      fieldIdPrefix: 'shipping',
      formName: SHIPPING_FORM_NAME,
      forwardFormRef: formRef,
      hideActionFormButtons: true,
      inputsDefaultValueSet: { countryCode },
      isOpen: true,
      onChange: handleChange,
      showBillingCheckBox: false,
      showShippingCheckBox: false,
    })(container);
  },
);

/**
 * Renders the customer shipping addresses selector/form if it hasn't been rendered already.
 * Displays saved customer addresses with the ability to select one or add a new address.
 * Automatically estimates shipping costs when address data changes for carts without existing addresses.
 * Utilizes a registry to ensure only one instance is created and reused.
 *
 * @async
 * @param {HTMLElement} container - The DOM element where the shipping addresses should be rendered.
 * @param {Object} formRef - React-style ref object to store form reference for external access.
 * @param {Object|null} [data=null] - Optional cart data containing shipping address information.
 * @param {Array} [data.shippingAddresses] - Array of shipping addresses from the cart.
 * @returns {Promise<Object>} A promise that resolves to the API of the rendered shipping addresses component.
 */
export const renderCustomerShippingAddresses = async (container, formRef, data = null) => renderContainer(
  CONTAINERS,
  async () => {
    const cartShippingAddress = getCartAddress(data, 'shipping');

    const shippingAddressId = cartShippingAddress
      ? cartShippingAddress?.id ?? 0
      : undefined;

    const storeConfig = checkoutApi.getStoreConfigCache();

    const inputsDefaultValueSet = cartShippingAddress && cartShippingAddress.id === undefined
      ? cartShippingAddress
      : { countryCode: storeConfig.defaultCountry };

    const hasCartShippingAddress = Boolean(data.shippingAddresses?.[0]);

    const estimateShippingCostOnCart = estimateShippingCost({
      api: checkoutApi.estimateShippingMethods,
      debounceMs: DEBOUNCE_TIME,
    });

    const notifyValues = debounce((values) => {
      events.emit('checkout/addresses/shipping', values);
    }, DEBOUNCE_TIME);

    return AccountProvider.render(Addresses, {
      addressFormTitle: 'Deliver to new address',
      defaultSelectAddressId: shippingAddressId,
      fieldIdPrefix: 'shipping',
      formName: SHIPPING_FORM_NAME,
      forwardFormRef: formRef,
      inputsDefaultValueSet,
      minifiedView: false,
      onAddressData: (values) => {
        notifyValues(values);
        if (!hasCartShippingAddress) estimateShippingCostOnCart(values);
      },
      selectable: true,
      selectShipping: true,
      showBillingCheckBox: false,
      showSaveCheckBox: true,
      showShippingCheckBox: false,
      title: 'Shipping address',
    })(container);
  },
);

/**
 * Renders the billing address form if it hasn't been rendered already.
 * Utilizes a registry to ensure only one instance is created and reused.
 *
 * @async
 * @param {HTMLElement} container - The DOM element where the billing address form should be rendered.
 * @param {Object} formRef - React-style ref object to store form reference.
 * @returns {Promise<Object>} A promise that resolves to the API of the rendered billing address form.
 */
export const renderBillingAddressForm = async (container, formRef) => renderContainer(
  CONTAINERS.BILLING_ADDRESS_FORM,
  async () => {
    const storeConfig = checkoutApi.getStoreConfigCache();

    const notifyValues = debounce((values) => {
      events.emit('checkout/addresses/billing', values);
    }, DEBOUNCE_TIME);

    const handleChange = (values) => {
      notifyValues(values);
    };

    return AccountProvider.render(AddressForm, {
      className: 'checkout-billing-form__address-form',
      fieldIdPrefix: 'billing',
      formName: BILLING_FORM_NAME,
      forwardFormRef: formRef,
      hideActionFormButtons: true,
      inputsDefaultValueSet: {
        countryCode: storeConfig?.defaultCountry || DEFAULT_COUNTRY_CODE,
      },
      onChange: handleChange,
      isOpen: true,
      showBillingCheckBox: false,
      showShippingCheckBox: false,
    })(container);
  },
);

/**
 * Renders the customer billing addresses selector/form if it hasn't been rendered already.
 * Displays saved customer addresses with the ability to select one or add a new address for billing.
 * Provides a dropdown/selector interface for choosing from existing addresses or creating new ones.
 * Utilizes a registry to ensure only one instance is created and reused.
 *
 * @async
 * @param {HTMLElement} container - The DOM element where the billing addresses should be rendered.
 * @param {Object} formRef - React-style ref object to store form reference for external access.
 * @param {Object|null} [data=null] - Optional cart data containing billing address information.
 * @param {Array} [data.billingAddress] - Billing address object from the cart.
 * @returns {Promise<Object>} A promise that resolves to the API of the rendered billing addresses component.
 */
export const renderCustomerBillingAddresses = async (container, formRef, data = null) => renderContainer(
  CONTAINERS.CUSTOMER_BILLING_ADDRESSES,
  async () => {
    const cartBillingAddress = getCartAddress(data, 'billing');

    const billingAddressId = cartBillingAddress
      ? cartBillingAddress?.id ?? 0
      : undefined;

    const storeConfig = checkoutApi.getStoreConfigCache();

    const inputsDefaultValueSet = cartBillingAddress && cartBillingAddress.id === undefined
      ? cartBillingAddress
      : { countryCode: storeConfig.defaultCountry };

    const notifyValues = debounce((values) => {
      events.emit('checkout/addresses/billing', values);
    }, DEBOUNCE_TIME);

    return AccountProvider.render(Addresses, {
      addressFormTitle: 'Bill to new address',
      defaultSelectAddressId: billingAddressId,
      formName: BILLING_FORM_NAME,
      forwardFormRef: formRef,
      inputsDefaultValueSet,
      minifiedView: false,
      selectable: true,
      selectBilling: true,
      showBillingCheckBox: false,
      showSaveCheckBox: true,
      showShippingCheckBox: false,
      title: 'Billing address',
      onAddressData: (values) => {
        notifyValues(values);
      },
    })(container);
  },
);

/**
 * Displays available shipping methods with toggle button interface
 * @param {HTMLElement} container - DOM element to render shipping methods in
 * @returns {Promise<Object>} - The rendered shipping methods component
 */
export const renderShippingMethods = async (container) => renderContainer(
  CONTAINERS.SHIPPING_METHODS,
  async () => CheckoutProvider.render(ShippingMethods, {
    UIComponentType: 'ToggleButton',
    displayTitle: false,
    autoSync: false,
  })(container),
);

/**
 * Displays payment methods with credit card integration and configuration slots
 * @param {HTMLElement} container - DOM element to render payment methods in
 * @param {Object} creditCardFormRef - React-style ref object for credit card form
 * @returns {Promise<Object>} - The rendered payment methods component
 */
export const renderPaymentMethods = async (container, creditCardFormRef) => renderContainer(
  CONTAINERS.PAYMENT_METHODS,
  async () => {
    const commerceCoreEndpoint = await getConfigValue('commerce-core-endpoint');
    const getCustomerToken = () => getCookie(USER_TOKEN_COOKIE_NAME);

    return CheckoutProvider.render(PaymentMethods, {
      UIComponentType: 'RadioButton',
      displayTitle: false,
      autoSync: false,
      slots: {
        Methods: {
          [PaymentMethodCode.CREDIT_CARD]: {
            render: (ctx) => {
              const $content = document.createElement('div');

              PaymentServices.render(CreditCard, {
                apiUrl: commerceCoreEndpoint,
                getCustomerToken,
                getCartId: () => ctx.cartId,
                creditCardFormRef,
              })($content);

              ctx.replaceHTML($content);
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
        },
      },
    })(container);
  },
);

/**
 * Displays checkbox to set billing address same as shipping address
 * @param {HTMLElement} container - DOM element to render the checkbox in
 * @returns {Promise<Object>} - The rendered bill to shipping address component
 */
export const renderBillToShippingAddress = async (container) => renderContainer(
  CONTAINERS.BILL_TO_SHIPPING,
  async () => CheckoutProvider.render(BillToShippingAddress, {
    autoSync: false,
  })(container),
);

/**
 * Displays server error handling with retry functionality and error state management
 * @param {HTMLElement} container - DOM element to render the error component in
 * @param {HTMLElement} contentElement - Main content element to add error styling to
 * @returns {Promise<Object>} - The rendered server error component
 */
export const renderServerError = async (container, block) => renderContainer(
  CONTAINERS.SERVER_ERROR,
  async () => CheckoutProvider.render(ServerError, {
    autoScroll: true,
    onRetry: () => {
      const $content = block.querySelector(selectors.checkout.content);
      $content.classList.remove('checkout__content--error');
    },
    onServerError: () => {
      const $content = block.querySelector(selectors.checkout.content);
      $content.classList.add('checkout__content--error');
    },
  })(container),
);

/**
 * Displays out of stock handling with cart navigation and product update options
 * @param {HTMLElement} container - DOM element to render the component in
 * @returns {Promise<Object>} - The rendered out-of-stock component
 */
export const renderOutOfStock = async (container) => renderContainer(
  CONTAINERS.OUT_OF_STOCK,
  async () => CheckoutProvider.render(OutOfStock, {
    routeCart: () => '/cart',
    onCartProductsUpdate: (items) => {
      cartApi.updateProductsFromCart(items).catch(console.error);
    },
  })(container),
);

/**
 * Displays cart summary list with item count and edit functionality
 * @param {HTMLElement} container - DOM element to render the cart summary in
 * @returns {Promise<Object>} - The rendered cart summary list component
 */
export const renderCartSummaryList = async (container) => renderContainer(
  CONTAINERS.CART_SUMMARY_LIST,
  async () => CartProvider.render(CartSummaryList, {
    variant: 'secondary',
    slots: {
      Heading: (headingCtx) => {
        const title = 'Your Cart ({count})';

        const cartSummaryListHeading = document.createElement('div');
        cartSummaryListHeading.classList.add('cart-summary-list__heading');

        const cartSummaryListHeadingText = document.createElement('div');
        cartSummaryListHeadingText.classList.add(
          'cart-summary-list__heading-text',
        );

        cartSummaryListHeadingText.innerText = title.replace(
          '({count})',
          headingCtx.count ? `(${headingCtx.count})` : '',
        );
        const editCartLink = document.createElement('a');
        editCartLink.classList.add('cart-summary-list__edit');
        editCartLink.href = '/cart';
        editCartLink.rel = 'noreferrer';
        editCartLink.innerText = 'Edit';

        cartSummaryListHeading.appendChild(cartSummaryListHeadingText);
        cartSummaryListHeading.appendChild(editCartLink);
        headingCtx.appendChild(cartSummaryListHeading);

        headingCtx.onChange((nextHeadingCtx) => {
          cartSummaryListHeadingText.innerText = title.replace(
            '({count})',
            nextHeadingCtx.count ? `(${nextHeadingCtx.count})` : '',
          );
        });
      },
    },
  })(container),
);

/**
 * Displays terms and conditions with agreement slots and manual consent mode
 * @param {HTMLElement} container - DOM element to render the terms in
 * @returns {Promise<Object>} - The rendered terms and conditions component
 */
export const renderTermsAndConditions = async (container) => renderContainer(
  CONTAINERS.TERMS_AND_CONDITIONS,
  async () => CheckoutProvider.render(TermsAndConditions, {
    slots: {
      Agreements: (ctx) => {
        ctx.appendAgreement(() => ({
          name: 'default',
          mode: 'manual',
          translationId: 'Checkout.TermsAndConditions.label',
        }));
      },
    },
  })(container),
);

/**
 * Displays estimate shipping form for cost calculation
 * @param {HTMLElement} container - DOM element to render the estimate form in
 * @returns {Object} - The rendered estimate shipping component
 */
export const renderEstimateShipping = async (container) => renderContainer(
  CONTAINERS.ESTIMATE_SHIPPING,
  async () => CheckoutProvider.render(EstimateShipping)(container),
);

/**
 * Displays coupons interface for discount code management
 * @param {HTMLElement} container - DOM element to render the coupons in
 * @returns {Object} - The rendered coupons component
 */
export const renderCartCoupons = (container) => renderContainer(
  CONTAINERS.CART_COUPONS,
  async () => CartProvider.render(Coupons)(container),
);

/**
 * Displays order summary with integrated estimate shipping and coupons slots
 * @param {HTMLElement} container - DOM element to render the order summary in
 * @returns {Promise<Object>} - The rendered order summary component
 */
export const renderOrderSummary = async (container) => renderContainer(
  CONTAINERS.ORDER_SUMMARY,
  async () => CartProvider.render(OrderSummary, {
    slots: {
      EstimateShipping: (esCtx) => {
        const estimateShippingForm = document.createElement('div');
        renderEstimateShipping(estimateShippingForm);
        esCtx.appendChild(estimateShippingForm);
      },
      Coupons: (ctx) => {
        const coupons = document.createElement('div');
        renderCartCoupons(coupons);
        ctx.appendChild(coupons);
      },
    },
  })(container),
);

/**
 * Displays merged cart banner notification for authenticated users
 * @param {HTMLElement} container - DOM element to render the banner in
 * @returns {Promise<Object>} - The rendered merged cart banner component
 */
export const renderMergedCartBanner = async (container) => renderContainer(
  CONTAINERS.MERGED_CART_BANNER,
  async () => CheckoutProvider.render(MergedCartBanner)(container),
);

/**
 * Displays place order button with comprehensive validation and payment handling
 * @param {HTMLElement} container - DOM element to render the place order button in
 * @param {Object} options - Configuration object
 * @returns {Promise<Object>} - The rendered place order component
 */
export const renderPlaceOrder = async (container, options = {}) => renderContainer(
  CONTAINERS.PLACE_ORDER_BUTTON,
  async () => CheckoutProvider.render(PlaceOrder, {
    disabled: true,
    ...options,
  })(container),
);

/**
 * Updates place order button with new props
 * @param {Object} options - Configuration object
 */
export const updatePlaceOrder = async (options = {}) => {
  const button = registry.get(CONTAINERS.PLACE_ORDER_BUTTON);

  if (button) {
    button.setProps((prev) => ({
      ...prev,
      ...options,
    }));
  }
};

/**
 * Displays order confirmation header with email check and sign up integration
 * @param {HTMLElement} container - DOM element to render the order header in
 * @param {Object} options - Configuration object with handlers and order data
 * @returns {Object} - The rendered order header component
 */
export const renderOrderHeader = (container, options = {}) => renderContainer(
  CONTAINERS.ORDER_HEADER,
  async () => {
    const handleSignUpClick = async ({
      inputsDefaultValueSet,
      addressesData,
    }) => {
      const signUpForm = document.createElement('div');

      AuthProvider.render(SignUp, {
        inputsDefaultValueSet,
        addressesData,
        routeSignIn: () => '/customer/login',
        routeRedirectOnEmailConfirmationClose: () => '/customer/account',
        slots: {
          ...authPrivacyPolicyConsentSlot,
        },
      })(container);

      await showModal(signUpForm);
    };

    return OrderProvider.render(OrderHeader, {
      handleEmailAvailability: checkoutApi.isEmailAvailable,
      handleSignUpClick,
      ...options,
    })(container);
  },
);

/**
 * Renders the order status component in the given container.
 * @param {HTMLElement} container - The DOM element to render the order status in.
 * @returns {Object} - The rendered order status component.
 */
export const renderOrderStatus = (container) => renderContainer(
  CONTAINERS.ORDER_STATUS,
  async () => OrderProvider.render(OrderStatus, { slots: { OrderActions: () => null } })(container),
);

/**
 * Renders the shipping status component in the given container.
 * @param {HTMLElement} container - The DOM element to render the shipping status in.
 * @returns {Object} - The rendered shipping status component.
 */
export const renderShippingStatus = (container) => renderContainer(
  CONTAINERS.SHIPPING_STATUS,
  async () => OrderProvider.render(ShippingStatus)(container),
);

/**
 * Renders the customer details component in the given container.
 * @param {HTMLElement} container - The DOM element to render the customer details in.
 * @returns {Object} - The rendered customer details component.
 */
export const renderCustomerDetails = (container) => renderContainer(
  CONTAINERS.CUSTOMER_DETAILS,
  async () => OrderProvider.render(CustomerDetails)(container),
);

/**
 * Renders the order cost summary component in the given container.
 * @param {HTMLElement} container - The DOM element to render the order cost summary in.
 * @returns {Object} - The rendered order cost summary component.
 */
export const renderOrderCostSummary = (container) => renderContainer(
  CONTAINERS.ORDER_COST_SUMMARY,
  async () => OrderProvider.render(OrderCostSummary)(container),
);

/**
 * Renders the order product list component in the given container.
 * @param {HTMLElement} container - The DOM element to render the order product list in.
 * @returns {Object} - The rendered order product list component.
 */
export const renderOrderProductList = (container) => renderContainer(
  CONTAINERS.ORDER_PRODUCT_LIST,
  async () => OrderProvider.render(OrderProductList)(container),
);
