# @dropins/storefront-order

## 4.1.0

## 4.1.0-beta.0

### Minor Changes

- 6deaff4: Adds support for displaying a "Free Gift" label and zero-price
  treatment on order line items across the My Account order detail and order
  return surfaces.

  - Adds the optional `free_gift_label` field to the
    `ORDER_ITEM_DETAILS_FRAGMENT` on `OrderItemInterface`. The field is nullable
    and additive — backends that do not yet return it continue to work unchanged
    (label and zero-price rendering are simply skipped).
  - Exposes `freeGiftLabel?: string | null` and a derived `isFreeGift?: boolean`
    (computed as `Boolean(free_gift_label)`) on `OrderItemModel`.
  - `CartSummaryItem` now renders free-gift lines with the catalog/original unit
    price and a row total that strikes through the original total followed by a
    `$0` sale price. Logic lives in the new `getFreeGiftDisplayUnit` /
    `getFreeGiftLineStrikeTotal` helpers in `src/lib/free-gift-pricing.ts`. All
    tax-display modes (incl./excl./both) are handled.
  - For non-free-gift lines that still carry a `freeGiftLabel`, the label is
    rendered next to the existing price without altering pricing behavior.
  - The order returns flow benefits from the same treatment: a new
    `enrichItemsEligibleForReturn` step in `transformOrderData` propagates
    `freeGiftLabel`, `isFreeGift`, and `regularPrice` from full order items onto
    `items_eligible_for_return`, so `ReturnOrderProductList` displays free-gift
    labels and pricing consistently.

- e945c7b: `OrderComments` now recognizes a small allowlist of formatting tags
  (`<br>`, `<b>`, `<i>`) in comment text and renders them as real line
  breaks/bold/italic, instead of showing the literal tag characters. Any other
  markup in the comment string is still rendered as plain, escaped text — no
  other tags or attributes are ever parsed as HTML.

  Internally, sanitization is implemented via DOMPurify (already used by the
  storefront-checkout dropin for similar rich text) rather than a custom parser.

- 3e19320: Render shipment details for shipments without tracking data.

  Previously, a completed order with a single fully shipped shipment and an
  empty `tracking` array rendered nothing, even though Commerce GraphQL returned
  the shipment number and its shipped items.

  - A shipment card is now rendered for every returned shipment.
  - Untracked shipments show the shipment number, the shipped contents and the
    shipped quantity.
  - No track action is rendered when tracking data is missing.
  - Tracked shipments keep their carrier, tracking number and track action.
  - Orders without shipments keep the generic shipping information card.
  - Adds the `Order.ShippingStatusCard.shipmentNumber` translation key.

### Patch Changes

- f28e6ff: Fix `placeOrder` silently resolving with `null` and no error/event
  when the GraphQL response returns a `null` `placeOrder` field without a
  standard `errors` array (e.g. a backend
  `Cannot return null for non-nullable field PlaceOrderOutput.errors` schema
  violation surfaced via `extensions.valueCompletion`). This left checkout stuck
  with no error feedback for the shopper. Now this case is treated as an
  unexpected server error, surfacing a `PlaceOrderError` so consumers can
  display the checkout error panel.

## 4.0.1

### Patch Changes

- 1df0e9c: Fix incorrect and missing `autocomplete` attributes on the order
  search form (WCAG 1.3.5).

  The email field on the guest order search form used an invalid `autocomplete`
  value (`username`), and the last name field had no `autocomplete` attribute at
  all. They now use the correct `email` and `family-name` values respectively.

  This helps browsers and assistive technology correctly identify the purpose of
  each field, making autofill and form-filling easier for everyone, including
  people using screen readers or who have difficulty typing.

- 405a09d: Fix visual heading text not marked as heading across order status,
  order details, shipping, returns and product list sections
- aea506c: Bump SDK stable versions

## 4.0.1-beta.1

### Patch Changes

- aea506c: Bump SDK stable versions

## 4.0.1-beta.0

### Patch Changes

- 1df0e9c: Fix incorrect and missing `autocomplete` attributes on the order
  search form (WCAG 1.3.5).

  The email field on the guest order search form used an invalid `autocomplete`
  value (`username`), and the last name field had no `autocomplete` attribute at
  all. They now use the correct `email` and `family-name` values respectively.

  This helps browsers and assistive technology correctly identify the purpose of
  each field, making autofill and form-filling easier for everyone, including
  people using screen readers or who have difficulty typing.

- 405a09d: Fix visual heading text not marked as heading across order status,
  order details, shipping, returns and product list sections

## 4.0.0

### Major Changes

- 6a3e582: Add support for Seller Assisted Buying feature that allows store
  administrators to place orders on behalf of customers. Orders placed by
  administrators are marked with a visible "Order placed by an administrator"
  label on the order details page. The feature also integrates with order
  comments to track admin actions and provide a history of administrative
  assistance throughout the order lifecycle.

### Minor Changes

- d09caca: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- 1714bd1:
- 97eb21b: Bump storefront SDK stable version
- ab3d4d6: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.3

### Patch Changes

- 97eb21b: Bump storefront SDK stable version

## 4.0.0-beta.2

### Patch Changes

- ab3d4d6: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.1

### Patch Changes

- 1714bd1:

## 4.0.0-beta.0

### Major Changes

- 6a3e582: Add support for Seller Assisted Buying feature that allows store
  administrators to place orders on behalf of customers. Orders placed by
  administrators are marked with a visible "Order placed by an administrator"
  label on the order details page. The feature also integrates with order
  comments to track admin actions and provide a history of administrative
  assistance throughout the order lifecycle.

### Minor Changes

- d09caca: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

## 3.3.0

### Minor Changes

- 233a773: Add comments field for authenticated users
- 2d34f43: This branch adds order-level comments from the GraphQL
  CustomerOrder.comments field and a new OrderComments UI (component +
  container).

## 3.3.0-beta.0

### Minor Changes

- 233a773: Add comments field for authenticated users
- 2d34f43: This branch adds order-level comments from the GraphQL
  CustomerOrder.comments field and a new OrderComments UI (component +
  container).

## 3.2.0

### Minor Changes

- b4b4251: Enable GraphQL fragment extension for the CustomerOrder type by
  exporting GUEST_ORDER_FRAGMENT, allowing merchants to extend order queries
  with custom fields via overrideGQLOperations.

### Patch Changes

- 12facdd: Internal sync: backmerge main into develop.
- 5284e7f: Fix order cancellation flow by creating separate
  CUSTOMER_ORDER_FRAGMENT without token field. This prevents authenticated
  orders from incorrectly using the guest cancellation flow while maintaining
  backward compatibility for fragment extensions.
- cf344b1: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 6554de1: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- 2a57159: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.3

### Patch Changes

- 2a57159: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 6554de1: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Patch Changes

- 5284e7f: Fix order cancellation flow by creating separate
  CUSTOMER_ORDER_FRAGMENT without token field. This prevents authenticated
  orders from incorrectly using the guest cancellation flow while maintaining
  backward compatibility for fragment extensions.

## 3.2.0-beta.0

### Minor Changes

- b4b4251: Enable GraphQL fragment extension for the CustomerOrder type by
  exporting GUEST_ORDER_FRAGMENT, allowing merchants to extend order queries
  with custom fields via overrideGQLOperations.

### Patch Changes

- 12facdd: Internal sync: backmerge main into develop.
- cf344b1: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
