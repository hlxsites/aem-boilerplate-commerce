# Commerce B2B Negotiable Quote Template Block

## Overview

The Commerce B2B Negotiable Quote Template block provides a comprehensive interface for managing quote templates for authenticated B2B customers. It displays a list of quote templates with pagination controls and provides detailed template management including shipping address selection. This block requires company management functionality to be enabled and the user to be associated with a company.

## Integration

### Block Configuration

This block currently does not support configuration through block metadata. All settings are hardcoded in the implementation:

**List View Configuration:**

| Configuration Key    | Type    | Default | Description                            | Required | Side Effects |
|----------------------|---------|---------|----------------------------------------|----------|--------------|
| `pageSize`           | number  | `10`    | Number of items per page               | No       | Sets pagination size |
| `showItemRange`      | boolean | `true`  | Shows the item range text              | No       | Displays item count (e.g., "1-10 of 25") |
| `showPageSizePicker` | boolean | `true`  | Shows the page size picker             | No       | Shows/hides page size dropdown |
| `showPagination`     | boolean | `true`  | Shows the pagination controls          | No       | Shows/hides pagination navigation |

**Details View Configuration:**

| Configuration Key    | Type    | Default | Description                                              | Required | Side Effects |
|----------------------|---------|---------|----------------------------------------------------------|----------|--------------|
| `minifiedView`       | boolean | `false` | Use minified view for address selection                  | No       | Affects address display layout |
| `withActionsInMinifiedView` | boolean | `false` | Show actions in minified address view            | No       | Controls action visibility |
| `selectable`         | boolean | `true`  | Allows address selection                                 | No       | Enables/disables address selection |
| `selectShipping`     | boolean | `true`  | Enable shipping address selection mode                   | No       | Sets selection mode to shipping |
| `defaultSelectAddressId` | number | `0`   | Default selected address ID (0 = none selected)          | No       | Pre-selects an address |

### URL Parameters

| Parameter          | Type   | Description                                                     | Required |
| ------------------ | ------ | --------------------------------------------------------------- | -------- |
| `quoteTemplateId` | string | Switches from list view to details view for specified template  | No       |

### Dependencies

**Dropins:**
- `@dropins/storefront-quote-management` - Quote template management containers, renderer, and API
- `@dropins/storefront-account` - Account containers (Addresses) and renderer
- `@dropins/storefront-company-management` - Company permission checks
- `@dropins/tools/lib.js` - Form utilities (`getFormValues`)
- `@dropins/tools/event-bus.js` - Event handling
- `@dropins/tools/components.js` - UI components (InLineAlert, Icon, ProgressSpinner)
- `@dropins/tools/preact.js` - Preact utilities (`h` function for JSX)
- `../../scripts/initializers/company.js` - Company management initialization
- `../../scripts/initializers/quote-management.js` - Quote management initialization
- `../../scripts/initializers/account.js` - Account initialization
- `../../scripts/commerce.js` - Authentication and utility functions (`checkIsAuthenticated`, `rootLink`, `CUSTOMER_LOGIN_PATH`)

**Containers:**
- `QuoteTemplatesListTable` - Renders the list of quote templates with pagination
- `ManageNegotiableQuoteTemplate` - Renders the quote template details view with management capabilities
- `Addresses` - Renders address selection and creation interface for shipping information

**APIs:**
- `companyEnabled()` - Checks if company functionality is enabled
- `getCompany()` - Retrieves company information for the authenticated user
- `addQuoteTemplateShippingAddress()` - Adds shipping address to a quote template
  - With existing address: `{ templateId, shippingAddress: { customerAddressUid } }`
  - With new address: `{ templateId, shippingAddress: { address: { ...addressInput, additionalInput: { vat_id } }, customerNotes } }`
- `createCustomerAddress()` - Creates a new customer address (used before adding shipping address for new addresses)
  - Accepts full address input including: city, company, countryCode, defaultBilling, defaultShipping, fax, firstname, lastname, middlename, postcode, prefix, region (with regionCode and regionId), street (array), suffix, telephone, vatId
  - Called before `addQuoteTemplateShippingAddress` when user submits a new address form

**UI Components:**
- `InLineAlert` - Displays error messages
- `ProgressSpinner` - Shows loading state during asynchronous operations


## Behavior Patterns

### Page Context Detection

- **Authenticated Users with Company**: Renders the quote templates list or details view based on URL parameters
- **Unauthenticated Users**: Redirects to the customer login page
- **Company Not Enabled**: Shows warning banner with message "B2B company functionality is not enabled for your account. Please contact your administrator for access."
- **User Without Company**: Shows warning banner with message "You need to be associated with a company to access quote template management. Please contact your administrator."

### User Interaction Flows

1. **Permissions Check**: 
   - Verifies user authentication (redirects to login if not authenticated)
   - Checks if company functionality is enabled via `companyEnabled()`
   - Verifies user has a company via `getCompany()`
   - Shows warning banner with appropriate message if company checks fail (instead of redirecting)
   - Prevents content rendering if permissions are not met
2. **List View**: Displays all quote templates with pagination controls, filtering, and page size selection
   - Clicking "View" on a template navigates to details view with `quoteTemplateId` parameter
3. **Details View**: Displays individual quote template details when accessed via `?quoteTemplateId={id}` parameter
   - Shows quote template management interface via `ManageNegotiableQuoteTemplate` container
   - Provides shipping information selection when the template can be sent for review (`templateData.canSendForReview === true`)
   - Allows users to select from existing addresses or create a new shipping address
   - Displays a progress spinner during shipping address operations (hides address selection UI)
   - Restores UI visibility after shipping address operations complete
4. **Quote Generation**: When a quote is generated from a template (from either view), the block redirects to the negotiable quote page after a 2-second delay to allow the success banner to be seen

