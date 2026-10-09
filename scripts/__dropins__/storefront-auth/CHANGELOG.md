# @dropins/storefront-auth

## 4.2.0-alpha-20261009084849

### Minor Changes

- 7db8c65: Bump `@dropins/build-tools` to `1.2.2-alpha-20261009083558` and
  `@adobe-commerce/elsie` to `3.0.0-alpha-20261009083558`.

  Update `examples/html-host` to import from the new consolidated
  `containers.js` entry instead of deep per-container paths:

  ```diff
  - import SignIn from '@dropins/storefront-auth/containers/SignIn.js';
  - import { SuccessNotification } from '@dropins/storefront-auth/containers/SuccessNotification.js';
  + import { SignIn, SuccessNotification } from '@dropins/storefront-auth/containers.js';
  ```

  Non-breaking — `containers.js` is built as a fully separate pass alongside the
  existing per-container files, so deep imports keep working unchanged.

### Patch Changes

- d86d865: Fix Sign In, Sign Up, Forgot Password, and Update Password forms
  getting stuck permanently in their loading state (spinner never stops, fields
  stay disabled, no error shown) when the underlying API request fails at the
  network level (offline, DNS/timeout, CORS, blocked).

  `handleNetworkError` intentionally re-throws after emitting an `auth/error`
  event, but `submitLogInUser`, `onSubmitSignUp`, `submitResetPassword`, and
  `submitUpdatePassword` awaited their API calls with no `try/catch/finally`, so
  the loading state was never reset when the awaited promise rejected. All four
  now wrap their async logic in `try/catch/finally` and surface a generic error
  message instead of hanging.

