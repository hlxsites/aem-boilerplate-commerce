# Commerce B2B PO Approval Rules List Block

## Overview

The Commerce B2B PO Approval Rules List block renders a list of purchase order approval rules using the @dropins/storefront-purchase-order PurchaseOrderApprovalRulesList container. It provides approval rule management with authentication protection, permission-based access control, and configurable navigation routes for creating, editing, and viewing rule details.

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
- **Admin Users**: When user has admin permissions, displays approval rules list
- **View Permission**: When user has `Magento_PurchaseOrderRule::view_approval_rules` permission, displays approval rules
- **No Access**: When user lacks required permissions, hides the entire block

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Permission Check**: If authenticated, checks for admin or view approval rules permission
4. **Block Visibility**: Shows or hides the entire block container based on permission check
5. **Rules Display**: If authorized, renders approval rules list with navigation capabilities
6. **Create Rule Navigation**: Provides route to create new approval rules at `/customer/approval-rule`
7. **Edit Rule Navigation**: Provides route to edit existing rules at `/customer/approval-rule?ruleRef={ruleRef}`
8. **Rule Details Navigation**: Provides route to view rule details at `/customer/approval-rule-details`
9. **Permission Updates**: Listens for permission changes and re-renders accordingly
10. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Permission Errors**: If user lacks required permissions, hides block and clears content
- **Container Errors**: If the PurchaseOrderApprovalRulesList container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or hides block if no access
