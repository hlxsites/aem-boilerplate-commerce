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
| Minified view | false |
| Reviews page | /customer/reviews |

Page size is optional, defaults to 10 (3 in minified view), and must be an integer
from 1 to 50. Full view includes the page heading, review details, and paging.
Minified view uses a level-two Recent reviews heading and responsive review
summary cards, omits detail and paging controls, and includes a View all reviews
card linking to Reviews page.
These options require an Account package that supports `minifiedView` and
`routeReviewsList`.

Reviews page accepts a plain root-relative path, localized to the storefront
root, or an HTTP(S) link, used as authored without adding a locale prefix.

### Account landing page

Add a second instance of this block to the main column of the authored Account
landing page alongside the existing minified Orders and Addresses blocks:

| Commerce Customer Reviews | |
| --- | --- |
| Minified view | true |
| Page size | 3 |
| Reviews page | /customer/reviews |

This is authored content, not automatic insertion by the page decorator. Keep full
view on the
dedicated reviews page; no separate details page is needed.
Set that page's metadata Title to My Product Reviews rather than retaining the
title of a copied Account page.

### Sidebar and translations

Add this block in the main account column and `Commerce Account Sidebar` in the
sidebar column. The sidebar loads `/customer/sidebar-fragment`. Add My Product
Reviews to the merchant's
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
  The block follows the EDS document lifecycle without observing DOM removal.
  Render failures clean up the view and authentication listener before propagating.
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
- Account renders average and criterion stars with the SDK. Detail labels
  distinguish the customer's own ratings inline: `Average of your ratings:` and
  `Your {{name}} rating:` (for example, `Your Quality rating:`).
  The average comes from this review's API `average_rating`, normalized from
  a percentage to five stars. It is calculated from the review's criteria,
  not submitted separately and not a product-wide aggregate.
  Its optional `ReviewDetails` slot is customization only; no Ratings bridge is
  installed.
  Do not wire this block to the public `reviews/*` PDP event stream.
- Both blocks read the normalized `productReviewsEnabled` flag directly through
  Account's existing `getStoreConfig` API. Account owns the GraphQL query,
  normalization, caching policy, and error handling. Configuration errors
  propagate from that API. Use an Account package that exposes this boolean.

Account requests `customer.reviews` with `filter: { status: [APPROVED] }` for
both the full history and minified landing summary. The backend excludes
pending and rejected (`NOT_APPROVED`) reviews before paging and calculating
`page_info`; the selected details come from that same approved-only page.
The payload does not expose moderation status, so there is no client-side
status filtering or pagination adjustment.

Use an Account package that sends this filter and an endpoint implementing
the contract documented in
[ACCS-2303](https://jira.corp.adobe.com/browse/ACCS-2303). Unfiltered requests
still return all statuses. An unsupported filter must surface through Account's
normal error state, not retry without filtering. No authored approval-capability
row is needed.

## Validation

Run lint from the repository root:

```sh
npm run lint
```

Verify that requests include only the `APPROVED` status filter, including
subsequent pages and the minified summary. Verify that merchant disablement
hides the sidebar entry and disables review loading, and that logged-out access
redirects to login.

Before release, verify customer isolation, approved-only filtering, paging, and
nullability against the target endpoint. Complete signed-in QA
acceptance, including moderation changes, empty history, and customer switching.
Use approved, pending, and rejected reviews across multiple pages and at least
two customers. Verify that only the authenticated customer's approved reviews
appear, pagination excludes unapproved reviews, and fresh requests reflect
approval and rejection changes.
Customers with only pending/rejected reviews must see the empty state, not
unapproved entries or extra pages. Unsupported backends must show an error,
never unfiltered history.
Author the reviews page and sidebar fragment in the CMS, merge localized
placeholder rows, and verify the feature preview. Local demo pages are not
part of this integration.

Also verify that the landing summary has a level-two heading, no paging or
See Details controls, and a working View all reviews link to the authored reviews
page. Verify full list, detail, and Back focus behavior at mobile and desktop
widths.
