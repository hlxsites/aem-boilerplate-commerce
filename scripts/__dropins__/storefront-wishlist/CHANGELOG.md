# @dropins/storefront-wishlist

## 3.5.0-alpha-20260831234618

### Minor Changes

- c0ef1dc: Add `createWishlist(name, visibility)` API for creating additional
  named wishlists for a logged-in customer. Authenticated only; guests are a
  no-op. The default wishlist and guest behavior are unchanged (additive,
  backwards compatible).
- 2afeee7: Add an optional `wishlistId` parameter to `addProductsToWishlist` so
  products can be added to a specific wishlist instead of the default. Omitting
  it keeps the existing behavior; guests continue to use their single local list
  (additive, backwards compatible).
- 64e63d3: Add multi-list rendering via event scoping: the `Wishlist` container
  accepts a `scope` prop so several instances can coexist on one page, each
  reacting only to its own list's `wishlist/data` and `wishlist/alert` events
  (the active/default list stays unscoped and unchanged). `getWishlistById`
  accepts a `scope` option to broadcast on that channel,
  `removeProductsFromWishlist` accepts an optional `wishlistId` for a targeted
  removal, and the wishlist `name` is now exposed. Pair `wishlistId` (which list
  to load/mutate) with `scope` (event isolation) to render a specific list.
- ce60491: Add an optional `slots.actions` render slot to
  `Wishlist`/`WishlistItem`/`ProductItem`, letting the host replace the main
  action button (e.g. Move to Cart / Notify Me based on stock status and
  merchant-specific attributes) instead of the drop-in's fixed default. The
  Remove icon always stays in its default position next to the product title.
  The slot receives `{ item, onMoveToCart, onRemove }` as context. When omitted,
  rendering is unchanged (Move to Cart/Customize button + Remove icon), so this
  is fully backwards compatible.
- 4820249: Add an optional `showStockStatus` prop to `ProductItem` that displays
  an "In stock" / "Out of stock" label driven by `item.product.inStock`. Off by
  default, so existing consumers render unchanged.

### Patch Changes

- 01e7cc5: Fix multiple accessibility issues in the `ImageCarousel` and
  `ProductItem` components:

  - Carousel dot indicators now use `role="tablist"`/`role="tab"` with
    `aria-selected` and include slide count in `aria-label` (e.g. "Image 1
    (1/2)")
  - Inactive carousel dots use a darker color for 3:1 contrast ratio
  - Carousel dot target size increased to meet 24x24 CSS px minimum
  - Remove and Move to Cart buttons now include the product name in their
    `aria-label` for unique identification across multiple products
  - Product image links now have an accessible name via `aria-label`

- 802be91: Fix visible button text showing literal `{productName}` placeholder
  instead of resolved product name. Split i18n keys so `{productName}` is only
  interpolated in aria-labels.
- 6b530d6: Fix wishlist status messages (e.g. "Removed from wishlist", "Moved to
  cart") not being announced by screen readers by keeping the alert's aria-live
  region mounted in the DOM instead of unmounting it along with the message
  (WCAG 4.1.3)

## 3.4.0

### Minor Changes

- 53ab3b8: Added `pageSize` option to the `initialize` config to control how
  many wishlist items are fetched and displayed per page. Defaults to 9. Set a
  custom value to enable page-by-page navigation with pagination controls.
  Pagination UI renders automatically when total pages exceed one.

### Patch Changes

- ea5042e: Bump SDK stable versions
- 8a3423a: Redirect gift card wishlist items to the PDP for configuration
  instead of silently failing on Move to Cart.
- 0973b90: Fixed WishlistToggle heart icon showing incorrect state on PLP and
  PDP when a product exists on a wishlist page beyond the first. The drop-in now
  fetches all wishlist pages in the background on initialization and checks the
  full item list when determining whether a product is wishlisted, regardless of
  pagination.
- bf0c101: Make image carousel dot controls keyboard accessible by replacing
  span elements with button elements (USF-3327)

## 3.4.0-beta.1

### Patch Changes

- ea5042e: Bump SDK stable versions

## 3.4.0-beta.0

### Minor Changes

- 53ab3b8: Added `pageSize` option to the `initialize` config to control how
  many wishlist items are fetched and displayed per page. Defaults to 9. Set a
  custom value to enable page-by-page navigation with pagination controls.
  Pagination UI renders automatically when total pages exceed one.

### Patch Changes

- 8a3423a: Redirect gift card wishlist items to the PDP for configuration
  instead of silently failing on Move to Cart.
- 0973b90: Fixed WishlistToggle heart icon showing incorrect state on PLP and
  PDP when a product exists on a wishlist page beyond the first. The drop-in now
  fetches all wishlist pages in the background on initialization and checks the
  full item list when determining whether a product is wishlisted, regardless of
  pagination.
- bf0c101: Make image carousel dot controls keyboard accessible by replacing
  span elements with button elements (USF-3327)

## 3.3.0

### Minor Changes

- ebcbb7e: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- ebcbb7e: Replaced PaaS & SaaS instances and some products to fix Cypress tests
- 5f367fe: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- 30a28da: Bump commerce packages

## 3.3.0-beta.1

### Patch Changes

- 5f367fe: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 3.3.0-beta.0

### Minor Changes

- ebcbb7e: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- ebcbb7e: Replaced PaaS & SaaS instances and some products to fix Cypress tests

## 3.2.0

### Minor Changes

- 8728c8d: - Add multistore support to the wishlist dropin by scoping
  localStorage/sessionStorage keys and wishlist ID cookies per store view code
  - Accept an optional `storeCode` config prop during initialization, which is
    read from the AEM config system (`Magento-Store-View-Code header`) and
    stored on internal state
  - When `storeCode` is present and not `'default'`, storage keys become
    `DROPIN__WISHLIST__WISHLIST__DATA__<storeCode>` and cookies become
    `DROPIN__WISHLIST__WISHLIST-ID__<storeCode>`, isolating guest and
    authenticated wishlist data between stores
  - Single-store setups and the `'default'` store continue using the original
    unscoped keys for backward compatibility

### Patch Changes

- 510af65: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- ac6097d: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0
- e6ae79a: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- a521911: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided
  `langDefinitions` with the drop-in's bundled defaults before passing them to
  `UIProvider`. This enables label/placeholder overrides via the initializer
  API.

## 3.2.0-beta.3

### Patch Changes

- ac6097d: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 510af65: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Patch Changes

- a521911: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided
  `langDefinitions` with the drop-in's bundled defaults before passing them to
  `UIProvider`. This enables label/placeholder overrides via the initializer
  API.

## 3.2.0-beta.0

### Minor Changes

- 8728c8d: - Add multistore support to the wishlist dropin by scoping
  localStorage/sessionStorage keys and wishlist ID cookies per store view code
  - Accept an optional `storeCode` config prop during initialization, which is
    read from the AEM config system (`Magento-Store-View-Code header`) and
    stored on internal state
  - When `storeCode` is present and not `'default'`, storage keys become
    `DROPIN__WISHLIST__WISHLIST__DATA__<storeCode>` and cookies become
    `DROPIN__WISHLIST__WISHLIST-ID__<storeCode>`, isolating guest and
    authenticated wishlist data between stores
  - Single-store setups and the `'default'` store continue using the original
    unscoped keys for backward compatibility

### Patch Changes

- e6ae79a: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
