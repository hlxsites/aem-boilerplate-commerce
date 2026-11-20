# Commerce Order Invoices

## Overview

The `commerce-order-invoices` block renders the Order drop-in's `OrderInvoices`
container in an order-details page. Customers can view the invoices associated
with that order and follow a link to an individual invoice.

The Order drop-in owns invoice fetching, loading/error/empty states, and list
rendering. The AEM block supplies the destination for invoice links; it does not
calculate amounts or generate PDFs.

## Configuration and prerequisites

Author a **Commerce Order Invoices** block on an order-details page. There are no
block-specific configuration fields, defaults, or table-cell values to supply.
The authoring definition is in `_commerce-order-invoices.json`.

The site must also provide an invoice-details page containing the
`commerce-invoice-details` block at the corresponding path.

Use an Order drop-in release exporting `OrderInvoices` and `InvoiceDetails`.
This integration pins `@dropins/storefront-order@5.0.0-alpha-20261117102052`.
After changing the package version, update the lockfile, run
`npm run install:dropins`, and commit the regenerated browser assets.

The deployed GraphQL endpoint must expose:

- `Invoice.status`
- `InvoiceItemInterface.tax_amount`
- `InvoiceItemInterface.row_total`

Deploy the compatible backend schema before the updated storefront. Extracting
the reusable invoice fragment does not remove these requirements.

## Integration and navigation

The block imports `scripts/initializers/order.js`, which initializes the existing
Order drop-in using the page's `orderRef` query parameter. There is no separate
Invoice drop-in initialization. The container consumes order context through the
shared `order/data` event and requests invoices for that order.

The link callback uses the order number and invoice number supplied by the
container, not an invoice identifier inferred by the host. It:

1. Replaces a trailing `/order-details` or `/order-details/` in the current
   pathname with `/invoice-details`.
2. Encodes the order number as `orderRef` and the invoice number as `invoiceRef`
   using `URLSearchParams`.
3. Applies `rootLink` to respect the active storefront root.

For example:

```text
/customer/order-details?orderRef=000123
  -> /customer/invoice-details?orderRef=000123&invoiceRef=INV0001
```

Root or draft path prefixes are retained. The block expects an order-details
pathname ending in `/order-details`; it does not configure arbitrary route names.
It constructs a fresh query containing the two references, without carrying over
unrelated query parameters or the current hash.

The invoice-details block supplies back navigation to the associated order.
The shared Order initializer sends signed-out customers using an order number
through sign-in and preserves the intended destination. Guest order-token
navigation remains handled by that initializer; this block does not add a guest
invoice API or grant access to another customer's invoices.

The block itself reads and writes no `localStorage` or `sessionStorage` entries
and registers no event listeners. Authentication, configuration caching, and
order events remain responsibilities of the shared storefront infrastructure.

## Loading and error behavior

Until order context is available, the container displays a loader. Once the
invoice request completes, the drop-in displays the invoice list, its empty
state, or its load-error state. The block does not catch render failures or
substitute a fallback query.

The shared initializer also handles `order/error` events and can redirect to
customer orders or order status, depending on authentication and order context.

An incompatible schema rejects the shared invoice query. The current API does
not explicitly reject GraphQL errors in a resolved response, so a response
without order data can appear as an empty invoice list. Confirm schema
compatibility before interpreting that state as an order without invoices.

## Testing

Invoice coverage runs through the existing Cypress runner and Auth/account E2E
shards. Host coverage includes encoded references, storefront root prefixes,
trailing slashes, sign-in destinations, guest-token order navigation, and PDF
branding configuration and failures.

The invoice browser smoke test loads the real blocks and pinned Order
assets with deterministic order and invoice responses, follows an invoice link,
downloads a PDF, and navigates back. See
[Invoice integration coverage](../../cypress/README.md#invoice-integration-coverage)
for the command and the remaining real-backend deployment checks.
