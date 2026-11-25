# @dropins/storefront-quick-order

## 1.2.0-alpha-20261125095217-2fbb813

### Minor Changes

- d7c47d4: Load containers through the consolidated `containers.js` bundle
  instead of each container's individual entry point. This replaces one request
  per container with a single request, which reduces request pressure on EDS.
  The per-container entry points remain available for backwards compatibility.

## 1.1.1

### Patch Changes

- 6539677: Migrate the root package and Cypress project from Yarn to pnpm with
  hardened installs, and upgrade `@adobe-commerce/elsie` to
  `3.0.0-alpha-20261015092237`. Update the shared build, TypeScript, ESLint,
  Prettier, Jest, and Storybook configurations and use Elsie's bundled
  development tools and test helpers instead of redundant direct dependencies.
- cf38cdd: updated actions configs in quick-order

## 1.1.1-beta.0

### Patch Changes

- 6539677: Migrate the root package and Cypress project from Yarn to pnpm with
  hardened installs, and upgrade `@adobe-commerce/elsie` to
  `3.0.0-alpha-20261015092237`. Update the shared build, TypeScript, ESLint,
  Prettier, Jest, and Storybook configurations and use Elsie's bundled
  development tools and test helpers instead of redundant direct dependencies.
- cf38cdd: updated actions configs in quick-order

## 1.1.1-alpha-20260618171901

### Patch Changes

- acd520e: Migrate GitHub workflows to shared v6 templates and restore changeset
  scripts/configuration
