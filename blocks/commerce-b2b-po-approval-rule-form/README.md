# Commerce B2B PO Approval Rule Form Block

## Overview

The Commerce B2B PO Approval Rule Form block renders a form for editing purchase order approval rules using the @dropins/storefront-purchase-order ApprovalRuleForm container. It provides rule editing capabilities with authentication protection, permission-based access control, and navigation for saving or canceling changes.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description                                 | Required | Side Effects |
| ----------------- | ---- | ------- | ------------------------------------------- | -------- | ------------ |
| –                 | –    | –       | This block has no authorable configuration. | –        | –            |

### URL Parameters

| Parameter | Type   | Description                                     | Required | Side Effects                                           |
| --------- | ------ | ----------------------------------------------- | -------- | ------------------------------------------------------ |
| `ruleRef` | string | The unique identifier for the approval rule to edit | Yes      | Missing parameter redirects to approval rules list page |

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
- **Manage Permission**: When user has `Magento_PurchaseOrderRule::manage_approval_rules` permission (via `PO_PERMISSIONS.MANAGE_RULES` constant), displays rule editing form
- **No Access**: When user lacks required permissions, redirects to account dashboard page
- **Missing Rule ID**: When `ruleRef` URL parameter is missing or empty, redirects to approval rules list page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Permission Check**: If authenticated, checks for admin or manage approval rules permission
4. **Access Redirect**: If lacking permissions, redirects to account dashboard page
5. **Rule ID Validation**: Checks for presence of `ruleRef` URL parameter
6. **Missing ID Redirect**: If `ruleRef` is missing, redirects to approval rules list page at configured `CUSTOMER_PO_RULES_PATH` (`/customer/approval-rules`)
7. **Form Display**: If authorized and valid rule ID exists, renders approval rule editing form
8. **Form Submission**: User can edit and save changes to the approval rule
9. **List Navigation**: Provides route to return to approval rules list at configured `CUSTOMER_PO_RULES_PATH` (triggered on save or cancel)
10. **Permission Updates**: Listens for permission changes and re-renders accordingly
11. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Permission Errors**: If user lacks required permissions, redirects to account dashboard page
- **Missing Rule ID**: If `ruleRef` parameter is missing or empty, redirects to approval rules list page
- **Container Errors**: If the ApprovalRuleForm container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, account dashboard redirect if no access, or approval rules list redirect if no rule ID
