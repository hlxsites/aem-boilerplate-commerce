import { events } from '@dropins/tools/event-bus.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ServerError from '@dropins/storefront-checkout/containers/ServerError.js';
import TermsAndConditions from '@dropins/storefront-checkout/containers/TermsAndConditions.js';
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';
import * as orderApi from '@dropins/storefront-order/api.js';
import * as accountApi from '@dropins/storefront-account/api.js';
import { initReCaptcha } from '@dropins/tools/recaptcha.js';
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import CreditCard from '@dropins/storefront-payment-services/containers/CreditCard.js';
import { render as PaymentServices } from '@dropins/storefront-payment-services/render.js';
import {
  isVirtualCart,
  validateForms,
} from '@dropins/storefront-checkout/lib/utils.js';
import {
  initializePayByLink,
  PBL_ERROR_EVENT,
  PBL_READY_EVENT,
} from '../../scripts/initializers/pay-by-link.js';
import { PBL_FETCH_GRAPHQL } from '../../scripts/initializers/pay-by-link-client.js';
import initializePayByLinkPaymentServices from '../../scripts/initializers/pay-by-link-payment-services.js';
import {
  renderAddressForm,
  renderBillToShippingAddress,
  renderShippingMethods,
} from './containers.js';
import {
  BILLING_FORM_NAME,
  SHIPPING_FORM_NAME,
  TERMS_AND_CONDITIONS_FORM_NAME,
} from '../commerce-checkout/constants.js';

