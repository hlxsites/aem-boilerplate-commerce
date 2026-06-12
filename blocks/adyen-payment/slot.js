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
} from './session.js';

/**
 * Render the Adyen Drop-in inside the PaymentMethods slot.
 * Called by the checkout dropin when the customer selects adyen_gateway.
 *
 * @param {object} ctx - Slot render context ({ cartId, replaceHTML, ... })
 */
export default async function renderAdyenGateway(ctx) {
  // Read OOPE config from availablePaymentMethods — this is static data set at
  // checkout initialization, so it's reliable regardless of render timing.
  // selectedPaymentMethod is NOT available yet when render fires (notifyValues
  // emits checkout/values in a useEffect that runs after the render cycle).
  const checkoutData = events.lastPayload('checkout/initialized');
  const oopeConfig = checkoutData?.availablePaymentMethods
    ?.find((m) => m.code === ADYEN_PAYMENT_CODE)
    ?.oope_payment_method_config;

  if (!oopeConfig?.backend_integration_url) {
    throw new Error(`[Adyen] backend_integration_url missing in oope_payment_method_config for ${ADYEN_PAYMENT_CODE}`);
  }

  const endpoint = `${oopeConfig.backend_integration_url.replace(/\/$/, '')}/create-session`;
  const cfg = Object.fromEntries(
    (oopeConfig.custom_config ?? []).map(({ key, value }) => [key, value]),
  );
  const clientKey = cfg.client_key;
  const env = (cfg.environment || 'TEST').toLowerCase();

  // Show skeleton immediately — before any async work.
  const $skeleton = document.createElement('div');
  $skeleton.className = 'checkout__adyen-skeleton';
  ctx.replaceHTML($skeleton);

  // Load SDK and create session in parallel — safe to call concurrently since
  // loadAdyenWebSDK deduplicates in-flight requests via a module-level promise.
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
    $skeleton.className = 'checkout__adyen-error';
    $skeleton.textContent = 'Payment form could not be loaded. Please refresh and try again.';
    throw err;
  }

  const $dropin = document.createElement('div');
  ctx.replaceHTML($dropin);

  const AdyenCheckoutFactory = window.AdyenWeb?.AdyenCheckout ?? window.AdyenCheckout;
  const DropinComponent = window.AdyenWeb?.Dropin ?? window.Dropin;

  const checkout = await AdyenCheckoutFactory({
    session: { id: session.id, sessionData: session.sessionData },
    clientKey,
    environment: env,
    onPaymentCompleted: (result) => {
      resolveAdyenPayment({
        sessionId: session.id,
        resultCode: result.resultCode,
        sessionData: result.sessionData ?? '',
        sessionResult: result.sessionResult ?? '',
      });
    },
    onPaymentFailed: (result) => {
      rejectAdyenPayment(`Payment ${result.resultCode}`);
    },
    onError: (error) => {
      rejectAdyenPayment(error.message);
    },
  });

  const dropin = new DropinComponent(checkout, { showPayButton: false }).mount($dropin);
  setDropinInstance(dropin);

  // Clean up when the customer switches to a different payment method.
  const unsubscribe = events.on('checkout/updated', (data) => {
    if (data?.selectedPaymentMethod?.code !== ADYEN_PAYMENT_CODE) {
      clearDropinInstance();
      unsubscribe.off();
    }
  });
}
