// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { debounce } from '@dropins/tools/lib.js';

// Checkout Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';

// Account Dropin Modules
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
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

const guestViewHandler = { layout, init, cleanup };

function layout({ screen }) {
  if (screen === 'mobile') {
    root.replaceChildren(
      errorBanner,
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

    root.replaceChildren(errorBanner, main, aside, placeOrder, overlaySpinner);
  }
}

function init({ store }) {
  const { isVirtual } = eventState[Events.CheckoutData].current;

  if (isVirtual) {
    shippingDivider.replaceChildren();
    shippingForm.replaceChildren();
  } else {
    const shippingAddressOnCart = getCartAddress(
      eventState[Events.CheckoutData].current,
      'shipping',
    );
    const persistedShippingAddress = sessionStorage.getItem(
      SHIPPING_ADDRESS_DATA_KEY,
    );

    // clear persisted shipping address if cart has a shipping address
    if (shippingAddressOnCart && persistedShippingAddress) {
      sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    }

    // when shipping address form is empty
    if (!shippingAddressOnCart && !persistedShippingAddress) {
      checkoutApi.estimateShippingMethods();

      events.emit('checkout/estimate-shipping-address', {
        address: {},
        isValid: false,
      });
    }

    const inputsDefaultValueSet = shippingAddressOnCart ?? {
      countryCode: store.storeConfig.defaultCountry,
    };

    let prevEstimateShippingData = {};
    let isFirstRenderShipping = true;
    accountProvider.render(AddressForm, {
      addressesFormTitle: 'Shipping address',
      className: 'checkout-shipping-form__address-form',
      formName: SHIPPING_FORM_NAME,
      hideActionFormButtons: true,
      inputsDefaultValueSet,
      isOpen: true,
      forwardFormRef: containerRefs.shippingForm,
      onChange: debounce((values) => {
        const hasCartShippingAddress = Boolean(
          eventState[Events.CheckoutData].current.shippingAddresses?.[0],
        );

        if (!isFirstRenderShipping || !hasCartShippingAddress) {
          setAddressOnCart(values, checkoutApi.setShippingAddress);
        }

        const { data, isDataValid } = values;

        if (isFirstRenderShipping) isFirstRenderShipping = false;

        if (hasCartShippingAddress || isDataValid) return;

        if (
          prevEstimateShippingData.countryCode === data.countryCode
          && prevEstimateShippingData.regionCode === data.region.regionCode
          && prevEstimateShippingData.regionId === data.region.regionId
          && prevEstimateShippingData.postcode === data.postcode
        ) {
          return;
        }

        const criteria = {
          country_code: data.countryCode,
          region_name: String(data.region.regionCode || ''),
          region_id: String(data.region.regionId || ''),
        };
        checkoutApi.estimateShippingMethods({ criteria });

        events.emit('checkout/estimate-shipping-address', {
          address: {
            country_id: data.countryCode,
            region: String(data.region.regionCode || ''),
            region_id: String(data.region.regionId || ''),
            postcode: data.postcode,
          },
          isValid: isDataValid,
        });

        prevEstimateShippingData = {
          countryCode: data.countryCode,
          regionCode: data.region.regionCode,
          regionId: data.region.regionId,
          postcode: data.postcode,
        };
      }, DEBOUNCE_TIME),
      showBillingCheckBox: false,
      showShippingCheckBox: false,
    })(shippingForm);
  }

  const billingAddressOnCart = getCartAddress(
    eventState[Events.CheckoutData].current,
    'billing',
  );
  const persistedBillingAddress = sessionStorage.getItem(
    BILLING_ADDRESS_DATA_KEY,
  );

  // clear persisted billing address if cart has a billing address
  if (billingAddressOnCart && persistedBillingAddress) {
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
  }

  const inputsDefaultValueSet = billingAddressOnCart ?? {
    countryCode: store.storeConfig.defaultCountry,
  };

  let isFirstRenderBilling = true;
  accountProvider.render(AddressForm, {
    addressesFormTitle: 'Billing address',
    className: 'checkout-billing-form__address-form',
    formName: BILLING_FORM_NAME,
    hideActionFormButtons: true,
    inputsDefaultValueSet,
    isOpen: true,
    forwardFormRef: containerRefs.billingForm,
    onChange: debounce((values) => {
      store.billingFormValues = values;

      const hasCartBillingAddress = Boolean(
        eventState[Events.CheckoutData].current.billingAddress,
      );

      if (!isFirstRenderBilling || !hasCartBillingAddress) {
        setAddressOnCart(values, checkoutApi.setBillingAddress);
      }

      if (isFirstRenderBilling) isFirstRenderBilling = false;
    }, DEBOUNCE_TIME),
    showBillingCheckBox: false,
    showShippingCheckBox: false,
  })(billingForm);
}

function cleanup() {}

export default guestViewHandler;
