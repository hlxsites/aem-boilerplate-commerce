# Commerce B2B Quick Order Block

## Overview

The Commerce B2B Quick Order block renders a comprehensive interface for bulk product ordering using the @dropins/storefront-quick-order containers. It provides multiple input methods for adding products to cart, including manual search and selection, multiple SKU entry, and CSV file upload, along with real-time product pricing, configurable options, and batch cart operations.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description                                 | Required | Side Effects |
| ----------------- | ---- | ------- | ------------------------------------------- | -------- | ------------ |
| –                 | –    | –       | This block has no authorable configuration. | –        | –            |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

| Event Name | Payload | Description                          | Side Effects |
| ---------- | ------- | ------------------------------------ | ------------ |
| –          | –       | This block does not listen to events | –            |

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **All Users**: Block is accessible to all users without authentication requirements
- **Product Visibility**: Only displays products marked with visibility "Search" or "Catalog, Search"
- **Category Filtering**: Filters products based on categoryPath attribute (empty string for all categories)

### User Interaction Flows

#### Product Selection via Quick Order Items

1. **Initial Display**: Block renders with a "Quick Order" header and three main sections
2. **Product Search**: User can search for products using autocomplete search functionality
3. **Search Results**: System displays matching products filtered by visibility settings
4. **Product Display**: Each product shows:
   - Product name and SKU
   - Real-time pricing via ProductPrice slot
   - Configurable options via ProductOptions slot (if applicable)
   - Quantity input field
5. **Option Configuration**: For configurable products, user selects required options before adding
6. **Quantity Entry**: User specifies quantity for each product
7. **Add to List**: User adds products to the quick order list
8. **Review Items**: User reviews all selected products with quantities and configurations
9. **Add to Cart**: User clicks action button to add all items to cart
10. **Cart Redirect**: On success, system redirects to cart page
11. **Error Handling**: On failure, system displays error notification with retry option

#### Multiple SKU Entry

1. **Multiple SKU Interface**: User accesses the QuickOrderMultipleSku container in right sidebar
2. **SKU Input**: User enters multiple SKUs (one per line or comma-separated)
3. **SKU Processing**: System processes SKUs and adds matching products to quick order list
4. **Validation**: System validates each SKU and reports any invalid entries
5. **Add to List**: Valid products are added to the main quick order items list
6. **Batch Processing**: User can add all items to cart via the main action button

#### CSV Upload

1. **CSV Upload Interface**: User accesses the QuickOrderCsvUpload container in right sidebar
2. **File Selection**: User selects a CSV file containing product data
3. **CSV Format**: Expected format includes SKU and quantity columns
4. **File Processing**: System parses CSV and validates product SKUs
5. **Import Results**: System displays import results with successful and failed entries
6. **Add to List**: Valid products from CSV are added to the main quick order items list
7. **Error Reporting**: System reports any invalid SKUs or formatting errors
8. **Batch Processing**: User can add all imported items to cart via the main action button

#### Cart Operations

1. **Add to Cart Execution**: When user initiates add to cart action
2. **Validation Check**: System validates all items have required configurations
3. **Batch API Call**: System executes `addProductsToCart` API call with all items
4. **Loading State**: System shows loading indicator during API call
5. **Success Flow**: On success, redirects to `/cart` page
6. **Error Flow**: On failure, displays error notification:
   - Specific error message if available
   - Generic "Failed to add products to cart" if no message provided
7. **Retry Option**: User can retry the operation after addressing errors

### Error Handling

- **Product Search Errors**: If product search fails, displays empty results state
- **Invalid SKU Errors**: If SKU is not found, displays "Product not found" message
- **Configuration Errors**: If required product options are not selected, prevents add to cart
- **CSV Format Errors**: If CSV file format is invalid, displays format validation errors
- **Add to Cart Errors**: If cart operation fails, displays error notification with message
- **API Errors**: If any API call fails, displays user-friendly error message with retry option
- **Empty Cart Errors**: If no items are added to quick order list, prevents cart operation
- **Container Errors**: If any dropin container fails to render, the respective section remains empty
- **Fallback Behavior**: Always provides user feedback for errors and clear recovery paths
