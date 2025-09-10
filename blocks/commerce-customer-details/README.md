# Commerce Customer Details Block

## Overview

The Commerce Customer Details block renders customer information display using the @dropins/storefront-order CustomerDetails container. It provides a simple wrapper for displaying customer details in order-related contexts.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses default configuration for the CustomerDetails container.

### URL Parameters

No URL parameters directly affect this block's behavior.

### Local Storage

No localStorage keys are directly used by this block, but the underlying order containers may use localStorage for order data.

### Events

#### Event Listeners

No direct event listeners are implemented in this block, but the underlying CustomerDetails container may listen for order-related events.

#### Event Emitters

No events are emitted by this block, but the underlying order containers may emit customer-related events.

## Behavior Patterns

### Page Context Detection

- **Order Context**: When used in order-related pages, displays customer details from order data
- **All Contexts**: Consistently renders customer details regardless of page context

### User Interaction Flows

1. **Initialization**: Block initializes the order renderer and renders the CustomerDetails container
2. **Data Display**: Displays customer information based on available order data
3. **Read-Only View**: Provides read-only display of customer details

### Error Handling

- **Container Errors**: If the CustomerDetails container fails to render, the block content remains empty
- **Data Errors**: If customer data is missing or invalid, the container handles appropriate fallback display
- **Configuration Errors**: No configuration errors possible as block uses default configuration
- **Fallback Behavior**: Always falls back to empty display if container rendering fails
