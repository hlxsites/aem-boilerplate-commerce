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
import GiftCards from '@dropins/storefront-cart/containers/GiftCards.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import CreditCard from '@dropins/storefront-payment-services/containers/CreditCard.js';
import { render as PaymentServices } from '@dropins/storefront-payment-services/render.js';

// Tools
import {
  Header,
  provider as UI,
} from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';
import { debounce } from '@dropins/tools/lib.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';

// Checkout Dropin Libs
import {
  estimateShippingCost,
  setAddressOnCart,
  getCartAddress,
  transformCartAddressToFormValues,
} from '@dropins/storefront-checkout/lib/utils.js';

import { showModal, swatchImageSlot } from './utils.js';

// External dependencies
import {
  authPrivacyPolicyConsentSlot,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

// Constants
import {
  ADDRESS_INPUT_DEBOUNCE_TIME,
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  CHECKOUT_ERROR_CLASS,
  CHECKOUT_HEADER_CLASS,
  DEBOUNCE_TIME,
  LOGIN_FORM_NAME,
  SHIPPING_ADDRESS_DATA_KEY,
  SHIPPING_FORM_NAME,
} from './constants.js';

// Address Autocomplete Service
import { createAddressAutocomplete } from './address-autocomplete.js';

/**
 * Container IDs for registry management
 * @enum {string}
 */
export const CONTAINERS = Object.freeze({
  // Static containers (rendered in Promise.all)
  MERGED_CART_BANNER: 'mergedCartBanner',
  CHECKOUT_HEADER: 'checkoutHeader',
  SERVER_ERROR: 'serverError',
  OUT_OF_STOCK: 'outOfStock',
  LOGIN_FORM: 'loginForm',
  SHIPPING_ADDRESS_FORM_SKELETON: 'shippingAddressFormSkeleton',
  BILL_TO_SHIPPING_ADDRESS: 'billToShippingAddress',
  SHIPPING_METHODS: 'shippingMethods',
  PAYMENT_METHODS: 'paymentMethods',
  BILLING_ADDRESS_FORM_SKELETON: 'billingAddressFormSkeleton',
  ORDER_SUMMARY: 'orderSummary',
  CART_SUMMARY_LIST: 'cartSummaryList',
  TERMS_AND_CONDITIONS: 'termsAndConditions',
  PLACE_ORDER_BUTTON: 'placeOrderButton',
  GIFT_OPTIONS: 'giftOptions',
  CUSTOMER_SHIPPING_ADDRESSES: 'customerShippingAddresses',
  CUSTOMER_BILLING_ADDRESSES: 'customerBillingAddresses',

  // Dynamic containers (conditional rendering)
  EMPTY_CART: 'emptyCart',
  SHIPPING_ADDRESS_FORM: 'shippingAddressForm',
  BILLING_ADDRESS_FORM: 'billingAddressForm',

  // Slot/Sub-containers (nested within other containers)
  ESTIMATE_SHIPPING: 'estimateShipping',
  CART_COUPONS: 'cartCoupons',
  GIFT_CARDS: 'giftCards',
  CART_GIFT_OPTIONS: 'cartGiftOptions',
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

  try {
    const container = await renderFn();
    registry.set(id, container);
    return container;
  } catch (error) {
    console.error(`Error rendering container ${id}:`, error);
    throw error;
  }
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
 * Renders the empty cart container
 * @param {HTMLElement} container - The DOM element where the empty cart should be rendered
 * @returns {Promise<Object>} - The rendered empty cart component
 */
export const renderEmptyCart = async (container) => renderContainer(
  CONTAINERS.EMPTY_CART,
  async () => CartProvider.render(EmptyCart, {
    routeCTA: () => rootLink('/'),
  })(container),
);

export const unmountEmptyCart = () => {
  unmountContainer(CONTAINERS.EMPTY_CART);
};

/**
 * Renders the merged cart banner notification for authenticated users
 * @param {HTMLElement} container - DOM element to render the banner in
 * @returns {Promise<Object>} - The rendered merged cart banner component
 */
export const renderMergedCartBanner = async (container) => renderContainer(
  CONTAINERS.MERGED_CART_BANNER,
  async () => CheckoutProvider.render(MergedCartBanner)(container),
);

/**
 * Renders the checkout page header with title and styling
 * @param {HTMLElement} container - DOM element to render the header in
 * @param {string} title - The title to display in the header
 * @returns {Promise<Object>} - The rendered checkout header component
 */
export const renderCheckoutHeader = async (container, title) => renderContainer(
  CONTAINERS.CHECKOUT_HEADER,
  async () => UI.render(Header, {
    className: CHECKOUT_HEADER_CLASS,
    divider: true,
    level: 1,
    size: 'large',
    title,
  })(container),
);

/**
 * Renders server error handling with retry functionality and error state management
 * @param {HTMLElement} container - DOM element to render the error component in
 * @param {HTMLElement} contentElement - Main content element to add error styling to
 * @returns {Promise<Object>} - The rendered server error component
 */
export const renderServerError = async (container, contentElement) => renderContainer(
  CONTAINERS.SERVER_ERROR,
  async () => CheckoutProvider.render(ServerError, {
    autoScroll: true,
    onRetry: (error) => {
      if (error.code === 'PERMISSION_DENIED') {
        document.location.reload();
        return;
      }

      contentElement.classList.remove(CHECKOUT_ERROR_CLASS);
    },
    onServerError: () => {
      contentElement.classList.add(CHECKOUT_ERROR_CLASS);
    },
  })(container),
);

/**
 * Renders out of stock handling with cart navigation and product update options
 * @param {HTMLElement} container - DOM element to render the component in
 * @returns {Promise<Object>} - The rendered out-of-stock component
 */
export const renderOutOfStock = async (container) => renderContainer(
  CONTAINERS.OUT_OF_STOCK,
  async () => CheckoutProvider.render(OutOfStock, {
    routeCart: () => rootLink('/cart'),
    onCartProductsUpdate: (items) => {
      cartApi.updateProductsFromCart(items).catch(console.error);
    },
  })(container),
);

/**
 * Renders the login form for guest checkout with authentication options
 * Uses the existing 'authenticated' event system for decoupled communication
 * @param {HTMLElement} container - DOM element to render the login form in
 * @returns {Promise<Object>} - The rendered login form component
 */
export const renderLoginForm = async (container) => renderContainer(
  CONTAINERS.LOGIN_FORM,
  async () => CheckoutProvider.render(LoginForm, {
    name: LOGIN_FORM_NAME,
    onSignInClick: async (initialEmailValue) => {
      const signInForm = document.createElement('div');

      AuthProvider.render(AuthCombine, {
        signInFormConfig: {
          renderSignUpLink: true,
          initialEmailValue,
          // No onSuccessCallback needed - the 'authenticated' event will be fired automatically
        },
        signUpFormConfig: {
          slots: {
            ...authPrivacyPolicyConsentSlot,
          },
        },
        resetPasswordFormConfig: {},
      })(signInForm);

      await showModal(signInForm);
    },
    onSignOutClick: async () => {
      await authApi.revokeCustomerToken();
      window.location.href = rootLink('/cart');
    },
  })(container),
);

/**
 * Renders the shipping address form skeleton (initial placeholder)
 * @param {HTMLElement} container - DOM element to render the form in
 * @returns {Promise<Object>} - The rendered shipping address form skeleton
 */
export const renderShippingAddressFormSkeleton = async (container) => renderContainer(
  CONTAINERS.SHIPPING_ADDRESS_FORM_SKELETON,
  async () => AccountProvider.render(AddressForm, {
    fieldIdPrefix: 'shipping',
    isOpen: true,
    showFormLoader: true,
  })(container),
);

/**
 * Renders the billing address form skeleton (initial placeholder)
 * @param {HTMLElement} container - DOM element to render the form in
 * @returns {Promise<Object>} - The rendered billing address form skeleton
 */
export const renderBillingAddressFormSkeleton = async (container) => renderContainer(
  CONTAINERS.BILLING_ADDRESS_FORM_SKELETON,
  async () => AccountProvider.render(AddressForm, {
    fieldIdPrefix: 'billing',
    isOpen: true,
    showFormLoader: true,
  })(container),
);

/**
 * Renders checkbox to set billing address same as shipping address - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render the checkbox in
 * @returns {Promise<Object>} - The rendered bill to shipping address component
 */
export const renderBillToShippingAddress = async (container) => renderContainer(
  CONTAINERS.BILL_TO_SHIPPING_ADDRESS,
  async () => {
    const setBillingAddressOnCart = setAddressOnCart({ type: 'billing' });

    return CheckoutProvider.render(BillToShippingAddress, {
      onChange: (checked) => {
        const billingFormValues = events.lastPayload('checkout/addresses/billing');

        if (!checked && billingFormValues) {
          setBillingAddressOnCart(billingFormValues);
        }
      },
    })(container);
  },
);

/**
 * Renders available shipping methods with selection interface
 * @param {HTMLElement} container - DOM element to render shipping methods in
 * @returns {Promise<Object>} - The rendered shipping methods component
 */
export const renderShippingMethods = async (container) => renderContainer(
  CONTAINERS.SHIPPING_METHODS,
  async () => CheckoutProvider.render(ShippingMethods)(container),
);

/**
 * Renders payment methods with credit card integration - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render payment methods in
 * @param {Object} creditCardFormRef - React-style ref for credit card form
 * @returns {Promise<Object>} - The rendered payment methods component
 */
export const renderPaymentMethods = async (container, creditCardFormRef) => renderContainer(
  CONTAINERS.PAYMENT_METHODS,
  async () => CheckoutProvider.render(PaymentMethods, {
    slots: {
      Methods: {
        [PaymentMethodCode.CREDIT_CARD]: {
          render: (ctx) => {
            const $creditCard = document.createElement('div');

            PaymentServices.render(CreditCard, {
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
  })(container),
);

/**
 * Renders terms and conditions with agreement slots and manual consent mode
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
 * Renders estimate shipping form for order summary slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderEstimateShipping = (ctx) => {
  const estimateShippingForm = document.createElement('div');
  CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
  ctx.appendChild(estimateShippingForm);
};

/**
 * Renders cart coupons for order summary slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderCartCoupons = (ctx) => {
  const coupons = document.createElement('div');
  CartProvider.render(Coupons)(coupons);
  ctx.appendChild(coupons);
};

/**
 * Renders gift cards for order summary slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderGiftCards = (ctx) => {
  const giftCards = document.createElement('div');
  CartProvider.render(GiftCards)(giftCards);
  ctx.appendChild(giftCards);
};

/**
 * Renders gift options for cart summary list footer slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderCartGiftOptions = (ctx) => {
  const giftOptions = document.createElement('div');

  CartProvider.render(GiftOptions, {
    item: ctx.item,
    view: 'product',
    dataSource: 'cart',
    isEditable: false,
    handleItemsLoading: ctx.handleItemsLoading,
    handleItemsError: ctx.handleItemsError,
    onItemUpdate: ctx.onItemUpdate,
    slots: {
      SwatchImage: swatchImageSlot,
    },
  })(giftOptions);

  ctx.appendChild(giftOptions);
};

// ============================================================================
// SUMMARY CONTAINERS
// ============================================================================

/**
 * Renders order summary with estimate shipping, coupons, and gift cards slots
 * @param {HTMLElement} container - DOM element to render order summary in
 * @returns {Promise<Object>} - The rendered order summary component
 */
export const renderOrderSummary = async (container) => renderContainer(
  CONTAINERS.ORDER_SUMMARY,
  async () => CartProvider.render(OrderSummary, {
    slots: {
      EstimateShipping: renderEstimateShipping,
      Coupons: renderCartCoupons,
      GiftCards: renderGiftCards,
    },
  })(container),
);

/**
 * Renders cart summary list with custom heading, thumbnail and gift options slots
 * @param {HTMLElement} container - DOM element to render cart summary list in
 * @returns {Promise<Object>} - The rendered cart summary list component
 */
export const renderCartSummaryList = async (container) => renderContainer(
  CONTAINERS.CART_SUMMARY_LIST,
  async () => {
    const placeholders = await fetchPlaceholders('placeholders/checkout.json');

    return CartProvider.render(CartSummaryList, {
      variant: 'secondary',
      slots: {
        Heading: (headingCtx) => {
          const title = placeholders?.Checkout?.Summary?.heading;

          const cartSummaryListHeading = document.createElement('div');
          cartSummaryListHeading.classList.add('cart-summary-list__heading');

          const cartSummaryListHeadingText = document.createElement('div');
          cartSummaryListHeadingText.classList.add(
            'cart-summary-list__heading-text',
          );

          cartSummaryListHeadingText.innerText = title?.replace(
            '({count})',
            headingCtx.count ? `(${headingCtx.count})` : '',
          );
          const editCartLink = document.createElement('a');
          editCartLink.classList.add('cart-summary-list__edit');
          editCartLink.href = rootLink('/cart');
          editCartLink.rel = 'noreferrer';
          editCartLink.innerText = placeholders?.Checkout?.Summary?.Edit;

          cartSummaryListHeading.appendChild(cartSummaryListHeadingText);
          cartSummaryListHeading.appendChild(editCartLink);
          headingCtx.appendChild(cartSummaryListHeading);

          headingCtx.onChange((nextHeadingCtx) => {
            cartSummaryListHeadingText.innerText = title?.replace(
              '({count})',
              nextHeadingCtx.count ? `(${nextHeadingCtx.count})` : '',
            );
          });
        },
        Thumbnail: (ctx) => {
          const { item, defaultImageProps } = ctx;
          tryRenderAemAssetsImage(ctx, {
            alias: item.sku,
            imageProps: defaultImageProps,

            params: {
              width: defaultImageProps.width,
              height: defaultImageProps.height,
            },
          });
        },
        Footer: renderCartGiftOptions,
      },
    })(container);
  },
);

/**
 * Renders place order button with handler functions - follows multi-step pattern
 * @param {HTMLElement} container - DOM element to render the place order button in
 * @param {Object} options - Configuration object with handler functions
 * @param {Function} options.handleValidation - Validation handler function
 * @param {Function} options.handlePlaceOrder - Place order handler function
 * @returns {Promise<Object>} - The rendered place order component
 */
export const renderPlaceOrder = async (container, options = {}) => renderContainer(
  CONTAINERS.PLACE_ORDER_BUTTON,
  async () => CheckoutProvider.render(PlaceOrder, {
    handleValidation: options.handleValidation,
    handlePlaceOrder: options.handlePlaceOrder,
  })(container),
);

/**
 * Renders customer shipping addresses selector/form for authenticated users - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render shipping addresses in
 * @param {Object} formRef - React-style ref for form reference
 * @param {Object} data - Cart data containing shipping address information
 * @returns {Promise<Object>} - The rendered customer shipping addresses component
 */
export const renderCustomerShippingAddresses = async (container, formRef, data) => renderContainer(
  CONTAINERS.CUSTOMER_SHIPPING_ADDRESSES,
  async () => {
    const placeholders = await fetchPlaceholders('placeholders/checkout.json');

    const cartShippingAddress = getCartAddress(data, 'shipping');

    const shippingAddressId = cartShippingAddress
      ? cartShippingAddress?.id ?? 0
      : undefined;

    const shippingAddressCache = sessionStorage.getItem(SHIPPING_ADDRESS_DATA_KEY);

    // Clear persisted shipping address if cart has a shipping address
    if (cartShippingAddress && shippingAddressCache) {
      sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    }

    const storeConfig = checkoutApi.getStoreConfigCache();

    const inputsDefaultValueSet = cartShippingAddress && cartShippingAddress.id === undefined
      ? transformCartAddressToFormValues(cartShippingAddress)
      : { countryCode: storeConfig.defaultCountry };

    const hasCartShippingAddress = Boolean(data.shippingAddresses?.[0]);
    let isFirstRenderShipping = true;

    // Create address setters with constants moved inside
    const setShippingAddressOnCart = setAddressOnCart({
      type: 'shipping',
      debounceMs: DEBOUNCE_TIME,
    });

    const estimateShippingCostOnCart = estimateShippingCost({
      debounceMs: DEBOUNCE_TIME,
    });

    const notifyShippingValues = debounce((values) => {
      events.emit('checkout/addresses/shipping', values);
    }, ADDRESS_INPUT_DEBOUNCE_TIME);

    return AccountProvider.render(Addresses, {
      addressFormTitle: placeholders?.Checkout?.Addresses?.shippingAddressTitle,
      defaultSelectAddressId: shippingAddressId,
      fieldIdPrefix: 'shipping',
      formName: SHIPPING_FORM_NAME,
      forwardFormRef: formRef,
      inputsDefaultValueSet,
      minifiedView: false,
      onAddressData: (values) => {
        const canSetShippingAddressOnCart = !isFirstRenderShipping || !hasCartShippingAddress;
        if (canSetShippingAddressOnCart) setShippingAddressOnCart(values);
        if (!hasCartShippingAddress) estimateShippingCostOnCart(values);
        if (isFirstRenderShipping) isFirstRenderShipping = false;
        notifyShippingValues(values);
      },
      selectable: true,
      selectShipping: true,
      showBillingCheckBox: false,
      showSaveCheckBox: true,
      showShippingCheckBox: false,
      title: placeholders?.Checkout?.Addresses?.shippingAddressTitle,
    })(container);
  },
);

/**
 * Renders customer billing addresses selector/form for authenticated users - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render billing addresses in
 * @param {Object} formRef - React-style ref for form reference
 * @param {Object} data - Cart data containing billing address information
 * @returns {Promise<Object>} - The rendered customer billing addresses component
 */
export const renderCustomerBillingAddresses = async (container, formRef, data) => renderContainer(
  CONTAINERS.CUSTOMER_BILLING_ADDRESSES,
  async () => {
    const placeholders = await fetchPlaceholders('placeholders/checkout.json');

    const cartBillingAddress = getCartAddress(data, 'billing');

    const billingAddressId = cartBillingAddress
      ? cartBillingAddress?.id ?? 0
      : undefined;

    const billingAddressCache = sessionStorage.getItem(BILLING_ADDRESS_DATA_KEY);

    // Clear persisted billing address if cart has a billing address
    if (cartBillingAddress && billingAddressCache) {
      sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
    }

    const storeConfig = checkoutApi.getStoreConfigCache();

    const inputsDefaultValueSet = cartBillingAddress && cartBillingAddress.id === undefined
      ? transformCartAddressToFormValues(cartBillingAddress)
      : { countryCode: storeConfig.defaultCountry };

    const hasCartBillingAddress = Boolean(data.billingAddress);
    let isFirstRenderBilling = true;

    // Create address setter with constants moved inside
    const setBillingAddressOnCart = setAddressOnCart({
      type: 'billing',
      debounceMs: DEBOUNCE_TIME,
    });

    const notifyBillingValues = debounce((values) => {
      events.emit('checkout/addresses/billing', values);
    }, ADDRESS_INPUT_DEBOUNCE_TIME);

    return AccountProvider.render(Addresses, {
      addressFormTitle: placeholders?.Checkout?.Addresses?.billToNewAddress,
      defaultSelectAddressId: billingAddressId,
      formName: BILLING_FORM_NAME,
      forwardFormRef: formRef,
      inputsDefaultValueSet,
      minifiedView: false,
      onAddressData: (values) => {
        const canSetBillingAddressOnCart = !isFirstRenderBilling || !hasCartBillingAddress;
        if (canSetBillingAddressOnCart) setBillingAddressOnCart(values);
        if (isFirstRenderBilling) isFirstRenderBilling = false;
        notifyBillingValues(values);
      },
      selectable: true,
      selectBilling: true,
      showBillingCheckBox: false,
      showSaveCheckBox: true,
      showShippingCheckBox: false,
      title: placeholders?.Checkout?.Addresses?.billingAddressTitle,
    })(container);
  },
);

/**
 * Renders address form for guest users (shipping or billing) - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render address form in
 * @param {Object} formRef - React-style ref for form reference
 * @param {Object} data - Cart data containing address information
 * @param {string} addressType - Type of address form ('shipping' or 'billing')
 * @returns {Promise<Object>} - The rendered address form component
 */
export const renderAddressForm = async (container, formRef, data, addressType) => {
  const isShipping = addressType === 'shipping';
  const containerKey = isShipping ? CONTAINERS.SHIPPING_ADDRESS_FORM : CONTAINERS.BILLING_ADDRESS_FORM;

  return renderContainer(
    containerKey,
    async () => {
      const placeholders = await fetchPlaceholders('placeholders/checkout.json');

      // Get address type specific configurations
      const cartAddress = getCartAddress(data, addressType);
      const addressDataKey = isShipping ? SHIPPING_ADDRESS_DATA_KEY : BILLING_ADDRESS_DATA_KEY;
      const addressCache = sessionStorage.getItem(addressDataKey);

      // Clear persisted address if cart has an address
      if (cartAddress && addressCache) {
        sessionStorage.removeItem(addressDataKey);
      }

      let isFirstRender = true;
      const hasCartAddress = Boolean(isShipping ? data.shippingAddresses?.[0] : data.billingAddress);

      // Create address setter with appropriate API
      const setAddressOnCartFn = setAddressOnCart({
        type: addressType,
        debounceMs: DEBOUNCE_TIME,
      });

      // Create shipping cost estimator (only for shipping addresses)
      const estimateShippingCostOnCart = isShipping ? estimateShippingCost({
        debounceMs: DEBOUNCE_TIME,
      }) : null;

      const notifyValues = debounce((values) => {
        const eventType = isShipping ? 'checkout/addresses/shipping' : 'checkout/addresses/billing';
        events.emit(eventType, values);
      }, ADDRESS_INPUT_DEBOUNCE_TIME);

      const storeConfig = checkoutApi.getStoreConfigCache();

      // Address type specific configurations
      const formName = isShipping ? SHIPPING_FORM_NAME : BILLING_FORM_NAME;
      const addressTitle = isShipping
        ? placeholders?.Checkout?.Addresses?.shippingAddressTitle
        : placeholders?.Checkout?.Addresses?.billingAddressTitle;
      const className = isShipping
        ? 'checkout-shipping-form__address-form'
        : 'checkout-billing-form__address-form';

      const inputsDefaultValueSet = cartAddress
        ? transformCartAddressToFormValues(cartAddress)
        : { countryCode: storeConfig.defaultCountry };

      return AccountProvider.render(AddressForm, {
        addressesFormTitle: addressTitle,
        className,
        fieldIdPrefix: addressType,
        formName,
        forwardFormRef: formRef,
        hideActionFormButtons: true,
        inputsDefaultValueSet,
        isOpen: true,
        onChange: (values) => {
          const canSetAddressOnCart = !isFirstRender || !hasCartAddress;
          if (canSetAddressOnCart) setAddressOnCartFn(values);

          // Only estimate shipping cost for shipping addresses when no cart address exists
          if (isShipping && !hasCartAddress && estimateShippingCostOnCart) {
            estimateShippingCostOnCart(values);
          }

          if (isFirstRender) isFirstRender = false;

          notifyValues(values);
        },
        showBillingCheckBox: false,
        showFormLoader: false,
        showShippingCheckBox: false,
      })(container);
    },
  );
};

/**
 * Renders order-level gift options with swatch image integration
 * @param {HTMLElement} container - DOM element to render gift options in
 * @returns {Promise<Object>} - The rendered gift options component
 */
export const renderGiftOptions = async (container) => renderContainer(
  CONTAINERS.GIFT_OPTIONS,
  async () => CartProvider.render(GiftOptions, {
    view: 'order',
    dataSource: 'cart',
    isEditable: false,
    slots: {
      SwatchImage: swatchImageSlot,
    },
  })(container),
);

// =============================================================================
// FIELD ORDERING
// =============================================================================

/**
 * Reorganizes form fields for Progressive disclosure layout
 * Places email first, then name fields, then phone at the end
 * Hides address fields initially
 * @param {HTMLElement} formContainer - The form container element
 * @param {HTMLElement} addressWrapper - The wrapper element for toggling expanded state
 */
const applyProgressiveFieldOrdering = (formContainer, addressWrapper) => {
  // Wait for form to be rendered
  const observer = new MutationObserver((mutations, obs) => {
    // Find the grid container - the outer .account-address-form div (not the form element)
    const gridContainer = formContainer.querySelector('div.account-address-form');
    if (!gridContainer) return;

    // Find the actual <form> element
    const formElement = formContainer.querySelector('form');
    if (!formElement) return;

    // Find all field containers
    const allFields = formContainer.querySelectorAll('.dropin-field');
    if (allFields.length === 0) return;

    // Stop observing once we find fields
    obs.disconnect();

    // Set up grid on the outer container
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = '1fr 1fr';
    gridContainer.style.gap = 'var(--spacing-medium)';

    // Make the <form> element transparent so fields become direct grid items
    formElement.style.display = 'contents';

    // Make the wrapper transparent if it exists
    const wrapper = formContainer.querySelector('.account-address-form-wrapper');
    if (wrapper) {
      wrapper.style.display = 'contents';
    }


    // Hide default shipping/billing checkboxes
    formContainer.querySelectorAll('.account-address-form__field--default_shipping, .account-address-form__field--default_billing').forEach((el) => {
      el.style.display = 'none';
    });

    // Define grid rows for each field (determines vertical position)
    // Row 1 is reserved for the title (addressesFormTitle)
    // Collapsed layout:
    //   Row 1: Title (full width)
    //   Row 2: First Name | Last Name
    //   Row 3: Phone | VAT
    //   Row 4: Address lookup (full width)
    // Expanded layout:
    //   Row 1: Title (full width)
    //   Row 2: First Name | Last Name
    //   Row 3: Street 1 | Street 2
    //   Row 4: City
    //   Row 5: Region
    //   Row 6: Postcode
    //   Row 7: Country
    //   Row 8: Phone | VAT
    const fieldConfig = {
      // Always visible fields - Row 2 (after title)
      firstname: { row: 2, col: 1, alwaysVisible: true },
      lastname: { row: 2, col: 2, alwaysVisible: true },
      // Phone/VAT - Row 3 when collapsed, Row 8 when expanded
      telephone: { row: 3, col: 1, visibleCollapsed: true, rowExpanded: 8 },
      vat: { row: 3, col: 2, visibleCollapsed: true, rowExpanded: 8 },
      // Address fields - hidden in collapsed, visible in expanded
      street: { row: 3, visibleExpanded: true }, // street fields side by side in row 3
      city: { row: 4, col: 'span', visibleExpanded: true },
      region: { row: 5, col: 'span', visibleExpanded: true },
      postcode: { row: 6, col: 'span', visibleExpanded: true },
      country: { row: 7, col: 'span', visibleExpanded: true },
      // Email - hidden in this Progressive disclosure layout
      email: { row: 0, col: 'span', hide: true },
      // Company - optional, at the end if shown
      company: { row: 9, col: 'span', visibleExpanded: true },
    };

    // Track street fields for special handling (street1, street2 side by side)
    let streetFieldCount = 0;

    allFields.forEach((field) => {
      const input = field.querySelector('input, select, textarea');
      if (!input) return;

      const fieldId = input.id || '';
      const fieldName = input.name || '';

      // Determine field type
      let fieldType = null;
      for (const type of Object.keys(fieldConfig)) {
        if (fieldId.toLowerCase().includes(type) || fieldName.toLowerCase().includes(type)) {
          fieldType = type;
          break;
        }
      }

      if (fieldType && fieldConfig[fieldType]) {
        const config = fieldConfig[fieldType];

        // Add data attribute for CSS targeting
        field.setAttribute('data-field-type', fieldType);

        // Handle street fields specially (street[0], street[1] side by side)
        if (fieldType === 'street') {
          streetFieldCount += 1;
          field.setAttribute('data-street-index', streetFieldCount);
          if (streetFieldCount === 1) {
            // First street field: row 2, column 1
            field.style.gridArea = `${config.row} / 1`;
          } else {
            // Second street field: row 2, column 2
            field.style.gridArea = `${config.row} / 2`;
          }
        } else {
          // Set grid position using grid-area shorthand
          // grid-area: row-start / column-start / row-end / column-end
          if (config.col === 'span') {
            // Full width: span both columns
            field.style.gridArea = `${config.row} / 1 / auto / -1`;
          } else {
            // Single column
            field.style.gridArea = `${config.row} / ${config.col}`;
          }
        }

        // Mark field visibility classes
        if (config.hide) {
          field.classList.add('checkout-address-hidden-always');
          field.style.display = 'none';
        } else if (config.visibleExpanded) {
          field.classList.add('checkout-address-address-field');
          field.style.display = 'none'; // Hidden initially
        } else if (config.visibleCollapsed) {
          field.classList.add('checkout-address-collapsed-field');
          // Store expanded row for later
          field.setAttribute('data-row-expanded', String(config.rowExpanded || config.row));
          field.setAttribute('data-row-original', String(config.row));
          field.setAttribute('data-col', String(config.col));
        }
      }
    });

    // Mark form as initialized
    formContainer.classList.add('checkout-address-form-initialized');
  });

  observer.observe(formContainer, {
    childList: true,
    subtree: true,
  });

  // Fallback: disconnect observer after 5 seconds
  setTimeout(() => observer.disconnect(), 5000);
};

/**
 * Renders Progressive disclosure address form for guest users with progressive disclosure
 * Shows email, name, address lookup, and phone fields with expandable full address
 * IMPORTANT: All form fields stay inside the form element to preserve onChange handling
 * @param {HTMLElement} container - DOM element to render address form in
 * @param {Object} formRef - React-style ref for form reference
 * @param {Object} data - Cart data containing address information
 * @param {string} addressType - Type of address form ('shipping' or 'billing')
 * @returns {Promise<Object>} - The rendered address form component
 */
export const renderProgressiveAddressForm = async (container, formRef, data, addressType) => {
  const isShipping = addressType === 'shipping';
  const containerKey = isShipping ? CONTAINERS.SHIPPING_ADDRESS_FORM : CONTAINERS.BILLING_ADDRESS_FORM;

  return renderContainer(
    containerKey,
    async () => {
      const placeholders = await fetchPlaceholders('placeholders/checkout.json');

      // Get address type specific configurations
      const cartAddress = getCartAddress(data, addressType);
      const addressDataKey = isShipping ? SHIPPING_ADDRESS_DATA_KEY : BILLING_ADDRESS_DATA_KEY;
      const addressCache = sessionStorage.getItem(addressDataKey);

      // Clear persisted address if cart has an address
      if (cartAddress && addressCache) {
        sessionStorage.removeItem(addressDataKey);
      }

      let isFirstRender = true;
      const hasCartAddress = Boolean(isShipping ? data.shippingAddresses?.[0] : data.billingAddress);

      // Create address setter with appropriate API
      const setAddressOnCartFn = setAddressOnCart({
        type: addressType,
        debounceMs: DEBOUNCE_TIME,
      });

      // Create shipping cost estimator (only for shipping addresses)
      const estimateShippingCostOnCart = isShipping ? estimateShippingCost({
        debounceMs: DEBOUNCE_TIME,
      }) : null;

      const notifyValues = debounce((values) => {
        const eventType = isShipping ? 'checkout/addresses/shipping' : 'checkout/addresses/billing';
        events.emit(eventType, values);
      }, ADDRESS_INPUT_DEBOUNCE_TIME);

      const storeConfig = checkoutApi.getStoreConfigCache();

      // Address type specific configurations
      const formName = isShipping ? SHIPPING_FORM_NAME : BILLING_FORM_NAME;
      const addressTitle = isShipping
        ? 'Delivery address'
        : placeholders?.Checkout?.Addresses?.billingAddressTitle;
      const className = isShipping
        ? 'checkout-shipping-form__address-form checkout-shipping-form--progressive'
        : 'checkout-billing-form__address-form checkout-billing-form--progressive';

      const inputsDefaultValueSet = cartAddress
        ? transformCartAddressToFormValues(cartAddress)
        : { countryCode: storeConfig.defaultCountry };

      // Create wrapper structure for Progressive disclosure layout
      const addressWrapper = document.createElement('div');
      addressWrapper.className = 'checkout-address-address-wrapper';

      // Create the form container - ALL fields stay inside this
      const formContainer = document.createElement('div');
      formContainer.className = 'checkout-address-form-container';

      // Create address lookup section (positioned via CSS Grid)
      // Uses same dropin classes as other fields for consistent styling
      const addressLookupSection = document.createElement('div');
      addressLookupSection.className = 'checkout-address-address-lookup dropin-field';
      // Grid position: full width, row 4 (after title row 1, name row 2, phone/vat row 3)
      addressLookupSection.style.gridArea = '4 / 1 / auto / -1';
      addressLookupSection.innerHTML = `
        <div class="dropin-field__content">
          <div class="dropin-input-container dropin-input-container--primary dropin-input-container--floating">
            <div class="dropin-input-label-container checkout-address-address-lookup__input-wrapper">
              <input
                type="text"
                id="address-lookup"
                name="addressLookup"
                aria-label="Start typing address"
                placeholder="Start typing address"
                autocomplete="off"
                class="dropin-input dropin-input--medium dropin-input--primary dropin-input--floating"
              />
              <label for="address-lookup" class="dropin-input__label--floating">Start typing address</label>
            </div>
          </div>
        </div>
        <button type="button" class="checkout-address-address-toggle">
          Enter address manually
        </button>
      `;

      // Append to wrapper
      addressWrapper.appendChild(formContainer);
      container.appendChild(addressWrapper);

      // Setup toggle functionality
      const toggleBtn = addressLookupSection.querySelector('.checkout-address-address-toggle');
      const addressInput = addressLookupSection.querySelector('input#address-lookup');

      toggleBtn.addEventListener('click', () => {
        const isExpanded = addressWrapper.classList.toggle('checkout-address-address-wrapper--expanded');
        toggleBtn.textContent = isExpanded ? 'Hide address fields' : 'Enter address manually';

        // Toggle visibility of address fields
        const addressFields = formContainer.querySelectorAll('.checkout-address-address-field');
        addressFields.forEach((field) => {
          field.style.display = isExpanded ? '' : 'none';
        });

        // Move phone/vat fields to bottom row when expanded
        const collapsedFields = formContainer.querySelectorAll('.checkout-address-collapsed-field');
        collapsedFields.forEach((field) => {
          const expandedRow = field.getAttribute('data-row-expanded');
          const originalRow = field.getAttribute('data-row-original');
          const col = field.getAttribute('data-col');

          // Update grid-area to move to new row
          const row = isExpanded ? expandedRow : originalRow;
          field.style.gridArea = `${row} / ${col}`;
        });

        // Hide/show address lookup input (keep toggle button visible)
        const lookupInputWrapper = addressLookupSection.querySelector('.dropin-field__content');
        if (lookupInputWrapper) {
          lookupInputWrapper.style.display = isExpanded ? 'none' : '';
        }

        // Move address lookup section to bottom when expanded (row 10, after company row 9)
        addressLookupSection.style.gridArea = isExpanded ? '10 / 1 / auto / -1' : '4 / 1 / auto / -1';
      });

      // Initialize address autocomplete
      if (addressInput) {
        createAddressAutocomplete(addressInput, formContainer, addressWrapper, toggleBtn);
      }

      // Apply CSS-based field ordering (does NOT move elements out of form)
      applyProgressiveFieldOrdering(formContainer, addressWrapper);

      // Render the actual address form - all fields stay inside formContainer
      const addressForm = await AccountProvider.render(AddressForm, {
        addressesFormTitle: addressTitle,
        className,
        fieldIdPrefix: addressType,
        formName,
        forwardFormRef: formRef,
        hideActionFormButtons: true,
        inputsDefaultValueSet,
        isOpen: true,
        onChange: (values) => {
          const canSetAddressOnCart = !isFirstRender || !hasCartAddress;
          if (canSetAddressOnCart) setAddressOnCartFn(values);

          // Only estimate shipping cost for shipping addresses when no cart address exists
          if (isShipping && !hasCartAddress && estimateShippingCostOnCart) {
            estimateShippingCostOnCart(values);
          }

          if (isFirstRender) isFirstRender = false;

          notifyValues(values);
        },
        showBillingCheckBox: false,
        showFormLoader: false,
        showShippingCheckBox: false,
      })(formContainer);

      // After form renders, insert the address lookup section into the form's flex container
      // This allows it to be ordered among the form fields via CSS order
      setTimeout(() => {
        const form = formContainer.querySelector('form, .dropin-form, .account-address-form');
        if (form) {
          // Insert address lookup INTO the form so it can participate in flexbox ordering
          form.appendChild(addressLookupSection);
        }
      }, 50);

      return addressForm;
    },
  );
};
