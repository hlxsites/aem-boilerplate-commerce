# Product Reviews Pagination Block

## Overview

Displays the ratings/reviews drop-in's Pagination container independently of
Product Details and Product Reviews. The block owns pager placement and
block-specific styles; the drop-in supplies accessible controls, loading states,
page validation, and navigation requests.

## Block Configuration

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | string | Required | Must match the configured scope of the Product Reviews block whose list this pager controls. Surrounding whitespace is trimmed. |

Example authored pair, which may be placed in separate sections:

| Product Reviews | |
| --- | --- |
| sku | ADB102 |
| scope | main-reviews |

| Product Reviews Pagination | |
| --- | --- |
| scope | main-reviews |

Use a unique scope for each independent review list. Multiple pagers may control
the same list by using its scope. Without a configured scope, Product Reviews
generates a private scope and cannot be paired through authored configuration.

## Data Flow

Both blocks reuse `scripts/initializers/ratings-reviews.js`, which inherits
`CORE_FETCH_GRAPHQL` and its endpoint and headers. Product Reviews passes the SKU
directly to Core and requests the initial review page. Pagination consumes the
resulting `reviews/*` events in its scope and uses the returned page metadata.
Selecting a page requests that page with the same SKU, page size, and scope; the
Review container reacts to the result.

Do not fetch the initial page from this block or fetch again in an
`onPageChange` callback. The Pagination container owns navigation requests.
Eager event subscriptions allow the pager to load before or after reviews.
Catalog Service, aggregate ratings, and inferred review totals are not needed.

## Behavior

- Without an initial matching request, the pager stays hidden.
- With no reviews or only one page, controls and block spacing stay hidden.
- While a page is loading, controls are disabled and the review list shows its
  loading state.
- The Review container shows failed requests and offers retry. Pagination retains
  the last accepted bounds for the same SKU and page size.
- Out-of-range results offer navigation back to the first page.
- Disabled or failed store configuration keeps the block hidden.
- A missing or blank scope leaves the block hidden and rejects decoration through
  the standard AEM block loader's error logging.

This block does not import Product Reviews, subscribe to PDP events, or implement
a custom customer pager.
