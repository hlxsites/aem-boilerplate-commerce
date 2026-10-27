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

Recommendation requests remain available without consent and can use the current product SKU from block configuration or ACDL for contextual recommendations. The placeholder gate grants consent for query values `accept`, `true`, `1`, and `yes` (case-insensitive) and dispatches a `consent.update` notification. Until an accepted notification, requests omit viewing history, purchase history, cart SKUs, and shopper-derived pricing. Explicitly authored `currentsku`/`currentprice` remain available without consent.

The block updates its existing ProductList after acceptance rather than awaiting the event during decoration. Late-added blocks read the latest decision captured in Commerce memory. No consent preference is persisted and no complete CMP/revocation framework is supplied. Requesting recommendations is separate from analytics event collection: the analytics SDK and collector are not loaded until consent is granted, and only if analytics is configured.

### Local Storage

- `{storeViewCode|catalogViewId}:productViewHistory` - Stores user's product view history for recommendation context
- `{storeViewCode|catalogViewId}:purchaseHistory` - Stores user's purchase history for recommendation context

Custom code in [`scripts/commerce.js`](../../scripts/commerce.js) records these histories from ACDL events, separately from this block and the analytics collector. Our code stores browsing and purchase history locally before consent is granted, but does not include that history in recommendation requests until the shopper grants consent.

Unlike ACDL's in-memory state, `localStorage` persists across page navigations and can survive browser restarts. `getProductViewHistory()` and `getPurchaseHistory()` return undefined before acceptance without reading `localStorage`, so their inputs are omitted from requests. This restriction does not prevent history recording or clear existing history when consent is absent. The initializer retains its original shared Catalog Service endpoint and header configuration.

### CMP and Commerce Cookie Restrictions

Boilerplate's consent gate does not automatically integrate with Adobe Commerce Cookie Restriction Mode or manage the `mg_dnt` cookie. Adobe's [Product Recommendations cookie-restriction documentation](https://experienceleague.adobe.com/en/docs/commerce/product-recommendations/developer/setting-cookie) describes the behaviour of the Commerce integration and a do-not-track cookie mechanism for custom consent solutions; it should not be assumed to apply automatically to this EDS storefront.

The custom history-storage code does not check `mg_dnt` or Cookie Restriction Mode. If a merchant's consent policy requires blocking local history storage before consent, the CMP integration must also address that code. Setting `mg_dnt` alone does not prevent these writes.

Merchants and implementation partners must connect the CMP decision to Boilerplate's consented script loading and `consent.update` notifications. If the implementation also uses Commerce components that rely on `mg_dnt`, the integration must keep that signal consistent with the applicable consent decision. Managing that cookie is not a substitute for integrating Boilerplate's consent-dependent behaviour.

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
