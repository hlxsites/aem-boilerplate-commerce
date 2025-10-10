# Commerce B2B Negotiable Quote Block

## Overview

The Commerce B2B Negotiable Quote block provides two views for managing negotiable quotes for authenticated B2B customers:
1. **List View**: Displays all quotes using the `QuotesListTable` container
2. **Manage View**: Displays individual quote details using `ManageNegotiableQuote` and `ItemsQuoted` containers

It follows the `commerce-b2b-*` naming convention and initializes required drop-ins at the block level. This block requires company management functionality to be enabled and the user to be associated with a company.

## Integration

### Dependencies

- `@dropins/storefront-quote-management` - Quote management containers and renderer
- `@dropins/storefront-company-management` - Company permission checks
- `../../scripts/initializers/quote-management.js` - Quote management initialization

### Block Configuration

This block currently does not support configuration through block metadata. All settings are hardcoded in the implementation:

| Setting              | Type    | Value   | Description                            |
| -------------------- | ------- | ------- | -------------------------------------- |
| `showItemRange`      | boolean | `true`  | Shows the item range text              |
| `showPageSizePicker` | boolean | `true`  | Shows the page size picker             |
| `showPagination`     | boolean | `true`  | Shows the pagination controls          |

### URL Parameters

| Parameter | Type   | Description                                                    | Required |
| --------- | ------ | -------------------------------------------------------------- | -------- |
| `quoteId` | string | Switches from list view to manage view for the specified quote | No       |

### Local Storage

No localStorage keys are used by this block.

### Events

#### Event Listeners

- `quote-management/quote-data/error` – Renders an error alert when quote data fails to load

#### Event Emitters

This block does not directly emit events but uses containers that emit:
- `quote-management/permissions` – Emitted when quote permissions are resolved
- `quote-management/negotiable-quote-requested` – Emitted when a new quote is requested

## Behavior Patterns

### Page Context Detection

- **Authenticated Users with Company**: Renders the quotes list or manage view based on URL parameters
- **Unauthenticated Users**: Redirects to the customer login page
- **Company Not Enabled**: Redirects to the customer account page
- **User Without Company**: Redirects to the customer account page

### View Switching

The block renders different views based on the presence of the `quoteId` URL parameter:

- **List View** (`data-quote-view="list"`): No `quoteId` parameter
  - Renders `QuotesListTable` container
  - Displays all quotes with pagination
  - "View" action adds `quoteId` to URL to switch to manage view

- **Manage View** (`data-quote-view="manage"`): When `quoteId` is present
  - Renders `ManageNegotiableQuote` container
  - Displays quote details and items via `ItemsQuoted` container
  - Shows checkout button (enabled based on `quoteData.canCheckout`)
  - Navigates to `/b2b/quote-checkout?quoteId={quoteId}` on checkout

### User Interaction Flows

1. **Permissions Check**:
   - Verifies user authentication
   - Checks if company functionality is enabled via `checkIsCompanyEnabled()`
   - Verifies user has a company via `getCompany()`
   - Redirects if any check fails

2. **List View Flow**:
   - Fetches and displays all quotes
   - Users can view, filter, and paginate quotes
   - Clicking "View" on a quote navigates to manage view with `quoteId` parameter

3. **Manage View Flow**:
   - Displays quote details and quoted items
   - Shows checkout button if quote can be checked out
   - Allows navigation to quote checkout page

### Error Handling

- **Authentication Errors**: Redirects to login page
- **Company Not Enabled**: Redirects to customer account page
- **User Without Company**: Redirects to customer account page
- **Quote Data Load Errors**: Displays inline error alert with error message
- **Container Errors**: If containers fail to render, the section remains empty
- **Fallback Behavior**: Permission checks occur before rendering any content
