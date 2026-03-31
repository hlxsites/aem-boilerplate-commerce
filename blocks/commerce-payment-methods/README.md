# Commerce Payment Methods Block

## Overview

The Commerce Payment Methods block renders stored customer payment methods using the `@dropins/storefront-account` `PaymentMethods` container. It lists vaulted payment tokens, supports removal where allowed, and applies authentication protection plus optional layout toggles for the section header and compact view.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `with-header` | string | `'true'` | When `'true'`, shows the container title header (Elsie `Header`); when `'false'`, hides it | No | Changes whether the payments section title and divider are visible |
| `minified-view` | string | `'false'` | When `'true'`, uses compact empty state and single-row payment cards; when `'false'`, uses the full layout | No | Changes card density and empty-state presentation |

## Behavior Patterns

### Page Context Detection

- **Authenticated users**: Renders the payment methods UI backed by the account drop-in (customer payment tokens API).
- **Unauthenticated users**: Redirects to the customer login page (`CUSTOMER_LOGIN_PATH` via `rootLink`).
- **With header**: Default `'true'` matches a full account page section with a titled region.
- **Minified view**: Default `'false'` matches a full-width list suitable for a dedicated payments page.

### User Interaction Flows

1. **Authentication check**: The block verifies authentication before rendering.
2. **Redirect flow**: If the shopper is not signed in, the browser navigates to login.
3. **Data load**: The `PaymentMethods` container loads tokens (GraphQL / account signals, per drop-in implementation).
4. **Removal**: Users may remove a stored method when the drop-in exposes a remove action for that token.
5. **Errors**: Load and remove failures surface as inline alerts inside the container.

### Error Handling

- **Authentication**: Unauthenticated visitors are redirected to login; the drop-in is not mounted on the block.
- **Configuration**: Invalid or missing keys from `readBlockConfig()` fall back to the defaults above (`with-header` true, `minified-view` false).
- **Container errors**: Rendering failures leave the block without usable content; see browser console and network tab for API errors.

### Dependencies

- [`scripts/initializers/account.js`](../../scripts/initializers/account.js) is imported so the account drop-in (endpoint, i18n placeholders) is initialized before render.
