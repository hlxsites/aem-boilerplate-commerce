# Commerce B2B Require Approval Purchase Orders Block

## Overview

The Commerce B2B Require Approval Purchase Orders block renders a list of purchase orders that require approval using the @dropins/storefront-purchase-order RequireApprovalPurchaseOrders container. It provides purchase order approval management with authentication protection, permission-based access control, and configurable pagination.

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

| Event Name         | Payload                   | Description                                                          | Side Effects                                                                      |
| ------------------ | ------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `auth/permissions` | `permissions` object      | Listens for permission changes to update block visibility and access | Re-renders the block with updated permissions, shows/hides based on access rights |
| `authenticated`    | `isAuthenticated` boolean | Listens for authentication status changes                            | Redirects to login page when user becomes unauthenticated                         |

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, checks permissions before rendering
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **Multi-Level Access Check**: First checks if user has access to any PO containers to prevent premature redirects on multi-block pages
- **Admin Users**: When user has admin permissions, displays purchase orders requiring approval
- **Approval Permission**: When user has `Magento_PurchaseOrder::all` permission (via `PO_PERMISSIONS.PO_ALL` constant), displays purchase orders that require their approval
- **No Access to PO**: When user lacks access to all PO containers, redirects to account dashboard page
- **No Access to Block**: When user lacks access to this specific block but has access to other PO blocks, hides the entire block container

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Global PO Access Check**: Checks if user has access to any PO containers (prevents redirect when other blocks are accessible)
4. **Account Dashboard Redirect**: If lacking all PO access, redirects to account dashboard page
5. **Block-Specific Permission Check**: Checks for admin or general purchase order permissions for this specific block
6. **Block Visibility**: Shows or hides the entire block container based on block-specific permission check (prevents layout issues)
7. **Orders Display**: If authorized, renders purchase orders requiring approval with pagination using centralized `PO_LIST_PAGE_SIZE_OPTIONS`
8. **Permission Updates**: Listens for permission changes and re-renders accordingly
9. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Global Permission Errors**: If user lacks access to all PO containers, redirects to account dashboard page
- **Block Permission Errors**: If user lacks access to this specific block, hides block and clears content to prevent layout issues
- **Container Errors**: If the RequireApprovalPurchaseOrders container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or account dashboard redirect if no PO access, or hides block if no block-specific access
