# dropin-template

## 1.1.0-alpha-20261109171322

### Minor Changes

- 00ad504: Add the Ratings and Reviews drop-in scaffold and store configuration API. Fetch product review settings once during initialization and expose shared review enablement and guest submission flags, with retry support when initialization fails.
- d27ae9e: Add a review Pagination container with SDK controls, loading states, reactive
  customization Slots, and explicit out-of-range recovery. Pagination subscribes to
  the `reviews/*` events published by `getProductReviews()` and requests other
  pages through it, with event scopes for independent review lists. Add paged
  sandbox fixtures and customer six-page pagination examples in the sandbox and
  Storybook.
- 86ab127: Add a read-only Review container and an event-driven paged product-review API.
  `getProductReviews()` publishes scoped `reviews/*` events, so Review reacts to
  them instead of fetching. Includes escaped shopper text, individual ratings,
  localized states, retry, and responsive layout. Expose customization Slots for
  Review and include deterministic Storybook and HTML-host examples. Voting and
  badges are not included.
- 008c52d: Add optional product review statistics through `getProductReviews()`'s
  `withStats` option and a read-only ReviewSummary component and container.
  Display rating distribution, aggregate score, and review count with SDK stars,
  loading skeletons, localization, RTL support, and container-responsive layout.

  Retain statistics in memory for the active product and event scope while
  containers are mounted. Pagination omits statistics on subsequent requests,
  while retries preserve the failed request's statistics flag. Derive the Review
  heading and slot count from API statistics instead of a `totalCount` input prop.
  Include updated HTML-host controls, fixtures, Storybook examples, and
  integration documentation.

### Patch Changes

- ab54909: Prepare public alpha and stable npm deployments through shared Commerce
  workflows, with reproducible pnpm installation, validated distribution metadata,
  and release-tooling tests. Automatic publishing remains dry-run gated until
  maintainers approve activation.

  Upgrade to Elsie 3 and its supported configuration and tooling APIs to align
  pnpm installation with shared workflows v7. Synchronize sandbox tools and
  Storybook's MSW worker with the SDK.

- 9601507: Prepare native product-review reCAPTCHA integration with the shared Adobe
  reCAPTCHA dependency, an Auth-style internal token-header helper, focused tests,
  and integration instructions for the separately developed review form. Leave
  configuration and script lifecycle management with the boilerplate and shared
  library.

## 1.0.1

### Patch Changes

- 5a636b1: Fixes the Provider to merge user-provided langDefinitions with the drop-in's default definitions, enabling label/placeholder overrides via the initializer API.

## 1.0.0

### Major Changes

- 26a336c: ## Initial stable release (1.0.0)

  This release marks the first stable version of the dropin template, incorporating all foundational work since the initial scaffold.

  ### Features
  - **Environment variable support**: `elsie.js` and Storybook's `preview.js` now dynamically pick up environment variables at runtime
  - **Codebase cleanup**: Removed unnecessary sandbox code to keep the template lean and focused
  - **GraphQL schema validation**: Added a CI workflow that validates GraphQL operations on every pull request, including improved parsing of HTML fragments in PR descriptions and more specific PR description endpoint link format detection

  ### Improvements
  - Updated Node.js engine requirement to `^20.0.0 || ^22.0.0`
  - Fixed and cleaned up `tsconfig.json` (removed `sourceMap` option)
  - Upgraded all core SDK dependencies (`@adobe-commerce/elsie`, `@adobe-commerce/event-bus`, `@adobe-commerce/fetch-graphql`, `@adobe-commerce/storefront-design`, `@dropins/build-tools`) to their latest stable releases
  - Updated README with comprehensive dropin documentation and prerequisites

  ### CI/CD
  - Added PR build workflows on Ubuntu and Windows (`pr-build.yaml`, `pr-build-windows.yaml`)
  - Integrated Changesets for automated changelog generation and version management
