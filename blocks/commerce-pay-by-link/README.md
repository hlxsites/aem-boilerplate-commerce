# commerce-pay-by-link

Renders the Pay By Link payment page. Resolves a token from the URL, fetches the order summary via GraphQL, and displays items, totals, and addresses. Exposes a `Payment` slot for mounting a gateway SDK.

## URL parameters

| Parameter | Required | Description |
|---|---|---|
| `token` | Yes | 64-char lowercase hex token from the payment link email |

Missing or malformed tokens render an error state immediately without making a network request.

## Slots

Import the `slots` object to mount a payment gateway SDK into the payment container. Override must happen before the block's `decorate` function runs (i.e., during the eager phase).

```js
import { slots } from '/blocks/commerce-pay-by-link/commerce-pay-by-link.js';

slots.Payment = async (ctx) => {
  const container = document.createElement('div');
  await mountGatewaySDK(container, {
    token: ctx.token,
    amount: ctx.order.totals.grand_total,
  });
  ctx.replaceWith(container);
};
```

### Slot context (`ctx`)

| Property | Type | Description |
|---|---|---|
| `ctx.order` | Object | Full `payByLinkOrder` GraphQL response |
| `ctx.token` | String | Raw token string from the URL |
| `ctx.replaceWith(el)` | Function | Replace the slot container's content |
| `ctx.appendChild(el)` | Function | Append to the slot container |
| `ctx.prependChild(el)` | Function | Prepend to the slot container |

## Error handling

Token validation and `payByLinkOrder` failures use the shared error library in `errors/`. The block calls `renderErrorCard()` for pre-flight errors and `renderMappedError()` for API failures. Payment Services and OOPE submission stories should import the same modules for consistent UI.

```js
import { renderErrorCard, renderMappedError } from './errors/error-card.js';
import { mapErrorToState, resolveOnRetry, PAY_BY_LINK_ERROR } from './errors/error-states.js';

// API / transport failure — maps error to state and wires retry when appropriate
renderMappedError(container, error, { labels, retry: () => { /* re-fetch or re-submit */ } });
```

### Error states

| State | Source | CTA |
|---|---|---|
| `missing` | No `token` param (pre-flight) | Contact support |
| `malformed` | Token fails regex (pre-flight) | Contact support |
| `not-found` | `TOKEN_NOT_FOUND` / HTTP 404 | Contact support |
| `expired` | `TOKEN_EXPIRED` / HTTP 410 | Contact support |
| `already-completed` | `ORDER_ALREADY_PAID` | None |
| `cancelled` | `ORDER_CANCELLED` / HTTP 409 | Contact support |
| `gateway-decline` | Payment gateway decline | Try again (in-place) |
| `sdk-load-failure` | Payment SDK failed to load | Try again (in-place) |
| `generic` | Unmapped API or transport error | Try again (re-fetches order) |

Each error card sets `data-state`, uses `role="alert"` with `aria-live="assertive"`, and moves focus to the error heading on render. Copy comes from the `PayByLink.*` placeholder namespace — no hardcoded strings.

For gateway decline, pass an `onRetry` handler to `renderErrorCard()` so the user can retry without a full page reload and the SDK stays mounted:

```js
renderErrorCard(container, PAY_BY_LINK_ERROR.GATEWAY_DECLINE, {
  labels,
  headingLevel: 2,
  onRetry: () => { /* re-submit payment */ },
});
```

For generic API errors, the block passes a `retry` callback to `renderMappedError()` that re-runs the `payByLinkOrder` query automatically.

## Loading skeleton

While the GraphQL query is in flight, slots `.pay-by-link__order-header`, `.pay-by-link__order-summary`, `.pay-by-link__addresses`, and `.pay-by-link__order-totals` carry the `pay-by-link__skeleton` class and `aria-busy="true"`. Both are removed once the response resolves.

## i18n

Labels are loaded via `fetchPlaceholders()` from the AEM CMS spreadsheet at `placeholders/pay-by-link.json` under the `PayByLink` namespace. See [scripts/commerce.js](../../scripts/commerce.js) for the placeholder loading pattern.

All error and CTA copy must be authored in da.live — no hardcoded strings in code. Required keys:

| da.live key | Used for |
|---|---|
| `PayByLink.ErrorContactSupportLabel` | Contact support CTA button |
| `PayByLink.ErrorTryAgainLabel` | Try again CTA button |
| `PayByLink.ErrorGenericTitle` | Generic error heading |
| `PayByLink.ErrorGenericBody` | Generic error body |

Error title/body keys: `ErrorMissingTokenTitle`, `ErrorMissingTokenBody`, `ErrorMalformedTokenTitle`, `ErrorMalformedTokenBody`, `ErrorNotFoundTitle`, `ErrorNotFoundBody`, `ErrorExpiredTitle`, `ErrorExpiredBody`, `ErrorAlreadyPaidTitle`, `ErrorAlreadyPaidBody`, `ErrorCancelledTitle`, `ErrorCancelledBody`, `ErrorGatewayDeclineTitle`, `ErrorGatewayDeclineBody`, `ErrorSdkLoadFailureTitle`, `ErrorSdkLoadFailureBody`, `ErrorGenericTitle`, `ErrorGenericBody`.

Order summary keys: `CustomerEmailLabel`, `OrderItemsHeading`, `QtyLabel`, `OrderTotalsHeading`, `SubtotalLabel`, `TaxLabel`, `ShippingLabel`, `GrandTotalLabel`, `ShippingAddressHeading`, `BillingAddressHeading`.

## Page shell

This block expects `body.pay-by-link-page` to be set by the AEM page template. That class drives the simplified header (logo only, no nav) defined in `blocks/header/header.css`.

## Exports

| Export | Module | Description |
|---|---|---|
| `extractToken`, `TOKEN_REGEX`, `slots` | `commerce-pay-by-link.js` | Token validation and payment slot |
| `renderErrorCard`, `renderMappedError` | `errors/error-card.js` | Render error UI; map API errors automatically |
| `mapErrorToState`, `resolveOnRetry`, `PAY_BY_LINK_ERROR`, `ERROR_STATE_CONFIG` | `errors/error-states.js` | Error taxonomy and mapping |
