# @dropins/storefront-pdp

## 3.4.0-alpha-20261009110457

### Minor Changes

- 684a7c5: Bump `@adobe-commerce/elsie` to `3.0.0-alpha-20261009083558` and
  `@dropins/build-tools` to `1.2.2-alpha-20261009083558`.

  `elsie build` now also emits a consolidated `containers.js` entry exporting
  every container by name, alongside the existing per-container files. EDS
  enforces a 200 req/s per-IP rate limit, and a storefront page using several of
  PDP's containers previously paid for one HTTP request per container.

  `examples/html-host` now imports PDP containers from the consolidated
  `containers.js` entry instead of deep per-container paths:

  ```diff
  - import ProductHeader from '@dropins/storefront-pdp/containers/ProductHeader.js';
  - import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
  + import { ProductHeader, ProductPrice } from '@dropins/storefront-pdp/containers.js';
  ```

  Non-breaking — `containers.js` is built as a fully separate pass alongside the
  existing per-container files, so deep imports keep working unchanged. Both
  paths resolve the same sibling `api.js`/`components.js` modules instead of
  each pass bundling its own copy.

- 4b7a9aa: Add a typed data model for the `ac_customizable_options` product
  attribute (Magento Customizable Options: priced selectable choices and
  shopper-input fields). Adds `getCustomizableOptionsAttribute()` in
  `useProductData` for typed, JSON-string-or-object-safe access, coercing string
  `price` fields to numbers, and exports `isCustomOptionUID` from
  `getRefinedProduct` for reuse.
- bd4f3a7: Render priced selectable customizable options
  (drop_down/radio/checkbox/multiple) from the `ac_customizable_options` product
  attribute. Adds a `CustomizableOptions` component and
  `ProductCustomizableOptions` container, and wires an equivalent
  `renderCustomizableOptions()` into the deprecated `ProductDetails`/`Product`
  components. Selecting a value toggles its `custom-option/<optionId>/<valueId>`
  UID in `values.optionsUIDs`; required options are shown with a "Required"
  label. Products with no `ac_customizable_options` attribute render nothing
  extra. Required-option enforcement/Add-to-Cart gating and a live price-delta
  preview are out of scope for this change and tracked separately.
- a5e4a7e: Support text, multiline text, date, local date-time, and time
  customizable options in both PDP rendering paths. Preserve entered option UIDs
  and values alongside selectable options and bundle quantities, and display a
  disabled placeholder for file options.

### Patch Changes

