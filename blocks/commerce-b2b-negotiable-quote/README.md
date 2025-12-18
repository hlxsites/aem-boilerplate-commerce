# Commerce B2B Negotiable Quote Block

## Overview

The Commerce B2B Negotiable Quote block provides two views for managing negotiable quotes for authenticated B2B customers:

1. **List View**: Displays all quotes using the `QuotesListTable` container
2. **Manage View**: Displays individual quote details using the `ManageNegotiableQuote` container with custom slots for checkout button and shipping address selection

It follows the `commerce-b2b-*` naming convention and initializes required drop-ins at the block level. This block requires company management functionality to be enabled and the user to be associated with a company.

## Integration

### Dependencies

- `@dropins/storefront-quote-management` - Quote management containers, renderer, and API
- `@dropins/storefront-account` - Account containers (Addresses) and renderer
- `@dropins/storefront-company-management` - Company permission checks
- `@dropins/tools/lib.js` - Form utilities
- `@dropins/tools/event-bus.js` - Event handling
- `@dropins/tools/components.js` - UI components (InLineAlert, Button, ProgressSpinner)
- `../../scripts/initializers/quote-management.js` - Quote management initialization
- `../../scripts/initializers/company.js` - Company management initialization
- `../../scripts/initializers/account.js` - Account initialization
- `../../scripts/commerce.js` - Authentication and utility functions

### Block Configuration

This block currently does not support configuration through block metadata. All settings are hardcoded in the implementation:

| Setting              | Type    | Value  | Description                   |
| -------------------- | ------- | ------ | ----------------------------- |
| `showItemRange`      | boolean | `true` | Shows the item range text     |
| `showPageSizePicker` | boolean | `true` | Shows the page size picker    |
| `showPagination`     | boolean | `true` | Shows the pagination controls |

### URL Parameters

| Parameter | Type   | Description                                                    | Required |
| --------- | ------ | -------------------------------------------------------------- | -------- |
| `quoteid` | string | Switches from list view to manage view for the specified quote | No       |

**Note**: The parameter name is lowercase `quoteid` in the URL query string.

### Local Storage

No localStorage keys are used by this block.

### Events

#### Event Listeners

- `quote-management/quote-data/error` – Renders an error alert when quote data fails to load
- `quote-management/negotiable-quote-deleted` – Navigates back to quotes list after a quote is deleted (2-second delay)
- `quote-management/quote-duplicated` – Navigates to the newly duplicated quote (2-second delay)
- `quote-management/quote-items-removed` – Disables the checkout button when quote items are removed
- `quote-management/quantities-updated` – Disables the checkout button when item quantities are updated
- `quote-management/shipping-address-set` – Disables the checkout button when shipping address is set
- `quote-management/negotiable-quote-closed` - Disables the checkout button when the quote is closed
- `companyContext/changed` – Removes `quoteid` from URL and reloads the page to show list view when company context changes

**Note**: Delete and duplicate listeners are automatically cleaned up using a MutationObserver when the block is removed from the DOM.

#### Event Emitters

This block does not directly emit events but uses containers that may emit events through the quote management and account drop-ins.

## Behavior Patterns

### Page Context Detection

- **Authenticated Users with Company**: Renders the quotes list or manage view based on URL parameters
- **Unauthenticated Users**: Redirects to the customer login page
- **Company Not Enabled**: Shows warning banner with message "B2B company functionality is not enabled for your account. Please contact your administrator for access."
- **User Without Company**: Shows warning banner with message "You need to be associated with a company to access quote management. Please contact your administrator."

### View Switching

The block renders different views based on the presence of the `quoteid` URL parameter:

- **List View** (`data-quote-view="list"`): No `quoteid` parameter

  - Renders `QuotesListTable` container
  - Displays all quotes with pagination
  - "View" action adds `quoteid` to URL to switch to manage view

- **Manage View** (`data-quote-view="manage"`): When `quoteid` is present
  - Renders `ManageNegotiableQuote` container with custom slots:
    - **Footer slot**: Renders checkout button container and button (enabled based on `quoteData.canCheckout`)
      - Button text comes from placeholders (`Cart.PriceSummary.checkout`)
      - Button disabled state managed dynamically based on quote state and events
    - **ShippingInformation slot**: Renders shipping address selection when `quoteData.canSendForReview` is true
      - Includes progress spinner container (hidden by default)
      - Renders `Addresses` container with shipping selection enabled
      - Handles both existing address selection and new address creation
  - Navigates to `/b2b/quote-checkout?quoteId={quoteid}` on checkout
  - Sets up event listeners for delete and duplicate operations with automatic cleanup via MutationObserver

### Shipping Address Selection

When a quote can be sent for review (`quoteData.canSendForReview === true`), the manage view displays:

