# @dropins/storefront-company-management

## 1.3.0

### Minor Changes

- 812978b: Implemented company hierarchy functionality with tree view displaying parent-child relationships and drag-and-drop support for structure management. Added GraphQL APIs for retrieving hierarchy (getCompanyHierarchy), assigning (assignChildCompany), and unassigning (unassignChildCompany) child companies. Integrated permission checks with visual distinction between root and child companies, expand/collapse node support, and loading/error state handling.
- 4f14206: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- 931c25f: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- ac5cf51: Bump storefront SDK stable version

## 1.3.0-beta.3

### Patch Changes

- ac5cf51: Bump storefront SDK stable version

## 1.3.0-beta.2

### Patch Changes

- 931c25f: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.3.0-beta.1

### Minor Changes

- 812978b: Implemented company hierarchy functionality with tree view displaying parent-child relationships and drag-and-drop support for structure management. Added GraphQL APIs for retrieving hierarchy (getCompanyHierarchy), assigning (assignChildCompany), and unassigning (unassignChildCompany) child companies. Integrated permission checks with visual distinction between root and child companies, expand/collapse node support, and loading/error state handling.

## 1.3.0-beta.0

### Minor Changes

- 4f14206: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

## 1.2.0

### Minor Changes

- f1a97ea: fix: Adapted the initializer to be used as the same way than the other drop-ins

### Patch Changes

- a158c8b: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

- 8fa4950: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0
- d04bbf6: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.

## 1.2.0-beta.1

### Patch Changes

- 8fa4950: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.2.0-beta.0

### Minor Changes

- f1a97ea: fix: Adapted the initializer to be used as the same way than the other drop-ins

### Patch Changes

- a158c8b: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

- d04bbf6: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
