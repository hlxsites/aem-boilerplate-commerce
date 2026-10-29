# Product Reviews Block

## Overview

Displays the first page of approved reviews using the ratings/reviews drop-in.
The standalone block owns its placement, page SKU, and initial request. It does
not import Product Details or subscribe to PDP events. The PDP header rating
remains separate; this block does not render a second aggregate rating.

## Integration

### Block Configuration

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `sku` | string | Page product SKU | Product whose reviews are displayed. Takes precedence over page metadata and URL context. Surrounding whitespace is trimmed. |

Example authored block:

| Product Reviews | |
| --- | --- |
| sku | ADB102 |

Without an authored SKU, the block uses `getProductSku()`: `sku` metadata before
the SKU in `/products/{urlKey}/{sku}`. In authoring modes (`dapreview` or
`quick-edit=on`), the shared helper falls back to Product Details' authored
`defaultsku` instead of the URL; supply `sku` to author reviews independently.

The SKU is passed directly to Commerce Core without a Catalog Service lookup or
case conversion. Quantity, option, and `pdp/data` changes do not change review
ownership.

### Placement

Authors can place the block in any section, including pages without Product
Details. Shared page auto-blocking inserts a sibling Product Reviews block after
Product Details only when no Product Reviews block is already authored.
Authored placement is preserved. Normal AEM block loading loads the block's
JavaScript and CSS; Product Details does not initialize it.

### Store Configuration

| Setting | Source | Behavior |
| --- | --- | --- |
| `isProductReviewsEnabled` | Normalized `product_reviews_enabled` store config | Must be `true`; otherwise the block remains hidden and makes no review requests. |
| `allowGuestsToWriteProductReviews` | Normalized backend store config | Does not restrict read-only reviews. |
| `pageSize` / `currentPage` | Fixed block defaults | First 20 reviews on page 1. No block or URL overrides. |
| `scope` | Generated per instance | Private `product-reviews-<UUID>` shared by the Review container and its requests. |

The initializer inherits `CORE_FETCH_GRAPHQL`, including its endpoint and headers,
following the cart/wishlist initialization convention. Both `STORE_CONFIG_QUERY`
and `REVIEWS_QUERY` use Commerce Core. This drop-in must not use
`CS_FETCH_GRAPHQL`, query catalog products, or fetch aggregate ratings.

### Heading and Ratings

The heading is **Reviews**. The refactored Review container accepts an optional
`totalCount`, but the current Core reviews response provides no approved total.
This block intentionally leaves that prop unset. Do not infer a total from page
length or `pageSize * totalPages`, or subscribe to `pdp/data` to obtain one.

Individual review stars remain part of the drop-in's ReviewItem rendering. The
separate PDP header ProductRating continues using product/catalog data. A
supported contract for lower-page aggregates, totals, and distribution is deferred
until the forthcoming API is ready.

### Localization

Override labels through `placeholders/ratings-reviews.json` using dotted keys.
The drop-in supplies default labels.

| Key | Purpose |
| --- | --- |
| `Review.title` | Heading without an approved total. |
| `Review.loading`, `Review.empty`, `Review.unavailable`, `Review.error` | List status messages. |
| `Review.retry` | Retry button label. |
| `Review.author`, `Review.unrated`, `Review.dateLocale` | Author (`{{nickname}}`), unrated label, and date locale. |

### Events

The host block does not directly emit or listen to drop-in events. The API
publishes these events; the Review container listens within the same private
scope:

| Event | Payload | Purpose |
| --- | --- | --- |
| `reviews/request` | `{ sku, pageSize, currentPage }` | Identifies the requested page. |
| `reviews/loading` | Boolean | Loading state. |
| `reviews/result` | `{ request, result }` | Matching normalized result, possibly `null`. |
| `reviews/error` | String or `null` | Error state. |

Retain the same scope on the container and API calls. Do not synthesize result
events or share a scope across instances. The refactored package has no
`rating/*` events, `Rating` container, or `getProductRating` API.

## Behavior Patterns

- The Review container provides its own three-row skeleton, localized loading
  status, and `aria-busy`. Its decorative skeleton uses `aria-hidden`; no
  host-provided Loading slot or additional skeleton is needed.
- Mount the container, then start `getProductReviews` without awaiting the
  response in block decoration. Review latency must not delay section loading or
  purchase controls.
- Review failures are logged and display the drop-in error and retry control.
  Retry preserves the original SKU, page, and scope through the Core client.
- Empty results and unavailable (`null`) results have distinct localized states.
- A missing SKU leaves the block hidden and rejects decoration through the
  standard AEM block loader's error logging.
- Store configuration failures are logged by the initializer and keep reviews
  disabled. Guest-writing permission does not gate reading.
- Aggregate totals/graphs, badges, pagination controls, sorting, submission, and
  helpfulness voting remain deferred or outside this block's current scope.

## Development

Until [ACCS-2171](https://jira.corp.adobe.com/browse/ACCS-2171) is complete, the
dependency uses `vendor/storefront-ratings-reviews-1.0.1-824c0fc.tgz`, built from
`824c0fc68dbd431fd3f6be71e4fec31dd824ce06` after
[adobe-commerce/storefront-ratings-reviews#7](https://github.com/adobe-commerce/storefront-ratings-reviews/pull/7).
Include the archive and generated ratings/reviews assets when delivering the
branch. `.hlxignore` excludes the archive from Edge Delivery; browsers load the
generated files. No sibling repository is required to install. Replace the
snapshot with an equivalent published package when available.

With the local AEM server running:

```sh
npm --prefix cypress run cypress:saas:run -- \
  --spec src/tests/b2c/verifyProductReviews.spec.js --config retries=0
```

The focused suite covers Core/Catalog endpoint and header separation, SKU
precedence, standalone/authored placement, loading, errors/retry, disabled and
failed configuration, guest reading, scope isolation, escaping, purchase-control
availability, and mobile/RTL layout.
