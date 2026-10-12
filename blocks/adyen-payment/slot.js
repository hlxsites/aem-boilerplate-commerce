/**
 * Adyen payment method slot renderer for the checkout PaymentMethods container.
 * Registered in containers.js as slots.Methods[ADYEN_PAYMENT_CODE].render.
 */

import { events } from '@dropins/tools/event-bus.js';
import {
  ADYEN_PAYMENT_CODE,
  loadAdyenWebSDK,
  createAdyenSession,
  attachAdyenMessage,
  showAdyenMessage,
  clearAdyenMessage,
  setDropinInstance,
  unmountDropin,
  clearDropinInstance,
  resolveAdyenPayment,
  rejectAdyenPayment,
  isPaymentPending,
} from './session.js';

const FAILED_MESSAGES = {
  Refused: 'Your payment was declined. Check your card details or use a different card.',
  Cancelled: 'The payment was cancelled. You can try again.',
};
const DEFAULT_FAILED_MESSAGE = 'The payment could not be processed. Try again or use a different card.';
const LOAD_ERROR_MESSAGE = 'Payment form could not be loaded. Please refresh and try again.';
const CHANGED_MESSAGE = 'Your order total changed. Enter your card details again to pay the new total.';
const WAITING_MESSAGE = 'Enter a shipping address and choose a shipping method to see the payment options.';

// Short wait so one change that emits several events creates one session.
const SYNC_DELAY_MS = 200;

// The cart dropin refetches the cart after every checkout/updated, so a new shipping
// method comes before its total. Wait for that cart/data, or this long if it never comes.
const CART_REFRESH_TIMEOUT_MS = 3000;

// True while the SDK is loading. Prevents a second load when checkout/updated
// re-invokes render() in the meantime.
let isRenderingAdyen = false;

// Updated on every render call so load errors land in the slot the dropin expects.
let activeCtx = null;

// Endpoint and keys from the OOPE config, read on the first render.
let adyenConfig = null;

// Wrapper holding the payment message and the content area. Passed back to
// ctx.replaceHTML on every later render() call so Preact keeps the slot instead
// of clearing it when render() would otherwise return void.
let $wrapper = null;

// Shows the waiting note, the loading state, a load error or the Drop-in.
let $content = null;

// Session inputs the current content was rendered for. Undefined until the first sync.
let renderedKey;

// Bumped whenever the content is replaced, so a slow session request can't mount
// a Drop-in for inputs that are no longer current.
let generation = 0;

let syncTimer = null;
let subscriptions = [];

/**
 * Amount, currency, reference and country for create-session. Returns null until
 * the total is final, which needs a shipping method unless the cart is virtual.
 */
function getSessionInput() {
  const checkoutData = events.lastPayload('checkout/updated')
    ?? events.lastPayload('checkout/initialized');
  const cartData = events.lastPayload('cart/data') ?? events.lastPayload('cart/initialized');
  const total = cartData?.total?.includingTax;
  if (!checkoutData || !cartData?.id || typeof total?.value !== 'number') return null;

  const shippingAddress = checkoutData.shippingAddresses?.[0];
  if (!checkoutData.isVirtual && !shippingAddress?.selectedShippingMethod) return null;

  const input = {
    amount: {
      value: Math.round(total.value * 100),
      currency: total.currency || 'USD',
    },
    reference: cartData.id,
    countryCode: checkoutData.billingAddress?.country?.code
      || shippingAddress?.country?.code
      || 'US',
  };
  return { ...input, key: JSON.stringify(input) };
}

function renderContent(className, text = '') {
  const $el = document.createElement(className === 'checkout__adyen-loading' ? 'div' : 'p');
  $el.className = className;
  $el.textContent = text;
  $content.replaceChildren($el);
}

function scheduleSync(delay = SYNC_DELAY_MS) {
  clearTimeout(syncTimer);
  // eslint-disable-next-line no-use-before-define
  syncTimer = setTimeout(sync, delay);
}

