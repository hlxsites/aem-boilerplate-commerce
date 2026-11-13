# Ratings and Reviews Drop-in

`@dropins/storefront-ratings-reviews`

## Getting Started

The Elsie 3 configuration is included in `elsie.config.js`.

### Install Dependencies

Use Node.js 22 or later and the pnpm version pinned in `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
```

### Update Backend Endpoint (for development only)

Storybook uses network fixtures and does not call a live backend.
Other tooling can use `ENDPOINT` in `.env.local`:

```env
ENDPOINT="https://your-commerce-host.example/graphql"
```

For the HTML sandbox's **Live backend** mode, set
`public.default["commerce-core-endpoint"]` in `examples/html-host/config.json`
to a Commerce Core endpoint. The configured QA endpoint supports reviews for
`ADB102`. The sandbox sends `Magento-Website-Code: base` and
`Magento-Store-View-Code: default`, using the website and store-view codes in
the same configuration file. Set those codes to match your catalog.

Replace the example URL with your endpoint. Both configuration files can be
tracked by Git, so do not include credentials.

### Launch Development Environment

```bash
pnpm run dev
```

- Storybook overview:
  http://localhost:6006/?path=/docs/ratingsreviews-getting-started--overview
- HTML sandbox: http://127.0.0.1:3000/
- Review stories: http://localhost:6006/?path=/story/ratingsreviews-containers-review--populated
- WriteReview stories: http://localhost:6006/?path=/story/ratingsreviews-containers-writereview--default

To run either separately, use `pnpm run storybook` or `pnpm run serve`.

The sandbox starts with live `ADB102` data and imports the built package from
port 3002. Run `pnpm run build` before starting it. A Review container displays
reviews with Pagination below it. **Apply** updates the mounted containers using
the selected values. Changing the SKU or page size and selecting **Apply**
fetches page 1 again. **Include review statistics** starts checked and controls
whether the summary is shown. The host requests `withStats: true` only when the
summary is enabled and no statistics have been loaded for the active SKU.
Toggling the summary with an existing snapshot needs no request. Disabling it
before statistics load starts an items-only request, so retries also omit them.
The API itself defaults `withStats` to `false`.
Returned optional `stats` contains `reviewCount`, `ratingVotesCount`,
`ratingSummary`, and `ratingsDistribution` entries (`value`/`count`); numeric
rating values retain the backend scale. These statistics are available to hosts
through the result and events, but do not change the Review/Pagination display.
Pagination always requests items and page metadata without statistics, including
returning to page 1. Host first-page and page-size actions also omit statistics
once loaded. Review retries preserve the failed request's `withStats`, so an
initial failure can still load the summary, whereas a page retry stays items-only.
The sandbox's ReviewSummary container listens to `reviews/result` and displays
the returned `stats` through the presentational ReviewSummary component as a
five-to-one star distribution alongside the overall rating and review count.
The component takes a `stats` prop; the container owns the event subscription.
The component's optional `loading` prop defaults to `false` and replaces the
statistics with decorative SDK skeletons in the same responsive layout.
Statistics may be omitted while loading. The container forwards its scoped
`reviews/loading` value directly, so skeletons appear on initial and page loads,
with `aria-busy` on the component root. Loading does not discard the snapshot;
cached statistics return when loading finishes.
The read-only stars, score, and count use Elsie's `StarRating` component from
`@adobe-commerce/elsie/components`; its labels use the `Dropin.StarRating`
translation namespace.
Distribution percentages use `ratingVotesCount`, round to whole percentages,
and treat missing star buckets as zero. They are not percentages of the
potentially larger text-review count. The overall rating uses `ratingSummary / 20`;
the displayed count uses `reviewCount`. With no rating votes, the component shows
the review count (and "Not rated" for existing text reviews) rather than inventing
a customer score. The summary uses a container query: it stacks by default and
places the rating beside the distribution when its own content area is at least
768px wide, independently of the viewport. It also supports right-to-left layout.
Its bar and count colors use the SDK's `--color-informational-500`
and `--color-positive-800` tokens, respectively.
The container makes no requests. It keeps an in-memory statistics snapshot for
its active SKU while mounted, retaining it through items-only results, loading,
and pagination errors. A successful response with statistics replaces it.
An explicit `stats: null`, unavailable product, new SKU request, or changed scope
clears it; zero-count statistics remain valid. Without a snapshot or active loading it renders
nothing, including no wrapper.

