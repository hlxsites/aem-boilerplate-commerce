import {
  CHECKOUT_BLOCK,
  CHECKOUT_STEP,
  CHECKOUT_STEP_BUTTON,
  CHECKOUT_STEP_CONTENT,
  CHECKOUT_STEP_TITLE,
  CHECKOUT_STEP_SUMMARY,
  ORDER_CONFIRMATION_BLOCK,
} from './constants.js';

/**
 * A frozen, nested object of CSS selectors
 * @readonly
 */
export const selectors = Object.freeze({
  checkout: {
    aside: '.checkout__aside',
    billingForm: '.checkout__billing-form',
    billingFormSummary: '.checkout__billing-form-summary',
    billingStep: '.checkout__billing-address',
    billingStepContinueBtn: '.checkout__continue-to-place-order',
    billingStepTitle: '.checkout__billing-title',
    billToShipping: '.checkout__bill-to-shipping',
    cartSummary: '.checkout__cart-summary',
    content: '.checkout__content',
    editSummaryBtn: '.checkout__summary-edit',
    emptyCart: '.checkout__empty-cart',
    header: '.checkout__header',
    loader: '.checkout__loader',
    loginForm: '.checkout__login',
    loginFormSummary: '.checkout__login-form-summary',
    main: '.checkout__main',
    mergedCartBanner: '.checkout__merged-cart-banner',
    orderSummary: '.checkout__order-summary',
    outOfStock: '.checkout__out-of-stock',
    paymentMethodsList: '.checkout__payment-methods-list',
    paymentMethodsSummary: '.checkout__payment-methods-summary',
    paymentStep: '.checkout__payment-methods',
    paymentStepContinueBtn: '.checkout__continue-to-billing',
    paymentStepTitle: '.checkout__payment-title',
    placeOrder: '.checkout__place-order',
    serverError: '.checkout__server-error',
    shippingAddressForm: '.checkout__shipping-form',
    shippingAddressFormSummary: '.checkout__shipping-form-summary',
    shippingMethodContinueBtn: '.checkout__continue-to-payment',
    shippingMethodList: '.checkout__shipping-methods-list',
    shippingMethodSummary: '.checkout__shipping-methods-summary',
    shippingMethodStep: '.checkout__shipping-methods',
    shippingMethodStepTitle: '.checkout__shipping-methods-title',
    shippingStep: '.checkout__shipping-address',
    shippingStepContinueBtn: '.checkout__continue-to-shipping-methods',
    termsAndConditions: '.checkout__terms-and-conditions',
  },
  orderConfirmation: {
    contactSupportLink: '.order-confirmation-footer__contact-support-link',
    continueBtn: '.order-confirmation-footer__continue-button',
    customerDetails: '.order-confirmation__customer-details',
    header: '.order-confirmation__header',
    orderCostSummary: '.order-confirmation__order-cost-summary',
    orderProductList: '.order-confirmation__order-product-list',
    orderStatus: '.order-confirmation__order-status',
    shippingStatus: '.order-confirmation__shipping-status',
  },
});

// =============================================================================
// UTILITIES
// Helper functions for creating and querying DOM elements.
// =============================================================================

/**
 * Creates a DocumentFragment from an HTML string.
 * @param {string} html - The HTML string to convert into a fragment.
 * @returns {DocumentFragment} The created DocumentFragment.
 */
export const createFragment = (html) => document.createRange().createContextualFragment(html);

/**
 * Finds the first element within a container that matches the given selector.
 * @param {Element | DocumentFragment} container - The parent element or fragment to search within.
 * @param {string} selector - A CSS selector string to match the desired element.
 * @returns {HTMLElement | null} The first matching element, or null if none found.
 */
export const getElement = (container, selector) => container.querySelector(selector);

/**
 * Returns a function that queries for elements within a specific container.
 * Useful for scoping queries to a particular fragment or element.
 * @param {Element | DocumentFragment} container
 * @returns {(selector: string) => HTMLElement | null}
 */
export const createScopedSelector = (container) => (selector) => getElement(container, selector);

// =============================================================================
// CHECKOUT
// =============================================================================

/**
 * Creates the shipping address fragment for the checkout.
 * @returns {DocumentFragment} The shipping address fragment.
 */
function createShippingStepFragment() {
  return createFragment(`
    <div class="checkout__login ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT}"></div>
    <div class="checkout__login-form-summary ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_SUMMARY}"></div>
    <div class="checkout__shipping-form ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT}"></div>
    <div class="checkout__shipping-form-summary ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_SUMMARY}"></div>
    <div class="checkout__continue-to-shipping-methods ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT} ${CHECKOUT_STEP_BUTTON}"></div>
  `);
}

/**
 * Creates the shipping methods fragment for the checkout.
 * @returns {DocumentFragment} The shipping methods fragment.
 */
