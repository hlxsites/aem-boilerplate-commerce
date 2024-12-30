/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable max-len */

// Dropin Tools
import {
  provider as UI,
  RadioButton,
  Header,
  ToggleButton,
} from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';
import { debounce } from '@dropins/tools/lib.js';

// Cart Dropin Modules
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import { OrderSummary } from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as cartProvider } from '@dropins/storefront-cart/render.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';

// Checkout Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import { render as checkoutProvider } from '@dropins/storefront-checkout/render.js';

// Account Dropin Modules
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as accountProvider } from '@dropins/storefront-account/render.js';

const DEBOUNCE_TIME = 1000;
const LOGIN_FORM_NAME = 'login-form';
const SHIPPING_FORM_NAME = 'selectedShippingAddress';
const BILLING_FORM_NAME = 'selectedBillingAddress';

// Step 1: Update Content Fragment
const fragment = document.createRange().createContextualFragment(`
  <div class="checkout__content">
    <div class="checkout__main">
      <div class="checkout__block checkout__heading"></div>
      <div class="checkout__login"></div>
      <div class="checkout__delivery-method">
        <h2 class="checkout-delivery-method__title">Delivery Method</h2>
        <div class="checkout-delivery-method__toggle-buttons">
          <div class="checkout-delivery-method__delivery-button"></div>
          <div class="checkout-delivery-method__in-store-pickup-button"></div>
        </div>
      </div>
      <div class="checkout__in-store-pickup"></div>
      <div class="checkout__shipping-form"></div>
      <div class="checkout__shipping-methods"></div>
      <div class="checkout__payment-methods"></div>
      <div class="checkout__billing-form"></div>
      <div class="checkout__place-order"></div>
    </div>
    <div class="checkout__aside">
      <div class="checkout__order-summary"></div>
      <div class="cart-summary-list"></div>
    </div>
  </div>
`);

export const $root = fragment.querySelector('.checkout__content');
export const $heading = fragment.querySelector('.checkout__heading');
export const $main = fragment.querySelector('.checkout__main');
export const $login = fragment.querySelector('.checkout__login');
// Step 1: Update Content Fragment
export const $deliveryButton = fragment.querySelector('.checkout-delivery-method__delivery-button');
export const $inStorePickupButton = fragment.querySelector('.checkout-delivery-method__in-store-pickup-button');
export const $inStorePickup = fragment.querySelector('.checkout__in-store-pickup');
export const $shippingForm = fragment.querySelector('.checkout__shipping-form');
export const $billToShippingAddress = fragment.querySelector(
  '.checkout__bill-to-shipping-address',
);
export const $shippingMethods = fragment.querySelector(
  '.checkout__shipping-methods',
);
export const $paymentMethods = fragment.querySelector(
  '.checkout__payment-methods',
);
export const $billingForm = fragment.querySelector('.checkout__billing-form');
export const $aside = fragment.querySelector('.checkout__aside');
export const $orderSummary = fragment.querySelector('.checkout__order-summary');
export const $cartSummaryList = fragment.querySelector('.cart-summary-list');
export const $placeOrder = fragment.querySelector('.checkout__place-order');

function setAddressOnCart(values, setAddressApi) {
  const { data, isDataValid } = values;
  const isNewAddress = !data?.id;

  if (!isDataValid) return;

  const customAttributes = data.customAttributes
    ? Object.entries(data.customAttributes).map(([code, value]) => ({
      code,
      value: value.toString(),
    }))
    : [];

  const address = !isNewAddress
    ? { customerAddressId: data.id }
    : {
      saveInAddressBook: data.saveAddressBook,
      address: {
        city: data.city,
        company: data?.company,
        countryCode: data.countryCode,
        customAttributes,
        firstName: data.firstName,
        lastName: data.lastName,
        postcode: data.postcode,
        region: data?.region?.regionCode,
        regionId: data?.region?.regionId,
        street: data.street,
        telephone: data.telephone,
        vatId: data.vatId,
        prefix: data.prefix,
        suffix: data.suffix,
        middleName: data.middleName,
        fax: data.fax,
      },
    };

  setAddressApi(address);
}

// Step 4: Fetching Pickup Locations
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

// Define the renderHeader function
async function renderHeader() {
  await UI.render(Header, {
    title: 'BOPIS Checkout',
    size: 'large',
    divider: true,
  })($heading);
}

