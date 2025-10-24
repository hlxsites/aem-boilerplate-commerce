<!-- ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** -->
# Commerce Company Credit Block

## Overview

The Commerce Company Credit block renders a company credit display using the @dropins/storefront-company-management CompanyCreditContainer. It provides functionality for viewing company credit information with authentication protection and company configuration.

## Integration

### Block Configuration

The block can be configured with the following options via `readBlockConfig()`:

- **show-history** (string, optional, default: 'true'): Controls whether to show company credit transaction history ('true') or only credit summary information ('false')

Example configuration:
```javascript
const config = readBlockConfig(block);
// config = {
//   'show-history': 'false'  // Shows only credit info, no history
// }
```

<!-- ### URL Parameters

No URL parameters affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated and company credit is enabled, renders the company credit management interface
- **Unauthenticated Users**: When user is not authenticated, redirects to the login page
- **Company Credit Disabled**: When company credit functionality is disabled, redirects to the customer account page
- **History Hidden**: When `show-history` is set to 'false', shows only credit information without transaction history
- **Full View**: When `show-history` is 'true' or not set, shows complete credit information with transaction history

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Company Credit Check**: Verifies that company credit functionality is enabled using `checkCompanyCreditEnabled()`
3. **Redirect Flow**: If checks fail, redirects to appropriate page (login or customer account)
4. **Credit Management**: If all checks pass, renders company credit interface with full functionality

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Company Credit Errors**: If company credit functionality is disabled, redirects to customer account page
- **Render Errors**: If the CompanyCreditContainer fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to appropriate redirect pages for authentication/authorization failures
