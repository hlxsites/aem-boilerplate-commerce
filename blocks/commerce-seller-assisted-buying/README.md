# Commerce Seller Assisted Buying Block

## Overview

The Commerce Seller Assisted Buying block renders the seller assisted purchasing interface using the @dropins/storefront-account SellerAssistedPurchasing container. It enables administrators to initiate and manage customer sessions for assisted shopping experiences.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Admin Context**: When used by administrators, provides interface to initiate customer sessions
- **Account Context**: Integrates with the account dropin system for authentication and session management
- **All Contexts**: Consistently renders seller assisted purchasing controls regardless of page context

### User Interaction Flows

1. **Initialization**: Block initializes the account renderer and renders the SellerAssistedPurchasing container
2. **Session Management**: Provides interface for administrators to start assisted buying sessions with customers
3. **Customer Selection**: Allows selection of customer accounts to initiate assisted sessions
4. **Session Activation**: Establishes authenticated session on behalf of selected customer

### Error Handling

- **Container Errors**: If the SellerAssistedPurchasing container fails to render, the block content remains empty
- **Configuration Errors**: No configuration errors possible as block uses default configuration
- **Authentication Errors**: Container handles authentication and permission errors internally
- **Fallback Behavior**: Always falls back to empty display if container rendering fails
