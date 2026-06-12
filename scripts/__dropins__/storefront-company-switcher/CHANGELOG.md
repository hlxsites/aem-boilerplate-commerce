# @dropins/storefront-company-switcher

## 1.2.0

### Minor Changes

- 3fbf7de: Add optional `size` prop on `CompanySwitcher` (and `useCompanyData`) to control GraphQL `customer.companies` `pageSize`, defaulting to 100 instead of the API’s typical cap of 20. `getCustomerCompanyInfo` accepts `{ size }` and caches per page size. Restore `CustomerFragment` for extensibility; `GET_CUSTOMER_COMPANIES` uses operation variable `$pageSize`.
- 4860a42: Migrate to Node.js 24 LTS

  Minimum required Node.js version is now 24. Updated engines.node from >=20 to >=24.

- 46ca833: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- 6a8cf99: Bump storefront SDK stable version
- 4ba4949: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.2.0-beta.3

### Patch Changes

- 6a8cf99: Bump storefront SDK stable version

## 1.2.0-beta.2

### Patch Changes

- 4ba4949: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.2.0-beta.1

### Minor Changes

- 46ca833: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

## 1.2.0-beta.0

### Minor Changes

- 3fbf7de: Add optional `size` prop on `CompanySwitcher` (and `useCompanyData`) to control GraphQL `customer.companies` `pageSize`, defaulting to 100 instead of the API’s typical cap of 20. `getCustomerCompanyInfo` accepts `{ size }` and caches per page size. Restore `CustomerFragment` for extensibility; `GET_CUSTOMER_COMPANIES` uses operation variable `$pageSize`.

## 1.1.1

### Patch Changes

- 0499d70: Bump "@adobe-commerce/elsie" from 1.8.0-beta0 to 1.8.0-beta1
- 1de9f29: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- d9d1c6a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0
- 7343c2e: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

- d2368e4: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 1.1.1-beta.3

### Patch Changes

- d2368e4: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 1.1.1-beta.2

### Patch Changes

- 0499d70: Bump "@adobe-commerce/elsie" from 1.8.0-beta0 to 1.8.0-beta1

## 1.1.1-beta.1

### Patch Changes

- d9d1c6a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.0

### Patch Changes

- 1de9f29: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 7343c2e: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.
