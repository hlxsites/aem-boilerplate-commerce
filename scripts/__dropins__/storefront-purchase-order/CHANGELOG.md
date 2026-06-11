# @dropins/storefront-purchase-order

## 1.2.0

### Minor Changes

- ec5b9f8: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- d2240ff: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- d88f96a: Bump commerce packages to latest stable version

## 1.2.0-beta.1

### Patch Changes

- d2240ff: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.2.0-beta.0

### Minor Changes

- ec5b9f8: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

## 1.1.1

### Patch Changes

- 97390d9: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 58d381a: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0
- 0fe9577: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- d233102: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

## 1.1.1-beta.2

### Patch Changes

- 58d381a: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 1.1.1-beta.1

### Patch Changes

- 0fe9577: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 1.1.1-beta.0

### Patch Changes

- 97390d9: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- d233102: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.
