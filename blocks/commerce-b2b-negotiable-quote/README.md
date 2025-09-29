# Commerce B2B Negotiable Quote Block

## Overview

The Commerce B2B Negotiable Quote block renders a negotiable quotes list for authenticated B2B customers using the `@dropins/storefront-quote-management` QuotesListTable container. It follows the `commerce-b2b-*` naming convention and initializes required drop-ins at the block level.

## Integration

### Block Configuration

| Configuration Key    | Type    | Default | Description                                   | Required | Side Effects                           |
| -------------------- | ------- | ------- | --------------------------------------------- | -------- | -------------------------------------- |
| `pageSize`           | number  | `20`    | Number of quotes per page (container default) | No       | Controls pagination behavior           |
| `showItemRange`      | boolean | `true`  | Shows the item range text                     | No       | Affects pagination UI visibility       |
| `showPageSizePicker` | boolean | `true`  | Shows the page size picker                    | No       | Affects pagination controls            |
| `showPagination`     | boolean | `true`  | Shows the pagination controls                 | No       | Affects page navigation between quotes |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('authenticated', callback)` – Listens for auth state changes to fetch quotes

#### Event Emitters

- `quote-management/permissions` – Emitted when quote permissions are resolved
- `quote-management/negotiable-quote-requested` – Emitted when a new quote is requested

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: Renders the quotes list when the user is authenticated
- **Unauthenticated Users**: Redirects to the customer login page

### User Interaction Flows

1. **Authentication Check**: Block verifies user authentication status
2. **Initialization**: Required quote management drop-ins are initialized
3. **Quotes Display**: Renders quotes with name, status, dates, and totals
4. **View Action**: Users can click "View" to navigate to quote details (implementation-specific)
5. **Pagination**: Users can navigate pages and adjust page size

### Error Handling

- **Authentication Errors**: Redirects to login if user is unauthenticated
- **Container Errors**: If the QuotesListTable container fails to render, the section remains empty
- **Permissions/Fetch Errors**: The container handles internal errors and empty states gracefully
- **Fallback Behavior**: Defaults are applied when optional configuration is missing