- **Existing Addresses**: Renders the `Addresses` container from `@dropins/storefront-account` in selectable mode

  - Users can select from their saved addresses
  - On address selection, calls `setShippingAddress` API with the address UID
  - Shows a progress spinner during the address update

- **New Address Form**: Users can add a new shipping address
  - Form includes: firstName, lastName, company, street, city, region, postcode, countryCode, telephone, vatId
  - On submit, calls `setShippingAddress` API with the new address data
  - Optionally saves the address to the address book
  - Shows a progress spinner during the address save operation

### User Interaction Flows

1. **Permissions Check**:

   - Verifies user authentication (redirects to login if not authenticated)
   - Checks if company functionality is enabled via `companyEnabled()`
   - Verifies user has a company via `getCompany()`
   - Shows warning banner with appropriate message if company checks fail (instead of redirecting)

2. **List View Flow**:

   - Fetches and displays all quotes
   - Users can view, filter, and paginate quotes
   - Clicking "View" on a quote navigates to manage view with `quoteid` parameter

3. **Manage View Flow**:

   - Displays quote details and quoted items
   - If `quoteData.canSendForReview` is true:
     - Shows shipping address selection
     - Users can select existing address or add new address
     - Address updates trigger `setShippingAddress` API call
     - Shows progress spinner during address operations
   - Shows checkout button in Footer slot if `quoteData.canCheckout` is true
   - Checkout button navigates to `/b2b/quote-checkout?quoteId={quoteid}`
   - Checkout button is initially disabled and enabled based on `quoteData.canCheckout`
   - Checkout button is disabled when quote items are removed, quantities updated, or shipping address is set
   - Quote deletion redirects to list view after 2 seconds (removes `quoteid` parameter)
   - Quote duplication redirects to the new quote after 2 seconds (updates `quoteid` parameter)

4. **Shipping Address Selection Flow**:
   - Only visible when quote can be sent for review (`quoteData.canSendForReview === true`)
   - Renders `Addresses` container in ShippingInformation slot with:
     - `minifiedView: false`
     - `withActionsInMinifiedView: false`
     - `selectable: true`
     - `selectShipping: true`
     - `defaultSelectAddressId: 0`
   - **Option 1 - Select Existing Address** (`onAddressData` callback):
     - User selects saved address from list
     - System validates address data (`isDataValid`)
     - Extracts address UID from selected address
     - Calls `setShippingAddress({ quoteUid, addressId: addressUid })`
     - Shows progress spinner during update (hides address selection UI)
     - Restores UI visibility after operation completes
   - **Option 2 - Add New Address** (`onSubmit` callback):
     - User fills out address form
     - Form validation occurs before submission (`formValid` check)
     - Street addresses combined into array from fields starting with 'street'
     - Region code and ID extracted from region field (format: "regionCode,regionId")
     - VAT ID passed as additional input in `additionalAddressInput`
     - First creates customer address via `createCustomerAddress()` API
     - Then calls `setShippingAddress({ quoteUid, addressData: { ...addressInput, additionalInput } })`
     - Shows progress spinner during save (hides address selection UI)
     - Restores UI visibility after operation completes

### Error Handling

- **Authentication Errors**: Redirects to login page immediately if user is not authenticated
- **Company Not Enabled**: Shows warning banner with message instead of redirecting
- **User Without Company**: Shows warning banner with message (catches error from `getCompany()` API call)
- **Quote Data Load Errors**: Displays inline error alert with error message via `quote-management/quote-data/error` event
- **Shipping Address Errors**: Handled by `setShippingAddress` API with `.finally()` block to hide spinner and restore UI visibility regardless of success or failure
- **Address Form Validation**: Invalid forms prevent submission and do not trigger API calls (`formValid` check)
- **Container Errors**: If containers fail to render, the section remains empty
- **Fallback Behavior**: Permission checks occur before rendering any content; shows warning banner instead of redirecting for company-related issues
- **Event Listener Cleanup**: MutationObserver monitors DOM and automatically cleans up delete/duplicate event listeners when block is removed from the DOM

### API Calls

- **`setShippingAddress`**: Updates the shipping address for a quote

  - With existing address: `{ quoteUid, addressId: addressUid }`
  - With new address: `{ quoteUid, addressData: { ...addressInput, additionalInput: { vat_id } } }`
  - Returns a promise that resolves when address is updated
  - Used in both address selection and new address creation flows
  - Shows/hides progress spinner and address selection UI during operations

- **`createCustomerAddress`**: Creates a new customer address (used before setting shipping address for new addresses)
  - Accepts full address input including: city, company, countryCode, defaultBilling, defaultShipping, fax, firstname, lastname, middlename, postcode, prefix, region (with regionCode and regionId), street (array), suffix, telephone, vatId
  - Called before `setShippingAddress` when user submits a new address form