const formatPrice = ({ currency, value } = {}) => {
  if (value === undefined || !currency) return '';
  return new Intl.NumberFormat(document.documentElement.lang || 'en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

const appendSummaryRow = (list, label, money) => {
  if (!money) return;
  const term = document.createElement('dt');
  const value = document.createElement('dd');
  term.textContent = label;
  value.textContent = formatPrice(money);
  list.append(term, value);
};

const renderOrderSummary = (container, cart) => {
  const items = document.createElement('div');
  const totals = document.createElement('dl');
  const fulfillment = document.createElement('div');

  items.className = 'commerce-pay-by-link__items';
  totals.className = 'commerce-pay-by-link__totals';
  fulfillment.className = 'commerce-pay-by-link__fulfillment';

  cart.items.forEach((item) => {
    const row = document.createElement('article');
    const image = document.createElement('img');
    const details = document.createElement('div');
    const title = document.createElement('h3');
    const meta = document.createElement('p');
    const price = document.createElement('p');

    row.className = 'commerce-pay-by-link__item';
    image.src = item.thumbnail.url;
    image.alt = item.thumbnail.label || item.name;
    image.loading = 'lazy';
    title.textContent = item.name;
    meta.textContent = `${item.sku} · Qty ${item.quantity}`;
    price.textContent = formatPrice(item.rowTotal);
    details.append(title, meta);
    row.append(image, details, price);
    items.append(row);
  });

  appendSummaryRow(totals, 'Subtotal', cart.prices.subtotalExcludingTax);
  appendSummaryRow(
    totals,
    'Shipping',
    cart.shippingAddresses?.[0]?.selectedShippingMethod?.amount,
  );
  cart.prices.appliedTaxes?.forEach(
    ({ label, amount }) => appendSummaryRow(totals, label, amount),
  );
  appendSummaryRow(totals, 'Total due', cart.prices.grandTotal);

  const address = cart.shippingAddresses?.[0];
  if (address) {
    const addressHeading = document.createElement('h3');
    const addressText = document.createElement('p');
    const deliveryHeading = document.createElement('h3');
    const deliveryText = document.createElement('p');
    const method = address.selectedShippingMethod;
    addressHeading.textContent = 'Shipping address';
    addressText.textContent = [
      `${address.firstName} ${address.lastName}`,
      address.street.join(', '),
      `${address.city}, ${address.region?.name || ''} ${address.postCode}`,
      address.country.label,
    ].filter(Boolean).join(' · ');
    deliveryHeading.textContent = 'Delivery method';
    deliveryText.textContent = method
      ? [method.carrier.title, method.title].filter(Boolean).join(' · ')
      : 'Not selected';
    fulfillment.append(addressHeading, addressText, deliveryHeading, deliveryText);
  }

  container.replaceChildren(items, totals, fulfillment);
};

export default async function decorate(block) {
  const heading = document.createElement('h2');
  const status = document.createElement('p');
  const checkout = document.createElement('div');
  const main = document.createElement('div');
  const aside = document.createElement('aside');
  const summary = document.createElement('section');
  const paymentMethods = document.createElement('div');
  const shippingForm = document.createElement('div');
  const billToShipping = document.createElement('div');
  const delivery = document.createElement('div');
  const billingForm = document.createElement('div');
  const serverError = document.createElement('div');
  const placeOrder = document.createElement('div');
  const terms = document.createElement('div');
  const shippingFormRef = { current: null };
  const billingFormRef = { current: null };
  const creditCardFormRef = { current: null };

  const description = document.createElement('p');
  heading.textContent = 'Complete your payment';
  description.textContent = 'Review the reserved items and choose a payment method.';
  status.className = 'commerce-pay-by-link__status';
  status.textContent = 'Loading your payment link...';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  checkout.className = 'commerce-pay-by-link__checkout';
  checkout.hidden = true;
  main.className = 'commerce-pay-by-link__main';
  aside.className = 'commerce-pay-by-link__aside';
  summary.className = 'commerce-pay-by-link__summary';
  paymentMethods.className = 'commerce-pay-by-link__payment-methods';
  shippingForm.className = 'commerce-pay-by-link__shipping-form';
  billToShipping.className = 'commerce-pay-by-link__bill-to-shipping';
  delivery.className = 'commerce-pay-by-link__delivery';
  billingForm.className = 'commerce-pay-by-link__billing-form';
  serverError.className = 'commerce-pay-by-link__server-error';
  placeOrder.className = 'commerce-pay-by-link__place-order';
  terms.className = 'commerce-pay-by-link__terms';
  main.append(
    serverError,
    shippingForm,
    billToShipping,
    delivery,
    billingForm,
    paymentMethods,
    terms,
    placeOrder,
  );
  aside.append(summary);
  checkout.append(main, aside);
  block.replaceChildren(heading, description, status, checkout);

  events.on(PBL_READY_EVENT, async ({ checkoutData }) => {
    try {
      status.textContent = 'Your items are reserved and ready for payment.';
      checkout.hidden = false;

      renderOrderSummary(summary, checkoutData);
      await Promise.all([
        initReCaptcha(0),
        initializePayByLinkPaymentServices(),
      ]);

      accountApi.setEndpoint(PBL_FETCH_GRAPHQL);
      if (!isVirtualCart(checkoutData)) {
        await renderAddressForm(shippingForm, shippingFormRef, checkoutData, 'shipping');
        await renderShippingMethods(delivery);
      }

      await renderAddressForm(billingForm, billingFormRef, checkoutData, 'billing');
      await renderBillToShippingAddress(billToShipping);

      CheckoutProvider.render(PaymentMethods, {
        autoSync: false,
        displayTitle: true,
        slots: {
          Methods: {
            [PaymentMethodCode.CREDIT_CARD]: {
              render: (ctx) => {
                const creditCard = document.createElement('div');
                PaymentServices.render(CreditCard, {
                  getCartId: async () => ctx.cartId,
                  creditCardFormRef,
                })(creditCard);
                ctx.replaceHTML(creditCard);
              },
            },
            [PaymentMethodCode.VAULT]: { enabled: false },
          },
        },
      })(paymentMethods);
      CheckoutProvider.render(ServerError, {
        autoScroll: false,
      })(serverError);
      CheckoutProvider.render(TermsAndConditions)(terms);
      CheckoutProvider.render(PlaceOrder, {
        handleValidation: () => validateForms([
          { name: SHIPPING_FORM_NAME, ref: shippingFormRef },
          { name: BILLING_FORM_NAME, ref: billingFormRef },
          { name: TERMS_AND_CONDITIONS_FORM_NAME },
        ]),
        handlePlaceOrder: async ({ cartId: submittedCartId, code }) => {
          if (code === PaymentMethodCode.CREDIT_CARD) {
            if (!creditCardFormRef.current?.validate()) return;
          }

          await checkoutApi.setPaymentMethod({ code });

          if (code === PaymentMethodCode.CREDIT_CARD) {
            await creditCardFormRef.current.submit();
          }

          orderApi.setEndpoint(PBL_FETCH_GRAPHQL);
          const orderData = await orderApi.placeOrder(submittedCartId);
          const { default: renderPayByLinkSuccess } = await import('./success.js');
          await renderPayByLinkSuccess(block, orderData);
        },
      })(placeOrder);

      events.on('checkout/updated', (nextCheckoutData) => {
        if (nextCheckoutData) renderOrderSummary(summary, nextCheckoutData);
      });
    } catch (error) {
      events.emit(PBL_ERROR_EVENT, { error });
    }
  });

  events.on('checkout/values', ({ isBillToShipping }) => {
    billingForm.hidden = isBillToShipping;
  });

  events.on(PBL_ERROR_EVENT, ({ error }) => {
    checkout.hidden = true;
    status.setAttribute('role', 'alert');
    status.textContent = error.message;
  });

  await initializePayByLink();
}
