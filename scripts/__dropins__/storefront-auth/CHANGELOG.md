# @dropins/storefront-auth

## 4.0.1

### Patch Changes

- 0a4341a: Bump SDK stable versions
- 857e7aa: Fix visual heading text not marked as heading across sign in, sign up, reset password and update password forms
- 5b8e0df: Fix incorrect and missing `autocomplete` attributes on form fields.

  The email field on sign in, sign in popover, forgot password, and create account previously used `autocomplete="username"`, which does not tell browsers and password managers the field expects an email address. It now uses `autocomplete="email"`.

  The first name and last name fields on create account were missing an `autocomplete` attribute entirely; they now use `given-name` and `family-name` respectively.

  The password and confirm password fields on the sign up form used incorrect/invalid `autocomplete` values (`current-password` and `confirmPassword`, the latter not a valid HTML5 token). Both now use `new-password`, the correct value for a field that sets a new password.

  This helps browsers and assistive technology correctly identify the purpose of each field, making autofill and form-filling easier for everyone, including people using screen readers or who have difficulty typing.

- 57f64d7: Fix VALIDATE_TOKEN query incompatibility with ACCS.

  The token validation query previously included `customer { group { uid } }`, a field not available in ACCS backends, causing a schema error during drop-in initialization.

  The query is now split into two variants:

  - A minimal ACCS-compatible query used by default
  - A query that includes `group { uid }` for Adobe Commerce Optimizer (ACO) price book resolution, used only when `adobeCommerceOptimizer: true` is set in the init config

  No changes are required for existing implementations. Merchants not using ACO are unaffected. Merchants using ACO continue to receive the `auth/group-uid` event as before.

## 4.0.1-beta.1

### Patch Changes

- 0a4341a: Bump SDK stable versions

## 4.0.1-beta.0

### Patch Changes

- 857e7aa: Fix visual heading text not marked as heading across sign in, sign up, reset password and update password forms
- 5b8e0df: Fix incorrect and missing `autocomplete` attributes on form fields.

  The email field on sign in, sign in popover, forgot password, and create account previously used `autocomplete="username"`, which does not tell browsers and password managers the field expects an email address. It now uses `autocomplete="email"`.

  The first name and last name fields on create account were missing an `autocomplete` attribute entirely; they now use `given-name` and `family-name` respectively.

  The password and confirm password fields on the sign up form used incorrect/invalid `autocomplete` values (`current-password` and `confirmPassword`, the latter not a valid HTML5 token). Both now use `new-password`, the correct value for a field that sets a new password.

  This helps browsers and assistive technology correctly identify the purpose of each field, making autofill and form-filling easier for everyone, including people using screen readers or who have difficulty typing.

- 57f64d7: Fix VALIDATE_TOKEN query incompatibility with ACCS.

  The token validation query previously included `customer { group { uid } }`, a field not available in ACCS backends, causing a schema error during drop-in initialization.

  The query is now split into two variants:

  - A minimal ACCS-compatible query used by default
  - A query that includes `group { uid }` for Adobe Commerce Optimizer (ACO) price book resolution, used only when `adobeCommerceOptimizer: true` is set in the init config

  No changes are required for existing implementations. Merchants not using ACO are unaffected. Merchants using ACO continue to receive the `auth/group-uid` event as before.

## 4.0.0

### Major Changes

- 515ce05: Add support for Remote Shopping Assistance feature that enables store administrators to help customers with purchases. The implementation includes admin session management via JWT token validation, a consent UI component for customer approval, and enhanced cookie security with proper encoding and SameSite protection for all authentication cookies

### Minor Changes

- f208291: Upgraded Elsie package to use the 1.9.0-beta.0 version
- f208291: Migrate to Node.js 24 LTS

  Minimum required Node.js version is now 24. Updated engines.node from >=20 to >=24.

- 572b81a: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- f208291: Ensure `getCustomerRolePermissions` always emits `auth/permissions` so consumers (e.g. account navigation) keep working. For non-admin customers with no granular ACL tree from GraphQL, set `Magento_Sales::place_order` so storefront checkout does not treat B2C users as denied.
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

- 515ce05: Add support for Remote Shopping Assistance feature that enables store administrators to help customers with purchases. The implementation includes admin session management via JWT token validation, a consent UI component for customer approval, and enhanced cookie security with proper encoding and SameSite protection for all authentication cookies

## 3.3.0-beta.2

### Minor Changes

- 572b81a: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

## 3.3.0-beta.1

### Minor Changes

- 1703268: Upgraded Elsie package to use the 1.9.0-beta.0 version

## 3.3.0-beta.0

### Patch Changes

- 3cadf48: Ensure `getCustomerRolePermissions` always emits `auth/permissions` so consumers (e.g. account navigation) keep working. For non-admin customers with no granular ACL tree from GraphQL, set `Magento_Sales::place_order` so storefront checkout does not treat B2C users as denied.

## 3.2.0

### Minor Changes

- e880d43: Adds missing slot props to the Reset Password Container.
- 901ad98: Introduced slots for Title, Form and Buttons sections in all containers to enhance flexibility and customization

### Patch Changes

- 323dd52: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- fc20311: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0

## 3.2.0-beta.1

### Patch Changes

- fc20311: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0

## 3.2.0-beta.0

### Minor Changes

- e880d43: Adds missing slot props to the Reset Password Container.
- 901ad98: Introduced slots for Title, Form and Buttons sections in all containers to enhance flexibility and customization

### Patch Changes

- 323dd52: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
