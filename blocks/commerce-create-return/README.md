# Commerce Create Return Block

## Overview

The Commerce Create Return block provides return request functionality for orders using the @dropins/storefront-order CreateReturn container. It handles return creation with product image rendering and success redirection based on authentication status.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses hardcoded configuration values.

### URL Parameters

No URL parameters directly affect this block's behavior.

### Local Storage

No localStorage keys are directly used by this block, but the underlying order containers may use localStorage for order data.

### Events

#### Event Listeners

No direct event listeners are implemented in this block, but the underlying CreateReturn container may listen for order-related events.

#### Event Emitters

No events are emitted by this block, but the underlying order containers may emit return-related events.

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, redirects to customer order details page after successful return
- **Guest Users**: When user is not authenticated, redirects to guest order details page after successful return
- **Return Creation**: Renders return creation form with product images and return reason selection

### User Interaction Flows

1. **Return Form**: Block renders return creation form with product selection and return reason options
2. **Image Rendering**: Displays product images using AEM assets for return reason form and cart summary
3. **Return Submission**: Users can submit return requests with selected products and reasons
4. **Success Redirect**: After successful return creation, redirects to appropriate order details page based on authentication status

### Error Handling

- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **Return Creation Errors**: If return creation fails, the CreateReturn container handles error display
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to appropriate order details page based on authentication status
