// Dropin Tools
import { initializers } from '@dropins/tools/initializer.js';

// Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import * as accountApi from '@dropins/storefront-account/api.js';

// Block-level modules
import createStore from './lib/store.js';
import {
  initialViewHandler,
  emptyCartViewHandler,
  guestViewHandler,
  signedInViewHandler,
  orderConfirmationViewHandler,
  serverErrorViewHandler,
} from './views/index.js';
import { eventState, handleEvent, Events } from './lib/event-state.js';
import {
  view,
  updateView,
  setViewHandlers,
  View,
} from './lib/view.js';
import { removeModal } from './lib/modal.js';

/*
 * Global state.
 */

const store = createStore();

/*
 * Setup view handlers.
 */

setViewHandlers({
  [View.Initial]: initialViewHandler,
  [View.EmptyCart]: emptyCartViewHandler,
  [View.Guest]: guestViewHandler,
  [View.SignedIn]: signedInViewHandler,
  [View.OrderConfirmation]: orderConfirmationViewHandler,
  [View.ServerError]: serverErrorViewHandler,
});

export default async function decorate(block) {
  /*
   * Initialize Dropin.
   */
  const storeConfig = await checkoutApi.getStoreConfig();
  store.storeConfig = storeConfig;

  initializers.register(accountApi.initialize, {});
  initializers.register(checkoutApi.initialize, {
    models: { StoreConfig: { initialData: storeConfig } },
  });

  /*
   * Set initial view.
   */

  updateView(View.Initial, { store, block });

  /*
   * Event handler for when authentication state changes.
   */

  handleEvent(
    Events.Authenticated,
    () => {
      if (eventState[Events.Authenticated].current) removeModal();
    },
    { eager: true },
  );

  /*
   * Event handler for when checkout data is available.
   */

  handleEvent(
    Events.CheckoutData,
    () => {
      /*
       * Handle sign out or empty cart state.
       */
      if (
        !eventState[Events.CheckoutData].current
        || eventState[Events.CheckoutData].current.isEmpty
      ) {
        updateView(View.EmptyCart);
        return;
      }

      if (eventState[Events.Authenticated].current) return;

      /*
       * Handle when cart is initialized.
       */

      if (eventState[Events.CheckoutData].prev === undefined) {
        updateView(View.Guest, { store });
        return;
      }

      /*
       * Handle when there was no cart or when it was empty.
       */

      if (
        (eventState[Events.CheckoutData].prev === null
          || eventState[Events.CheckoutData].prev.isEmpty)
        && eventState[Events.CheckoutData].current.isEmpty === false
      ) {
        updateView(View.Guest, { store });
        return;
      }

      /*
       * Handle when clicking "Try again" button on server error.
       */

      if (view === View.ServerError) {
        updateView(View.Guest, { store });
      }
    },
    { eager: true },
  );

  /*
   * Event handler for when signed in customer data is available.
   */

  handleEvent(
    Events.CheckoutCustomer,
    () => {
      /*
       * Handle sign out or empty cart state.
       */

      if (
        !eventState[Events.CheckoutData].current
        || eventState[Events.CheckoutData].current.isEmpty
      ) {
        return;
      }

      updateView(View.SignedIn, { store });
    },
    { eager: true },
  );
  /*
   * Event handler for when order is placed.
   */

  handleEvent(Events.CheckoutOrder, () => updateView(View.OrderConfirmation, { block }));
}
