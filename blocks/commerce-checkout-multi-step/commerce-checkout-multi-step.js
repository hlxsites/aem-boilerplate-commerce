/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';

// Dropin Components
import { Button, Header, provider as UI } from '@dropins/tools/components.js';

// Auth Dropin
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as AuthProvider } from '@dropins/storefront-auth/render.js';

// Account Dropin
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as AccountProvider } from '@dropins/storefront-account/render.js';

// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

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

import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderHeader from '@dropins/storefront-order/containers/OrderHeader.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import ShippingStatus from '@dropins/storefront-order/containers/ShippingStatus.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Block-level
import createModal from '../modal/modal.js';

import {
  getCartAddress,
  getCartDeliveryMethod,
  setAddressOnCart,
} from '../../scripts/checkout.js';

import { authPrivacyPolicyConsentSlot } from '../../scripts/constants.js';

function createMetaTag(property, content, type) {
  if (!property || !type) {
    return;
  }
  let meta = document.head.querySelector(`meta[${type}="${property}"]`);
  if (meta) {
    if (!content) {
      meta.remove();
      return;
    }
    meta.setAttribute(type, property);
    meta.setAttribute('content', content);
    return;
  }
  if (!content) {
    return;
  }
  meta = document.createElement('meta');
  meta.setAttribute(type, property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setMetaTags(dropin) {
  createMetaTag('title', dropin);
  createMetaTag('description', dropin);
  createMetaTag('keywords', dropin);

  createMetaTag('og:description', dropin);
  createMetaTag('og:title', dropin);
  createMetaTag('og:url', window.location.href, 'property');
}

export default async function decorate(block) {
  // Step 2: Initialization
  // Initializers
  import('../../scripts/initializers/account.js');
  import('../../scripts/initializers/checkout.js');

  setMetaTags('Checkout');
  document.title = 'Checkout';

  events.on('order/placed', () => {
    setMetaTags('Order Confirmation');
    document.title = 'Order Confirmation';
  });

  const DEBOUNCE_TIME = 1000;
  const LOGIN_FORM_NAME = 'login-form';
  const SHIPPING_FORM_NAME = 'selectedShippingAddress';
  const BILLING_FORM_NAME = 'selectedBillingAddress';
  const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
  const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;

  // Step 3: Layout
  // Define the Layout for the Checkout
  const checkoutFragment = document.createRange().createContextualFragment(`
    <div class="checkout__wrapper">
      <div class="checkout__merged-cart-banner"></div>
      <div class="checkout__heading"></div>
      <div class="checkout__empty-cart"></div>
      <div class="checkout__server-error"></div>
      <div class="checkout__out-of-stock"></div>
      <div class="checkout__content">
        <div class="checkout__main">
          <div class="checkout__shipping">
            <div class="checkout__shipping-title"></div>
            <div class="checkout__login"></div>
            <div class="checkout__shipping-form"></div>
            <div class="checkout__continue-to-delivery"></div>
          </div>
          <div class="checkout__delivery">
            <div class="checkout__delivery-title"></div>
            <div class="checkout__delivery-methods"></div>
            <div class="checkout__continue-to-payment"></div>
          </div>
          <div class="checkout__payment">
            <div class="checkout__payment-title"></div>
            <div class="checkout__bill-to-shipping"></div>
            <div class="checkout__billing-form"></div>
            <div class="checkout__payment-methods"></div>
            <div class="checkout__place-order"></div>
          </div>
        </div>
        <div class="checkout__aside">
          <div class="checkout__block checkout__order-summary"></div>
          <div class="checkout__block checkout__cart-summary"></div>
        </div>
      </div>
    </div>
  `);

  const $mergedCartBanner = checkoutFragment.querySelector(
    '.checkout__merged-cart-banner',
  );
  const $heading = checkoutFragment.querySelector('.checkout__heading');
  const $emptyCart = checkoutFragment.querySelector('.checkout__empty-cart');
  const $serverError = checkoutFragment.querySelector(
    '.checkout__server-error',
  );
  const $outOfStock = checkoutFragment.querySelector('.checkout__out-of-stock');
  const $content = checkoutFragment.querySelector('.checkout__content');

  const $orderSummary = checkoutFragment.querySelector('.checkout__order-summary');
  const $cartSummary = checkoutFragment.querySelector('.checkout__cart-summary');

  const $shippingTitle = checkoutFragment.querySelector('.checkout__shipping-title');
  const $login = checkoutFragment.querySelector('.checkout__login');
  const $shippingForm = checkoutFragment.querySelector('.checkout__shipping-form');
  const $continueToDeliveryBtn = checkoutFragment.querySelector(
    '.checkout__continue-to-delivery',
  );

  const $deliveryTitle = checkoutFragment.querySelector('.checkout__delivery-title');
  const $deliveryMethods = checkoutFragment.querySelector(
    '.checkout__delivery-methods',
  );
  const $continueToPaymentBtn = checkoutFragment.querySelector(
    '.checkout__continue-to-payment',
  );

  const $paymentTitle = checkoutFragment.querySelector('.checkout__payment-title');
  const $billToShipping = checkoutFragment.querySelector('.checkout__bill-to-shipping');
  const $billingForm = checkoutFragment.querySelector('.checkout__billing-form');
  const $paymentMethods = checkoutFragment.querySelector('.checkout__payment-methods');
  const $placeOrder = checkoutFragment.querySelector('.checkout__place-order');

  block.replaceChildren(checkoutFragment);

  // Step 4: Render the initial containers
  // Render the initial containers
  const [
    _mergedCartBanner,
    heading,
    _shippingInfoHeading,
    __shippingMethodHeading,
    _paymentHeading,
    _serverError,
    _outOfStock,
    _loginForm,
    shippingFormSkeleton,
    continueToDeliveryBtn,
    orderSummary,
    _cartSummary,
  ] = await Promise.all([
    CheckoutProvider.render(MergedCartBanner)($mergedCartBanner),

    UI.render(Header, {
      title: 'Guest Checkout',
      size: 'large',
      divider: false,
    })($heading),

    UI.render(Header, {
      title: '1. SHIPPING INFORMATION',
      size: 'medium',
      divider: false,
    })($shippingTitle),

    UI.render(Header, {
      title: '2. SHIPPING METHOD',
      size: 'medium',
      divider: false,
    })($deliveryTitle),

    UI.render(Header, {
      title: '3. PAYMENT INFORMATION',
      size: 'medium',
      divider: false,
    })($paymentTitle),

    CheckoutProvider.render(ServerError, {
      autoScroll: true,
      onRetry: () => {
        $content.classList.remove('checkout__content--error');
      },
      onServerError: () => {
        $content.classList.add('checkout__content--error');
      },
    })($serverError),

    CheckoutProvider.render(OutOfStock, {
      routeCart: () => '/cart',
      onCartProductsUpdate: (items) => {
        cartApi.updateProductsFromCart(items).catch(console.error);
      },
    })($outOfStock),

    // render the initial containers
    CheckoutProvider.render(LoginForm, {
      name: LOGIN_FORM_NAME,
      onSignInClick: async (initialEmailValue) => {
        const signInForm = document.createElement('div');

        AuthProvider.render(AuthCombine, {
          signInFormConfig: {
            renderSignUpLink: true,
            initialEmailValue,
            onSuccessCallback: () => {},
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
    })($login),

    AccountProvider.render(AddressForm, {
      isOpen: true,
      showFormLoader: true,
    })($shippingForm),

    UI.render(Button, {
      children: 'CONTINUE TO SHIPPING METHOD',
      disabled: true,
      onClick: async () => {
        await continueToDelivery();
      },
    })($continueToDeliveryBtn),

    CartProvider.render(OrderSummary, {
      slots: {
        Coupons: (ctx) => {
          const coupons = document.createElement('div');

          CartProvider.render(Coupons)(coupons);

          ctx.appendChild(coupons);
        },
      },
    })($orderSummary),

    CartProvider.render(CartSummaryList, {
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
    })($cartSummary),
  ]);

  // Dynamic containers and components

  let modal;

  const showModal = async (content) => {
    modal = await createModal([content]);
    modal.showModal();
  };

  const removeModal = () => {
    if (!modal) return;
    modal.removeModal();
    modal = null;
  };

  // Step 6: Empty cart
  let emptyCart;

  const displayEmptyCart = async () => {
    if (emptyCart) return;

    heading.setProps((prev) => ({
      ...prev,
      title: 'Empty Cart',
    }));

    emptyCart = await CartProvider.render(EmptyCart, {
      routeCTA: () => '/',
    })($emptyCart);

    $content.classList.add('checkout__content--empty');
  };

  const removeEmptyCart = () => {
    if (!emptyCart) return;

    emptyCart.remove();
    emptyCart = null;
    $emptyCart.innerHTML = '';

    heading.setProps((prev) => ({
      ...prev,
      title: 'Guest Checkout',
    }));

    $content.classList.remove('checkout__content--empty');
  };

  // Step 8: Shipping Address
  let shippingForm;

  const continueToShipping = async (initialData = null) => {
    if (shippingForm) return;

    // cleanup
    shippingFormSkeleton.remove();
    $shippingForm.innerHTML = '';

    const storeConfig = checkoutApi.getStoreConfigCache();

    shippingForm = await AccountProvider.render(AddressForm, {
      addressesFormTitle: 'Shipping address',
      className: 'checkout-shipping-form__address-form',
      formName: SHIPPING_FORM_NAME,
      hideActionFormButtons: true,
      inputsDefaultValueSet: initialData ?? {
        countryCode: storeConfig.defaultCountry,
      },
      isOpen: true,
      onChange: setAddressOnCart({
        api: checkoutApi.setShippingAddress,
        debounceMs: DEBOUNCE_TIME,
        placeOrderBtn: placeOrder,
      }),
      showBillingCheckBox: false,
      showShippingCheckBox: false,
    })($shippingForm);
  };

  // Step 10: Delivery
  let deliveryMethods;
  let continueToPaymentBtn;

  const continueToDelivery = async () => {
    if (deliveryMethods) return;

    deliveryMethods = await CheckoutProvider.render(ShippingMethods, {
      hideOnVirtualCart: true,
    })($deliveryMethods);

    orderSummary.setProps((prev) => ({
      ...prev,
      slots: {
        ...prev.slots,
        EstimateShipping: (esCtx) => {
          const estimateShippingForm = document.createElement('div');
          CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
          esCtx.appendChild(estimateShippingForm);
        },
      },
    }));

    continueToDeliveryBtn.remove();
    $continueToDeliveryBtn.remove();

    continueToPaymentBtn = await UI.render(Button, {
      children: 'CONTINUE TO PAYMENT INFORMATION',
      disabled: true,
      onClick: async () => {
        await continueToPayment();
      },
    })($continueToPaymentBtn);
  };

  // Step 11: Payment
  let billToShipping;
  let billingForm;
  let paymentMethods;
  let placeOrder;

  const continueToPayment = async (initialData = null) => {
    if (!billToShipping) {
      billToShipping = await CheckoutProvider.render(BillToShippingAddress, {
        hideOnVirtualCart: true,
        onChange: (checked) => {
          $billingForm.style.display = checked ? 'none' : 'block';
        },
      })($billToShipping);
    }

    if (!billingForm) {
      const storeConfig = checkoutApi.getStoreConfigCache();

      billingForm = await AccountProvider.render(AddressForm, {
        addressesFormTitle: 'Billing address',
        className: 'checkout-billing-form__address-form',
        formName: BILLING_FORM_NAME,
        hideActionFormButtons: true,
        inputsDefaultValueSet: initialData ?? {
          countryCode: storeConfig.defaultCountry,
        },
        isOpen: true,
        onChange: setAddressOnCart({
          api: checkoutApi.setBillingAddress,
          debounceMs: DEBOUNCE_TIME,
          placeOrderBtn: placeOrder,
        }),
        showBillingCheckBox: false,
        showShippingCheckBox: false,
      })($billingForm);
    }

    if (!paymentMethods) {
      paymentMethods = await CheckoutProvider.render(PaymentMethods)($paymentMethods);
    }

    if (!placeOrder) {
      placeOrder = await CheckoutProvider.render(PlaceOrder, {
        handlePlaceOrder: async ({ cartId }) => {
          orderApi.placeOrder(cartId).catch(console.error);
        },
      })($placeOrder);
    }

    continueToPaymentBtn.remove();
    $continueToPaymentBtn.remove();
  };

  // Step 12: Order confirmation
  // Define the Layout for the Order Confirmation
  const displayOrderConfirmation = async (orderData) => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    const orderConfirmationFragment = document.createRange()
      .createContextualFragment(`
      <div class="order-confirmation">
        <div class="order-confirmation__main">
          <div class="order-confirmation__block order-confirmation__header"></div>
          <div class="order-confirmation__block order-confirmation__order-status"></div>
          <div class="order-confirmation__block order-confirmation__shipping-status"></div>
          <div class="order-confirmation__block order-confirmation__customer-details"></div>
        </div>
        <div class="order-confirmation__aside">
          <div class="order-confirmation__block order-confirmation__order-cost-summary"></div>
          <div class="order-confirmation__block order-confirmation__order-product-list"></div>
          <div class="order-confirmation__block order-confirmation__footer"></div>
        </div>
      </div>
  `);

    // Order confirmation elements
    const $orderConfirmationHeader = orderConfirmationFragment.querySelector(
      '.order-confirmation__header',
    );
    const $orderStatus = orderConfirmationFragment.querySelector(
      '.order-confirmation__order-status',
    );
    const $shippingStatus = orderConfirmationFragment.querySelector(
      '.order-confirmation__shipping-status',
    );
    const $customerDetails = orderConfirmationFragment.querySelector(
      '.order-confirmation__customer-details',
    );
    const $orderCostSummary = orderConfirmationFragment.querySelector(
      '.order-confirmation__order-cost-summary',
    );
    const $orderProductList = orderConfirmationFragment.querySelector(
      '.order-confirmation__order-product-list',
    );
    const $orderConfirmationFooter = orderConfirmationFragment.querySelector(
      '.order-confirmation__footer',
    );

    await initializers.mountImmediately(orderApi.initialize, { orderData });

    block.replaceChildren(orderConfirmationFragment);

    const handleSignUpClick = async ({
      inputsDefaultValueSet,
      addressesData,
    }) => {
      const signUpForm = document.createElement('div');
      AuthProvider.render(SignUp, {
        routeSignIn: () => '/customer/login',
        routeRedirectOnEmailConfirmationClose: () => '/customer/account',
        inputsDefaultValueSet,
        addressesData,
        slots: {
          ...authPrivacyPolicyConsentSlot,
        },
      })(signUpForm);

      await showModal(signUpForm);
    };

    OrderProvider.render(OrderHeader, {
      handleEmailAvailability: checkoutApi.isEmailAvailable,
      handleSignUpClick,
      orderData,
    })($orderConfirmationHeader);

    OrderProvider.render(OrderStatus, { slots: { OrderActions: () => null } })(
      $orderStatus,
    );
    OrderProvider.render(ShippingStatus)($shippingStatus);
    OrderProvider.render(CustomerDetails)($customerDetails);
    OrderProvider.render(OrderCostSummary)($orderCostSummary);
    OrderProvider.render(OrderProductList)($orderProductList);

    $orderConfirmationFooter.innerHTML = `
      <div class="order-confirmation-footer__continue-button"></div>
      <div class="order-confirmation-footer__contact-support">
        <p>
          Need help?
          <a
            href="/support"
            rel="noreferrer"
            class="order-confirmation-footer__contact-support-link"
            data-testid="order-confirmation-footer__contact-support-link"
          >
            Contact us
          </a>
        </p>
      </div>
    `;

    const $orderConfirmationFooterContinueBtn = $orderConfirmationFooter.querySelector(
      '.order-confirmation-footer__continue-button',
    );

    UI.render(Button, {
      children: 'Continue shopping',
      'data-testid': 'order-confirmation-footer__continue-button',
      className: 'order-confirmation-footer__continue-button',
      size: 'medium',
      variant: 'primary',
      type: 'submit',
      href: '/',
    })($orderConfirmationFooterContinueBtn);
  };

  // Define the event handlers and shared utilities
  const isEmptyCart = (data) => data === null || data.isEmpty;

  const handleCartInitialized = async (data) => {
    if (isEmptyCart(data)) await displayEmptyCart();
  };

  // Step 7: Checkout event handlers
  const handleCheckoutInitialized = async (data) => {
    if (isEmptyCart(data)) {
      await displayEmptyCart();
      return;
    }

    // Step 9: Update event handlers
    // continue to shipping
    const cartShippingAddress = getCartAddress(data, 'shipping');
    await continueToShipping(cartShippingAddress);

    // Step 10: Delivery
    // continue to delivery
    if (!cartShippingAddress) return;
    await continueToDelivery();

    // Step 11: Payment
    // continue to payment
    const deliveryMethod = getCartDeliveryMethod(data);
    if (!deliveryMethod) return;
    await continueToPayment();
  };

  const handleCheckoutUpdated = async (data) => {
    if (isEmptyCart(data)) {
      await displayEmptyCart();
      return;
    }

    removeEmptyCart();

    // Step 9: Update event handlers
    // continue to shipping
    const cartShippingAddress = getCartAddress(data, 'shipping');
    await continueToShipping(cartShippingAddress);

    // Step 10: Delivery
    if (!cartShippingAddress) return;

    continueToDeliveryBtn.setProps((prev) => ({
      ...prev,
      disabled: false,
    }));

    // Step 11: Payment
    const deliveryMethod = getCartDeliveryMethod(data);
    if (!deliveryMethod) return;

    continueToPaymentBtn.setProps((prev) => ({
      ...prev,
      disabled: false,
    }));
  };

  const handleAuthenticated = (authenticated) => {
    if (!authenticated) return;
    removeModal();
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

    // TODO cleanup checkout containers
    await displayOrderConfirmation(orderData);
  };

  // Step 7: Checkout event handlers
  events.on('authenticated', handleAuthenticated);
  events.on('cart/initialized', handleCartInitialized, { eager: true });
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  // Step 12: Order confirmation
  events.on('order/placed', handleOrderPlaced);
}