function createShippingMethodsStepFragment() {
  return createFragment(`
    <div class="checkout__shipping-methods-title ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_TITLE}"></div>
    <div class="checkout__shipping-methods-list ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT}"></div>
    <div class="checkout__shipping-methods-summary ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_SUMMARY}"></div>
    <div class="checkout__continue-to-payment ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT} ${CHECKOUT_STEP_BUTTON}"></div>
  `);
}

/**
 * Creates the payment methods fragment for the checkout.
 * @returns {DocumentFragment} The payment methods fragment.
 */
function createPaymentMethodsStepFragment() {
  return createFragment(`
    <div class="checkout__payment-title ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_TITLE}"></div>
    <div class="checkout__payment-methods-list ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT}"></div>
    <div class="checkout__bill-to-shipping ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT}"></div>
    <div class="checkout__payment-methods-summary ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_SUMMARY}"></div>
    <div class="checkout__continue-to-billing ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT} ${CHECKOUT_STEP_BUTTON}"></div>
  `);
}

/**
 * Creates the billing address fragment for the checkout.
 * @returns {DocumentFragment} The billing address fragment.
 */
function createBillingAddressStepFragment() {
  return createFragment(`
    <div class="checkout__billing-title ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_TITLE}"></div>
    <div class="checkout__billing-form ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT}"></div>
    <div class="checkout__billing-form-summary ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_SUMMARY}"></div>
    <div class="checkout__continue-to-place-order ${CHECKOUT_BLOCK} ${CHECKOUT_STEP_CONTENT} ${CHECKOUT_STEP_BUTTON}"></div>
  `);
}

/**
 * Creates the main fragment for the checkout, containing all steps.
 * @returns {DocumentFragment} The main checkout fragment.
 */
function createMainFragment() {
  const mainFragment = createFragment(`
    <div class="checkout__header ${CHECKOUT_BLOCK}"></div>
    <div class="checkout__empty-cart ${CHECKOUT_BLOCK}"></div>
    <div class="checkout__server-error ${CHECKOUT_BLOCK}"></div>
    <div class="checkout__out-of-stock ${CHECKOUT_BLOCK}"></div>
    <div class="checkout__shipping-address ${CHECKOUT_BLOCK} ${CHECKOUT_STEP}"></div>
    <div class="checkout__shipping-methods ${CHECKOUT_BLOCK} ${CHECKOUT_STEP}"></div>
    <div class="checkout__payment-methods ${CHECKOUT_BLOCK} ${CHECKOUT_STEP}"></div>
    <div class="checkout__billing-address ${CHECKOUT_BLOCK} ${CHECKOUT_STEP}"></div>
    <div class="checkout__terms-and-conditions ${CHECKOUT_BLOCK}"></div>
    <div class="checkout__place-order ${CHECKOUT_BLOCK}"></div>
  `);

  const { checkout } = selectors;

  const getMainElement = createScopedSelector(mainFragment);

  const shippingStepFragment = getMainElement(checkout.shippingStep);
  const shippingMethodsStepFragment = getMainElement(checkout.shippingMethodStep);
  const paymentMethodsStepFragment = getMainElement(checkout.paymentStep);
  const billingAddressStepFragment = getMainElement(checkout.billingStep);

  shippingStepFragment.appendChild(createShippingStepFragment());
  shippingMethodsStepFragment.appendChild(createShippingMethodsStepFragment());
  paymentMethodsStepFragment.appendChild(createPaymentMethodsStepFragment());
  billingAddressStepFragment.appendChild(createBillingAddressStepFragment());

  return mainFragment;
}

/**
 * Creates the aside fragment for the checkout, containing order and cart summary.
 * @returns {DocumentFragment} The aside checkout fragment.
 */
function createAsideFragment() {
  return createFragment(`
    <div class="checkout__order-summary ${CHECKOUT_BLOCK}"></div>
    <div class="checkout__cart-summary ${CHECKOUT_BLOCK}"></div>
  `);
}

/**
 * Creates the root checkout fragment, including main and aside fragments.
 * @returns {DocumentFragment} The complete checkout fragment.
 */
export function createCheckoutFragment() {
  const checkoutFragment = createFragment(`
    <div class="checkout__wrapper">
      <div class="checkout__loader"></div>
      <div class="checkout__content">
        <div class="checkout__merged-cart-banner"></div>
        <div class="checkout__main"></div>
        <div class="checkout__aside"></div>
      </div>
    </div>
  `);

  const { checkout } = selectors;

  const mainFragment = getElement(checkoutFragment, checkout.main);
  const asideFragment = getElement(checkoutFragment, checkout.aside);

  mainFragment.appendChild(createMainFragment());
  asideFragment.appendChild(createAsideFragment());

  return checkoutFragment;
}

/**
 * Creates a summary fragment with optional edit button.
 * @param {Element|DocumentFragment} content - The content to display in the summary.
 * @param {Function|null} [onEditClick=null] - Callback for edit button click.
 * @returns {HTMLElement} The summary element.
 */
