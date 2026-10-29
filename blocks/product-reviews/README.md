# Product Reviews Block

## Overview

Displays an average Rating and the first page of approved reviews using the ratings/reviews drop-in. This block owns its rendering, styling, SKU resolution, loading states, and requests. It does not import Product Details or subscribe to PDP events. The PDP header rating remains separate.

## Integration

### Block Configuration

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `sku` | string | Page product SKU | Product whose reviews are displayed. Takes precedence over page metadata and URL context. |
| `scope` | string | Generated per instance | Event scope shared by this review list, its rating, and an optional separate pagination block. Use a unique value for each independent review list. |

Example authored block:

| Product Reviews | |
| --- | --- |
| sku | ADB102 |
| scope | main-reviews |

Without an authored SKU, the block uses `getProductSku()`: `sku` metadata before the SKU in `/products/{urlKey}/{sku}`. In authoring modes (`dapreview` or `quick-edit=on`), the shared helper falls back to Product Details' authored `defaultsku` instead of the URL; supply `sku` to author reviews independently.

A small Catalog Service query resolves the canonical SKU before requesting ratings and reviews. This preserves SKU case, including lowercase product URLs that resolve to uppercase catalog SKUs, without loading the PDP drop-in. Subsequent quantity, option, or `pdp/data` changes do not change review ownership.

### Placement

Authors can place the block in any section, including pages without Product Details. Shared page auto-blocking inserts a sibling Product Reviews block after Product Details only when no Product Reviews block is already authored. Authored placement is preserved. Normal AEM block loading loads the block's JavaScript and CSS; Product Details does not initialize it.

### Store Configuration

| Setting | Source | Behavior |
| --- | --- | --- |
| `isProductReviewsEnabled` | Normalized `product_reviews_enabled` store config | Must be `true`; otherwise the block remains hidden and makes no SKU, rating, or review requests. |
| `allowGuestsToWriteProductReviews` | Normalized backend store config | Does not restrict read-only reviews. |
| `pageSize` / `currentPage` | Fixed block defaults | First 20 reviews on page 1. No block or URL overrides. |
| `scope` | Authored or generated per instance | Configured scope, or private `product-reviews-<UUID>`, shared by containers and their requests. |

The shared ratings/reviews initializer inherits `CS_FETCH_GRAPHQL` and its tenant headers. The Router must support `STORE_CONFIG_QUERY`, catalog `products(skus:)` with `sku` and rating attributes, and `REVIEWS_QUERY`.

### Localization

Override labels through `placeholders/ratings-reviews.json` using dotted keys. The drop-in supplies default review labels.

| Key | Purpose |
| --- | --- |
| `Rating.error` | Aggregate failure; defaults to `Unable to load rating.` |
| `Rating.unavailable` | Aggregate unavailable; defaults to `Rating is unavailable.` |
| `Review.title` | Heading without an approved total. |
| `Review.oneReview`, `Review.reviews` | Singular/plural heading; plural supports `{{count}}`. |
| `Review.loading`, `Review.empty`, `Review.unavailable`, `Review.error` | List status messages. |
| `Review.retry` | Retry button label. |
| `Review.author`, `Review.unrated`, `Review.dateLocale` | Author (`{{nickname}}`), unrated label, and date locale. |

### Events

The block does not directly emit or listen to PDP events. Drop-in APIs publish the following events, consumed by the containers in the same scope:

| Event | Payload | Purpose |
| --- | --- | --- |
| `rating/request` | `{ sku }` | Identifies the requested aggregate. |
| `reviews/request` | `{ sku, pageSize, currentPage }` | Identifies the requested page. |
| `rating/loading`, `reviews/loading` | Boolean | Loading state. |
| `rating/result`, `reviews/result` | `{ request, result }` | Matching normalized result, possibly `null`. |
| `rating/error`, `reviews/error` | String or `null` | Independent error state. |

Retain the same scope on related container props and API calls. A separate Product Reviews Pagination block must use the same configured scope as the review list it controls. Do not synthesize result events or share a scope between independent review lists. Without a configured scope, this block stays isolated using a generated scope.

## Behavior Patterns

- The Review container provides its own skeleton and localized loading status. The block fills Rating's `Loading` slot with shared Skeleton components.
  Containers expose `aria-busy`; decorative skeletons use `aria-hidden`.
- Aggregate and list requests run in parallel after the containers mount.
- Approved totals come from aggregate data, not the current page's item count.
- List failures retain the aggregate and expose the drop-in retry control.   Aggregate failures retain the list and show a localized error.
- Missing SKU leaves the block hidden and rejects decoration through the standard AEM block loader's error logging. Catalog errors and unresolved products hide the block and log an explicit `[Product Reviews]` error. Data requests do not delay section loading; purchase controls are independent.
- Configuration failures are logged by the initializer and keep reviews disabled.
- Distribution graphs, badges, pagination controls, sorting, submission, and helpfulness voting remain out of scope.

## Development

Until [ACCS-2171](https://jira.corp.adobe.com/browse/ACCS-2171) is complete, the dependency uses `vendor/storefront-ratings-reviews-1.0.1-d27ae9e.tgz`, built from `d27ae9e53d19dc9373b6473e26c207bbac395291`. Include the archive and generated ratings/reviews assets when delivering the branch; `.hlxignore` excludes the archive from remote delivery. No sibling repository is required to install.

With the local AEM server running:

```sh
npm --prefix cypress run cypress:saas:run -- \
  --spec src/tests/b2c/verifyProductReviews.spec.js --config retries=0
```