async function mountDropin(input, gen) {
  renderContent('checkout__adyen-loading');

  try {
    const session = await createAdyenSession(adyenConfig.endpoint, {
      amount: input.amount,
      reference: input.reference,
      returnUrl: `${window.location.origin}/checkout`,
      countryCode: input.countryCode,
    });
    if (gen !== generation) return;

    const AdyenCheckoutFactory = window.AdyenWeb?.AdyenCheckout ?? window.AdyenCheckout;
    const DropinComponent = window.AdyenWeb?.Dropin ?? window.Dropin;

    const checkout = await AdyenCheckoutFactory({
      session: { id: session.id, sessionData: session.sessionData },
      clientKey: adyenConfig.clientKey,
      environment: adyenConfig.env,
      beforeSubmit: (data, _component, actions) => {
        // Only allow Drop-in submission when Place Order triggered it.
        // Without this guard, pressing Enter in the card fields would send
        // the payment to Adyen without creating a Commerce order.
        if (isPaymentPending()) {
          actions.resolve(data);
        } else {
          actions.reject();
        }
      },
      onActionHandled: ({ componentType }) => {
        // Place Order sits below the Drop-in, so the 3DS challenge can open off screen.
        if (componentType === '3DS2Challenge') {
          $wrapper?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      onPaymentCompleted: (result) => {
        // Place Order skips session updates while Adyen is busy, so the total can
        // change during a 3DS challenge. Don't place an order for the old amount.
        if (getSessionInput()?.key !== input.key) {
          rejectAdyenPayment('changed');
          // eslint-disable-next-line no-use-before-define
          sync();
          showAdyenMessage(CHANGED_MESSAGE);
          return;
        }
        resolveAdyenPayment({
          sessionId: session.id,
          resultCode: result.resultCode,
          sessionData: result.sessionData ?? '',
          sessionResult: result.sessionResult ?? '',
        });
      },
      // The session allows another attempt, so put the Drop-in back to ready
      // instead of leaving it on Adyen's error screen.
      onPaymentFailed: (result, component) => {
        console.error('[Adyen] onPaymentFailed:', result?.resultCode, result);
        component?.setStatus('ready');
        // A failed /payments call fires onError first and then this without a resultCode.
        if (!result?.resultCode) return;
        rejectAdyenPayment(
          result.resultCode === 'Cancelled' ? 'cancelled' : 'refused',
          FAILED_MESSAGES[result.resultCode] ?? DEFAULT_FAILED_MESSAGE,
        );
        scheduleSync();
      },
      onError: (error, component) => {
        component?.setStatus('ready');
        if (error?.name === 'CANCEL') {
          rejectAdyenPayment('cancelled');
        } else {
          console.error('[Adyen] onError:', error);
          rejectAdyenPayment('error', DEFAULT_FAILED_MESSAGE);
        }
        scheduleSync();
      },
    });
    if (gen !== generation) return;

    const $dropin = document.createElement('div');
    $content.replaceChildren($dropin);
    setDropinInstance(new DropinComponent(checkout, { showPayButton: false }).mount($dropin));
  } catch (err) {
    if (gen !== generation) return;
    console.error('[Adyen]', err);
    renderContent('checkout__adyen-error', LOAD_ERROR_MESSAGE);
  }
}

// Create a new session whenever the amount, currency or country changes.
function sync() {
  clearTimeout(syncTimer);
  syncTimer = null;
  if (!$wrapper || isPaymentPending()) return;

  const input = getSessionInput();
  const key = input?.key ?? null;
  if (key === renderedKey) return;

  renderedKey = key;
  generation += 1;
  unmountDropin();
  clearAdyenMessage();

  if (input) {
    mountDropin(input, generation);
  } else {
    renderContent('checkout__adyen-note', WAITING_MESSAGE);
  }
}

function cleanup() {
  subscriptions.forEach((subscription) => subscription?.off());
  subscriptions = [];
  clearTimeout(syncTimer);
  syncTimer = null;
  generation += 1;
  renderedKey = undefined;
  clearDropinInstance();
  $wrapper = null;
  $content = null;
}

function onCheckoutUpdated(data) {
  // The cart has no payment method for a moment after the shipping address is set,
  // so only a different method means the customer switched away from Adyen.
  const code = data?.selectedPaymentMethod?.code;
  if (code && code !== ADYEN_PAYMENT_CODE) {
    cleanup();
    return;
  }
  scheduleSync(CART_REFRESH_TIMEOUT_MS);
}

/**
 * Render the Adyen Drop-in inside the PaymentMethods slot.
 * Called by the checkout dropin when the customer selects adyen_gateway.
 *
 * Intentionally synchronous so the dropin renders the skeleton immediately.
 * The SDK loads in a background async IIFE. Sessions are created later by sync().
 *
 * @param {object} ctx - Slot render context ({ cartId, replaceHTML, ... })
 */
export default function renderAdyenGateway(ctx) {
  // Re-pass the existing wrapper so Preact keeps the slot instead of clearing it
  // (render returning void clears the slot).
  if ($wrapper) {
    ctx.replaceHTML($wrapper);
    return;
  }

  activeCtx = ctx;

  // Always show a skeleton with the current ctx. If render() returns without
  // calling ctx.replaceHTML the dropin clears the slot.
  const $skeleton = document.createElement('div');
  $skeleton.className = 'checkout__adyen-skeleton';
  ctx.replaceHTML($skeleton);

  if (isRenderingAdyen) return;
  isRenderingAdyen = true;

  // Read OOPE config from oopePaymentMethodConfigs, which the checkout initializer
  // keeps apart from availablePaymentMethods. checkout/updated carries the methods
  // returned after the address is set; checkout/initialized only has the first load.
  const checkoutData = events.lastPayload('checkout/updated')
    ?? events.lastPayload('checkout/initialized');
  const oopeConfig = checkoutData?.oopePaymentMethodConfigs?.[ADYEN_PAYMENT_CODE];

  if (!oopeConfig?.backend_integration_url) {
    $skeleton.className = 'checkout__adyen-error';
    $skeleton.textContent = `[Adyen] backend_integration_url missing in oope_payment_method_config for ${ADYEN_PAYMENT_CODE}`;
    isRenderingAdyen = false;
    return;
  }

  const cfg = Object.fromEntries(
    (oopeConfig.custom_config ?? []).map(({ key, value }) => [key, value]),
  );
  adyenConfig = {
    endpoint: `${oopeConfig.backend_integration_url.replace(/\/$/, '')}/create-session`,
    clientKey: cfg.client_key,
    env: (cfg.environment || 'TEST').toLowerCase(),
  };

  const showError = (message) => {
    const $error = document.createElement('div');
    $error.className = 'checkout__adyen-error';
    $error.textContent = message;
    activeCtx.replaceHTML($error);
  };

  (async () => {
    await loadAdyenWebSDK(adyenConfig.env);

    // Insert the wrapper straight into the skeleton's parent, which is the slot's
    // DOM container. ctx.replaceHTML goes through Preact's batched updates, so the
    // Drop-in could otherwise mount into a node that isn't in the document yet.
    const $slotParent = document.querySelector('.checkout__adyen-skeleton')?.parentElement;
    if (!$slotParent) {
      showError('Payment slot not found. Please refresh and try again.');
      return;
    }

    $wrapper = document.createElement('div');
    $wrapper.className = 'checkout__adyen';
    const $message = document.createElement('p');
    $message.className = 'checkout__adyen-message';
    $message.setAttribute('role', 'alert');
    $message.hidden = true;
    $content = document.createElement('div');
    $wrapper.append($message, $content);
    $slotParent.replaceChildren($wrapper);
    attachAdyenMessage($message);

    subscriptions = [
      events.on('cart/data', () => scheduleSync()),
      events.on('checkout/updated', onCheckoutUpdated),
    ];
    sync();
  })().catch((err) => {
    showError(LOAD_ERROR_MESSAGE);
    console.error('[Adyen]', err);
  }).finally(() => {
    isRenderingAdyen = false;
  });
}
