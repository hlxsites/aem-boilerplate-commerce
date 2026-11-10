# Customer reviews

Authentication-gated account history and complete details provided by Account's
`ProductReviews` container and presentational `ProductReviewDetails` component.
The Account API fetches `customer.reviews`; Ratings/Reviews is not required.

## Temporary testing mode

The approval-capability gate is removed for integration testing. All reviews
returned by the backend can appear, including pending and rejected reviews.
Authentication and merchant review enablement remain enforced.
This does not satisfy the approved-only AC of ACCS-1479 and must not be released
until [ACCS-2303](https://jira.corp.adobe.com/browse/ACCS-2303) is resolved and
approved-only behavior passes QA.

## Authoring

| Commerce Customer Reviews | |
| --- | --- |
| Page size | 10 |

Page size is optional, defaults to 10, and must be an integer from 1 to 50.
Add this block in the main account column and `Commerce Account Sidebar` in the
sidebar column. The sidebar accepts an optional `Fragment` row. Its default
remains `/customer/sidebar-fragment`. Add My Product Reviews to the merchant's
existing sidebar fragment, linking to the authored reviews page, and preserve
the other sidebar entries.

Merge translated `Account.ProductReviews.*` labels into the existing Account
placeholder sheet without replacing other Account labels.

No approval-capability row is required on either block.

## Behavior and integration

- Uses the shared Account/auth initializer and token
  headers. No separate customer token or persisted review cache is introduced.
- Sign-out redirects to the existing login route. Authentication changes
  invalidate selected details, old rows, and outstanding requests.
- Reviews are unavailable when merchant review enablement is disabled. The
  corresponding authored sidebar entry is hidden; other entries are unaffected.
- Product names, images, and links temporarily use the supported deprecated
  `ProductReview.product` reference. Missing products retain their reviews.
  Links use the shared `getProductLink` helper and canonical storefront routing.
  Products without a URL key retain their names without a link.
  No Catalog enrichment or second detail query is used.
- Details are an in-memory selection on the same account page. Refresh returns
  to the list; there is no fabricated review ID or durable details URL.
- The table scrolls within a keyboard-accessible, labeled region on narrow
  screens. Back restores focus to the originating See Details action.
- Account renders average and criterion stars with the SDK. Its optional
  `ReviewDetails` slot is customization only; no Ratings bridge is installed.
  The host removes its render instance and authentication listener on unmount.
  Do not wire this block to the public `reviews/*` PDP event stream.
- Both blocks read the normalized `productReviewsEnabled` flag directly through
  Account's existing `getStoreConfig` API. Account owns the GraphQL query,
  normalization, caching policy, and error handling. Configuration errors
  propagate from that API. Use an Account package that exposes this boolean.

The backend **must** exclude unapproved reviews and other customers' reviews.
The payload does not expose moderation status, so frontend filtering cannot
enforce approval. ACCS testing confirmed that native customer history includes
pending/rejected reviews. Server-side approval filtering is tracked in
[ACCS-2303](https://jira.corp.adobe.com/browse/ACCS-2303), which blocks ACCS-1479.
There is currently no frontend approval gate or approval filtering.

## Validation

Run lint from the repository root:

```sh
npm run lint
```

During interim testing, verify that reviews render without an approval-capability
row, including all approval states returned by the backend. Verify that merchant
disablement hides the sidebar entry and disables review loading, and that
logged-out access redirects to login.

Before release, verify customer isolation, approved-only filtering, paging, and
nullability against the target endpoint. Complete signed-in QA
acceptance, including moderation changes, empty history, and customer switching.
Use approved, pending, and rejected reviews across multiple pages and at least
two customers. Verify that only the authenticated customer's approved reviews
appear, pagination excludes unapproved reviews, and fresh requests reflect
approval and rejection changes.
Author the reviews page and sidebar fragment in the CMS, merge localized
placeholder rows, and verify the feature preview. Local demo pages are not
part of this integration.
