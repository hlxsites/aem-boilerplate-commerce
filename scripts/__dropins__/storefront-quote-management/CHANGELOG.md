# @dropins/storefront-quote-management

## 1.2.0

### Minor Changes

- 9dde3ae: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- 21852ff: Bump commerce packages to latest
- d9eb120: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.2.0-beta.1

### Patch Changes

- d9eb120: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.2.0-beta.0

### Minor Changes

- 9dde3ae: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

## 1.1.2

### Patch Changes

- 0dd15e3: Make package public

## 1.1.1

### Patch Changes

- 2ee05ac: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided langDefinitions with the drop-in's bundled defaults before passing them to UIProvider. This enables label/placeholder overrides via the initializer API.

- c1aa431: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 214719a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.1

### Patch Changes

- 214719a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.0

### Patch Changes

- 2ee05ac: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided langDefinitions with the drop-in's bundled defaults before passing them to UIProvider. This enables label/placeholder overrides via the initializer API.

- c1aa431: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
