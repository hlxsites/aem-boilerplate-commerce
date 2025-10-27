# Commerce Company Accept Invitation Block

## Overview

The Commerce Company Accept Invitation block handles the acceptance of company invitations sent via email. It uses the @dropins/storefront-company-management AcceptInvitation container to automatically process invitation links and display the result.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

### URL Parameters

The AcceptInvitation container automatically parses the following URL parameters from the invitation email link:

- `code` (required): The invitation verification code
- `customer[customer_id]` (required): The customer ID (plain integer, base64-encoded before sending to GraphQL)
- `customer[company_id]` (required): The company ID (plain integer, base64-encoded before sending to GraphQL)
- `customer[job_title]` (optional): The job title for the company user
- `customer[telephone]` (optional): The telephone number
- `customer[status]` (optional): The user status (1 for ACTIVE, 0 for INACTIVE)

Example URL:
```
/company/customer/acceptinvitation/?code=abc123&customer[customer_id]=91&customer[company_id]=44&customer[job_title]=Manager&customer[telephone]=555-0123&customer[status]=1
```

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Company Disabled**: When B2B company features are not enabled, displays error message
- **Valid Invitation**: When all required URL parameters are present, processes the invitation automatically
- **Invalid Link**: When required parameters are missing, displays error message
- **Processing State**: Shows loading state while API call is in progress

### User Interaction Flows

1. **Company Check**: Container first verifies that B2B company features are enabled using `companyEnabled()` API
2. **URL Validation**: Container validates that required URL parameters (code, customer_id, company_id) are present
3. **Loading State**: Displays "Processing your invitation..." message with loader
4. **API Call**: Automatically calls `acceptCompanyInvitation` API with parsed and base64-encoded parameters
5. **URL Cleanup**: After successful acceptance, clears URL parameters from address bar
6. **Success Handling**: Shows success message with "My Account" button
7. **Error Handling**: Shows error message with navigation options to login or account pages

### Error Handling

- **Company Disabled**: If B2B features are not enabled, displays "Company features are not enabled" error (no login button shown)
- **Missing Parameters**: If required URL parameters are missing, displays "Invalid invitation link" error
- **API Errors**: If API call fails, displays "An error occurred while processing your invitation" message
- **Expired/Used Invitations**: If invitation fails validation, displays "Failed to accept the invitation" message
- **Fallback Behavior**: All error states (except company disabled) provide navigation options to login or account pages
