# Product Reviews Block

## Overview

Displays approved reviews using the ratings/reviews drop-in.
The standalone block owns its placement, page SKU, and initial request. It does
not import Product Details or subscribe to PDP events. The PDP header rating
remains separate; this block does not render a second aggregate rating.
The block renders both the Review and Pagination containers. Authors place one
Product Reviews block; pagination is included automatically when needed.

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
Details. When the shared page auto-blocking constructs Product Details from page
SKU context, `buildProductRatingsAndReviews(main)` appends a separate reviews
section at the end of `main`, unless reviews are already authored.

An explicitly authored Product Details block does not automatically add reviews.
For folder-mapped templates, authors must add Product Reviews to the template
where it belongs. Authored placement is preserved. Developers can disable
automatic reviews by commenting out the `buildProductRatingsAndReviews(main)`
call immediately after `buildPDPBlock(main)` in `scripts/scripts.js`.

Pagination remains inside Product Reviews and follows its placement. Remove any
previously authored Product Reviews Pagination blocks and shared `scope` rows;
neither is needed.

Normal AEM block loading loads the block's JavaScript and CSS; Product Details
does not initialize it.

### Store Configuration

| Setting | Source | Behavior |
| --- | --- | --- |
| `isProductReviewsEnabled` | Normalized `product_reviews_enabled` store config | Must be `true`; otherwise the block remains hidden and makes no review requests. |
| `allowGuestsToWriteProductReviews` | Normalized backend store config | Does not restrict read-only reviews. |
| `pageSize` / `currentPage` | Fixed initial block defaults | First 20 reviews on page 1. Pagination requests subsequent pages with the same page size. No block or URL overrides. |
| `scope` | Generated per instance | Private `product-reviews-<UUID>` shared by the Review and Pagination containers and their requests. Not author-configurable. |

The initializer inherits `CORE_FETCH_GRAPHQL`, including its endpoint and headers,
following the cart/wishlist initialization convention. Both `STORE_CONFIG_QUERY`
and `REVIEWS_QUERY` use Commerce Core. This drop-in must not use
`CS_FETCH_GRAPHQL`, query catalog products, or fetch aggregate ratings.

### Write a Review

The block renders a header row with a **Reviews** title and a **Write review**
button above the review list. Both belong to the block, not the drop-in, so
projects can restyle or rearrange them freely. The button opens the drop-in's
`WriteReview` container inside the shared `blocks/modal`.

- `sku` is the block's review SKU. When the page's `pdp/data` payload is for the
  same SKU, its name and first image fill the form's product summary.
  Standalone Reviews pages use the authored SKU and do not require PDP data.
- `isAuthenticated` comes from `checkIsAuthenticated()`; `routeSignIn` returns
  `rootLink(CUSTOMER_LOGIN_PATH)`.
- The form honors `allowGuestsToWriteProductReviews`: when it is off, signed-out
  shoppers see a sign-in prompt instead of the form.
- After a successful submit the form shows a pending-moderation message and
  stays open until the shopper closes the modal. The review list is not
  refreshed because new reviews are not shown until approved.
- reCAPTCHA is not configured here. The shared initializer already calls
  `recaptcha.setConfig()`; the form initializes the `createProductReview` badge and
  requests a fresh token on each submit.

### Heading and Ratings

The block's own heading is **Reviews**. The refactored Review container accepts an optional
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
| `Global.ReviewsTitle` | Block title above the review list (default `Reviews`). |
| `Global.WriteReview` | Write review button label (default `Write review`). |
| `Review.title` | Drop-in list heading without an approved total. |
| `Review.loading`, `Review.empty`, `Review.unavailable`, `Review.error` | List status messages. |
| `Review.retry` | Retry button label. |
| `Review.author`, `Review.unrated`, `Review.dateLocale` | Author (`{{nickname}}`), unrated label, and date locale. |
| `Pagination.label`, `Pagination.loading` | Navigation landmark label and initial pagination loading status. |
| `Pagination.outOfRange`, `Pagination.firstPage` | Status and recovery button when the requested page is no longer available. |

### Events

The host block does not directly emit or listen to drop-in events. The API
publishes these events; the Review and Pagination containers listen within the
same private scope:

| Event | Payload | Purpose |
| --- | --- | --- |
| `reviews/request` | `{ sku, pageSize, currentPage }` | Identifies the requested page. |
| `reviews/loading` | Boolean | Loading state. |
| `reviews/result` | `{ request, result }` | Matching normalized result, possibly `null`. |
| `reviews/error` | String or `null` | Error state. |

Retain the same scope on both containers and API calls. Do not synthesize result
events or share a scope between independent review lists. Each block instance
stays isolated using a generated scope. The refactored package has no
`rating/*` events, `Rating` container, or `getProductRating` API.

## Behavior Patterns

- The Review container provides its own three-row skeleton, localized loading
  status, and `aria-busy`. Its decorative skeleton uses `aria-hidden`; no
  host-provided Loading slot or additional skeleton is needed.
- Mount both containers, then start `getProductReviews` without awaiting the
  response in block decoration. Review latency must not delay section loading or
  purchase controls.
- Review failures are logged and display the drop-in error and retry control.
  Retry preserves the original SKU, page, and scope through the Core client.
- Empty results and unavailable (`null`) results have distinct localized states.
- A missing SKU leaves the block hidden and rejects decoration through the
  standard AEM block loader's error logging.
- Store configuration failures are logged by the initializer and keep reviews
  disabled. Guest-writing permission does not gate reading.
- The Pagination container owns subsequent page requests. Do not fetch again in
  an `onPageChange` callback or add host event listeners. Empty and single-page
  results hide the controls and pagination spacing without hiding the review list.
- Aggregate totals/graphs, badges, sorting, and
  helpfulness voting remain deferred or outside this block's current scope.

## Development

The dependency uses the published
`@dropins/storefront-ratings-reviews@1.1.0-alpha-20261109222008` package.
Run `npm install` and `npm run install:dropins` to refresh the generated
ratings/reviews assets. Include the generated files when delivering the branch;
no vendored ratings/reviews archive or sibling repository is required.

With the local AEM server running:

```sh
npm --prefix cypress run cypress:saas:run -- \
  --spec src/tests/b2c/verifyProductReviews.spec.js --config retries=0
```

The focused suite covers Core/Catalog endpoint and header separation on retry
and navigation, SKU precedence, standalone/authored placement, review
auto-blocking, loading, errors/retry, disabled and failed configuration, guest
reading, private scope isolation, pagination loading and recovery, escaping,
purchase-control availability, mobile/RTL layout, the header and Write review
button, submitting a review from the modal on PDPs and standalone Reviews pages,
closing/reopening a fresh form, and the sign-in prompt when guests cannot write
reviews.
