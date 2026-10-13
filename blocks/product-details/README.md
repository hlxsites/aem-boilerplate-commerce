# Product Details Block

## Overview

The Product Details block provides comprehensive product detail page functionality using multiple @dropins/storefront-pdp containers. It handles product display, configuration, cart operations, wishlist integration, and SEO optimization with dynamic mode switching between add and update operations.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses dynamic product data and URL parameters. -->

### URL Parameters

- `itemUid` - Item UID for cart update mode (when present, enables update mode instead of add mode)
- `optionsUIDs` - Product option UIDs for wishlist context (empty string treated as base product with no options)

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('pdp/data', callback)` - Listens for product/variant data changes to track stock status (`inStock`) and gate add to cart and express payment buttons when out of stock
- `events.on('pdp/valid', callback)` - Listens for product configuration validity changes to enable/disable add to cart and express payment buttons
- `events.on('pdp/values', callback)` - Listens for product option value changes to update wishlist context
- `events.on('wishlist/alert', callback)` - Listens for wishlist action alerts to show notifications
- `events.on('cart/data', callback)` - Listens for cart data changes to determine update mode
- `events.on('aem/lcp', callback)` - Listens for AEM LCP event to set JSON-LD and meta tags
- `events.on('payment-services/initialized/product-detail', callback)` - Shows available Apple Pay, Google Pay, and PayPal buttons
- `events.on('order/placed', callback)` - Displays checkout success and updates the URL after an express payment order

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Add Mode**: When no itemUid in URL, operates in add-to-cart mode
- **Update Mode**: When itemUid in URL, operates in update-cart mode with different button text and behavior
- **Product Configuration**: Validates product options and enables/disables add to cart button accordingly
- **Stock Status**: Disables the add to cart button when the current product or refined variant is out of stock. Stock gating is layered on top of configuration validity, so the button is disabled if either signal indicates the product cannot be added.
- **Wishlist Context**: Updates wishlist context based on current product configuration

### User Interaction Flows

1. **Initialization**: Block renders product gallery, header, price, options, quantity, and action buttons
2. **Product Configuration**: Users can select product options with real-time validation
3. **Add to Cart**: Users can add products to cart or update existing cart items
4. **Wishlist Management**: Users can add/remove products from wishlist
5. **Image Gallery**: Users can view product images in desktop thumbnail or mobile carousel format
6. **SEO Optimization**: Sets JSON-LD structured data and meta tags for search engines

### Express Payments

Apple Pay, Google Pay, and PayPal buttons render in the full-width payment area below the cart and wishlist buttons. Each remains hidden until Payment Services reports it available for `PaymentLocation.PRODUCT_DETAIL`, and is disabled for out-of-stock products or invalid configurations.

Google Pay and PayPal use the Payment Services drop-in's PDP shadow-cart flow, which reads `pdp/data` and `pdp/values` without modifying the shopper's existing cart. In Payment Services `5.0.0-beta4`, simple products use SKU and quantity, configurable products use variant SKU, parent SKU, and quantity, and bundles also forward selected and entered options. Non-bundle entered options, including gift-card fields, are not forwarded by this flow. On success, the block calls `orderApi.placeOrder(cartId)` and displays checkout success. Payment errors appear as dismissible, localized alerts.

### Error Handling

- **Configuration Errors**: If product configuration is invalid, disables add to cart button
- **API Errors**: If cart operations fail, shows error alerts with dismiss functionality
- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **JSON-LD Errors**: If structured data generation fails, falls back to basic meta tags
- **Fallback Behavior**: Always falls back to appropriate mode based on URL parameters and cart state