Pass the same `scope` to ReviewSummary, Review, Pagination, and
`getProductReviews()` for one review group. Different scopes have independent
snapshots, even for the same SKU; omitting scope uses the default event stream.
Use a new scope when changing the storefront/store context to avoid replaying
events from the previous context. There is no shared, persistent, or cross-scope
cache. Removing the container discards its snapshot: mount it before pagination
starts and request statistics again when mounting a new summary if the last
result no longer includes them. Merchants decide whether to mount the summary
and enable `withStats` on the initial request; an integration without a summary
should leave it `false`. The sandbox hides, rather than unmounts, its summary
when the checkbox is unchecked, preserving its snapshot for re-enabling.
Choose
**Fixtures** for deterministic cases and sample reviews without contacting the
live backend.

The **Write a review** card opens the WriteReview form on demand, as a storefront
would inside its modal. **Signed in** switches the shopper state. Fixtures start
with guest reviews off, so signed-out shoppers see the sign-in prompt; add
`&guests=1` to the URL to allow guests. In fixture mode a submit succeeds after a
short delay. In live mode it creates a real review that awaits moderation.

The Case selector controls the review list:

| Case | Result |
| --- | --- |
| Two reviews | Two review rows. |
| Six reviews | Six review rows. |
| One review | One review row. |
| No reviews | An empty review list. |
| Product unavailable | The review list shows its unavailable state. |
| Reviews request error | The reviews request fails. Review shows its retry action; this case continues failing on retry. |
| Delayed data | The reviews request takes three seconds. The review skeleton stays visible until it resolves. Reload the page to replay the delay. |
| Reviews disabled | Review and Pagination render nothing. |
| Paged reviews (synthetic) | Eleven reviews across six pages at page size two, including a partial last page. |
| Customer six-page presentation | Page 2 initially selected; all six numbers and themed controls via the public Pagination Slot. |
| Delayed page transition | Subsequent review pages take one second; existing bounds remain visible but disabled. |
| Page failure then retry | Page 2 fails once per SKU/page-size context; retry or select it again to recover. |
| Out-of-range recovery | An empty page 9 of 6 offers an explicit return-to-first-page action. |

Malformed responses remain covered by automated tests rather than duplicate
dropdown options. Removed or unknown case URLs fall back to Two reviews.

### Review Container

```js
import { getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { Review } from '@dropins/storefront-ratings-reviews/containers/Review.js';

// Use the initialized provider and endpoint setup shown below.
// The storefront block makes the request; Review reacts to the published events.
getProductReviews('ADB102', { pageSize: 20, currentPage: 1 })
  .catch(() => undefined);
await provider.render(Review, {})(document.getElementById('product-reviews'));
```

Review renders escaped author, summary, body, rating, and date fields. It respects
shared review enablement and provides localized empty/unavailable/error states
with retry. It does not fetch: `getProductReviews()` publishes `reviews/request`,
`reviews/loading`, `reviews/result`, and `reviews/error` events, and Review
subscribes to them. Pass the same `scope` to both to keep several review groups
on one page independent. Only the newest request in a scope publishes its outcome,
so stale page responses are ignored. The heading is "Reviews" unless the host
passes a `totalCount` prop with the approved total. It is never inferred from
page metadata. Each review's own score uses Elsie's presentational `StarRating`
component. Hosts rendering their own ratings should import it directly from
`@adobe-commerce/elsie/components`; this drop-in no longer exports it.

When migrating from the local component, replace `ratingsreviews-star-rating*`
CSS selectors with `dropin-star-rating*` selectors and move `Rating.*` translation
overrides to `Dropin.StarRating.*`. Elsie supplies the default translations through
the existing UI provider and rounds scores consistently to one decimal place.
SDK integration examples are available under **SDK / StarRating** in Storybook.
The separate `StarRatingInput` component is unchanged.

The Review example shares the main sandbox's initialization and endpoint.
Storybook includes deterministic Review states and custom Slots examples.

The verified QA schema has no review ID, badge exposure, helpfulness API,
media, or sort argument. Optional aggregate counts and ratings are available via
`getProductReviews(sku, { withStats: true })` on schemas exposing `reviews.stats`.
GraphQL validates those fields even when the directive skips them, so an older
schema without `stats` cannot execute this query. Voting and badges are out of scope for
ACCS-1472 because the backend does not support them. No preview badges or
simulated production votes are included. Sorting controls,
photos, submission, and PDP integration are separate work.

### Product Review reCAPTCHA Foundation

The shared reCAPTCHA dependency and internal token helper are available for the
separately developed review form. Configuration belongs to the integration and
shared library, not this drop-in. See the
[form integration handoff](src/docs/product-review-recaptcha.md) for branch,
initialization, submission, and validation instructions. No review form or
submission API is included yet.

### Pagination Container

Pagination is a thin subscriber that uses the SDK Pagination component. Like
Review, it reacts to the `reviews/*` events published by `getProductReviews()`
and requests another page by calling `getProductReviews()` with the same
`scope`. The storefront block makes the first request:

