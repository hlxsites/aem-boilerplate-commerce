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
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as AuthProvider } from '@dropins/storefront-auth/render.js';

// Account Dropin
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as AccountProvider } from '@dropins/storefront-account/render.js';

// Cart Dropin
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import { OrderSummary } from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
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
import { getCartAddress, setAddressOnCart } from '../../scripts/checkout.js';
import createModal from '../modal/modal.js';

export default async function decorate(block) {
  // Initializers
  import('../../scripts/initializers/auth.js');
  import('../../scripts/initializers/checkout.js');

  const DEBOUNCE_TIME = 1000;
  const LOGIN_FORM_NAME = 'login-form';
  const SHIPPING_FORM_NAME = 'selectedShippingAddress';
  const BILLING_FORM_NAME = 'selectedBillingAddress';
  const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
  const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;

  // Define the Layout for the Checkout
  const fragment = document.createRange().createContextualFragment(`
    <div class="checkout__wrapper">
      <div class="checkout__progress">
        <div class="checkout__progress__step checkout__progress__shipping"></div>
        <div class="checkout__progress__step checkout__progress__payment"></div>
      </div>
      <div class="checkout__heading"></div>
      <div class="checkout__empty-cart"></div>
      <div class="checkout__steps">
        <div class="checkout__steps__main"/>
          <div class="checkout__shipping">
            <div class="checkout__login"></div>
            <div class="checkout__shipping-form"></div>
            <div class="checkout__shipping-methods"></div>
            <div class="checkout__continue-to-payment"></div>
          </div>
          <div class="checkout__payment">
            <div class="checkout__payment-methods"></div>
            <div class="checkout__bill-to-shipping"></div>
            <div class="checkout__billing-form"></div>
            <div class="checkout__place-order"></div>
          </div>
        </div>
        <div class="checkout__steps__aside"/>
          <div class="checkout__order-summary"/>
        </div>
      </div>
    </div>
  `);

  const $progress = fragment.querySelector('.checkout__progress');
  const $shippingProgress = fragment.querySelector(
    '.checkout__progress__shipping',
  );
  const $paymentProgress = fragment.querySelector(
    '.checkout__progress__payment',
  );

  const $heading = fragment.querySelector('.checkout__heading');
  const $emptyCart = fragment.querySelector('.checkout__empty-cart');

  const $steps = fragment.querySelector('.checkout__steps');

  const $shippingStep = fragment.querySelector('.checkout__shipping');
  const $login = fragment.querySelector('.checkout__login');
  const $shippingForm = fragment.querySelector('.checkout__shipping-form');
  const $shippingMethods = fragment.querySelector(
    '.checkout__shipping-methods',
  );
  const $continueToPaymentBtn = fragment.querySelector(
    '.checkout__continue-to-payment',
  );

  const $paymentStep = fragment.querySelector('.checkout__payment');
  const $paymentMethods = fragment.querySelector('.checkout__payment-methods');
  const $billToShipping = fragment.querySelector('.checkout__bill-to-shipping');
  const $billingForm = fragment.querySelector('.checkout__billing-form');
  const $placeOrder = fragment.querySelector('.checkout__place-order');

  const $orderSummary = fragment.querySelector('.checkout__order-summary');

  block.replaceChildren(fragment);

  // Render initial containers and components
  let [
    shippingProgress,
    paymentProgress,
    heading,
    _loginForm,
    shippingFormSkeleton,
    _shippingMethods,
    continuePaymentBtn,
    _orderSummary,
  ] = await Promise.all([
    UI.render(Button, {
      active: false,
      activeChildren: 'SHIPPING',
      children: 'SHIPPING',
      disabled: true,
      variant: 'primary',
      onClick: () => {
        $shippingStep.style.display = 'grid';
        shippingProgress.setProps((prev) => ({
          ...prev,
          active: true,
        }));

        $paymentStep.style.display = 'none';
        paymentProgress.setProps((prev) => ({
          ...prev,
          active: false,
        }));
      },
    })($shippingProgress),

    UI.render(Button, {
      active: false,
      activeChildren: 'PAYMENT',
      children: 'PAYMENT',
      disabled: true,
      variant: 'primary',
      onClick: () => {
        $shippingStep.style.display = 'none';
        shippingProgress.setProps((prev) => ({
          ...prev,
          active: false,
        }));

        $paymentStep.style.display = 'grid';
        paymentProgress.setProps((prev) => ({
          ...prev,
          active: true,
        }));
      },
    })($paymentProgress),

    UI.render(Header, {
      title: 'Luma Checkout',
      size: 'large',
      divider: true,
    })($heading),

    CheckoutProvider.render(LoginForm, {
      name: LOGIN_FORM_NAME,
    })($login),

    AccountProvider.render(AddressForm, {
      isOpen: true,
      showFormLoader: true,
    })($shippingForm),

    CheckoutProvider.render(ShippingMethods, {
      hideOnVirtualCart: true,
    })($shippingMethods),

    await UI.render(Button, {
      children: 'Next',
      disabled: true,
      onClick: async () => {
        await continueToPayment();
      },
    })($continueToPaymentBtn),

    CartProvider.render(OrderSummary, {
      slots: {
        EstimateShipping: (esCtx) => {
          const estimateShippingForm = document.createElement('div');
          CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
          esCtx.appendChild(estimateShippingForm);
        },
      },
    })($orderSummary),
  ]);

  // Dynamic containers and components

  let modal;

  const showModal = async (content) => {
    modal = await createModal([content]);
    modal.showModal();
  };

  let emptyCart;

  const displayEmptyCart = async () => {
    if (emptyCart) return;

    emptyCart = await CartProvider.render(EmptyCart, {
      routeCTA: () => '/',
    })($emptyCart);

    heading.setProps((prev) => ({
      ...prev,
      title: 'Checkout',
    }));

    $progress.classList.add('checkout__progress--empty');
    $steps.classList.add('checkout__steps--empty');
  };

  const removeEmptyCart = () => {
    if (!emptyCart) return;

    emptyCart.remove();
    emptyCart = null;
    $emptyCart.innerHTML = '';

    $progress.classList.remove('checkout__progress--empty');
    $steps.classList.remove('checkout__steps--empty');
  };

  const continueToShipping = async (data) => {
    if (!shippingFormSkeleton) return;

    heading.setProps((prev) => ({
      ...prev,
      title: 'Shipping Method',
    }));

    shippingProgress.setProps((prev) => ({
      ...prev,
      active: true,
      disabled: false,
    }));

    const cartShippingAddress = getCartAddress(data, 'shipping');

    if (!cartShippingAddress) {
      await checkoutApi.estimateShippingMethods();

      events.emit('checkout/estimate-shipping-address', {
        address: {},
        isValid: false,
      });
    }

    // remove the shipping form sekeleton
    shippingFormSkeleton.remove();
    shippingFormSkeleton = null;
    $shippingForm.innerHTML = '';

    const storeConfig = checkoutApi.getStoreConfigCache();

    await AccountProvider.render(AddressForm, {
      addressesFormTitle: 'Shipping address',
      className: 'checkout-shipping-form__address-form',
      formName: SHIPPING_FORM_NAME,
      hideActionFormButtons: true,
      inputsDefaultValueSet: cartShippingAddress ?? {
        countryCode: storeConfig.defaultCountry,
      },
      isOpen: true,
      onChange: setAddressOnCart({
        api: checkoutApi.setShippingAddress,
        debounceMs: DEBOUNCE_TIME,
      }),
      showBillingCheckBox: false,
      showShippingCheckBox: false,
    })($shippingForm);
  };

  let paymentContainers;

  const continueToPayment = async (data) => {
    if (paymentContainers) return;

    heading.setProps((prev) => ({
      ...prev,
      title: 'Payment Method',
    }));

    paymentProgress.setProps((prev) => ({
      ...prev,
      active: true,
      disabled: false,
    }));

    shippingProgress.setProps((prev) => ({
      ...prev,
      active: false,
      disabled: false,
    }));

    $shippingStep.style.display = 'none';

    const cartBillingAddress = getCartAddress(data, 'billing');

    const storeConfig = checkoutApi.getStoreConfigCache();

    paymentContainers = await Promise.all([
      CheckoutProvider.render(PaymentMethods)($paymentMethods),

      CheckoutProvider.render(BillToShippingAddress, {
        hideOnVirtualCart: true,
        onChange: (checked) => {
          $billingForm.style.display = checked ? 'none' : 'block';
        },
      })($billToShipping),

      AccountProvider.render(AddressForm, {
        addressesFormTitle: 'Billing address',
        className: 'checkout-billing-form__address-form',
        formName: BILLING_FORM_NAME,
        hideActionFormButtons: true,
        inputsDefaultValueSet: cartBillingAddress ?? {
          countryCode: storeConfig.defaultCountry,
        },
        isOpen: true,
        onChange: setAddressOnCart({
          api: checkoutApi.setBillingAddress,
          debounceMs: DEBOUNCE_TIME,
        }),
        showBillingCheckBox: false,
        showShippingCheckBox: false,
      })($billingForm),

      CheckoutProvider.render(PlaceOrder, {
        disabled: true,
        handlePlaceOrder: async ({ cartId }) => {
          orderApi.placeOrder(cartId).catch(console.error);
        },
      })($placeOrder),
    ]);

    continuePaymentBtn.remove();
    $continueToPaymentBtn.innerHTML = '';
  };

  const displayOrderConfirmation = async (orderData) => {
    // Define the Layout for the Order Confirmation
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

    const onSignUpClick = async ({ inputsDefaultValueSet, addressesData }) => {
      const signUpForm = document.createElement('div');
      AuthProvider.render(SignUp, {
        routeSignIn: () => '/customer/login',
        routeRedirectOnEmailConfirmationClose: () => '/customer/account',
        inputsDefaultValueSet,
        addressesData,
      })(signUpForm);

      showModal(signUpForm);
    };

    OrderProvider.render(OrderHeader, {
      orderData,
      onSignUpClick,
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

  // Define checkout event handlers and shared utilities
  const isEmptyCart = (data) => data === null || data.isEmpty;

  const canProceedToPayment = (data) => {
    const { email } = data;
    const shippingAddresses = data.shippingAddresses || [];

    if (!email || shippingAddresses.length === 0) return false;

    const selectedAddress = shippingAddresses[0];
    const selectedDelivery = selectedAddress.selectedShippingMethod;

    return !!selectedDelivery;
  };

  async function handleCheckoutInitialized(data) {
    if (isEmptyCart(data)) {
      await displayEmptyCart();
    } else {
      removeEmptyCart();
      await continueToShipping(data);
      if (canProceedToPayment(data)) await continueToPayment();
    }
  }

  async function handleCheckoutUpdated(data) {
    if (isEmptyCart(data)) {
      await displayEmptyCart();
    } else {
      removeEmptyCart();
      await continueToShipping(data);
      if (!canProceedToPayment(data)) return;
      continuePaymentBtn.setProps((prev) => ({ ...prev, disabled: false }));
    }
  }

  async function handleCheckoutOrder(orderData) {
    // clear address form data
    sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const encodedOrderRef = encodeURIComponent(orderRef);

    window.history.pushState(
      {},
      '',
      `/order-details?orderRef=${encodedOrderRef}`,
    );

    // TODO cleanup checkout containers
    await displayOrderConfirmation(orderData);
  }

  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  events.on('checkout/order', handleCheckoutOrder);
}
