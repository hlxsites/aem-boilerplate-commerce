/* eslint-disable import/no-unresolved */

import { events } from '@dropins/tools/event-bus.js';
import { debounce } from '@dropins/tools/lib.js';
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as AccountProvider } from '@dropins/storefront-account/render.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';
import {
  estimateShippingCost,
  getCartAddress,
  setAddressOnCart,
  transformCartAddressToFormValues,
} from '@dropins/storefront-checkout/lib/utils.js';
import { fetchPlaceholders } from '../../scripts/commerce.js';
import {
  ADDRESS_INPUT_DEBOUNCE_TIME,
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  DEBOUNCE_TIME,
  SHIPPING_ADDRESS_DATA_KEY,
  SHIPPING_FORM_NAME,
} from '../commerce-checkout/constants.js';

export const renderAddressForm = async (container, formRef, data, addressType) => {
  const isShipping = addressType === 'shipping';
  const cartAddress = getCartAddress(data, addressType);
  const addressDataKey = isShipping ? SHIPPING_ADDRESS_DATA_KEY : BILLING_ADDRESS_DATA_KEY;
  const addressCache = sessionStorage.getItem(addressDataKey);

  if (cartAddress && addressCache) sessionStorage.removeItem(addressDataKey);

  const placeholders = await fetchPlaceholders('placeholders/checkout.json');
  const setAddressOnCartFn = setAddressOnCart({
    type: addressType,
    debounceMs: DEBOUNCE_TIME,
  });
  const estimateShippingCostOnCart = isShipping
    ? estimateShippingCost({ debounceMs: DEBOUNCE_TIME })
    : null;
  const eventType = isShipping ? 'checkout/addresses/shipping' : 'checkout/addresses/billing';
  const notifyValues = debounce(
    (values) => events.emit(eventType, values),
    ADDRESS_INPUT_DEBOUNCE_TIME,
  );
  const formName = isShipping ? SHIPPING_FORM_NAME : BILLING_FORM_NAME;
  const title = isShipping
    ? placeholders?.Checkout?.Addresses?.shippingAddressTitle
    : placeholders?.Checkout?.Addresses?.billingAddressTitle;
  const inputsDefaultValueSet = cartAddress
    ? transformCartAddressToFormValues(cartAddress)
    : { countryCode: checkoutApi.getStoreConfigCache().defaultCountry };
  const hasCartAddress = Boolean(isShipping ? data.shippingAddresses?.[0] : data.billingAddress);
  let isFirstRender = true;

  return AccountProvider.render(AddressForm, {
    addressesFormTitle: title,
    className: isShipping
      ? 'checkout-shipping-form__address-form'
      : 'checkout-billing-form__address-form',
    fieldIdPrefix: addressType,
    formName,
    forwardFormRef: formRef,
    hideActionFormButtons: true,
    inputsDefaultValueSet,
    isOpen: true,
    onChange: (values) => {
      if (!isFirstRender || !hasCartAddress) setAddressOnCartFn(values);
      if (isShipping && !hasCartAddress) estimateShippingCostOnCart?.(values);
      isFirstRender = false;
      notifyValues(values);
    },
    showBillingCheckBox: false,
    showFormLoader: false,
    showShippingCheckBox: false,
  })(container);
};

export const renderBillToShippingAddress = (container) => {
  const setBillingAddressOnCart = setAddressOnCart({ type: 'billing' });

  return CheckoutProvider.render(BillToShippingAddress, {
    onChange: (checked) => {
      const billingValues = events.lastPayload('checkout/addresses/billing');
      if (!checked && billingValues) setBillingAddressOnCart(billingValues);
    },
  })(container);
};

export const renderShippingMethods = (container) => (
  CheckoutProvider.render(ShippingMethods)(container)
);