```js
import { getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { Pagination } from '@dropins/storefront-ratings-reviews/containers/Pagination.js';

getProductReviews('ADB102', { pageSize: 20, currentPage: 1 }).catch(() => undefined);
await provider.render(Pagination, {})(document.getElementById('review-pagination'));
```

See **Containers / Pagination / Reference** in Storybook for the full example,
props, and reactive `Pagination`/`Loading` Slots. The pager is hidden until a
request is published; zero/single-page results hide controls. Known bounds
remain stable but disabled during transitions, and an unknown first page shows a
skeleton. Empty out-of-range pages have an explicit first-page recovery action.
SKU/page-size changes clear bounds; call `getProductReviews()` again for page 1.
Aggregate counts never determine page bounds. Hidden states retain a stable
wrapper so the SDK render handle can reveal pagination again through `setProps`,
without remounting. Pass a `scope` to Review, Pagination, and
`getProductReviews()` to keep several review lists on one page independent.

The sandbox offers synthetic multi-page, delayed transition, fail-once/retry,
and out-of-range cases. Use **Reviews per page**, **First review page**, and
**Customer pager** controls to exercise updates without remounting containers.
For the customer mockup, open
http://127.0.0.1:3000/?mode=fixture&case=customer or Storybook's
**Containers / Pagination / Customer Six Page Pagination**. Page 2 of 6 starts
selected, with all six numbers and themed rounded-square controls.

The customer example shares `examples/html-host/customer-pagination.js` and
`customer-pagination.css` with Storybook. It is a public Slot example, not a
change to the SDK's page window. It shows every page up to six and slides a
six-page window for larger collections. English demo labels and
illustrative theme colors should be replaced with approved consumer values.
Photos/helpfulness from the mockup remain out of scope. PDP/EDS wiring remains
ACCS-1475. Pagination adds no events or caches of its own; it requests pages
through `getProductReviews()`.

### WriteReview Container

The host must check `config.getConfig()?.isProductReviewsEnabled === true`
after initialization before rendering the review section, its heading, and the
button that opens `WriteReview` in a modal. `WriteReview` does not enforce this
feature flag itself. The HTML sandbox demonstrates this host-side guard.

The container still honors `allowGuestsToWriteProductReviews`: signed-out
shoppers see a sign-in prompt instead of the form when guest reviews are disabled,
and rating metadata is not requested for that state.

### Browser validation

With the built sandbox running on ports 3000 and 3002, run:

```sh
npm --prefix cypress run test:ci
```

Fixture-sandbox checks live in `cypress/src/tests/sandbox.spec.js`. Mocked API
integration checks live in `cypress/src/tests/mockDataIntegrationTests/` and
share GraphQL setup from `cypress/src/support/graphql.js`. The mocked endpoint
is derived from Cypress `baseUrl`. These tests cover the built public exports,
Slots, in-place prop updates, request states, escaping, accessibility, and
mobile/right-to-left layouts.

### Generate New UI Component

```bash
pnpm exec elsie generate component --pathname <MyUIComponent>
```

### Generate New API Function

```bash
pnpm exec elsie generate api --pathname <myApiFunction>
```

### Generate New Frontend Container

```bash
pnpm exec elsie generate container --pathname <MyContainer>
```

Replace the placeholders with your component, API, or container name. Use
PascalCase for components and containers, and camelCase for API functions.

### Run Unit Tests

```bash
pnpm run test
```

### Run Linting

```bash
pnpm run lint
```

### Run Browser Tests

```bash
npm --prefix cypress ci
pnpm run build
pnpm run dev
```

With the sandbox, asset server, and Storybook running, use another terminal:

```bash
npm --prefix cypress run test:ci
```

These tests check built-package sandbox behavior and every new Storybook entry.
They use deterministic fixtures, fail on browser exceptions and console errors,
and include an automated accessibility scan and mobile/RTL screenshots. Run
`pnpm run test:ci` separately for package metadata tests and the existing 100%
unit coverage gate. Cypress remains a separate npm project with its own lockfile.

### Build Production Bundles

```bash
pnpm run build
```

The build uses the checked-in Ratings & Reviews configuration and generates a
validated `dist/package.json`, license, README, and changelog. Pack `dist`, not
the repository root. See [Release operations](./RELEASE.md) for shared workflows,
artifact checks, and alpha/stable publishing.

`pnpm run format:check` checks release tooling: package/changeset configuration,
workflow YAML, packaging scripts, and the release runbook. It does not impose a
new formatting baseline on existing application code.

### Create a Changeset

```bash
pnpm run changeset
```
