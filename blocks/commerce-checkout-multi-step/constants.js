// Form and address constants
const BILLING_FORM_NAME = 'selectedBillingAddress';
const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;
const LOGIN_FORM_NAME = 'login-form';
const SHIPPING_FORM_NAME = 'selectedShippingAddress';
const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
const TERMS_AND_CONDITIONS_FORM_NAME = 'checkout-terms-and-conditions__form';

// Timing constants
const DEBOUNCE_TIME = 1000;
const ADDRESS_INPUT_DEBOUNCE_TIME = 500;

// Block and styling constants
const CHECKOUT_BLOCK = 'checkout__block';
const CHECKOUT_EMPTY_CLASS = 'checkout__content--empty';
const CHECKOUT_ERROR_CLASS = 'checkout__content--error';
const CHECKOUT_HEADER_CLASS = 'checkout-header';
const ORDER_CONFIRMATION_BLOCK = 'order-confirmation__block';

// Multi-step specific constants
const CHECKOUT_STEP = 'checkout__step';
const CHECKOUT_STEP_ACTIVE = 'checkout__step--active';
const CHECKOUT_STEP_BUTTON = 'checkout__step-button';
const CHECKOUT_STEP_CONTENT = 'checkout__step-content';
const CHECKOUT_STEP_SUMMARY = 'checkout__step-summary';
const CHECKOUT_STEP_TITLE = 'checkout__step-title';
const DEFAULT_IS_BILL_TO_SHIPPING = true;

// Default values
const USER_TOKEN_COOKIE_NAME = 'auth_dropin_user_token';

export {
  // Form and address constants
  ADDRESS_INPUT_DEBOUNCE_TIME,
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  LOGIN_FORM_NAME,
  SHIPPING_ADDRESS_DATA_KEY,
  SHIPPING_FORM_NAME,
  TERMS_AND_CONDITIONS_FORM_NAME,

  // Timing constants
  DEBOUNCE_TIME,

  // Block and styling constants
  CHECKOUT_BLOCK,
  CHECKOUT_EMPTY_CLASS,
  CHECKOUT_ERROR_CLASS,
  CHECKOUT_HEADER_CLASS,
  ORDER_CONFIRMATION_BLOCK,

  // Multi-step specific constants
  CHECKOUT_STEP,
  CHECKOUT_STEP_ACTIVE,
  CHECKOUT_STEP_BUTTON,
  CHECKOUT_STEP_CONTENT,
  CHECKOUT_STEP_SUMMARY,
  CHECKOUT_STEP_TITLE,
  DEFAULT_IS_BILL_TO_SHIPPING,

  // Default values
  USER_TOKEN_COOKIE_NAME,
};
