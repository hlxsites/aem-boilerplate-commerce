/*
 * This module is responsible for managing and caching the state of
 * events that can be emitted by the checkout dropin.
 */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';

/*
 * Events that can be emitted by the checkout dropin.
 */

export const Events = {
  Authenticated: 'authenticated',
  CheckoutData: 'checkout/data',
  CheckoutCustomer: 'checkout/customer',
  CheckoutOrder: 'checkout/order',
};

/*
 * Event payload cached state (previous and current).
 */

export const eventState = {
  [Events.Authenticated]: { prev: undefined, current: undefined },
  [Events.CheckoutData]: { prev: undefined, current: undefined },
  [Events.CheckoutCustomer]: { prev: undefined, current: undefined },
  [Events.CheckoutOrder]: { prev: undefined, current: undefined },
};

/*
 * This function is used to handle events emitted by the checkout
 * dropin and cache their payloads.
 */

export function handleEvent(event, callback, options) {
  return events.on(
    event,
    (payload) => {
      eventState[event].prev = eventState[event].current;
      eventState[event].current = payload;
      callback(payload);
    },
    options,
  );
}
