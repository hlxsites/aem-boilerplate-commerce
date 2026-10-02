/**
 * Adyen Sessions API helpers.
 *
 * Covers the minimal frontend needs for the Sessions-based OOPE flow:
 *   create-session (App Builder) → Drop-in → onPaymentCompleted
 *   → setPaymentMethodOnCart → placeOrder → validate-payment webhook
 */

import { loadCSS } from '../../scripts/aem.js';

const SDK_VERSION = '6.23.0';

/**
 * Commerce OOPE payment method code — must match payment-methods.yaml.
 * Exported so containers.js and commerce-checkout.js share one definition.
 */
export const ADYEN_PAYMENT_CODE = 'adyen_gateway';

// Single promise shared across concurrent callers so the script/CSS are never
// appended twice even if the slot renders before the first load finishes.
let sdkLoadPromise = null;

/**
 * Load the Adyen Web SDK (JS + CSS) from the Adyen CDN.
 * Safe to call multiple times — deduplicates at both the promise and DOM level.
 *
 * @param {string} environment - 'test' | 'live'
 */
export async function loadAdyenWebSDK(environment = 'test') {
  if (window.AdyenWeb?.AdyenCheckout || window.AdyenCheckout) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;

  const base = `https://checkoutshopper-${environment}.adyen.com/checkoutshopper/sdk/${SDK_VERSION}`;

  sdkLoadPromise = Promise.all([
    loadCSS(`${base}/adyen.css`),
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${base}/adyen.js`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Adyen Web SDK'));
      document.head.appendChild(script);
    }),
  ]).finally(() => {
    sdkLoadPromise = null;
  });

  return sdkLoadPromise;
}

// ─── Session creation ─────────────────────────────────────────────────────────

/**
 * Call the App Builder create-session action.
 *
 * @param {string} endpoint  - Full URL of the adyen/create-session web action
 * @param {{ amount, reference, returnUrl, countryCode }} payload
 * @returns {Promise<{ id: string, sessionData: string, ... }>} Adyen session object
 */
export async function createAdyenSession(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (!response.ok || body.success === false) {
    throw new Error(`create-session failed: ${JSON.stringify(body.error ?? body)}`);
  }
  // App Builder wraps the Adyen response in { success: true, message: { id, sessionData, ... } }
  const session = body.message ?? body;
  if (!session?.id || !session?.sessionData) {
    throw new Error(`create-session returned invalid session — check App Builder logs. Response: ${JSON.stringify(body)}`);
  }
  return session;
}

// ─── Drop-in coordination ─────────────────────────────────────────────────────
// Bridges the Drop-in slot (containers.js) with handlePlaceOrder
// (commerce-checkout.js) so Place Order triggers Drop-in submission and the
// result flows back before placeOrder is called.

// 10-minute timeout matches typical Adyen session expiry.
const PAYMENT_TIMEOUT_MS = 10 * 60 * 1000;

/**
 * Raised by the Drop-in bridge. `code` is one of `invalid`, `refused`, `error`,
 * `cancelled`, `changed`, `timeout`, `pending`, `waiting` or `not-ready`.
 */
export class AdyenPaymentError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'AdyenPaymentError';
    this.code = code;
  }
}

let dropinInstance = null;
let $messageEl = null;

// Result of an authorised payment whose order has not been placed yet. Reused if
// placeOrder fails, because the session is finished and cannot be submitted again.
let completedPayment = null;

let paymentResolve = null;
let paymentReject = null;
let paymentTimeoutId = null;

/** Returns true when submitAdyenPayment() has been called and is awaiting a result. */
export function isPaymentPending() { return !!paymentResolve; }

function clearPaymentCallbacks() {
  if (paymentTimeoutId) clearTimeout(paymentTimeoutId);
  paymentTimeoutId = null;
  paymentResolve = null;
  paymentReject = null;
}

/** Show a payment message above the Drop-in. */
export function showAdyenMessage(text) {
  if (!$messageEl) return;
  $messageEl.textContent = text;
  $messageEl.hidden = false;
  $messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** Hide the payment message. */
export function clearAdyenMessage() {
  if (!$messageEl) return;
  $messageEl.textContent = '';
  $messageEl.hidden = true;
}

/**
 * Set the element for decline and error messages. Called when the slot wrapper
 * is created, before any Drop-in exists.
 *
 * @param {HTMLElement} $message
 */
export function attachAdyenMessage($message) {
  $messageEl = $message;
}

/** Unmount the current Drop-in, for example before a new session replaces it. */
export function unmountDropin() {
  if (dropinInstance) {
    try { dropinInstance.unmount(); } catch { /* ignore */ }
  }
  dropinInstance = null;
  completedPayment = null;
}

/**
 * Store the mounted Drop-in instance so handlePlaceOrder can call submit().
 *
 * @param {object} instance - Mounted Adyen Drop-in
 */
export function setDropinInstance(instance) {
  if (dropinInstance !== instance) unmountDropin();
  dropinInstance = instance;
}

/** Unmount the Drop-in and reject any pending payment when the payment method is deselected. */
export function clearDropinInstance() {
  if (paymentReject) {
    paymentReject(new AdyenPaymentError('cancelled', 'Payment method deselected'));
    clearPaymentCallbacks();
  }
  unmountDropin();
  $messageEl = null;
}

// Show the Drop-in field errors when the card details are incomplete or invalid.
function validateAdyenPayment() {
  if (dropinInstance.isValid) return true;

  if (dropinInstance.activePaymentMethod) {
    dropinInstance.showValidation();
    $messageEl?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    showAdyenMessage('Choose a payment option.');
  }
  return false;
}

/**
 * Programmatically submit the Drop-in and await payment completion.
 * Rejects with an AdyenPaymentError when the form is not ready, the details are
 * invalid, the payment is refused or fails, or onPaymentCompleted never fires
 * within PAYMENT_TIMEOUT_MS.
 *
 * @returns {Promise<{ sessionId, resultCode, sessionData, sessionResult }>}
 */
export function submitAdyenPayment() {
  if (completedPayment) return Promise.resolve(completedPayment);
  if (paymentResolve) {
    return Promise.reject(new AdyenPaymentError('pending', 'A payment is already in progress.'));
  }
  if (!dropinInstance) {
    // The slot is waiting for a shipping method or creating the session.
    if ($messageEl?.isConnected) {
      const message = 'The payment form is not ready yet. Place the order again once the card fields appear.';
      showAdyenMessage(message);
      return Promise.reject(new AdyenPaymentError('waiting', message));
    }
    return Promise.reject(new AdyenPaymentError('not-ready', 'The payment form has not loaded yet. Wait a moment and place the order again, or refresh the page.'));
  }
  if (!validateAdyenPayment()) {
    return Promise.reject(new AdyenPaymentError('invalid', 'Check your payment details.'));
  }

  clearAdyenMessage();

  return new Promise((resolve, reject) => {
    paymentResolve = resolve;
    paymentReject = reject;

    paymentTimeoutId = setTimeout(() => {
      clearPaymentCallbacks();
      const message = 'The payment took too long. Refresh the page and try again.';
      showAdyenMessage(message);
      reject(new AdyenPaymentError('timeout', message));
    }, PAYMENT_TIMEOUT_MS);

    dropinInstance.submit();
  });
}

/** Called from onPaymentCompleted. Resolves the awaiting handlePlaceOrder. */
export function resolveAdyenPayment(result) {
  if (paymentResolve) {
    // Save reference before clearPaymentCallbacks() nulls it out.
    const resolve = paymentResolve;
    clearPaymentCallbacks();
    completedPayment = result;
    resolve(result);
  }
}

/**
 * Called from onPaymentFailed / onError. Shows the message above the Drop-in
 * and rejects the awaiting handlePlaceOrder.
 *
 * @param {string} code - AdyenPaymentError code
 * @param {string} message - Text shown to the shopper
 */
export function rejectAdyenPayment(code, message) {
  if (message) showAdyenMessage(message);
  if (paymentReject) {
    const reject = paymentReject;
    clearPaymentCallbacks();
    reject(new AdyenPaymentError(code, message));
  }
}
