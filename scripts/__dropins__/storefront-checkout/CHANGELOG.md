# @dropins/storefront-checkout

## 3.5.0-alpha-20261009071806

### Minor Changes

- 10831b4: Migrate the package manager from Yarn to pnpm (including the nested
  `cypress/` sub-project), as part of bumping `@adobe-commerce/elsie` to
  `3.0.0-alpha-20261005095410`.

  - Add `pnpm-workspace.yaml` (root and `cypress/`) with `minimumReleaseAge` and
    `allowBuilds` settings; remove `yarn.lock`/`.yarnrc` in favor of
    `pnpm-lock.yaml`.
  - Bump every `adobe-commerce/storefront-workflows` reusable workflow reference
    from `@v6` to `@v7` across `.github/workflows/*.yaml` — v7 is the version
    that understands this repo's `pnpm-lock.yaml` for CI dependency
    installation.
  - Route `test:ci` through `elsie test` instead of the raw `jest` binary, since
    pnpm's isolated linker doesn't hoist elsie's transitive jest binary the way
    a local install does.
  - Move the dropin config from `.elsie.cjs` to `elsie.config.js`.
  - Update shared config imports from `@adobe-commerce/elsie/config/*`
    (singular) to `@adobe-commerce/elsie/configs/*` (plural): ESLint, Jest,
    Prettier, Vite, and tsconfig.
  - Rewrite `eslint.config.js` to compose layers via `defineConfig(...)` instead
    of the removed `createConfig()` factory.
  - Rewrite `jest.config.js` to use `defineConfig({ preset: 'preact' })` instead
    of the removed `environment` option, merging elsie's own
    `moduleNameMapper`/`setupFiles` instead of overwriting them.
  - Rewrite `.storybook/main.js` to use the shared `createConfig()` Storybook
    factory.
  - Update test files to import `jest`/`describe`/`it`/`expect`/lifecycle hooks
    explicitly from `@adobe-commerce/elsie/tests`(`/dom`|`/preact`) instead of
    relying on removed ambient Jest globals.
  - Replace `@adobe-commerce/elsie/lib/signals` (removed in v3) with
    `@preact/signals` directly.
  - Bump `preact` to `~10.29.7`, add `@preact/signals`,
    `@testing-library/preact`, `vite`, and `vite-tsconfig-paths` as direct
    dependencies now that elsie v3 treats them as peer dependencies instead of
    bundling them.
  - Add `@storybook/preact-vite` as a direct devDependency, since story files
    import `Meta`/`StoryObj` types from it directly.
  - Add `playwright` as a direct devDependency, pinned to the version elsie
    itself depends on, so the Storybook CI job's Playwright install step
    resolves a `node_modules/.bin/playwright` deterministically instead of
    relying on `npx`/`pnpm exec` bin-resolution behavior.
  - Add `axe-playwright` as a direct devDependency, matching elsie's own
    version, since `.storybook/test-runner.ts` imports it directly and pnpm's
    isolated linker doesn't expose it otherwise.
  - Apply the Prettier formatting elsie v3's shared config requires (no logic
    changes).

### Patch Changes

- c93fb13: Bump `@adobe-commerce/elsie` to `3.0.0-alpha-20261008154140` and
  `@dropins/build-tools` to `1.2.2-alpha-20261008154140`.

  The consolidated `containers.js` build pass (see
  `consolidate-container-entries` in `@adobe-commerce/elsie`) now builds
  `api.js`, `fragments.js`, and `components.js` as real entries alongside the
  per-container pass, so every container — whether imported from
  `containers/<Name>.js` or from the consolidated `containers.js` — resolves the
  same sibling modules instead of each pass bundling its own copy.

  `examples/html-host` now imports storefront-checkout containers from the
  consolidated `containers.js` entry instead of deep per-container paths:

  ```diff
  - import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
  + import { PaymentMethods } from '@dropins/storefront-checkout/containers.js';
  ```

  Also disable shipping method options while a cart update is in flight when
  `UIComponentType` is `ToggleButton`. `ShippingMethods` already passed
  `disabled={busy}` to the `RadioButton` variant, but the `ToggleButton` variant
  never forwarded it. The busy wrapper only applies `opacity: 0.4` and
  `pointer-events: none`, and `pointer-events` does not block the keyboard — so
  while a request was pending a keyboard user could still tab into a toggle
  button and change the shipping method, while a mouse user could not.
  `disabled` now lives in the shared props both variants spread, so they behave
  the same.

  This also removes a latent flake in the Storybook accessibility suite. WCAG
  exempts inactive components from the contrast minimum, and axe honors that
  exemption via `disabled`. Without it, the dimmed toggle button text was
  reported as a `color-contrast` violation whenever axe happened to run before
  the mock response landed. Because the busy state is now correctly exempt, the
  `color-contrast` rule no longer has to be switched off for the `Busy` story,
  and a `BusyWithToggleButton` story covers the previously untested combination.

  Fix a `ReferenceError: Cannot access '...' before initialization` that broke
  the entire consolidated `containers.js` module at import time.
  `PaymentMethods/handlers.tsx` imported `PaymentOnAccount` and `PurchaseOrder`
  from the containers barrel (`@/checkout/containers`) instead of from their own
  modules. In the per-container build this is harmless — each container is its
  own bundle — but the consolidated build bundles the whole barrel together, and
  `handlers.tsx`'s own top-level `HANDLERS_CONFIG` object (which references both
  components) ended up placed before their declarations in evaluation order,
  throwing on every page load. `handlers.tsx` now imports both containers
  directly from their own modules, matching how every other sibling container
  import already worked.

## 3.4.0

## 3.4.0-beta.0

