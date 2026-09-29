/**
 * Adyen payment method slot renderer for the checkout PaymentMethods container.
 * Registered in containers.js as slots.Methods[ADYEN_PAYMENT_CODE].render.
 */

import { events } from '@dropins/tools/event-bus.js';
import {
  ADYEN_PAYMENT_CODE,
  loadAdyenWebSDK,
  createAdyenSession,
  setDropinInstance,
  clearDropinInstance,
  resolveAdyenPayment,
  rejectAdyenPayment,
  isDropinMounted,
  isPaymentPending,
} from './session.js';

const FAILED_MESSAGES = {
  Refused: 'Your payment was declined. Check your card details or use a different card.',
  Cancelled: 'The payment was cancelled. You can try again.',
};
const DEFAULT_FAILED_MESSAGE = 'The payment could not be processed. Try again or use a different card.';

// True while the async IIFE is running. Prevents a second IIFE from starting
// when checkout/updated re-invokes render() during SDK / session setup.
let isRenderingAdyen = false;

// Updated on every render call so the single IIFE always uses the freshest ctx.
let activeCtx = null;

// Wrapper holding the payment message and the Adyen Drop-in. Passed back to ctx.replaceHTML
// on every subsequent render() call so Preact keeps the slot instead of clearing it
// when render() would otherwise return void.
let activeDropinEl = null;

/**
 * Render the Adyen Drop-in inside the PaymentMethods slot.
 * Called by the checkout dropin when the customer selects adyen_gateway.
 *
 * Intentionally synchronous so the dropin renders the skeleton immediately.
 * SDK load and session creation run in a single background async IIFE.
 *
 * @param {object} ctx - Slot render context ({ cartId, replaceHTML, ... })
 */
export default function renderAdyenGateway(ctx) {
  // Drop-in already mounted. Re-pass the existing element back so Preact keeps
  // the slot instead of clearing it (render returning void clears the slot).
  if (isDropinMounted()) {
    if (activeDropinEl) ctx.replaceHTML(activeDropinEl);
    return;
  }

  // Update the shared ctx pointer — the IIFE always uses the freshest one.
  activeCtx = ctx;

  // Always show a skeleton with the current ctx. If render() returns without
  // calling ctx.replaceHTML the dropin clears the slot.
  const $skeleton = document.createElement('div');
  $skeleton.className = 'checkout__adyen-skeleton';
  ctx.replaceHTML($skeleton);

  // IIFE already running — ctx and skeleton updated, nothing else to do.
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

  const endpoint = `${oopeConfig.backend_integration_url.replace(/\/$/, '')}/create-session`;
  const cfg = Object.fromEntries(
    (oopeConfig.custom_config ?? []).map(({ key, value }) => [key, value]),
  );
  const clientKey = cfg.client_key;
  const env = (cfg.environment || 'TEST').toLowerCase();

  // Load failures only, before the Drop-in exists. Uses activeCtx so the error
  // lands in the slot the dropin expects.
  const showError = (message) => {
    const $error = document.createElement('div');
    $error.className = 'checkout__adyen-error';
    $error.textContent = message || 'Payment could not be processed. Please refresh and try again.';
    activeCtx.replaceHTML($error);
  };

  // Single background async IIFE. Subsequent render() calls only update
  // activeCtx and show a fresh skeleton; they never start a second IIFE.
  (async () => {
    const cartData = events.lastPayload('cart/data') || events.lastPayload('cart/initialized');

    let session;
    try {
      [, session] = await Promise.all([
        loadAdyenWebSDK(env),
        createAdyenSession(endpoint, {
          amount: {
            value: Math.round((cartData?.total?.includingTax?.value || 0) * 100),
            currency: cartData?.total?.includingTax?.currency || 'USD',
          },
          reference: cartData?.id,
          returnUrl: `${window.location.origin}/checkout`,
          countryCode: checkoutData?.billingAddress?.country?.code
            || checkoutData?.shippingAddresses?.[0]?.country?.code
            || 'US',
        }),
      ]);
    } catch (err) {
      showError('Payment form could not be loaded. Please refresh and try again.');
      return;
    }

    const AdyenCheckoutFactory = window.AdyenWeb?.AdyenCheckout ?? window.AdyenCheckout;
    const DropinComponent = window.AdyenWeb?.Dropin ?? window.Dropin;

    let checkout;
    try {
      checkout = await AdyenCheckoutFactory({
        session: { id: session.id, sessionData: session.sessionData },
        clientKey,
        environment: env,
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
            activeDropinEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        },
        onPaymentCompleted: (result) => {
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
        },
        onError: (error, component) => {
          if (error?.name === 'CANCEL') {
            component?.setStatus('ready');
            rejectAdyenPayment('cancelled');
            return;
          }
          console.error('[Adyen] onError:', error);
          component?.setStatus('ready');
          rejectAdyenPayment('error', DEFAULT_FAILED_MESSAGE);
        },
      });
    } catch (err) {
      showError('Payment form could not be loaded. Please refresh and try again.');
      throw err;
    }

    // Find the skeleton currently in the slot and get its parent — this IS the
    // slot's DOM container managed by the dropin. We insert $dropin directly into
    // the parent rather than via ctx.replaceHTML because ctx.replaceHTML goes
    // through Preact's batched update cycle, which may delay DOM insertion past
    // the synchronous mount() call, causing the Drop-in to mount into a detached
    // node. Direct DOM manipulation is synchronous and guaranteed in-document.
    const $currentSkeleton = document.querySelector('.checkout__adyen-skeleton');
    const $slotParent = $currentSkeleton?.parentElement;

    if (!$slotParent) {
      showError('Payment slot not found. Please refresh and try again.');
      return;
    }

    // Replace skeleton with the dropin container and mount synchronously.
    // No await between these operations — the Drop-in claims $dropin before
    // any Preact reconciliation can run.
    const $wrapper = document.createElement('div');
    $wrapper.className = 'checkout__adyen';
    const $message = document.createElement('p');
    $message.className = 'checkout__adyen-message';
    $message.setAttribute('role', 'alert');
    $message.hidden = true;
    const $dropin = document.createElement('div');
    $wrapper.append($message, $dropin);
    $slotParent.innerHTML = '';
    $slotParent.appendChild($wrapper);
    const dropin = new DropinComponent(checkout, { showPayButton: false }).mount($dropin);

    // Store the wrapper so render() can re-pass it to ctx.replaceHTML on
    // subsequent checkout/updated calls, keeping the slot alive.
    activeDropinEl = $wrapper;
    setDropinInstance(dropin, $message);

    // Clean up when the customer switches to a different payment method.
    const unsubscribe = events.on('checkout/updated', (data) => {
      if (data?.selectedPaymentMethod?.code !== ADYEN_PAYMENT_CODE) {
        clearDropinInstance();
        activeDropinEl = null;
        isRenderingAdyen = false;
        unsubscribe.off();
      }
    });
  })().catch((err) => {
    showError('Payment form could not be loaded. Please refresh and try again.');
    console.error('[Adyen]', err);
  }).finally(() => {
    isRenderingAdyen = false;
  });
}
