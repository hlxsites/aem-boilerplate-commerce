// Dropin Tools
import { debounce } from '@dropins/tools/lib.js';

// Checkout Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';

// Account Dropin Modules
import Addresses from '@dropins/storefront-account/containers/Addresses.js';
import { render as accountProvider } from '@dropins/storefront-account/render.js';

// Block-level modules
import {
  BILLING_FORM_NAME,
  DEBOUNCE_TIME,
  SHIPPING_FORM_NAME,
  SHIPPING_ADDRESS_DATA_KEY,
  BILLING_ADDRESS_DATA_KEY,
} from '../constants.js';
import {
  aside,
  billingForm,
  billToShippingAddress,
  cartSummaryList,
  errorBanner,
  containerRefs,
  heading,
  login,
  main,
  mergedCartBanner,
  orderSummary,
  outOfStock,
  overlaySpinner,
  paymentMethods,
  placeOrder,
  root,
  shippingForm,
  shippingMethods,
  shippingDivider,
  paymentDivider,
  placeOrderDivider,
} from '../dom.js';
import { Events, eventState } from '../lib/event-state.js';
import { setAddressOnCart, getCartAddress } from '../lib/utils.js';

const signedInViewHandler = { layout, init, cleanup };

function layout({ screen }) {
  if (screen === 'mobile') {
    root.replaceChildren(
      errorBanner,
      mergedCartBanner,
      heading,
      cartSummaryList,
      outOfStock,
      login,
      shippingDivider,
      shippingForm,
      billToShippingAddress,
      shippingMethods,
      paymentDivider,
      paymentMethods,
      billingForm,
      orderSummary,
      placeOrder,
      overlaySpinner,
    );
  } else {
    main.replaceChildren(
      heading,
      outOfStock,
      login,
      shippingDivider,
      shippingForm,
      billToShippingAddress,
      shippingMethods,
      paymentDivider,
      paymentMethods,
      billingForm,
      placeOrderDivider,
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

function init({ store }) {
  overlaySpinner.classList.remove('checkout__overlay-spinner--shown');

  const { isVirtual } = eventState[Events.CheckoutData].current;

  if (isVirtual) {
    shippingDivider.replaceChildren();
    shippingForm.replaceChildren();
  } else {
    const shippingAddressOnCart = getCartAddress(
      eventState[Events.CheckoutData].current,
      'shipping',
    );

    const shippingAddressId = shippingAddressOnCart
      ? (shippingAddressOnCart?.id ?? 0)
      : undefined;

    const persistedShippingAddress = sessionStorage.getItem(
      SHIPPING_ADDRESS_DATA_KEY,
    );
    let isFirstRenderShipping = true;

    // clear persisted shipping address if cart has a shipping address
    if (shippingAddressOnCart && persistedShippingAddress) {
      sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    }

    const inputsDefaultValueSet = shippingAddressOnCart && shippingAddressOnCart.id === undefined
      ? shippingAddressOnCart
      : { countryCode: store.storeConfig.defaultCountry };

    accountProvider.render(Addresses, {
      formName: SHIPPING_FORM_NAME,
      minifiedView: false,
      selectable: true,
      showSaveCheckBox: true,
      showShippingCheckBox: false,
      showBillingCheckBox: false,
      selectShipping: true,
      forwardFormRef: containerRefs.shippingForm,
      title: 'Shipping address',
      addressFormTitle: 'Deliver to new address',
      onAddressData: debounce((values) => {
        const hasCartShippingAddress = Boolean(
          eventState[Events.CheckoutData].current.shippingAddresses?.[0],
        );

        if (!isFirstRenderShipping || !hasCartShippingAddress) {
          setAddressOnCart(values, checkoutApi.setShippingAddress);
        }

        if (isFirstRenderShipping) isFirstRenderShipping = false;
      }, DEBOUNCE_TIME),
      defaultSelectAddressId: shippingAddressId,
      inputsDefaultValueSet,
    })(shippingForm);
  }

  const billingAddressOnCart = getCartAddress(
    eventState[Events.CheckoutData].current,
    'billing',
  );

  const billingAddressId = billingAddressOnCart
    ? (billingAddressOnCart?.id ?? 0)
    : undefined;

  const persistedBillingAddress = sessionStorage.getItem(
    BILLING_ADDRESS_DATA_KEY,
  );
  let isFirstRenderBilling = true;

  // clear persisted billing address if cart has a billing address
  if (billingAddressOnCart && persistedBillingAddress) {
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
  }

  const inputsDefaultValueSet = billingAddressOnCart && billingAddressOnCart.id === undefined
    ? billingAddressOnCart
    : { countryCode: store.storeConfig.defaultCountry };

  accountProvider.render(Addresses, {
    formName: BILLING_FORM_NAME,
    minifiedView: false,
    selectable: true,
    showSaveCheckBox: true,
    showShippingCheckBox: false,
    showBillingCheckBox: false,
    selectBilling: true,
    forwardFormRef: containerRefs.billingForm,
    title: 'Billing address',
    addressFormTitle: 'Bill to new address',
    onAddressData: debounce((values) => {
      store.billingFormValues = values;

      const hasCartBillingAddress = Boolean(
        eventState[Events.CheckoutData].current.billingAddress,
      );

      if (!isFirstRenderBilling || !hasCartBillingAddress) {
        setAddressOnCart(values, checkoutApi.setBillingAddress);
      }

      if (isFirstRenderBilling) isFirstRenderBilling = false;
    }, DEBOUNCE_TIME),
    defaultSelectAddressId: billingAddressId,
    inputsDefaultValueSet,
  })(billingForm);
}

function cleanup() {}

export default signedInViewHandler;
