# Adyen Payment Block

## Overview

Provides the **Adyen Drop-in** as an OOPE (Out-of-Process Extension) payment method in the storefront checkout. Uses the **Adyen Sessions API** flow:

1. App Builder `create-session` action → Adyen session
2. Adyen Drop-in mounts with `showPayButton: false`
3. Place Order button calls `dropin.submit()` via `submitAdyenPayment()`
4. `onPaymentCompleted` resolves with session result
5. `setPaymentMethod` sends session data to Commerce
6. `placeOrder` → App Builder `validate-payment` webhook confirms the session

This block is not rendered directly in a page. It exports a slot renderer (`slot.js`) and session coordination helpers (`session.js`) consumed by the `commerce-checkout` block.

## Configuration

All configuration is pulled from `oope_payment_method_config` on the `adyen_gateway` payment method, registered in Commerce via `payment-methods.yaml`:

| Field | Source | Description |
|---|---|---|
| `backend_integration_url` | `payment-methods.yaml` | Base URL of the App Builder Adyen actions |
| `client_key` | `custom_config` | Adyen public client key (safe for browser) |
| `environment` | `custom_config` | `TEST` or `LIVE` (controls SDK CDN endpoint) |

No `config.json` keys are used — all values come from the OOPE config registered in Commerce.

## Integration

### Checkout Slot Registration

In `containers.js`, the Adyen slot is registered as:

```js
import { ADYEN_PAYMENT_CODE } from '../adyen-payment/session.js';
import renderAdyenGateway from '../adyen-payment/slot.js';

// Inside renderPaymentMethods → slots.Methods:
[ADYEN_PAYMENT_CODE]: { render: renderAdyenGateway }
```

### GraphQL Fragment Extension

`build.mjs` extends the checkout dropin fragments to fetch OOPE config:

```js
fragment AVAILABLE_PAYMENT_METHOD_FRAGMENT on AvailablePaymentMethod {
  oope_payment_method_config { backend_integration_url custom_config { key value } }
}
```

Run `npm run install:dropins` after modifying `build.mjs`.

### Events

#### Consumed

- `checkout/updated` (falling back to `checkout/initialized`) — read via `events.lastPayload()` to get `oopePaymentMethodConfigs` and the addresses at slot render time
- `cart/data` / `cart/initialized` — read via `events.lastPayload()` to get cart total and currency for the session amount
- `checkout/updated` — listened to detect payment method switches and clean up the Drop-in instance

#### Emitted

None. Results flow through the `submitAdyenPayment()` / `resolveAdyenPayment()` promise bridge in `session.js`.

## Behavior Patterns

### SDK Loading

`loadAdyenWebSDK(environment)` in `session.js` loads the Adyen Web SDK JS and CSS from the Adyen CDN lazily — only when the slot renders. A module-level promise (`sdkLoadPromise`) deduplicates concurrent calls so the script is never appended twice.

### Session Creation

`createAdyenSession(endpoint, payload)` POSTs to the App Builder `create-session` action with cart amount, currency, reference, return URL, and country code.

### Drop-in Coordination

`handleValidation` in `commerce-checkout.js` calls `validateAdyenPayment()` along with the checkout forms. When the card details are incomplete or invalid, the Drop-in shows its field errors and the order is not submitted, so no spinner appears.

`submitAdyenPayment()` returns a Promise that resolves when `onPaymentCompleted` fires. `handlePlaceOrder` awaits it before showing the overlay spinner, because a 3DS challenge renders inside the Drop-in and the overlay would cover it. When the challenge opens, `onActionHandled` scrolls the Drop-in into view. After Adyen completes, `handlePlaceOrder` calls `setPaymentMethod` and `placeOrder` under the overlay.

The completed result is kept until the Drop-in is replaced. If `setPaymentMethod` or `placeOrder` fails, the next Place Order click reuses it instead of submitting the finished session again. A second click while a payment is in progress is ignored.

### Cleanup

When the customer selects a different payment method, the `checkout/updated` listener calls `clearDropinInstance()`, which unmounts the Drop-in and rejects any pending payment promise.

## Error Handling

Failures are rejected as an `AdyenPaymentError` with a `code`.

- `invalid`: card details failed validation. The Drop-in shows the field errors.
- `refused`, `cancelled` or `error`: `onPaymentFailed` or `onError` puts the Drop-in back to `ready` and shows a message above it (`.checkout__adyen-message`), so the shopper can retry with the same session.
- `timeout`: no result within 10 minutes (typical Adyen session expiry). The message asks the shopper to refresh.
- `not-ready`: Place Order was clicked before the Drop-in mounted. This is rethrown as a `PlaceOrderError`, so the checkout `ServerError` container shows its message instead of the generic text.

Load failures (missing `backend_integration_url`, SDK or session creation errors) replace the slot with a `checkout__adyen-error` message.

If `placeOrder` fails after Adyen has authorised the payment and the shopper then switches to another payment method, the authorisation stays open in Adyen until it expires or the App Builder app cancels it.
