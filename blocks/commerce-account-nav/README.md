# Commerce Account Navigation Block

## Overview

The Commerce Account Navigation block renders a navigation menu for customer account pages. It processes tabular data to create multiple navigation items with icons, titles, descriptions, and permission-based visibility. Each item includes active state detection and a collapsible menu toggle. The block integrates with the event bus to check user role permissions event emitted by auth dropin for dynamic access control, including special handling for company administrators.

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
- **Permission**: From the permission column (controls visibility, supports multiple permissions separated by newlines)

### Permission System

The block uses the event bus to retrieve user permissions via `'auth/permissions'` event (emitted by auth dropin). The permission system supports multiple permissions per navigation item.

#### Permission Logic

The block implements a flexible permission system with multiple permission support:

1. **Admin Access**: If user has `admin: true` permission, they can access all navigation items regardless of specific permissions
2. **Multiple Permissions**: Each navigation item can specify multiple required permissions (newline-separated). The user needs ANY ONE of these permissions to access the item
3. **Default Permission**: If no specific permission is defined for an item, it defaults to "all" (accessible to everyone)

**Permission Check Flow:**

```javascript
// Parse multiple permissions from newline-separated text
const permissionText = "..."; // e.g., "permission1\npermission2"
const permissions = permissionText.split("\n").map((p) => p.trim());

// Show item if user is admin OR has ANY of the required permissions
const allowed =
  userPermissions.admin || permissions.some((p) => userPermissions[p]);
```

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
2. **Permission Retrieval**: Retrieves user permissions from auth event bus via `events.lastPayload('auth/permissions')`
3. **Permission Filtering**: Each item checks its permission requirements:
   - Shows item if user has `admin` permission (overrides all other checks)
   - Parses multiple permissions from newline-separated text in permission column
   - Shows item if user has ANY of the specified permissions
   - Default permission is 'all' (granted to all users)
4. **Navigation Item Creation**: For each permitted item, creates a clickable link with:
   - Icon (24px size, only rendered if icon is provided)
   - Title text from link element
   - Description text from second paragraph
   - Active state detection based on URL pathname matching
5. **Navigation**: Clicking any navigation item navigates to the extracted link URL

### Error Handling

- **Missing Column Headers**: Uses `Math.max(0, indexOf() + 1)` to prevent invalid column indexes
- **Missing Content Elements**: Provides empty string fallbacks for title and description
- **Missing Permissions**: If permissions payload is unavailable from event bus, may cause runtime errors when checking permissions
- **Permission Processing**: Handles empty or malformed permission text gracefully with default 'all' fallback