export const createSummary = (content, onEditClick = null) => {
  const summaryDiv = document.createElement('div');
  summaryDiv.className = 'checkout__summary checkout__summary--inline';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'checkout__summary-content';
  contentDiv.appendChild(content);

  summaryDiv.appendChild(contentDiv);

  if (onEditClick) {
    const editBtn = document.createElement('button');
    editBtn.className = 'checkout__summary-edit';
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', onEditClick);
    summaryDiv.appendChild(editBtn);
  }

  return summaryDiv;
};

/**
 * Creates an address summary element.
 * @param {Object} [data={}] - Address data.
 * @param {Function|null} [onEditClick=null] - Callback for edit button click.
 * @returns {HTMLElement} The address summary element.
 */
export function createAddressSummary(data = {}, onEditClick = null) {
  const {
    firstName = '',
    lastName = '',
    street = '',
    city = '',
    region, // Can be object, string, or undefined
    postcode = '',
    countryCode = '',
    telephone = '',
  } = data;

  const streetAddress = Array.isArray(street) ? street.join(', ') : street;

  // eslint-disable-next-line no-nested-ternary
  const regionCode = typeof region === 'object' && region !== null
    ? (region.regionCode || region.code || '')
    : (typeof region === 'string' ? region : '');

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'checkout__address-summary-details';

  const nameDiv = document.createElement('div');
  nameDiv.textContent = `${firstName} ${lastName}`.trim();
  detailsDiv.appendChild(nameDiv);

  const streetDiv = document.createElement('div');
  streetDiv.textContent = streetAddress;
  detailsDiv.appendChild(streetDiv);

  const cityDiv = document.createElement('div');
  cityDiv.textContent = [city, regionCode].filter(Boolean).join(', ') + (postcode ? ` ${postcode}` : '');
  detailsDiv.appendChild(cityDiv);

  const countryDiv = document.createElement('div');
  countryDiv.textContent = countryCode;
  detailsDiv.appendChild(countryDiv);

  const telDiv = document.createElement('div');
  telDiv.textContent = telephone;
  detailsDiv.appendChild(telDiv);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'checkout__address-summary-content';
  contentDiv.appendChild(detailsDiv);

  return createSummary(contentDiv, onEditClick);
}

/**
 * Creates a login form summary element.
 * @param {string} email - The email address to display.
 * @param {Function | null} onEditClick - Callback function for the edit button click.
 * @returns {HTMLElement} The created login summary element.
 */
export function createLoginFormSummary(email = '', onEditClick = null) {
  const span = document.createElement('span');
  span.className = 'checkout__login-form-summary-email';
  span.textContent = email;

  const content = document.createElement('div');
  content.className = 'checkout__login-form-summary-content';
  content.appendChild(span);

  return createSummary(content, onEditClick);
}

/**
 * Creates a shipping methods summary element.
 * @param {Object} [data={}] - Shipping method data.
 * @param {Function|null} [onEditClick=null] - Callback for edit button click.
 * @returns {HTMLElement} The created shipping methods summary element.
 */
export const createShippingMethodsSummary = (data = {}, onEditClick = null) => {
  const content = document.createElement('div');
  content.className = 'checkout__shipping-methods-summary-content';

  const label = document.createElement('span');
  label.className = 'checkout__shipping-methods-summary-label';
  label.textContent = data.label || '';
  content.appendChild(label);

  if (data.description) {
    const desc = document.createElement('span');
    desc.className = 'checkout__shipping-methods-summary-description';
    desc.textContent = data.description;
    content.appendChild(desc);
  }

  return createSummary(content, onEditClick);
};

/**
 * Creates a payment methods summary element.
 * @param {Object} [data={}] - Payment method data.
 * @param {Function|null} [onEditClick=null] - Callback for edit button click.
 * @returns {HTMLElement} The created payment methods summary element.
 */
export const createPaymentMethodsSummary = (data = {}, onEditClick = null) => {
  const container = document.createElement('div');
  container.className = 'checkout__payment-methods-summary-details';

  const labelSpan = document.createElement('span');
  labelSpan.className = 'checkout__payment-methods-summary-label';
  labelSpan.textContent = data.title || '';
  container.appendChild(labelSpan);

  return createSummary(container, onEditClick);
};

// =============================================================================
// ORDER CONFIRMATION
// =============================================================================

/**
 * Creates the order confirmation fragment.
 * @returns {DocumentFragment} The order confirmation fragment.
 */
export function createOrderConfirmationFragment() {
  return createFragment(`
    <div class="order-confirmation">
      <div class="order-confirmation__main">
        <div class="order-confirmation__header ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__order-status ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__shipping-status ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__customer-details ${ORDER_CONFIRMATION_BLOCK}"></div>
      </div>
      <div class="order-confirmation__aside">
        <div class="order-confirmation__order-cost-summary ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__order-product-list ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__footer ${ORDER_CONFIRMATION_BLOCK}">
          <div class="order-confirmation-footer__continue-button"></div>
          <div class="order-confirmation-footer__contact-support">
            <p>
              Need help?
              <a href="/support" rel="noreferrer" class="order-confirmation-footer__contact-support-link">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `);
}
