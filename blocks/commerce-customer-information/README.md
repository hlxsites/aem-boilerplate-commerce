# Commerce Customer Information Block

## Overview

The Commerce Customer Information block provides customer information management functionality using the @dropins/storefront-account CustomerInformation container. It requires user authentication and redirects unauthenticated users to the login page.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses default configuration for the CustomerInformation container.

### URL Parameters

No URL parameters directly affect this block's behavior.

### Local Storage

No localStorage keys are directly used by this block, but the underlying account containers may use localStorage for customer data.

### Events

#### Event Listeners

No direct event listeners are implemented in this block, but the underlying CustomerInformation container may listen for account-related events.

#### Event Emitters

No events are emitted by this block, but the underlying account containers may emit customer information events.

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, renders customer information management interface
- **Unauthenticated Users**: When user is not authenticated, redirects to login page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Information Management**: If authenticated, renders customer information management interface
4. **Data Updates**: Users can view and update their customer information

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Container Errors**: If the CustomerInformation container fails to render, the block content remains empty
- **Data Errors**: If customer data is missing or invalid, the container handles appropriate fallback display
- **Configuration Errors**: No configuration errors possible as block uses default configuration
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated
