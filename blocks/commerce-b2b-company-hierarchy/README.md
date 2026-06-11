# Commerce B2B Company Hierarchy

## Overview

The Commerce B2B Company Hierarchy block renders a company hierarchy management interface for B2B customers using the @dropins/storefront-company-management CompanyHierarchy container. It requires user authentication and redirects unauthenticated users to the login page.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The block functionality is controlled by the CompanyHierarchy dropin container and backend permissions.

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, renders the company hierarchy interface
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **Users with Hierarchy Access**: When backend permissions allow access, displays the hierarchy tree
- **Users without Hierarchy Access**: When backend permissions deny access, the container displays a no-access message
- **Empty Hierarchy**: When no company hierarchy data is available, the container displays an empty state

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Hierarchy Loading**: If authenticated, renders the CompanyHierarchy container and loads company hierarchy data
4. **Hierarchy Review**: Users can view parent and child company relationships in a tree interface
5. **Expand and Collapse**: Users can expand or collapse individual branches, or use toolbar actions to expand or collapse all nodes
6. **Hierarchy Reassignment**: Users with appropriate permissions can drag companies to supported hierarchy positions
7. **Admin Badge Display**: Companies where the current user is an administrator are marked with an admin badge

### Data Management

- **Company Hierarchy**: Displays parent and child company relationships returned by the company management API
- **Admin Status**: Shows admin badges based on the `is_admin` value returned for each company
- **Tree State**: The container manages selected and expanded nodes internally
- **Hierarchy Updates**: Drag-and-drop moves are persisted through the company management API and the hierarchy is refreshed after updates
- **Permission-Based Display**: Access and move capabilities are controlled by backend permissions

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Permission Errors**: If user does not have access to company hierarchy, the container displays a no-access message
- **Data Loading Errors**: If hierarchy data fails to load, the container displays an error state
- **Move Errors**: If a hierarchy reassignment fails, the container displays an inline error and reloads hierarchy data
- **Empty State**: If no company hierarchy data is available, the container displays an empty state message
- **Container Errors**: If the CompanyHierarchy container fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated

## Technical Details

### Dependencies

- `@dropins/storefront-company-management` - Company management dropin
- `commerce.js` - Authentication and routing utilities
- `scripts/initializers/company.js` - Company dropin initializer

### CSS Classes

- `.commerce-company-hierarchy-container` - Main container class applied to the block
- Additional classes are provided by the CompanyHierarchy container
