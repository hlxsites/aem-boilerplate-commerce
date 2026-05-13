# @dropins/storefront-cart

## 3.2.1-alpha-20260513100936

### Patch Changes

- 8f18e5f: Fixed bug due to a case-sensitive SKU comparison in addProductsToCart() that caused items to be silently excluded from ACDL data collection events. The sku input (lowercase) was compared against item.topLevelSku (uppercase) using strict equality, so the filter always returned false. Both values are now normalized with .toUpperCase() before comparison.

## 3.2.0

### Minor Changes

- 9bccbf3: Add `includeOutOfStockItems` flag to CartSummaryList

### Patch Changes

- 8b1717f: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- 6344765: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 967b99e: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.3

### Patch Changes

- 967b99e: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 8b1717f: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Minor Changes

- 9bccbf3: Add `includeOutOfStockItems` flag to CartSummaryList

## 3.1.1-beta.0

### Patch Changes

- 6344765: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
