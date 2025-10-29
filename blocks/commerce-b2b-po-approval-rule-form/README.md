# Commerce B2B PO Approval Rule Form Block

## Overview

The Commerce B2B PO Approval Rule Form block renders a form for creating new or editing existing purchase order approval rules using the @dropins/storefront-purchase-order ApprovalRuleForm container. It provides rule creation and editing capabilities with authentication protection, permission-based access control, and navigation for saving or canceling changes.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description                                 | Required | Side Effects |
| ----------------- | ---- | ------- | ------------------------------------------- | -------- | ------------ |
| –                 | –    | –       | This block has no authorable configuration. | –        | –            |

### URL Parameters

| Parameter | Type   | Description                                     | Required | Side Effects                                           |
| --------- | ------ | ----------------------------------------------- | -------- | ------------------------------------------------------ |
| `ruleRef` | string | The unique identifier for the approval rule to edit | No       | When provided, form loads with pre-populated rule details for editing. When omitted, form renders empty for creating a new rule |

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
- **Admin Users**: When user has admin permissions, displays approval rule form
- **Manage Permission**: When user has `Magento_PurchaseOrderRule::manage_approval_rules` permission (via `PO_PERMISSIONS.MANAGE_RULES` constant), displays rule creation/editing form
- **No Access**: When user lacks required permissions, redirects to account dashboard page
- **Edit Mode**: When `ruleRef` URL parameter is provided, form loads with pre-populated rule details for editing
- **Create Mode**: When `ruleRef` URL parameter is omitted or empty, form renders empty for creating a new rule

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Permission Check**: If authenticated, checks for admin or manage approval rules permission
4. **Access Redirect**: If lacking permissions, redirects to account dashboard page
5. **Rule ID Detection**: Checks for presence of `ruleRef` URL parameter to determine form mode
6. **Edit Mode Flow**: If `ruleRef` is provided, form loads with pre-populated rule details for editing existing rule
7. **Create Mode Flow**: If `ruleRef` is omitted or empty, form renders empty for creating a new approval rule
8. **Form Interaction**: User can fill out or modify approval rule details (name, conditions, approvers, etc.)
9. **Form Submission**: User can save changes (creating new rule or updating existing rule)
10. **List Navigation**: Provides route to return to approval rules list at configured `CUSTOMER_PO_RULES_PATH` (`/customer/approval-rules`) (triggered on save or cancel)
11. **Permission Updates**: Listens for permission changes and re-renders accordingly
12. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Permission Errors**: If user lacks required permissions, redirects to account dashboard page
- **Container Errors**: If the ApprovalRuleForm container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or account dashboard redirect if no access
