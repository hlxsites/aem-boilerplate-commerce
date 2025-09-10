# Commerce Order Status Block

## Overview

The Commerce Order Status block renders order status information using the @dropins/storefront-order OrderStatus container. It provides order status display with return creation functionality and authentication-aware routing.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses hardcoded configuration values and authentication status.

### URL Parameters

No URL parameters directly affect this block's behavior, but the block uses URL search parameters for order references.

### Local Storage

No localStorage keys are directly used by this block, but the underlying order containers may use localStorage for order data.

### Events

#### Event Listeners

No direct event listeners are implemented in this block, but the underlying OrderStatus container may listen for order-related events.

#### Event Emitters

No events are emitted by this block, but the underlying order containers may emit order status events.

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, uses customer create return path and order number for routing
- **Guest Users**: When user is not authenticated, uses guest create return path and token for routing
- **Order Status**: Displays current order status and available actions

### User Interaction Flows

1. **Initialization**: Block checks authentication status and sets appropriate routing paths
2. **Status Display**: Renders order status information and available actions
3. **Return Creation**: Users can create returns with appropriate authentication routing
4. **Success Navigation**: After successful actions, redirects to cart page

### Error Handling

- **Authentication Errors**: If authentication status is unclear, falls back to guest routing
- **URL Parameter Errors**: If order references are missing, uses fallback values
- **Container Errors**: If the OrderStatus container fails to render, the block content remains empty
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to appropriate routing based on authentication status
