# @dropins/storefront-cart

## 3.3.1

### Patch Changes

- dbad14c: Fix item gift wrapping charge not being removed when unchecking "Gift wrap this item" in the cart.
- f722ec8: Read the GraphQL endpoint from config instead of hardcoded URLs in Cypress tests and standalone examples, and increase the Cypress CI job timeout
- 300f74a: Fix controls that shared the same accessible name for different actions (WCAG 2.4.6).

  - The "Apply" buttons for estimated shipping, discount code, and gift card now have distinct accessible names ("Apply destination", "Apply discount code", "Apply gift card") instead of all announcing the same generic "Apply".
  - The "Gift options" accordion trigger for each cart item now includes the product name in its accessible name, so multiple items in the cart don't share the same "Gift options" label.

  This helps screen reader users tell apart controls that look and read the same but perform different actions.

- 9da18cf: Fix missing `autocomplete` attributes on the estimated shipping form fields (WCAG 1.3.5).

  The country dropdown, state dropdown/input, and zip code field in the cart's "Estimated shipping" section had no `autocomplete` attribute. They now use `country-name`, `address-level1`, and `postal-code` respectively.

  This helps browsers and assistive technology correctly identify the purpose of each field, making autofill and form-filling easier for everyone, including people using screen readers or who have difficulty typing.

- 9dba382: Fix visual heading text not marked as heading in Cart and Mini Cart
- 7fe0e71: fix(MiniCart): prevent footer (Checkout/View Cart) from being pushed off-screen at reduced viewport height (WCAG 1.4.10/1.4.4)
- f028c84: Mark the gift wrapping modal's title as a heading (`<h2>`) instead of a plain `<span>`, so it's announced correctly by screen readers. Also removes the dead wrapper `<div>` and hand-rolled focus trap around `GiftOptionModal` — `Modal` renders through a `Portal` that moves its content to `document.body`, so that wrapper and its focus logic were operating on an empty, disconnected element and never actually did anything.
- 320734f: Bump SDK stable versions
- 9d0b6f6: Remove the `useFocusTrap` hook and its barrel export. Its only consumer was the `GiftOptionModal` wrapper `<div>` removed in a previous PR (that wrapper was disconnected from the rendered DOM — `Modal` renders through a `Portal` to `document.body` — so the hook never actually did anything). Also removes the last leftover `ariaLabelModal*` translation keys from the example host's Spanish locale that only that same removed code used.
- 0578bec: Fix missing text alternative on CheckWithCircle icon in GiftOptions accordion title (WCAG 1.1.1)

## 3.3.1-beta.1

### Patch Changes

- 320734f: Bump SDK stable versions

## 3.3.1-beta.0

### Patch Changes

- dbad14c: Fix item gift wrapping charge not being removed when unchecking "Gift wrap this item" in the cart.
- f722ec8: Read the GraphQL endpoint from config instead of hardcoded URLs in Cypress tests and standalone examples, and increase the Cypress CI job timeout
- 300f74a: Fix controls that shared the same accessible name for different actions (WCAG 2.4.6).

  - The "Apply" buttons for estimated shipping, discount code, and gift card now have distinct accessible names ("Apply destination", "Apply discount code", "Apply gift card") instead of all announcing the same generic "Apply".
  - The "Gift options" accordion trigger for each cart item now includes the product name in its accessible name, so multiple items in the cart don't share the same "Gift options" label.

  This helps screen reader users tell apart controls that look and read the same but perform different actions.

- 9da18cf: Fix missing `autocomplete` attributes on the estimated shipping form fields (WCAG 1.3.5).

  The country dropdown, state dropdown/input, and zip code field in the cart's "Estimated shipping" section had no `autocomplete` attribute. They now use `country-name`, `address-level1`, and `postal-code` respectively.

  This helps browsers and assistive technology correctly identify the purpose of each field, making autofill and form-filling easier for everyone, including people using screen readers or who have difficulty typing.

- 9dba382: Fix visual heading text not marked as heading in Cart and Mini Cart
- 7fe0e71: fix(MiniCart): prevent footer (Checkout/View Cart) from being pushed off-screen at reduced viewport height (WCAG 1.4.10/1.4.4)
- f028c84: Mark the gift wrapping modal's title as a heading (`<h2>`) instead of a plain `<span>`, so it's announced correctly by screen readers. Also removes the dead wrapper `<div>` and hand-rolled focus trap around `GiftOptionModal` — `Modal` renders through a `Portal` that moves its content to `document.body`, so that wrapper and its focus logic were operating on an empty, disconnected element and never actually did anything.
- 9d0b6f6: Remove the `useFocusTrap` hook and its barrel export. Its only consumer was the `GiftOptionModal` wrapper `<div>` removed in a previous PR (that wrapper was disconnected from the rendered DOM — `Modal` renders through a `Portal` to `document.body` — so the hook never actually did anything). Also removes the last leftover `ariaLabelModal*` translation keys from the example host's Spanish locale that only that same removed code used.
- 0578bec: Fix missing text alternative on CheckWithCircle icon in GiftOptions accordion title (WCAG 1.1.1)

## 3.3.0

### Minor Changes

- 9974a25: Added `confirmBeforeDelete` prop to `CartSummaryList` and `MiniCart`. When enabled, clicking the remove button shows an inline confirmation banner before the item is deleted, rather than removing it immediately. A custom `ConfirmDeleteBanner` slot is available on both containers for full rendering control.

  Extended `enableUpdateItemQuantity` on `CartSummaryList` and `enableQuantityUpdate` on `MiniCart` to accept `boolean | { removeOnZero?: boolean }`. When `removeOnZero` is not explicitly set to `true`, setting the quantity to `0` via the input is a no-op — the item is not removed. Explicit removal actions (trash button, confirm-delete, out-of-stock removal) are unaffected.

- d4b49bb: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- bbb8b80: Bump to StorefrontSDK stable version
- b9c309e: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- 855a803: Fixed bug due to a case-sensitive SKU comparison in addProductsToCart() that caused items to be silently excluded from ACDL data collection events. The sku input (lowercase) was compared against item.topLevelSku (uppercase) using strict equality, so the filter always returned false. Both values are now normalized with .toUpperCase() before comparison.

## 3.3.0-beta.2

### Patch Changes

- bbb8b80: Bump to StorefrontSDK stable version

## 3.3.0-beta.1

### Patch Changes

- b9c309e: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 3.3.0-beta.0

### Minor Changes

- 9974a25: Added `confirmBeforeDelete` prop to `CartSummaryList` and `MiniCart`. When enabled, clicking the remove button shows an inline confirmation banner before the item is deleted, rather than removing it immediately. A custom `ConfirmDeleteBanner` slot is available on both containers for full rendering control.

  Extended `enableUpdateItemQuantity` on `CartSummaryList` and `enableQuantityUpdate` on `MiniCart` to accept `boolean | { removeOnZero?: boolean }`. When `removeOnZero` is not explicitly set to `true`, setting the quantity to `0` via the input is a no-op — the item is not removed. Explicit removal actions (trash button, confirm-delete, out-of-stock removal) are unaffected.

- d4b49bb: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- 855a803: Fixed bug due to a case-sensitive SKU comparison in addProductsToCart() that caused items to be silently excluded from ACDL data collection events. The sku input (lowercase) was compared against item.topLevelSku (uppercase) using strict equality, so the filter always returned false. Both values are now normalized with .toUpperCase() before comparison.

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
