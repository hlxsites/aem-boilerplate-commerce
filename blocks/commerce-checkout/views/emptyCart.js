// Block-level modules
import { root, heading, emptyCart } from '../dom.js';

export const emptyCartViewHandler = { layout, init, cleanup };

function layout() {
  root.replaceChildren(heading, emptyCart);
}

function init() {
  root.classList.add('checkout-root__empty-cart');
}

function cleanup() {
  root.classList.remove('checkout-root__empty-cart');
}
