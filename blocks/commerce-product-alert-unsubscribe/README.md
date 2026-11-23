# Commerce Product Alert Unsubscribe Block

## Overview

The Commerce Product Alert Unsubscribe block is the landing page for the unsubscribe links in Adobe Commerce product alert emails (back-in-stock and price-change). It signs the shopper in when needed, asks for confirmation, and calls the Commerce GraphQL product alert unsubscribe mutations.

Create two pages that each contain this block:

| Page | Alert type |
|------|------------|
| `/customer/stock-alerts` | Back-in-stock alerts |
| `/customer/price-alerts` | Price-change alerts |

Commerce builds these links from the **Storefront Base URL** (`trans_email/general/storefront_url`, Stores > Configuration > General > Store Email Addresses) whenever it is set, so publish both pages on every storefront that uses product alerts.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `type` | string | derived from page path | Alert type, `stock` or `price`. If not set, `/price-alerts` and `/stock-alerts` page paths are detected. | No | Selects the GraphQL mutations to call. |

### URL Parameters

| Parameter | Values | Description |
|-----------|--------|-------------|
| `action` | `unsubscribe`, `unsubscribe-all` | Unsubscribe from one product or from all products of the alert type. |
| `sku` | product SKU | Required when `action=unsubscribe`. |

Examples:

- `/customer/stock-alerts?action=unsubscribe&sku=24-MB01`
- `/customer/stock-alerts?action=unsubscribe-all`
- `/customer/price-alerts?action=unsubscribe&sku=24-MB01`
- `/customer/price-alerts?action=unsubscribe-all`

### GraphQL

| Alert type | `unsubscribe` | `unsubscribe-all` |
|------------|---------------|-------------------|
| `stock` | `unsubscribeProductAlertStock(input: { sku })` | `unsubscribeProductAlertStockAll` |
| `price` | `unsubscribeProductAlertPrice(input: { sku })` | `unsubscribeProductAlertPriceAll` |

All mutations act on the logged-in customer and are sent through the Core GraphQL client with the customer token.

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

No events are listened to or emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Invalid Link**: Unknown alert type, unknown `action`, or `action=unsubscribe` without `sku` shows a warning.
- **Unauthenticated Users**: Renders the sign-in form and returns to the same URL (with `action` and `sku`) after sign-in.
- **Authenticated Users**: Shows a confirmation with an **Unsubscribe** button.

### User Interaction Flows

1. **Link Validation**: The block reads `action` and `sku` from the URL.
2. **Authentication**: Guests sign in and return to the same link.
3. **Confirmation**: The mutation runs only after the shopper clicks **Unsubscribe**. It never runs on page load, so email link scanners that prefetch URLs cannot unsubscribe the shopper.
4. **Result**: A success alert with a link to My Account, or an error alert with the button enabled again.

### Error Handling

- **GraphQL Errors**: Logged to the console. A generic error alert is shown and the shopper can retry.
- **Unsuccessful Result**: Shows the `message` returned by the mutation.
- **Fallback Behavior**: Invalid links never call GraphQL.

