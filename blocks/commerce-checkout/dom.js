function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

export const root = createElementWithClass('div', 'checkout__content');
export const heading = createElementWithClass('div', 'checkout__heading');
export const headingTitle = createElementWithClass(
  'h1',
  'checkout__heading-title',
);
export const headingDivider = createElementWithClass(
  'div',
  'checkout__heading-divider',
);
export const shippingDivider = createElementWithClass(
  'div',
  'checkout__shipping-divider',
);
export const paymentDivider = createElementWithClass(
  'div',
  'checkout__payment-divider',
);
export const placeOrderDivider = createElementWithClass(
  'div',
  'checkout__place-order-divider',
);
export const main = createElementWithClass('div', 'checkout__main');
export const aside = createElementWithClass('div', 'checkout__aside');
export const serverError = createElementWithClass(
  'div',
  'checkout__server-error',
);
export const placeOrder = createElementWithClass(
  'div',
  'checkout__place-order',
);
export const emptyCart = createElementWithClass('div', 'checkout__empty-cart');
export const errorBanner = createElementWithClass(
  'div',
  'checkout__error-banner',
);
export const mergedCartBanner = createElementWithClass(
  'div',
  'checkout__merged-cart-banner',
);
export const overlaySpinner = createElementWithClass(
  'div',
  'checkout__overlay-spinner',
);
export const outOfStock = createElementWithClass(
  'div',
  'checkout__out-of-stock',
);
export const login = createElementWithClass('div', 'checkout__login');
export const shippingForm = createElementWithClass(
  'div',
  'checkout__shipping-form',
);
export const billToShippingAddress = createElementWithClass(
  'div',
  'checkout__bill-to-shipping-address',
);
export const billingForm = createElementWithClass(
  'div',
  'checkout__billing-form',
);
export const shippingMethods = createElementWithClass(
  'div',
  'checkout__shipping-methods',
);
export const paymentMethods = createElementWithClass(
  'div',
  'checkout__payment-methods',
);
export const orderSummary = createElementWithClass(
  'div',
  'checkout__order-summary',
);
export const cartSummaryList = createElementWithClass(
  'div',
  'cart-summary-list',
);

headingTitle.textContent = 'Checkout';
heading.replaceChildren(headingTitle, headingDivider);

export const containerRefs = {
  shippingForm: { current: null },
  billingForm: { current: null },
};