### Minor Changes

- 0f18430: Add support for selecting company address book addresses at checkout
  via `company_address_id`
- 62b0922: Expose `has_available_free_gifts` to `CHECKOUT_DATA_FRAGMENT` and
  `Cart` to support SalesRuleFreeGift and allow users to do free gift selection
  on checkout page.

### Patch Changes

- 6fd0a0c: Update the B2B Payment on Account "error exceed" E2E assertion to
  verify that the checkout error panel is surfaced and the order is blocked,
  instead of asserting the exact credit-limit message text. The backend
  currently returns a generic `UNABLE_TO_PLACE_ORDER` ("A server error stopped
  your order from being placed") from `placeOrder` rather than the specific
  "Payment On Account cannot be used for this order because your order amount
  exceeds your credit amount" message. Tracked in
  <https://jira.corp.adobe.com/browse/AC-18156>. The test keeps verifying that
  over-limit orders are rejected while the backend issue is resolved.

## 3.3.1

### Patch Changes

- f036a88: Fix accessibility issue where the payment method radio buttons were
  not associated with their "Payment" group label. Screen readers now announce
  the group label and the correct index count for each option (WCAG 1.3.1 - Info
  and Relationships).
- 969a366: Add a visually-hidden "Shipping option" prefix to each shipping
  method radio's accessible name (WCAG 2.4.6), so its purpose is clear to screen
  reader users without relying on the surrounding "Shipping options" heading.
- 301e4f4: Bump SDK stable versions

## 3.3.1-beta.1

### Patch Changes

- 301e4f4: Bump SDK stable versions

## 3.3.1-beta.0

### Patch Changes

- f036a88: Fix accessibility issue where the payment method radio buttons were
  not associated with their "Payment" group label. Screen readers now announce
  the group label and the correct index count for each option (WCAG 1.3.1 - Info
  and Relationships).
- 969a366: Add a visually-hidden "Shipping option" prefix to each shipping
  method radio's accessible name (WCAG 2.4.6), so its purpose is clear to screen
  reader users without relying on the surrounding "Shipping options" heading.

## 3.3.0

### Minor Changes

- 551ddae: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- a1517e1: Add `checkout/layout` extension hook to allow customizing the
  checkout page structure (reorder, hide, move, group, or inject sections)
  without modifying the base block code. Includes a `custom-layout` example
  extension.
- 90e7dcc: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- ab1424a: Bump to StorefrontSDK stable version
- 15c9fdc: Replace deprecated grid gap properties in checkout block CSS
- b946af8: Fix custom vite config compatibility with elsie

## 3.3.0-beta.3

### Patch Changes

- ab1424a: Bump to StorefrontSDK stable version

## 3.3.0-beta.2

### Patch Changes

- b946af8: Fix custom vite config compatibility with elsie

## 3.3.0-beta.1

### Patch Changes

- 90e7dcc: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 3.3.0-beta.0

### Minor Changes

- 551ddae: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- a1517e1: Add `checkout/layout` extension hook to allow customizing the
  checkout page structure (reorder, hide, move, group, or inject sections)
  without modifying the base block code. Includes a `custom-layout` example
  extension.
- 15c9fdc: Replace deprecated grid gap properties in checkout block CSS

## 3.2.1

### Patch Changes

- 5c0df16: Pass `additionalData` to `setPaymentMethodOnCart` to support Payment
  Services vault and other methods requiring extra mutation fields.

## 3.2.1-beta.0

### Patch Changes

- 5c0df16: Pass `additionalData` to `setPaymentMethodOnCart` to support Payment
  Services vault and other methods requiring extra mutation fields.

## 3.2.0

### Minor Changes

- 4796173: Added a new ShippingMethodItem slot to the ShippingMethods container
  that allows merchants to fully replace the default shipping method UI. The
  slot context provides the method data, selection state, and an onSelect
  callback to trigger the API call, enabling complete control over the shipping
  method appearance via ctx.replaceWith().
- f1a2904: Add GraphQL extensibility to the `estimateShippingMethods` mutation
  via the new `EstimateShippingModel` model and the
  new`ESTIMATE_SHIPPING_METHOD_FRAGMENT` fragment.

### Patch Changes

- 3cf1727: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 0cb9bf0: fix: temporary fix to pass cypress tests...USPS shipping method was
  deprecated on January
- 0b7fe40: Update checkout/shipping-methods-render hook to include render
  function in context.
- 6c31c8d: Added checkout/shipping-methods-render hook and
  custom-shipping-methods extension sample.
- 6b892f1: Use SDK extension manager in commerce-checkout-with-extensions block.
- 9c782c9: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 0cb9bf0: fix: temporary fix to pass cypress tests...USPS shipping method was
  deprecated on January

## 3.2.0-beta.1

### Patch Changes

- 9c782c9: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 3.2.0-beta.0

### Minor Changes

- 4796173: Added a new ShippingMethodItem slot to the ShippingMethods container
  that allows merchants to fully replace the default shipping method UI. The
  slot context provides the method data, selection state, and an onSelect
  callback to trigger the API call, enabling complete control over the shipping
  method appearance via ctx.replaceWith().
- f1a2904: Add GraphQL extensibility to the `estimateShippingMethods` mutation
  via the new `EstimateShippingModel` model and the
  new`ESTIMATE_SHIPPING_METHOD_FRAGMENT` fragment.

### Patch Changes

- 3cf1727: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 0b7fe40: Update checkout/shipping-methods-render hook to include render
  function in context.
- 6c31c8d: Added checkout/shipping-methods-render hook and
  custom-shipping-methods extension sample.
- 6b892f1: Use SDK extension manager in commerce-checkout-with-extensions block.
