# Commerce Account Navigation Block

## Overview

The Commerce Account Navigation block renders a navigation menu for customer account pages. It processes tabular data to create multiple navigation items with icons, titles, descriptions, and permission-based visibility. Each item includes active state detection and chevron indicators. The block integrates with GraphQL to fetch user role permissions for dynamic access control.

## Integration

### HTML Structure

The block expects a tabular structure with a header row defining column names and data rows:

```html
<div>
  <div>
    <div><strong>label</strong></div>
    <div><strong>icon</strong></div>
    <div><strong>permission</strong></div>
  </div>
  <div>
    <div>
      <p><strong><a href="/customer/account">My account</a></strong></p>
      <p>Account details</p>
    </div>
    <div>User</div>
    <div>all</div>
  </div>
  <!-- Additional rows... -->
</div>
```

The block processes:
- **Header Row**: Defines column structure (label, icon, permission)
- **Data Rows**: Each row creates a navigation item
- **Title**: From the `<a>` element within the label column
- **Link**: From the `href` attribute of the `<a>` element
- **Description**: From the second `<p>` element in the label column
- **Icon**: From the icon column
- **Permission**: From the permission column (controls visibility)

### GraphQL Integration

The block fetches user role permissions using the `GET_CUSTOMER_ROLE_PERMISSIONS` query to determine which navigation items should be visible. The permissions are flattened into a simple object structure:

```javascript
const permissions = {
  all: true, // Default permission
  "permission1": true,
  "permission2": true,
  // ... additional permissions from GraphQL
};
```

### Caching Strategy

The block implements a **stale-while-revalidate** caching strategy to optimize performance:

- **Session Storage**: Cached permissions are stored in `sessionStorage` under the key `commerce-account-nav-permissions`
- **Single Request**: Only one GraphQL request is made per page load, even if the block is used multiple times
- **Background Revalidation**: When cached data exists, it's returned immediately while a background request updates the cache for the next page load
- **Promise Deduplication**: Uses `window.__fetchingUserPermissions` to ensure all block instances share the same request promise
- **Error Resilience**: Background revalidation failures don't affect the UI since cached data is available

<!-- ### URL Parameters

No URL parameters affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **All Contexts**: The block renders consistently across all page contexts, creating multiple navigation items with permission-based visibility
- **Active State**: Automatically detects and highlights the navigation item that matches the current page URL
- **Permission-Based Rendering**: Only renders navigation items for which the user has the required permissions

### User Interaction Flows

1. **Page Load**: Block initializes, parses header row to determine column structure
2. **Permission Fetching**: 
   - **First Load (No Cache)**: Fetches user role permissions via GraphQL API and caches flattened result
   - **Subsequent Loads (With Cache)**: Returns cached permissions immediately, starts background revalidation
   - **Multiple Blocks**: All instances share the same request promise to prevent duplicate API calls
3. **Permission Processing**: Flattens nested GraphQL permissions into a simple object with `all: true` as default
4. **Permission Filtering**: Each item checks permission column against available permissions (default: 'all' permission granted)
5. **Navigation Item Creation**: For each permitted item, creates a clickable link with:
   - Icon (24px size, with fallback to 'Placeholder' if not found)
   - Title text from link element
   - Description text from second paragraph
   - Chevron right icon (currently commented out)
   - Active state detection based on URL matching
6. **Active State Detection**: Currently uses index-based detection (index === 1), with URL-based detection commented out
7. **Navigation**: Clicking any navigation item navigates to the extracted link URL

### Error Handling

- **Missing Column Headers**: Uses `Math.max(0, indexOf() + 1)` to prevent invalid column indexes
- **Missing Content Elements**: Provides empty string fallbacks for title and description
- **GraphQL API Failures**: 
  - **No Cache Available**: Throws error and blocks rendering
  - **Background Revalidation**: Silently fails, cached data remains available
- **Session Storage Errors**: Gracefully handles private browsing mode and quota exceeded scenarios
- **Missing HTML Elements**: If required HTML elements are not found, the navigation item will render with empty text or broken link
- **Icon Rendering Errors**: If icon rendering fails, the icon container is still created but may display the placeholder
- **Fallback Behavior**: Uses 'Placeholder' as default icon if no icon is found in the HTML structure
- **Permission Processing**: If GraphQL permissions are unavailable, all items are shown (default `all: true` behavior)