### Error Handling

- **Authentication Errors**: Redirects to login page immediately if user is not authenticated
- **Company Not Enabled**: Shows warning banner with message instead of redirecting
- **User Without Company**: Shows warning banner with message (catches error from `getCompany()` API call)
- **Permission Check Failures**: Prevent content rendering and show warning banner with appropriate message
- **Quote Data Loading Errors**: Displays an inline error alert when quote data fails to load (via `quote-management/quote-data/error` event)
- **Shipping Address Errors**: Handled by `addQuoteTemplateShippingAddress` API with `.finally()` block to hide spinner and restore UI visibility regardless of success or failure
- **Address Form Validation**: Invalid forms prevent submission and do not trigger API calls (`formValid` check)
- **Container Errors**: If container fails to render, the block remains empty
- **Fallback Behavior**: Permission checks occur before rendering any content; shows warning banner instead of redirecting for company-related issues

### Shipping Address Operations

When viewing quote template details and the template can be sent for review (`templateData.canSendForReview === true`), the block provides shipping information selection:

- **Renders `Addresses` container** in ShippingInformation slot with:
  - `minifiedView: false`
  - `withActionsInMinifiedView: false`
  - `selectable: true`
  - `selectShipping: true`
  - `defaultSelectAddressId: 0`
- **Select Existing Address** (`onAddressData` callback):
  - Users can choose from their saved addresses via the `Addresses` container
  - System validates address data (`isDataValid`)
  - Extracts address UID from selected address
  - Calls `addQuoteTemplateShippingAddress({ templateId, shippingAddress: { customerAddressUid } })`
  - Shows progress spinner during update (hides address selection UI)
  - Restores UI visibility after operation completes
- **Create New Address** (`onSubmit` callback):
  - Users can fill out a form to add a new shipping address
  - Form includes: firstName, lastName, company, street (multiple lines), city, region, postcode, countryCode, telephone, vatId, customerNotes, saveInAddressBook
  - Form validation occurs before submission (`formValid` check)
  - Street addresses combined into array from fields starting with 'street'
  - Region code and ID extracted from region field (format: "regionCode,regionId")
  - VAT ID passed as additional input in `additionalAddressInput`
  - First creates customer address via `createCustomerAddress()` API
  - Then calls `addQuoteTemplateShippingAddress({ templateId, shippingAddress: { address: { ...addressInput, additionalInput }, customerNotes } })`
  - Shows progress spinner during save (hides address selection UI)
  - Restores UI visibility after operation completes
- **Progress Indication**: A progress spinner is displayed while the shipping address is being added (address selection UI is hidden during operations)
- **Asynchronous Updates**: Address operations are handled asynchronously via the `addQuoteTemplateShippingAddress` API

### Event Listeners

The block subscribes to the following events:

| Event Name | Source | Purpose | Handler Action |
|------------|--------|---------|----------------|
| `quote-management/quote-data/error` | Quote Management Dropin | Triggered when quote data fails to load | Displays an inline error alert with the error message |
| `quote-management/quote-template-generated` | Quote Management Dropin | Triggered when a quote is successfully generated from a template | Navigates to the newly created quote on the negotiable quote page after a 2-second delay |

**Note**: The generate quote listener is registered at the block level (applies to both list and details views) and is automatically cleaned up using a MutationObserver when the block is removed from the DOM.

### Slots Implementation

The details view implements custom slots for the `ManageNegotiableQuoteTemplate` container:

**ShippingInformation Slot:**

This slot provides a custom shipping address selection interface that:
- Creates a shipping information container and progress spinner container (hidden by default)
- Monitors template state changes via `onChange` callback
- Only displays when `templateData.canSendForReview` is true
- Clears existing content from shipping information container on each state change
- Renders the `Addresses` container with shipping selection mode enabled
- Handles two address submission workflows:
  1. **Existing Address Selection** (`onAddressData` callback):
     - Receives selected address data and validation status
     - Validates address data (`isDataValid` check)
     - Extracts address UID from selected address
     - Shows progress spinner and hides address selection UI
     - Calls `addQuoteTemplateShippingAddress({ templateId, shippingAddress: { customerAddressUid } })`
     - Restores UI visibility after operation completes (via `.finally()`)
  2. **New Address Creation** (`onSubmit` callback):
     - Receives form event and validation status
     - Validates form data (`formValid` check)
     - Collects form values including street lines (combined into array), region (split into code and ID), VAT ID, and customerNotes
     - Transforms form data into address input format
     - Shows progress spinner and hides address selection UI
     - First calls `createCustomerAddress()` to save address to address book
     - Then calls `addQuoteTemplateShippingAddress({ templateId, shippingAddress: { address: { ...addressInput, additionalInput }, customerNotes } })`
     - Restores UI visibility after operation completes (via `.finally()`)
- Progress spinner shows/hides during API operations
- Address selection UI visibility toggles during operations

### Callback Handlers

**List View:**

| Callback | Parameters | Purpose | Implementation |
|----------|-----------|---------|----------------|
| `onViewQuoteTemplate` | `id` (string) | Navigates to quote template details view | Updates URL with `quoteTemplateId` query parameter |

**Details View - ShippingInformation Slot:**

| Callback | Parameters | Purpose | Implementation |
|----------|-----------|---------|----------------|
| `onAddressData` | `{ data, isDataValid }` | Handles existing address selection | Extracts address UID and calls `addQuoteTemplateShippingAddress` API |
| `onSubmit` | `event, formValid` | Handles new address form submission | Transforms form data and calls `addQuoteTemplateShippingAddress` API |
| `onChange` | `next` (template state) | Monitors template data changes | Updates shipping information UI based on `canSendForReview` status |
