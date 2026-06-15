# Commerce Pay By Link Block

## Overview

The Commerce Pay By Link block renders the standalone `/pay` page for token-based order payment. It validates the `token` URL parameter, renders a page shell with mount points for downstream stories (order summary, payment, etc.), or shows an accessible error card when the token is missing or malformed.

A shared error library under `errors/` provides consistent error UI and error-to-state mapping for this block and for downstream order-summary, Payment Services, and OOPE submission flows.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`.

### URL Parameters

- `token` — 64-character lowercase hex string (secure random hash). Required for a valid pay session.
  - Absent or empty → `missing` error state (no API call).
  - Present but invalid format → `malformed` error state (no API call).
  - Valid format → page shell is rendered; downstream stories load order data via `payByLinkOrder`.

### Placeholders

Error copy is authored in Document Authoring under the `PayByLink.*` namespace (`fetchPlaceholders()`). Keys used by `ERROR_STATE_CONFIG`:

| Placeholder key | Used for |
|-----------------|----------|
| `ErrorMissingTokenTitle` / `ErrorMissingTokenBody` | Missing token |
| `ErrorMalformedTokenTitle` / `ErrorMalformedTokenBody` | Malformed token |
| `ErrorNotFoundTitle` / `ErrorNotFoundBody` | Token not found |
| `ErrorExpiredTitle` / `ErrorExpiredBody` | Expired token |
| `ErrorAlreadyCompletedTitle` / `ErrorAlreadyCompletedBody` | Order already paid |
| `ErrorCancelledTitle` / `ErrorCancelledBody` | Cancelled token |
| `ErrorGatewayDeclineTitle` / `ErrorGatewayDeclineBody` | Payment declined |
| `ErrorSdkLoadFailureTitle` / `ErrorSdkLoadFailureBody` | Payment SDK failed to load |
| `ErrorGenericTitle` / `ErrorGenericBody` | Unexpected error |
| `ErrorContactSupportLabel` | Contact support CTA |
| `ErrorTryAgainLabel` | Try again CTA |

### Local Storage

No localStorage keys are used by this block.

### Events

No event listeners or emitters in the block today. Downstream stories may subscribe to commerce drop-in events when payment and order flows are wired.

## Behavior Patterns

### Page Context Detection

- **Missing or malformed token**: Block renders the shared error card immediately; no GraphQL call is made.
- **Valid token**: Block renders the two-column page shell with empty mount points for order summary, addresses, totals, payment, and footer content.

### User Interaction Flows

1. **Land on `/pay`**: Block reads `token` from the query string via `extractToken()`.
2. **Pre-flight validation failure**: `renderErrorCard()` shows title, body, and optional CTA; focus moves to the error heading for screen readers.
3. **Valid token**: Shell DOM is created; downstream stories populate `.pay-by-link__*` slots and handle payment.

### Page Shell Mount Points

| Element | Purpose |
|---------|---------|
| `.pay-by-link__order-header` | Order header |
| `.pay-by-link__order-summary` | Line items / order summary |
| `.pay-by-link__addresses` | Shipping / billing addresses |
| `.pay-by-link__order-totals` | Order totals |
| `.pay-by-link__payment` | Payment method / SDK |
| `.pay-by-link__footer` | Footer actions |

## Error Handling

### Error states (`errors/error-states.js`)

| State | When |
|-------|------|
| `missing` | No `token` query parameter |
| `malformed` | `token` fails format validation |
| `not-found` | Backend: token not found (404 / `PAY_BY_LINK_TOKEN_NOT_FOUND`) |
| `expired` | Backend: token expired (410 / `PAY_BY_LINK_TOKEN_EXPIRED`) |
| `cancelled` | Backend: token cancelled (409 / `PAY_BY_LINK_TOKEN_CANCELLED`) |
| `already-completed` | Backend: order already paid |
| `gateway-decline` | Payment gateway declined the charge |
| `sdk-load-failure` | Payment SDK failed to initialize |
| `generic` | Any unmapped error |

Use `mapErrorToState(error)` to resolve a thrown error, GraphQL/Apollo error, or OOPE response to one of the states above. Resolution order: known state string → backend error code → HTTP status → `generic`.

Backend error codes in `BACKEND_CODE_TO_STATE` are placeholders pending backend sign-off.

### Error card (`errors/error-card.js`)

`renderErrorCard(container, state, options)` renders the shared error UI:

- `role="alert"` and `aria-live="assertive"` on the card
- Programmatic focus on the error title (`tabindex="-1"`)
- `data-state` attribute on the root for testing and styling
- Optional CTA per state: **Contact support** (`rootLink(SUPPORT_PATH)`), **Try again** (in-place `onRetry` callback), or none

Options:

| Option | Default | Description |
|--------|---------|-------------|
| `labels` | — | Result of `fetchPlaceholders()` |
| `onRetry` | — | Handler for try-again CTAs; keeps the payment SDK mounted |
| `headingLevel` | `1` | Heading level (`1`–`6`) for inline error cards inside an existing page |

### CTA behavior by state

| State | CTA |
|-------|-----|
| `missing`, `malformed`, `not-found`, `expired`, `cancelled` | Contact support |
| `already-completed` | None |
| `gateway-decline`, `sdk-load-failure`, `generic` | Try again |

## Exports

| Export | Module | Description |
|--------|--------|-------------|
| `extractToken(search)` | `commerce-pay-by-link.js` | Parse and validate the `token` query parameter |
| `TOKEN_REGEX` | `commerce-pay-by-link.js` | Token format: `/^[a-f0-9]{64}$/` |
| `renderErrorCard()` | `errors/error-card.js` | Render the shared error card |
| `mapErrorToState()` | `errors/error-states.js` | Map an error object to a named state |
| `PAY_BY_LINK_ERROR`, `ERROR_CTA`, `ERROR_STATE_CONFIG` | `errors/error-states.js` | State taxonomy and per-state UI config |
