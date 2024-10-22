// Block-level modules
import { root, heading, serverError } from '../dom.js';

export const serverErrorViewHandler = { layout, init, cleanup };

function layout() {
  root.replaceChildren(heading, serverError);
}

function init() {
  root.classList.add('checkout-root__server-error');
}

function cleanup() {
  root.classList.remove('checkout-root__server-error');
}
