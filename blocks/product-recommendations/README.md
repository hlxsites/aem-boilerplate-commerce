# Product Recommendations Block

## Overview

The Product Recommendations block provides personalized product recommendations using the @dropins/storefront-recommendations ProductList container. It handles recommendation loading with intersection observer, context tracking, and dynamic reloading based on user behavior and page changes.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `recid` | string | — | Recommendation unit ID to render. | **Yes** | Identifies which recommendation unit to fetch |
| `currentsku` | string | undefined | Current product SKU. Only set this on pages where ACDL `productContext` is not populated. For cross-sell and upsell recommendation types (`viewed-viewed`, `viewed-bought`, `bought-bought`, `more-like-this`, `visual`) this value (from config or ACDL) is required for the unit to return results. | No | Takes precedence over ACDL-derived SKU; if set without `currentprice`, no price is passed to the service |
| `currentprice` | number | undefined | Current product price as an anchor for dynamic/relative price filter operators. **May only be set together with `currentsku`.** Only needed for SKU-related recommendation types with dynamic or relative price filters when ACDL product context is unavailable. The value should match the effective price shown to the shopper (`specialPrice ?? regularPrice`). | No | Takes precedence over ACDL-derived price; has no effect if `currentsku` is not also set |

### Consent

Recommendation requests remain available without consent. Upstream consent values (`accept`, `true`, `1`, `yes`; case-insensitive) produce a `consent.update` notification. Until an accepted notification, requests omit viewing history, purchase history, cart SKUs, and shopper-derived pricing. Explicitly authored `currentsku`/`currentprice` remain available without consent.
The block updates its existing ProductList after acceptance rather than awaiting the event during decoration. Late-added blocks read the latest decision captured in Commerce memory. The upstream script remains unchanged; no preference is persisted and no CMP/revocation framework is supplied.

### Local Storage

- `{storeViewCode|catalogViewId}:productViewHistory` - Stores user's product view history for recommendation context
- `{storeViewCode|catalogViewId}:purchaseHistory` - Stores user's purchase history for recommendation context

History recording is local and independent of consent. `getProductViewHistory()`
and `getPurchaseHistory()` return undefined before acceptance without reading
localStorage, so their inputs are omitted. The initializer retains its original
shared Catalog Service endpoint and header configuration.

### Events

#### Event Listeners

- Adobe Data Layer (`adobeDataLayer:change`) for `pageContext`, `productContext`, `categoryContext`, and `shoppingCartContext` — triggers recommendation reload on significant changes
- `productContext` changes also extract pricing (`specialPrice ?? regularPrice`); shopper-derived prices are passed in `currentProduct` only with consent
- `consent.update` — refreshes personal request inputs only when the decision changes; repeated denial does not reload the list

#### Event Emitters

- `publishRecsItemAddToCartClick()` — emits recommendation analytics events when items are added to cart

## Behavior Patterns

### Page Context Detection

- **Mobile Devices**: Uses intersection observer to load recommendations when section becomes visible
- **Desktop Devices**: Loads recommendations immediately on page load
- **Context Changes**: Reloads recommendations when significant context changes occur (product, category, page type)
- **Cart Changes**: Updates recommendation context when cart contents change

### User Interaction Flows

1. **Initialization**: Block sets up recommendation context and loads initial recommendations
2. **Lazy Loading**: On mobile, recommendations load when section becomes visible
3. **Context Tracking**: Monitors page, product, category, and cart changes to update recommendations
4. **Product Actions**: Users can add products to cart or navigate to product details
5. **Wishlist Integration**: Users can add/remove products from wishlist
6. **Dynamic Reloading**: Recommendations reload when significant context changes occur

### Error Handling

- **Context Errors**: If context data is invalid, falls back to empty arrays for view/purchase history
- **API Errors**: If recommendation API fails, the ProductList container handles error display
- **Configuration Errors**: If `readBlockConfig()` fails, uses undefined values for configuration
- **Missing SKU**: If the recommendation type requires a current SKU but none is available (neither from block config nor from ACDL), an error is logged to the browser console
- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **Fallback Behavior**: Always falls back to appropriate default values for missing or invalid configuration
