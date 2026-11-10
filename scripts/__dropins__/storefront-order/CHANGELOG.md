# @dropins/storefront-order

## 5.0.0-alpha-20261110114801

### Major Changes

- 837aaf5: Display each invoice's own status and reported item tax in invoice
  details and downloaded PDFs. Distinguish zero item tax from unavailable tax,
  and style Paid, Pending, and Canceled invoice statuses explicitly.

  Improve PDF header spacing with separate logo, company, and invoice metadata
  areas. Preserve logo aspect ratios within 36 x 18 mm, wrap header text, and
  expand the header to avoid overlapping address panels. Missing or invalid
  logos do not reserve an empty logo column.

  Breaking change: requires a GraphQL endpoint exposing `Invoice.status` and
  `InvoiceItemInterface.tax_amount`, available in Storefront Compatibility
  4.7.21, 4.8.33, or 4.9.8 and later compatible patches on the corresponding
  release line. Deploy the compatible backend schema before deploying this query
  change; older schemas reject the invoice query.

  Line subtotals use the stored invoice-item `row_total`. This adds a schema
  requirement beyond the status/item-tax versions above; the deployed endpoint
  must also expose `InvoiceItemInterface.row_total`.

- b653e26: Use the backend-reported invoice-item `row_total` for line subtotals
  in invoice details and downloaded PDFs instead of multiplying unit price by
  invoiced quantity. Expose it as nullable `rowTotal` in the normalized
  invoice-item model. Preserve the reported value and currency without
  subtracting discounts or adding tax. Format valid zero amounts as money and
  display an em dash for unavailable amounts, without a calculation fallback.

  Breaking compatibility change: the shared invoice query now requires
  `InvoiceItemInterface.row_total`, in addition to `Invoice.status` and
  `InvoiceItemInterface.tax_amount`. Deploy a schema exposing all three fields
  before deploying this drop-in. Older schemas reject the entire query,
  affecting both invoice containers. The earlier status/item-tax minimum
  versions alone do not guarantee row-total support; verify that the deployed
  endpoint exposes `InvoiceItemInterface.row_total`.

  The frontend preserves null row totals. Backend implementations that convert
  missing stored totals to zero cannot distinguish those cases in the response;
  the frontend displays those values as zero.

### Minor Changes

- f087a3b: Adds a new `getOrderInvoices` API function to retrieve a customer
  order's invoices (invoice id, number, comments, invoiced items, and totals) by
  order number. The response is transformed into a new `OrderInvoicesModel`,
  following the same `data/transforms` + `data/models` pattern used by the other
  order API functions.

  ```ts
  import { getOrderInvoices } from '@/order/api/getOrderInvoices';

  const order = await getOrderInvoices('000000001');
  ```

- c811dcc: Adds an `InvoiceDetails` container/component and `useInvoiceDetails`
  hook to render the full detail view for a single invoice (order #, order date,
  payment method, invoice status, billing/shipping address, line items including
  item tax, and totals), matching the updated (non-Luma) reference design.
  Reuses the existing `getOrderInvoices` API, extended with invoice `status` and
  item `product_sale_price`, `tax_amount`, and stored `row_total`. See
  [backend compatibility requirements](../src/api/getOrderInvoices/getOrderInvoices.mdx#backend-compatibility)
  before deploying.

  ```tsx
  import { InvoiceDetails } from '@/order/containers/InvoiceDetails';

  <InvoiceDetails
    invoiceRef="000000002"
    routeInvoicesList={() => '/orders/invoices'}
  />;
  ```

  The container downloads an invoice PDF by default. Use `getInvoicePdfBranding`
  to supply the logo, store name, and address lines, or `onDownloadPdf` to
  replace the default download behavior.

- 5256d85: Add a reusable client-side invoice PDF renderer and wire the Invoice
  Details download action to it. Storefront hosts can provide a site logo as PDF
  branding; the same renderer can be reused by future bulk-export flows.
- d883d8b: Adds an `OrderInvoices` component and container to display the
  invoices associated with a customer order.

  The container uses a new `useOrderInvoices` hook, which listens for the
  `order/data` event and fetches invoices via `getOrderInvoices` for the current
  order. The component renders each invoice's number, grand total, and item
  count inside a card, with loading and empty states.

  ```ts
  import { OrderInvoices } from '@/order/containers';
  ```

### Patch Changes

- 839bb26: Keep the shopper's active cart when an order is placed from a
  different cart. `placeOrder` and `setPaymentMethodAndPlaceOrder` now emit
  `cart/reset` only when the placed cart is the active cart (or the active cart
  is unknown), so buying a product with an express payment button on a product
  page no longer clears the cart.

## 4.1.1

### Patch Changes

- fd9ddca: Prevent the local and standalone example hosts from repeatedly
  reloading when Auth announces an unauthenticated guest during initialization.
  Reload only when an authenticated session becomes unauthenticated, preserving
  logout behavior.

  Set an explicit Cypress TypeScript root directory so Cypress 13 can load its
  configuration with TypeScript 6 without a TS5011 startup error.

- fd9ddca: Use Elsie's shared HTML sanitizer for order comments and remove the
  direct DOMPurify dependency, retaining the existing comment-formatting
  allowlist.
- fd9ddca: Migrate development tooling to pnpm and pin
  `@adobe-commerce/elsie@3.0.0-alpha-20261014093743`, updating build, lint,
  TypeScript, unit-test, and Storybook integrations for elsie v3.

  Remove the unused Husky and lint-staged dependencies; no commit hooks were
  configured, so no replacement hook setup is needed.

  Remove unused direct `glob`, `lighthouse`, and `undici` dependencies,
  including the unused `glob` entry in the independent Cypress project.

  Upgrade shared CI workflows to `storefront-workflows@v7`, which runs
  Changesets through Elsie, and remove the redundant direct `@changesets/cli`
  dependency.

## 4.1.1-beta.0

### Patch Changes

- fd9ddca: Prevent the local and standalone example hosts from repeatedly
  reloading when Auth announces an unauthenticated guest during initialization.
  Reload only when an authenticated session becomes unauthenticated, preserving
  logout behavior.

  Set an explicit Cypress TypeScript root directory so Cypress 13 can load its
  configuration with TypeScript 6 without a TS5011 startup error.

- fd9ddca: Use Elsie's shared HTML sanitizer for order comments and remove the
  direct DOMPurify dependency, retaining the existing comment-formatting
  allowlist.
- fd9ddca: Migrate development tooling to pnpm and pin
  `@adobe-commerce/elsie@3.0.0-alpha-20261014093743`, updating build, lint,
  TypeScript, unit-test, and Storybook integrations for elsie v3.

  Remove the unused Husky and lint-staged dependencies; no commit hooks were
  configured, so no replacement hook setup is needed.

  Remove unused direct `glob`, `lighthouse`, and `undici` dependencies,
  including the unused `glob` entry in the independent Cypress project.

  Upgrade shared CI workflows to `storefront-workflows@v7`, which runs
  Changesets through Elsie, and remove the redundant direct `@changesets/cli`
  dependency.

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
