// Dropin Tools
import {
  Divider,
  ProgressSpinner,
  provider as uiProvider,
} from '@dropins/tools/components.js';

// Cart Dropin Modules
import * as cartApi from '@dropins/storefront-cart/api.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import { OrderSummary } from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as cartProvider } from '@dropins/storefront-cart/render.js';

// Checkout Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import ErrorBanner from '@dropins/storefront-checkout/containers/ErrorBanner.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import MergedCartBanner from '@dropins/storefront-checkout/containers/MergedCartBanner.js';
import OutOfStock from '@dropins/storefront-checkout/containers/OutOfStock.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ServerError from '@dropins/storefront-checkout/containers/ServerError.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import { render as checkoutProvider } from '@dropins/storefront-checkout/render.js';

// Auth Dropin Modules
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import { render as authProvider } from '@dropins/storefront-auth/render.js';

// Account Dropin Modules
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as accountProvider } from '@dropins/storefront-account/render.js';

// Block-level modules
import {
  LOGIN_FORM_NAME,
  BILLING_FORM_NAME,
  SHIPPING_FORM_NAME,
} from '../constants.js';
import {
  aside,
  billingForm,
  billToShippingAddress,
  cartSummaryList,
  emptyCart,
  errorBanner,
  containerRefs,
  heading,
  headingDivider,
  login,
  main,
  mergedCartBanner,
  orderSummary,
  outOfStock,
  overlaySpinner,
  paymentMethods,
  placeOrder,
  root,
  serverError,
  shippingForm,
  shippingMethods,
  shippingDivider,
  paymentDivider,
  placeOrderDivider,
} from '../dom.js';
import { showModal } from '../lib/modal.js';
import { View, updateView } from '../lib/view.js';
import { setAddressOnCart, scrollTo } from '../lib/utils.js';

const initialViewHandler = { layout, init, cleanup };

function layout({ screen }) {
  if (screen === 'mobile') {
    root.replaceChildren(
      errorBanner,
      mergedCartBanner,
      heading,
      cartSummaryList,
      outOfStock,
      login,
      shippingForm,
      billToShippingAddress,
      shippingMethods,
      billingForm,
      paymentMethods,
      orderSummary,
      placeOrder,
      overlaySpinner,
    );
  } else {
    main.replaceChildren(
      heading,
      outOfStock,
      login,
      shippingForm,
      billToShippingAddress,
      shippingMethods,
      billingForm,
      paymentMethods,
    );

    aside.replaceChildren(orderSummary, cartSummaryList);

    root.replaceChildren(
      errorBanner,
      mergedCartBanner,
      main,
      aside,
      placeOrder,
      overlaySpinner,
    );
  }
}

function init({ store, block }) {
  uiProvider.render(Divider, { variant: 'primary' })(headingDivider);
  uiProvider.render(Divider, { variant: 'primary' })(shippingDivider);
  uiProvider.render(Divider, { variant: 'primary' })(paymentDivider);
  uiProvider.render(Divider, { variant: 'primary' })(placeOrderDivider);
  uiProvider.render(ProgressSpinner)(overlaySpinner);

  checkoutProvider.render(ServerError, {
    onServerError: () => updateView(View.ServerError),
  })(serverError);

  cartProvider.render(EmptyCart, { routeCTA: () => '/' })(emptyCart);
  checkoutProvider.render(ErrorBanner)(errorBanner);
  checkoutProvider.render(MergedCartBanner)(mergedCartBanner);

  checkoutProvider.render(OutOfStock, {
    routeCart: () => '/cart',
    onCartProductsUpdate: (items) => {
      cartApi.updateProductsFromCart(items).catch(console.error);
    },
  })(outOfStock);

  checkoutProvider.render(LoginForm, {
    name: LOGIN_FORM_NAME,
    onSignInClick: async (initialEmailValue) => {
      const signInForm = document.createElement('div');

      authProvider.render(AuthCombine, {
        signInFormConfig: {
          renderSignUpLink: true,
          initialEmailValue,
          onSuccessCallback: () => {
            overlaySpinner.classList.add('checkout__overlay-spinner--shown');
          },
        },
        signUpFormConfig: {},
        resetPasswordFormConfig: {},
      })(signInForm);

      showModal(signInForm);
    },
    onSignOutClick: () => {
      authApi.revokeCustomerToken();
    },
  })(login);

  accountProvider.render(AddressForm, {
    isOpen: true,
    showFormLoader: true,
  })(shippingForm);

  checkoutProvider.render(BillToShippingAddress, {
    hideOnVirtualCart: true,
    onChange: (checked) => {
      store.isBillToShipping = checked;
      billingForm.style.display = checked ? 'none' : 'block';
      const values = store.billingFormValues;
      if (checked || values === undefined) return;
      setAddressOnCart(values, checkoutApi.setBillingAddress);
    },
  })(billToShippingAddress);

  accountProvider.render(AddressForm, {
    isOpen: true,
    showFormLoader: true,
  })(billingForm);

  checkoutProvider.render(ShippingMethods, {
    hideOnVirtualCart: true,
    // onShippingMethodSelect: (shippingMethod) => {},
    onCheckoutDataUpdate: () => {
      cartApi.refreshCart().catch(console.error);
    },
  })(shippingMethods);

  checkoutProvider.render(PaymentMethods, {
    // slots: {
    //   Handlers: {
    //     checkmo: (_ctx) => {
    //       const $content = document.createElement('div');
    //       $content.innerText = 'checkmo';
    //       _ctx.replaceHTML($content);
    //     },
    //   },
    // },
  })(paymentMethods);

  cartProvider.render(OrderSummary, {
    slots: {
      EstimateShipping: (esCtx) => {
        const estimateShippingForm = document.createElement('div');
        checkoutProvider.render(EstimateShipping)(estimateShippingForm);
        esCtx.appendChild(estimateShippingForm);
      },
    },
  })(orderSummary);

  cartProvider.render(CartSummaryList, {
    slots: {
      Heading: (headingCtx) => {
        // TODO: Update this to use the dictionary
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
  })(cartSummaryList);

  checkoutProvider.render(PlaceOrder, {
    handleValidation: () => {
      let success = true;
      const { forms } = document;

      const loginForm = forms[LOGIN_FORM_NAME];
      if (loginForm) {
        success = loginForm.checkValidity();
        if (!success) scrollTo(login);
      }

      const shippingAddressForm = forms[SHIPPING_FORM_NAME];
      const shippingContainerRef = containerRefs.shippingForm.current;
      if (
        success
        && shippingContainerRef
        && shippingAddressForm
        && shippingAddressForm.checkVisibility()
      ) {
        success = shippingContainerRef.handleValidationSubmit(false);
      }

      const billingAddressForm = forms[BILLING_FORM_NAME];
      const billingContainerRef = containerRefs.billingForm.current;
      if (
        success
        && billingContainerRef
        && billingAddressForm
        && billingAddressForm.checkVisibility()
      ) {
        success = billingContainerRef.handleValidationSubmit(false);
      }

      return success;
    },
    onPlaceOrder: async () => {
      overlaySpinner.classList.add('checkout__overlay-spinner--shown');

      try {
        await checkoutApi.placeOrder();
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        overlaySpinner.classList.remove('checkout__overlay-spinner--shown');
      }
    },
  })(placeOrder);

  block.appendChild(root);
}

function cleanup() {}

export default initialViewHandler;
