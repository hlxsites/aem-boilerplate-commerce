/* eslint-disable import/no-unresolved */

import {
  Button,
  Header,
  ProgressSpinner,
  provider as UI,
} from '@dropins/tools/components.js';

/**
 * Component IDs for registry management
 * @enum {string}
 */
export const COMPONENT_IDS = {
  BILLING_STEP_CONTINUE_BTN: 'billingStepContinueBtn',
  BILLING_STEP_TITLE: 'billingStepTitle',
  CHECKOUT_HEADER: 'checkoutHeader',
  CHECKOUT_LOADER: 'checkoutLoader',
  ORDER_CONFIRMATION_CONTINUE_BTN: 'orderConfirmationContinueBtn',
  PAYMENT_STEP_CONTINUE_BTN: 'paymentStepContinueBtn',
  PAYMENT_STEP_TITLE: 'paymentStepTitle',
  SHIPPING_METHOD_STEP_CONTINUE_BTN: 'shippingMethodStepContinueBtn',
  SHIPPING_METHOD_STEP_TITLE: 'shippingMethodStepTitle',
  SHIPPING_STEP_CONTINUE_BTN: 'shippingStepContinueBtn',
  SHIPPING_STEP_TITLE: 'shippingStepTitle',
};

/**
 * A Map to store the API of rendered components.
 * The key is a unique string ID, and the value is the components's API object.
 * (e.g., { setProps: (props) => {...}, remove: () => {...} })
 */
const registry = new Map();

/**
 * Checks if a component with the given ID has been rendered.
 * This is used to prevent multiple instances of the same component from being rendered.
 * @param {string} id - The unique ID of the component to check.
 * @returns {boolean} - Returns true if the component has been rendered, false otherwise.
 */
export const hasComponent = (id) => registry.has(id);

/**
 * Removes a component from the registry and calls its remove method.
 * This is used to clean up components when they are no longer needed.
 * @param {string} id - The unique ID of the component to remove.
 * @returns {void}
 */
export const removeComponent = (id) => {
  const component = registry.get(id);

  if (component) {
    component.remove();
    registry.delete(id);
  }
};

/**
 * Helper to get a component from the registry or render and register it if not present.
 * @async
 * @param {string} id - Unique identifier for the component.
 * @param {Function} renderFn - Async function that renders the component.
 * @returns {Promise<Object>} - The rendered component API.
 */
const renderComponent = async (id, renderFn) => {
  if (registry.has(id)) {
    return registry.get(id);
  }

  const component = await renderFn();
  registry.set(id, component);
  return component;
};

/**
 * Renders an H2 header component and registers its API.
 * @async
 * @param {HTMLElement} container - The DOM element to render the header into.
 * @param {string} id - Unique identifier for the header component.
 * @param {Object} options - Configuration options for the header component.
 * @returns {Promise<void>}
 */
const renderH2 = async (container, id, options = {}) => renderComponent(
  id,
  async () => UI.render(Header, {
    size: 'medium',
    level: 2,
    divider: true,
    ...options,
  })(container),
);

/**
 * Renders a primary button component and registers its API.
 * @async
 * @param {HTMLElement} container - The DOM element to render the button into.
 * @param {string} id - Unique identifier for the button component.
 * @param {Object} options - Configuration options including text, onClick, href, className, etc.
 * @returns {Promise<Object>} - The rendered button component API
 */
export const renderPrimaryButton = async (container, id, options = {}) => renderComponent(
  id,
  async () => UI.render(Button, {
    size: 'medium',
    variant: 'primary',
    disabled: false,
    ...options,
  })(container),
);

/**
 * Renders a progress spinner component and registers its API.
 * @async
 * @param {HTMLElement} container - The DOM element to render the spinner into.
 * @param {string} id - Unique identifier for the button component.
 * @param {Object} options - Optional configuration for the spinner.
 * @returns {Promise<Object>} - The rendered spinner component API
 */
export const renderSpinner = async (container, id, options = {}) => renderComponent(
  id,
  async () => UI.render(ProgressSpinner, {
    className: 'checkout__overlay-spinner',
    ...options,
  })(container),
);

/**
 * Renders the main checkout header (H1).
 * @param {HTMLElement} container - The DOM element to render the header into.
 * @returns {Promise<Object>} - The rendered header component API
 */
export const renderCheckoutHeader = (container) => renderComponent(
  COMPONENT_IDS.CHECKOUT_HEADER,
  async () => UI.render(Header, {
    className: 'checkout-header',
    divider: true,
    level: 1,
    size: 'large',
    title: 'Checkout',
  })(container),
);

/**
 * Renders the shipping step title (H2).
 * @param {HTMLElement} container - The DOM element to render the header into.
 * @returns {Promise<Object>} - The rendered header component API
 */
export const renderShippingMethodStepTitle = (container) => renderH2(
  container,
  COMPONENT_IDS.SHIPPING_METHOD_STEP_TITLE,
  {
    title: 'Shipping Methods',
  },
);

/**
 * Renders the payment step title (H2).
 * @param {HTMLElement} container - The DOM element to render the header into.
 * @returns {Promise<Object>} - The rendered header component API
 */
export const renderPaymentStepTitle = (container) => renderH2(
  container,
  COMPONENT_IDS.PAYMENT_STEP_TITLE,
  {
    title: 'Payment Methods',
  },
);

/**
 * Renders the billing step title (H2).
 * @param {HTMLElement} container - The DOM element to render the header into.
 * @returns {Promise<Object>} - The rendered header component API
 */
export const renderBillingStepTitle = (container) => renderH2(
  container,
  COMPONENT_IDS.BILLING_STEP_TITLE,
  {
    title: 'Billing Address',
  },
);

/**
 * Changes the title of a header component by its component ID.
 * @param {string} componentId - The unique ID of the header component.
 * @param {string} title - The new title to set.
 */
export const changeTitle = (componentId, title) => {
  const header = registry.get(componentId);

  if (header) {
    header.setProps((prev) => ({ ...prev, title }));
  }
};

/**
 * Changes the title of the checkout header.
 * @param {string} title - The new title for the checkout header.
 */
export const changeCheckoutTitle = (title) => {
  changeTitle(COMPONENT_IDS.CHECKOUT_HEADER, title);
};

/**
 * Renders a "Continue" button for a given step and registers its API.
 * @async
 * @param {HTMLElement} container - The DOM element to render the button into.
 * @param {string} stepId - The unique component ID for the step's continue button.
 * @param {Function} onClick - The click handler for the button.
 * @returns {Promise<Object>} - The rendered button component API
 */
export const renderStepContinueBtn = async (container, stepId, onClick) => renderPrimaryButton(
  container,
  stepId,
  { children: 'Continue', onClick },
);

/**
 * Renders the "Continue shopping" button on the order confirmation page.
 * If the button already exists in the registry, returns the existing instance.
 * Otherwise, creates and renders a new primary button with the appropriate properties.
 *
 * @async
 * @param {HTMLElement} container - The DOM element to render the button into.
 * @returns {Promise<HTMLElement>} The rendered button element.
 */
export const renderOrderConfirmationContinueBtn = async (container) => renderPrimaryButton(
  container,
  COMPONENT_IDS.ORDER_CONFIRMATION_CONTINUE_BTN,
  {
    children: 'Continue shopping',
    className: 'order-confirmation-footer__continue-button',
    type: 'submit',
    href: '/',
  },
);
