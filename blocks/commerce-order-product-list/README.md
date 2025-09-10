# Commerce Order Product List Block

## Overview

The Commerce Order Product List block renders a list of products from an order using the @dropins/storefront-order OrderProductList container. It provides product display with image rendering, gift options, and product detail navigation.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses default configuration for the OrderProductList container.

### URL Parameters

No URL parameters directly affect this block's behavior.

### Local Storage

No localStorage keys are directly used by this block, but the underlying order containers may use localStorage for order data.

### Events

#### Event Listeners

No direct event listeners are implemented in this block, but the underlying OrderProductList container may listen for order-related events.

#### Event Emitters

No events are emitted by this block, but the underlying order containers may emit order product events.

## Behavior Patterns

### Page Context Detection

- **Order Context**: When used in order-related pages, displays products from order data
- **All Contexts**: Consistently renders product list regardless of page context

### User Interaction Flows

1. **Initialization**: Block initializes the order renderer and renders the OrderProductList container
2. **Product Display**: Displays order products with images, names, and details
3. **Image Rendering**: Renders product images using AEM assets with product detail links
4. **Gift Options**: Shows gift options for each product item
5. **Product Navigation**: Users can click on product images to view product details

### Error Handling

- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **Container Errors**: If the OrderProductList container fails to render, the block content remains empty
- **Data Errors**: If order product data is missing or invalid, the container handles appropriate fallback display
- **Configuration Errors**: No configuration errors possible as block uses default configuration
- **Fallback Behavior**: Always falls back to empty display if container rendering fails
