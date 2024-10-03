// Dropin Tools
import {
  Divider,
  ProgressSpinner,
  provider as uiProvider,
} from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';

// Cart Dropin Modules
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import { render as cartProvider } from '@dropins/storefront-cart/render.js';

function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

/*
 * Layout DOM elements
 */
const root = createElementWithClass('div', 'checkout__content');
const heading = createElementWithClass('div', 'checkout__heading');
const headingTitle = createElementWithClass('h1', 'checkout__heading-title');
const headingDivider = createElementWithClass(
  'div',
  'checkout__heading-divider',
);
const emptyCart = createElementWithClass('div', 'checkout__empty-cart');
export const overlaySpinner = createElementWithClass(
  'div',
  'checkout__overlay-spinner',
);

headingTitle.textContent = 'Checkout';
heading.replaceChildren(headingTitle, headingDivider);

/*
 * Event handlers
 */
let currentCheckoutData;
// function handleCheckoutData(nextCheckoutData, block) {
function handleCheckoutData(nextCheckoutData) {
  if (currentCheckoutData !== undefined) {
    // on sign out
    if (!nextCheckoutData) {
      root.classList.add('checkout-empty-cart');
      root.replaceChildren(heading, emptyCart);
      return;
    }

    // on empty state
    if (nextCheckoutData.isEmpty) {
      root.classList.add('checkout-empty-cart');
      root.replaceChildren(heading, emptyCart);
      return;
    }

    root.classList.remove('checkout-empty-cart');
  }

  currentCheckoutData = nextCheckoutData;
}

export default async function decorate(block) {
  /*
   * Render Containers
   */
  uiProvider.render(Divider, { variant: 'primary' })(headingDivider);
  uiProvider.render(ProgressSpinner)(overlaySpinner);
  cartProvider.render(EmptyCart, { routeCTA: () => '/' })(emptyCart);

  root.replaceChildren(
    heading,
    overlaySpinner,
  );

  /*
   * Render initial layout and setup event handlers
   */
  events.on('checkout/data', (e) => handleCheckoutData(e, block), {
    eager: true,
  });

  return block.appendChild(root);
}