- 6279b98: Fix two issues surfaced by the consolidated `containers.js` build
  pass (see `consolidate-container-entries` in `@adobe-commerce/elsie` and
  `3.4.0-alpha-20261009090133`'s changeset).

  1. `src/components/Product/Product.tsx` — part of the `components.js` bundle —
     imported the `CarouselConfig` type from the `@/pdp/containers` barrel
     instead of from its defining module (`@/pdp/containers/ProductDetails`).
     The consolidated build now bundles the whole `containers.js` barrel
     together, and that barrel itself imports `components.js` as a sibling
     module, so importing back from `components.js` into `containers.js` created
     a `components.js -> containers.js -> components.js` cycle — the same class
     of bug fixed in `storefront-checkout`'s `PaymentMethods/handlers.tsx`
     (`ReferenceError: Cannot access '...' before initialization` breaking the
     entire consolidated module at import time).

     `Product.tsx` now imports `CarouselConfig` directly from
     `@/pdp/containers/ProductDetails` as an explicit `import type`, matching
     how every other sibling container import already works and ensuring the
     import is erased at compile time regardless of the bundler's cross-file
     analysis, since `CarouselConfig` is only ever used as a type here.

  2. Normalize `optionsUIDs` in `setProductConfigurationValues` so product
     configuration values can never hold a non-string option UID.
     `ValuesModel.optionsUIDs` is contractually `string[]`, and consumers
     forward it verbatim into `selected_options: [ID!]` on `addProductsToCart`.
     A single non-string entry therefore failed the whole mutation with an
     opaque `ID cannot represent a non-string and non-integer value` error. In
     the Adobe Commerce storefront this surfaced as the cart "Edit" modal never
     closing: updating a configurable product's options from the mini-cart
     removes and re-adds the line, the re-add mutation was rejected, the
     container rendered an error alert, and the still-open `<dialog>` blocked
     every subsequent interaction with the page.

     `setProductConfigurationValues` is the only write path for these values, so
     the check lives there rather than at each call site. Entries shaped like
     `{ uid }` are unwrapped to their UID, anything else is dropped, and the
     offending entries are logged so the caller responsible stays visible
     instead of silently corrupting the cart payload.

- b489882: Fix accessibility issues in the product image preview modal: keyboard
  focus is now trapped inside the dialog while open and restored to the trigger
  on close, and the carousel slide indicators now expose their selected state to
  assistive technology and meet minimum color contrast requirements.
- 8307ce4: Upgrade `@adobe-commerce/elsie` from `~1.9.0` to
  `3.0.0-alpha-20261007160511` and migrate the repository from Yarn to pnpm
  11.17.0. This combines the v1→v2 and v2→v3 elsie toolchain migrations:
  `.elsie.js` moves to `elsie.config.js`, `.eslintrc.js` is replaced by a flat
  `eslint.config.js` composed from Elsie's named layers, `jest.config.js` uses
  the `defineConfig({ preset: 'preact' })` factory, and
  `prettier.config.js`/Husky are replaced by the `"prettier"` package.json key,
  Elsie's `format`/`format:check` scripts, and a native `.githooks/pre-commit`
  hook. Tests import `render`/`fireEvent`/etc. from
  `@adobe-commerce/elsie/tests/preact` instead of the removed
  `@adobe-commerce/elsie/lib/tests`. The pnpm migration adds a seven-day
  dependency release-age gate (`minimumReleaseAge`) and explicit build-script
  permissions (`allowBuilds`) in `pnpm-workspace.yaml`, for both the package
  root and the `cypress/` sub-project. Storybook resolves its framework, addons,
  and a11y test-runner hooks through Elsie's `storybook/config` and
  `storybook/test-runner` entry points.

  Because Elsie now supplies `axe-playwright`, the Storybook accessibility
  checks run for the first time and surfaced a contrast issue in the regular
  price shown next to a special price. `.pdp-price__amount--grey` and
  `.pdp-product__price--grey` used `--color-neutral-500`, documented in the
  design system as "Disabled text" and measuring 1.95:1 against white. Both now
  use `--color-neutral-700` ("Secondary text"), measuring 5.7:1 and meeting the
  WCAG 2 AA 4.5:1 minimum. The affected element is meaningful content labelled
  `Regular Price` for assistive technology, not a disabled control.

## 3.3.2

### Patch Changes

- 7f8f874: Exclude custom-option UIDs from the `refineProduct`/variants request
  in `getRefinedProduct`. Catalog Service only resolves variants by
  configurable-attribute UIDs; sending a custom-option UID alongside them caused
  a "Missing variants" error, which made the PDP silently fall back to the
  parent product's data — including its image gallery — instead of the selected
  variant's. This only affects configurable products that also have a custom
  option selected; other product types are unaffected.

## 3.3.2-beta.0

### Patch Changes

- 7f8f874: Exclude custom-option UIDs from the `refineProduct`/variants request
  in `getRefinedProduct`. Catalog Service only resolves variants by
  configurable-attribute UIDs; sending a custom-option UID alongside them caused
  a "Missing variants" error, which made the PDP silently fall back to the
  parent product's data — including its image gallery — instead of the selected
  variant's. This only affects configurable products that also have a custom
  option selected; other product types are unaffected.

## 3.3.1

### Patch Changes

- 1385284: Always render the top-level quantity `Incrementer` (`ProductQuantity`
  and the monolith quantity slot), including for bundle products. Per-option
  bundle quantities in `Swatches` write
  `bundleOptionQuantities`/`enteredOptions`, which describe bundle composition,
  not how many bundles to add to cart — hiding the top-level control left
  `values.quantity` fixed at its initial value with no way for shoppers to
  change it.

## 3.3.0

### Minor Changes

- 3a3bfc1: Respect per-option `canEditQuantity` for bundle option quantities on
  the PDP.

  - **Transform:** Read `canEditQuantity` from `ProductViewOptionValueProduct`
    values (now included in the GraphQL fragment) and expose it on each bundle
    option value in the model.
  - **Swatches:** Render a quantity `Incrementer` for selected bundle option
    values; enabled when `canEditQuantity` is true, disabled when false or
    unset. Hide `ProductQuantity` (and the monolith quantity slot) when
    `isBundle` so shoppers do not see two quantity controls.
  - **Configuration:** Sync `bundleOptionQuantities` and `enteredOptions` on
    bundle init and when selections change; keep both shapes aligned in
    `setProductConfigurationValues`.

### Patch Changes

- a6f404d: Fix accessibility issue where the product name and "Details" section
  title were rendered as plain `<div>` text instead of headings, so screen
  reader users could not navigate to them by heading (WCAG 1.3.1 - Info and
  Relationships).
- 2413664: Make the ProductGallery main image keyboard-operable when it opens
  the image preview overlay (WCAG 2.1.1 Keyboard, Level A).

  - **ProductGallery:** In the non-`zoom` (overlay) path, expose the clickable
    main image as a control with `role="button"`, `tabindex="0"`, and an
    `onKeyDown` handler so it can be activated with Enter and Space, not just
    clicked. The interactive attributes are only applied to the displayed layer;
    the `aria-hidden` crossfade layer stays non-interactive and unfocusable.
  - **Tests:** Add coverage asserting the main image is focusable, exposed as a
    button, and opens the preview overlay via Enter and Space.

## 3.3.0-beta.1

### Minor Changes

- 3a3bfc1: Respect per-option `canEditQuantity` for bundle option quantities on
  the PDP.

  - **Transform:** Read `canEditQuantity` from `ProductViewOptionValueProduct`
    values (now included in the GraphQL fragment) and expose it on each bundle
    option value in the model.
  - **Swatches:** Render a quantity `Incrementer` for selected bundle option
    values; enabled when `canEditQuantity` is true, disabled when false or
    unset. Hide `ProductQuantity` (and the monolith quantity slot) when
    `isBundle` so shoppers do not see two quantity controls.
  - **Configuration:** Sync `bundleOptionQuantities` and `enteredOptions` on
    bundle init and when selections change; keep both shapes aligned in
    `setProductConfigurationValues`.

### Patch Changes

- a6f404d: Fix accessibility issue where the product name and "Details" section
  title were rendered as plain `<div>` text instead of headings, so screen
  reader users could not navigate to them by heading (WCAG 1.3.1 - Info and
  Relationships).
- 2413664: Make the ProductGallery main image keyboard-operable when it opens
  the image preview overlay (WCAG 2.1.1 Keyboard, Level A).

  - **ProductGallery:** In the non-`zoom` (overlay) path, expose the clickable
    main image as a control with `role="button"`, `tabindex="0"`, and an
    `onKeyDown` handler so it can be activated with Enter and Space, not just
    clicked. The interactive attributes are only applied to the displayed layer;
    the `aria-hidden` crossfade layer stays non-interactive and unfocusable.
  - **Tests:** Add coverage asserting the main image is focusable, exposed as a
    button, and opens the preview overlay via Enter and Space.

## 3.2.0

### Minor Changes

- 763e5f9: Use the correct control when multi is true vs false so bundle options
  work without storefront customization.

  - **multi === false:** Keep the existing single-select dropdown (`Picker`) for
    dropdown-type options; swatches unchanged for text/image/color.
  - **multi === true:** Render Elsie `Checkbox` per option value (no radio or
    multi-select dropdown OOTB).
  - **Swatches:** Selection state is either `{ label, value }` (single) or
    `{ label, values[] }` (multi); validation and labels updated accordingly.
  - **Data / API:** `selectionMapToOptionUIDs` flattens selections and, when
    given `data.options`, orders UIDs by option groups; bundle completion uses
    “every required group has ≥1 child UID,” not `uids.length === option count`.
  - **Containers:** `ProductOptions`, `ProductDetails`, and `initialize` use the
    shared helpers for payloads, validity, and placeholder filtering.
  - **`getOptionUIDs` (bundles):** Prefer client `optionUIDs` when present;
    support multiple defaults when `multi` is true.
  - **Tests:** Checkbox coverage for `multiple`, lib unit tests, and
    `ProductDetails` expectation aligned with stable UID order.

- 5c5be95: Add jest-preset-preact to devDependencies to fix test execution under
  Yarn Berry
- f59e497: Bump @adobe-commerce/elsie to 1.9.0-beta.0 and upgrade CI workflows
  to storefront-workflows v6 (Node 24)

### Patch Changes

- a48fbe2: Bump @adobe-commerce/elsie from ~1.5.0 to ~1.8.1 to reduce HTTP
  request count via SDK bundle optimizations
- 1889117: Bump StorefrontSDK dependencies to their stable releases:
  `@adobe-commerce/elsie` to ~1.9.0, `@adobe-commerce/event-bus` to ~1.1.0,
  `@adobe-commerce/fetch-graphql` to ~1.3.0, `@adobe-commerce/recaptcha` to
  ~1.2.0, and `@adobe-commerce/storefront-design` to ~1.1.0. The elsie 1.9.0
  build tooling reduces the drop-in's HTTP request count via SDK bundle
  optimizations.
- ceaba76: Bump @adobe-commerce/elsie to 1.9.0-beta.1, which lowers the minimum
  Node.js requirement back to 22 LTS. Relax `engines.node` to `>=22` and align
  `.nvmrc` to 22.12.0.
- b58d460: Bump @adobe-commerce/elsie to 1.9.0-beta.3, which includes the SDK
  fix for generating `api.js` and `fragments.js` during the build process.
- dc086a9: Resolve axios and flatted CVEs via yarn resolutions

## 3.2.0-beta.4

### Patch Changes

- 1889117: Bump StorefrontSDK dependencies to their stable releases:
  `@adobe-commerce/elsie` to ~1.9.0, `@adobe-commerce/event-bus` to ~1.1.0,
  `@adobe-commerce/fetch-graphql` to ~1.3.0, `@adobe-commerce/recaptcha` to
  ~1.2.0, and `@adobe-commerce/storefront-design` to ~1.1.0. The elsie 1.9.0
  build tooling reduces the drop-in's HTTP request count via SDK bundle
  optimizations.

## 3.2.0-beta.3

### Patch Changes

- b58d460: Bump @adobe-commerce/elsie to 1.9.0-beta.3, which includes the SDK
  fix for generating `api.js` and `fragments.js` during the build process.

## 3.2.0-beta.2

### Patch Changes

- ceaba76: Bump @adobe-commerce/elsie to 1.9.0-beta.1, which lowers the minimum
  Node.js requirement back to 22 LTS. Relax `engines.node` to `>=22` and align
  `.nvmrc` to 22.12.0.

## 3.2.0-beta.1

### Minor Changes

- 763e5f9: Use the correct control when multi is true vs false so bundle options
  work without storefront customization.

  - **multi === false:** Keep the existing single-select dropdown (`Picker`) for
    dropdown-type options; swatches unchanged for text/image/color.
  - **multi === true:** Render Elsie `Checkbox` per option value (no radio or
    multi-select dropdown OOTB).
  - **Swatches:** Selection state is either `{ label, value }` (single) or
    `{ label, values[] }` (multi); validation and labels updated accordingly.
  - **Data / API:** `selectionMapToOptionUIDs` flattens selections and, when
    given `data.options`, orders UIDs by option groups; bundle completion uses
    “every required group has ≥1 child UID,” not `uids.length === option count`.
  - **Containers:** `ProductOptions`, `ProductDetails`, and `initialize` use the
    shared helpers for payloads, validity, and placeholder filtering.
  - **`getOptionUIDs` (bundles):** Prefer client `optionUIDs` when present;
    support multiple defaults when `multi` is true.
  - **Tests:** Checkbox coverage for `multiple`, lib unit tests, and
    `ProductDetails` expectation aligned with stable UID order.

- f59e497: Bump @adobe-commerce/elsie to 1.9.0-beta.0 and upgrade CI workflows
  to storefront-workflows v6 (Node 24)

## 3.1.0

### Minor Changes

- 5c5be95: Add jest-preset-preact to devDependencies to fix test execution under
  Yarn Berry

### Patch Changes

- dc086a9: Resolve axios and flatted CVEs via yarn resolutions
