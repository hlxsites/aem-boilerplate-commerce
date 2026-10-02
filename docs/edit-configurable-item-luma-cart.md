# Editing a Configurable Product from Cart and MiniCart Without a Modal, Using PDP Update Mode

## Required changes

### 1. AEM / dropins — point the "Edit" link at the PDP

Affected files: `blocks/commerce-cart/commerce-cart.js` and `blocks/commerce-mini-cart/commerce-mini-cart.js`.

Today, `handleEditButtonClick(cartItem)` in both blocks opens a modal (`createMiniPDP` + `createModal` from `scripts/components/commerce-mini-pdp/`). It needs to be replaced with a simple URL build + redirect:

```js
function handleEditButtonClick(cartItem) {
  const optionsUIDs = cartItem.selectedOptionsUIDs
    ? Object.values(cartItem.selectedOptionsUIDs).filter(Boolean)
    : [];

  const editUrl = new URL(createProductLink(cartItem), window.location.origin);
  editUrl.searchParams.set('itemUid', cartItem.uid);
  if (optionsUIDs.length) {
    editUrl.searchParams.set('optionsUIDs', optionsUIDs.join(','));
  }

  window.location.href = editUrl.toString();
}
```

(`createProductLink` already exists in both blocks: `getProductLink(product.url.urlKey, product.topLevelSku)`).

This also drops the modal dependency (`createMiniPDP`/`createModal`) from both blocks, leaving `scripts/components/commerce-mini-pdp/` unused (it can be removed if it's not needed anywhere else in the project).

### 2. AEM / dropins — fix the initial CTA flicker on the edit URL

Affected file: `blocks/product-details/product-details.js`.

`isUpdateMode` used to start as `false` and only flip to `true` once the async `cart/data` event confirmed the item was in the cart — causing a visible "Add to Cart" → "Update in Cart" flash on load. It's now initialized optimistically from the URL, since `itemUid` is already known synchronously when the block decorates:

```js
// Before
let isUpdateMode = false;

// After
let isUpdateMode = Boolean(itemUidFromUrl);
```

The initial `Button` render now also uses `isUpdateMode` to pick the correct label up front instead of always starting with `AddProductToCart`. The `cart/data` listener is kept as-is and still corrects the button if the `itemUid` turns out to be stale (item no longer in the cart).

### 3. Luma / Magento backend — regenerate the cart page's "Edit" link

Luma's cart page currently generates the link via `getConfigureUrl()` (`Magento\Checkout\Block\Cart\Item\Renderer` or the client theme's equivalent block), pointing to `checkout/cart/configure/...`. This needs to be intercepted (plugin/preference) so it instead points to:

```
/products/{urlKey}/{sku}?itemUid={uid}&optionsUIDs={uid1,uid2,...}
```

Needed for each quote item:
- `urlKey` and `sku` of the product → already available on the quote item / product.
- GraphQL cart item `uid` → Magento derives it deterministically from the `quote_item_id` (this calculation needs to be replicated in PHP, or resolved via a one-off GraphQL query).
- `selectedOptionsUIDs` → the item's selected configurable option values, also derivable from the quote item.

## Confirmed scope

- Configurable products only (color/size) — bundle/grouped products are out of scope.
- The client can modify the Luma template/JS that generates the "Edit" link → no need to support the native `checkout/cart/configure/id/.../product_id/...` URL.

