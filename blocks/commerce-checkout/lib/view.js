/*
 * This module defines various views the checkout can have.
 */

let viewUpdateHandlers;
// eslint-disable-next-line import/no-mutable-exports
export let view;

export const View = {
  Initial: 'initial',
  EmptyCart: 'emptyCart',
  Guest: 'guest',
  SignedIn: 'signedIn',
  OrderConfirmation: 'orderConfirmation',
  ServerError: 'serverError',
};

const mediaQuery = matchMedia('(max-width: 768px)');

/*
 * This function is used to change the current view.
 *
 * It performs cleanup for the previous view, updates the view to
 * the new value, and initializes the new view with the appropriate
 * layout and properties.
 */

export function updateView(nextView, props) {
  if (view) viewUpdateHandlers[view].cleanup();
  view = nextView;
  viewUpdateHandlers[nextView].layout({
    screen: mediaQuery.matches ? 'mobile' : 'desktop',
  });
  viewUpdateHandlers[nextView].init(props);
}

/*
 * This function sets the handlers for each view.
 *
 * These handlers are responsible for managing the layout and initialization
 * of each view. It also adds an event listener to handle changes in the
 * screen size (mobile or desktop) and updates the layout accordingly.
 */

export function setViewHandlers(handlers) {
  viewUpdateHandlers = handlers;
  mediaQuery.addEventListener('change', () => {
    viewUpdateHandlers[view].layout({
      screen: mediaQuery.matches ? 'mobile' : 'desktop',
    });
  });
}