renderHeader();

export default async function decorate(block) {
  // Initializers
  import('../../scripts/initializers/account.js');
  import('../../scripts/initializers/checkout.js');

  events.on('checkout/initialized', async (checkoutData) => {
    const [
      _login,
      // Step 2: UI Components for Delivery and In-Store Pickup
      deliveryButton,
      inStorePickupButton,
      _shippingForm,
      _billingForm,
      _shippingMethods,
      _paymentMethods,
      _orderSummary,
      _cartSummary,
      _placeOrder,
    ] = await Promise.all([
      checkoutProvider.render(LoginForm, { name: LOGIN_FORM_NAME })($login),

      // Step 2: UI Components for Delivery and In-Store Pickup
      UI.render(ToggleButton, {
        label: 'Delivery',
        onChange: () => onToggle('delivery'),
      })($deliveryButton),

      UI.render(ToggleButton, {
        label: 'In-store Pickup',
        onChange: () => onToggle('in-store-pickup'),
      })($inStorePickupButton),

      accountProvider.render(AddressForm, {
        addressesFormTitle: 'Shipping address',
        className: 'checkout-shipping-form__address-form',
        formName: SHIPPING_FORM_NAME,
        hideActionFormButtons: true,
        isOpen: true,
        showBillingCheckBox: false,
        showShippingCheckBox: false,
        onChange: debounce((values) => {
          setAddressOnCart(values, checkoutApi.setShippingAddress);

          const hasCartShippingAddress = Boolean(
            checkoutData.shippingAddresses?.[0],
          );
          const { data, isDataValid } = values;

          if (hasCartShippingAddress || isDataValid) return;

          const criteria = {
            country_code: data.countryCode,
            region_name: String(data.region.regionCode || ''),
            region_id: String(data.region.regionId || ''),
          };
          checkoutApi.estimateShippingMethods({ criteria });
        }, DEBOUNCE_TIME),
      })($shippingForm),

      accountProvider.render(AddressForm, {
        addressesFormTitle: 'Billing address',
        className: 'checkout-billing-form__address-form',
        formName: BILLING_FORM_NAME,
        hideActionFormButtons: true,
        isOpen: true,
        showBillingCheckBox: false,
        showShippingCheckBox: false,
        onChange: debounce((values) => {
          setAddressOnCart(values, checkoutApi.setBillingAddress);
        }, DEBOUNCE_TIME),
      })($billingForm),

      checkoutProvider.render(ShippingMethods)($shippingMethods),
      checkoutProvider.render(PaymentMethods)($paymentMethods),
      cartProvider.render(OrderSummary)($orderSummary),
      cartProvider.render(CartSummaryList)($cartSummaryList),
      checkoutProvider.render(PlaceOrder, {
        handlePlaceOrder: async ({ cartId }) => {
          orderApi.placeOrder(cartId).catch(console.error);
        },
      })($placeOrder),
    ]);

    // Step 3: Toggle Functionality
    async function onToggle(type) {
      if (type === 'delivery') {
        deliveryButton.setProps((prev) => ({ ...prev, selected: true }));
        inStorePickupButton.setProps((prev) => ({ ...prev, selected: false }));
        $shippingForm.removeAttribute('hidden');
        $shippingMethods.removeAttribute('hidden');
        $inStorePickup.setAttribute('hidden', '');
      } else {
        inStorePickupButton.setProps((prev) => ({ ...prev, selected: true }));
        deliveryButton.setProps((prev) => ({ ...prev, selected: false }));
        $shippingForm.setAttribute('hidden', '');
        $shippingMethods.setAttribute('hidden', '');
        $inStorePickup.removeAttribute('hidden');
      }
    }

    onToggle('delivery');

    // Step 5: Rendering Pickup Options
    const pickupLocations = await fetchPickupLocations();

    pickupLocations.forEach((location) => {
      const { name, pickup_location_code } = location;
      const locationRadiobutton = document.createElement('div');

      UI.render(RadioButton, {
        label: name,
        name: 'pickup-location',
        value: name,
        onChange: () => {
          checkoutApi.setShippingAddress({
            pickupLocationCode: pickup_location_code,
          });
        },
      })(locationRadiobutton);

      $inStorePickup.appendChild(locationRadiobutton);
    });

    $root.style.display = 'grid';
  });

  block.appendChild(fragment);
}