- 506d56e: Migrate the repo's dev toolchain to `@adobe-commerce/elsie@3.x`,
  following the SDK's `elsie-migration` skill playbook. This touches build,
  lint, and test configuration only; the published package's runtime behavior is
  unchanged.

  - Bump `@adobe-commerce/elsie` to v3 and `preact` to `~10.29.7`; add
    `@preact/signals` as a direct dependency (elsie's runtime now requires it as
    a peer).
  - Update `config/` → `configs/` paths across `tsconfig.json`, the `prettier`
    field, ESLint, Jest, and Storybook.
  - Replace the removed ESLint `createConfig()` factory with the new layered
    `defineConfig(...)` API, and restore Cypress globals (`cy`, `Cypress`)
    directly via `eslint-plugin-cypress`.
  - Switch Jest's `environment` option to `preset: 'preact'` and explicitly pass
    the `@/auth/*` path alias, since it is no longer auto-derived.
  - Update every test file to import `describe`/`it`/`test`/`expect`/lifecycle
    hooks/`jest` explicitly from `@adobe-commerce/elsie/tests/preact` instead of
    relying on ambient Jest globals or the removed
    `@adobe-commerce/elsie/lib/tests` entry point.
  - Replace `(fn as jest.Mock)` casts with `jest.mocked(fn)` where Jest 30's
    stricter mock typing required it.
  - Migrate the v1-era `.elsie.cjs` config file to `elsie.config.mjs`.
  - Update `.storybook/main.js` to use the shared `createConfig()` factory and
    route scripts through `elsie storybook [mode]`.
  - Replace 2 direct `preact-i18n` imports with `@adobe-commerce/elsie/i18n` to
    satisfy the (already-active) import restriction.
  - Switch the package manager from npm to pnpm (`pnpm-workspace.yaml`,
    `pnpm-lock.yaml`, `minimumReleaseAge`/`allowBuilds` hardening), including
    the nested `cypress/` sub-project, which gets its own pnpm workspace root.
  - Bump the shared `storefront-workflows` reusable CI workflows from `v6` to
    `v7` across all 9 workflow files (`v7`'s `setup-environment` is pnpm-only).
    `v7`'s lint-and-unit-tests workflow also enforces `format:check`, so the
    whole repo was reformatted with `elsie format` to pass it (purely cosmetic
    changes — quote style, trailing commas, line wrapping) and a pre-existing
    malformed closing tag in `examples/html-host/test/update-password.html` was
    fixed (it broke Prettier's HTML parser).

## 4.1.0

## 4.1.0-beta.0

### Minor Changes

- ee60ca1: Clear customer auth state when switching websites with per-website
  account sharing

  Token provenance is persisted in the `auth_dropin_website_code` cookie,
  written when the token is issued and sharing its lifetime and scope.
  `initialize()` compares it against a fresh `storeConfig`, so the check does
  not depend on the `storeConfig` UI cache and also works in newly opened tabs.

### Patch Changes

- 050f562: Adds AGENTS.md file used for guidance for AI coding agents
- d86b5f6: Fix the "Loading" state on sign in, sign up, forgot password and
  update password submit buttons not being announced by screen readers. The
  button now exposes `aria-busy` and a persistent, visually-hidden live region
  announces the loading status instead of it being missed when the visual
  spinner mounts and unmounts (WCAG 4.1.3).

## 4.0.1

### Patch Changes

- 0a4341a: Bump SDK stable versions
- 857e7aa: Fix visual heading text not marked as heading across sign in, sign
  up, reset password and update password forms
- 5b8e0df: Fix incorrect and missing `autocomplete` attributes on form fields.

  The email field on sign in, sign in popover, forgot password, and create
  account previously used `autocomplete="username"`, which does not tell
  browsers and password managers the field expects an email address. It now uses
  `autocomplete="email"`.

  The first name and last name fields on create account were missing an
  `autocomplete` attribute entirely; they now use `given-name` and `family-name`
  respectively.

  The password and confirm password fields on the sign up form used
  incorrect/invalid `autocomplete` values (`current-password` and
  `confirmPassword`, the latter not a valid HTML5 token). Both now use
  `new-password`, the correct value for a field that sets a new password.

  This helps browsers and assistive technology correctly identify the purpose of
  each field, making autofill and form-filling easier for everyone, including
  people using screen readers or who have difficulty typing.

- 57f64d7: Fix VALIDATE_TOKEN query incompatibility with ACCS.

  The token validation query previously included `customer { group { uid } }`, a
  field not available in ACCS backends, causing a schema error during drop-in
  initialization.

  The query is now split into two variants:

  - A minimal ACCS-compatible query used by default
  - A query that includes `group { uid }` for Adobe Commerce Optimizer (ACO)
    price book resolution, used only when `adobeCommerceOptimizer: true` is set
    in the init config

  No changes are required for existing implementations. Merchants not using ACO
  are unaffected. Merchants using ACO continue to receive the `auth/group-uid`
  event as before.

## 4.0.1-beta.1

### Patch Changes

- 0a4341a: Bump SDK stable versions

## 4.0.1-beta.0

### Patch Changes

- 857e7aa: Fix visual heading text not marked as heading across sign in, sign
  up, reset password and update password forms
- 5b8e0df: Fix incorrect and missing `autocomplete` attributes on form fields.

  The email field on sign in, sign in popover, forgot password, and create
  account previously used `autocomplete="username"`, which does not tell
  browsers and password managers the field expects an email address. It now uses
  `autocomplete="email"`.

  The first name and last name fields on create account were missing an
  `autocomplete` attribute entirely; they now use `given-name` and `family-name`
  respectively.

  The password and confirm password fields on the sign up form used
  incorrect/invalid `autocomplete` values (`current-password` and
  `confirmPassword`, the latter not a valid HTML5 token). Both now use
  `new-password`, the correct value for a field that sets a new password.

  This helps browsers and assistive technology correctly identify the purpose of
  each field, making autofill and form-filling easier for everyone, including
  people using screen readers or who have difficulty typing.

- 57f64d7: Fix VALIDATE_TOKEN query incompatibility with ACCS.

  The token validation query previously included `customer { group { uid } }`, a
  field not available in ACCS backends, causing a schema error during drop-in
  initialization.

  The query is now split into two variants:

  - A minimal ACCS-compatible query used by default
  - A query that includes `group { uid }` for Adobe Commerce Optimizer (ACO)
    price book resolution, used only when `adobeCommerceOptimizer: true` is set
    in the init config

  No changes are required for existing implementations. Merchants not using ACO
  are unaffected. Merchants using ACO continue to receive the `auth/group-uid`
  event as before.

## 4.0.0

### Major Changes

- 515ce05: Add support for Remote Shopping Assistance feature that enables store
  administrators to help customers with purchases. The implementation includes
  admin session management via JWT token validation, a consent UI component for
  customer approval, and enhanced cookie security with proper encoding and
  SameSite protection for all authentication cookies

### Minor Changes

- f208291: Upgraded Elsie package to use the 1.9.0-beta.0 version
- f208291: Migrate to Node.js 24 LTS

  Minimum required Node.js version is now 24. Updated engines.node from >=20
  to >=24.

- 572b81a: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- f208291: Ensure `getCustomerRolePermissions` always emits `auth/permissions`
  so consumers (e.g. account navigation) keep working. For non-admin customers
  with no granular ACL tree from GraphQL, set `Magento_Sales::place_order` so
  storefront checkout does not treat B2C users as denied.
- 2870239: Bump to StorefrontSDK stable version
- 1c0576b: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.5

### Patch Changes

- 2870239: Bump to StorefrontSDK stable version

## 4.0.0-beta.4

### Patch Changes

- 1c0576b: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.3

### Major Changes

- 515ce05: Add support for Remote Shopping Assistance feature that enables store
  administrators to help customers with purchases. The implementation includes
  admin session management via JWT token validation, a consent UI component for
  customer approval, and enhanced cookie security with proper encoding and
  SameSite protection for all authentication cookies

## 3.3.0-beta.2

### Minor Changes

- 572b81a: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

## 3.3.0-beta.1

### Minor Changes

- 1703268: Upgraded Elsie package to use the 1.9.0-beta.0 version

## 3.3.0-beta.0

### Patch Changes

- 3cadf48: Ensure `getCustomerRolePermissions` always emits `auth/permissions`
  so consumers (e.g. account navigation) keep working. For non-admin customers
  with no granular ACL tree from GraphQL, set `Magento_Sales::place_order` so
  storefront checkout does not treat B2C users as denied.

## 3.2.0

### Minor Changes

- e880d43: Adds missing slot props to the Reset Password Container.
- 901ad98: Introduced slots for Title, Form and Buttons sections in all
  containers to enhance flexibility and customization

### Patch Changes

- 323dd52: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- fc20311: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0

## 3.2.0-beta.1

### Patch Changes

- fc20311: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0

## 3.2.0-beta.0

### Minor Changes

- e880d43: Adds missing slot props to the Reset Password Container.
- 901ad98: Introduced slots for Title, Form and Buttons sections in all
  containers to enhance flexibility and customization

### Patch Changes

- 323dd52: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
