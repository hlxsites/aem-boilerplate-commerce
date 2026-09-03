# @dropins/storefront-account

## 4.2.0-alpha-20260903155234

### Minor Changes

- 81b291b: Add configurable order history search by order number, product name,
  or SKU.
- d19d0bc: Add `getCompanyAddressBookConfig` for reading the company address
  book configuration without requesting address data, and export the company
  address book permission constants as `COMPANY_ADDRESS_PERMISSIONS`
- ff8b34c: The Addresses and AddressForm containers now support company address
  books. When B2B is enabled, the customer belongs to a company, and the
  company's address book is enabled, both containers switch from the personal
  customer address flow to company address operations. B2C behavior is
  unchanged, and any failure to resolve company context or company endpoints
  falls back to the personal address flow.

  - Full company address CRUD from the account address book: list, create, edit,
    delete, and set default.
  - Role-based permission gating. The customer's company role ACL is resolved
    into six capabilities (access address book, view, create, edit, delete, set
    default) and enforced throughout the UI: no view access hides the list,
    missing create/edit rights replace the form with a no-permission notice, and
    unavailable card actions and modal confirmations are hidden or disabled.
  - B2B address semantics. A company address is either shipping or billing and
    carries a single "default" flag, rather than B2C's separate default shipping
    and billing flags. The form exposes mutually exclusive B2B checkboxes,
    freezes the address type when editing, and blocks setting one address as
    default for both types.
  - New contextMode prop (addressBook or checkout) separates the two usages. In
    checkout, permissions are not enforced, addresses are filtered to the
    requested type, and selecting "new address" is locked when the company
    disallows custom shipping addresses.
  - Address nicknames are now supported in the form, data transforms, and
    address cards — for B2C addresses as well.
  - New API methods: getCompanyAddressBook, createCompanyAddress,
    updateCompanyAddress, deleteCompanyAddress, setDefaultCompanyAddress,
    getCustomerCompanyContext, and getCustomerRolePermissions.
  - New i18n keys under Account.AddressForm for the B2B checkbox labels and the
    permission/default-address notifications.

  No breaking changes. All new container props are optional, and containers
  behave exactly as before when B2B is not enabled.

### Patch Changes

- c92a274: Accessibility fixes (WCAG 2.2):

  - Add descriptive `aria-label` to Edit and Change password buttons (2.4.6)
  - Add `scroll-margin` to password fields and toggle buttons (2.4.11)
  - Add `scroll-margin` to View address list button (2.4.11)
  - Add `scroll-margin` to address form inputs and pickers (2.4.11)

- e89fc34: Add an accessible clear button to customer order search.
- 42a521f: fix(AddressesWrapper, OrdersListWrapper): announce loading states to
  screen readers via a persistent live region instead of a skeleton loader that
  mounts and unmounts with the content (WCAG 4.1.3)
- 672e128: Accessibility fixes for Customer Orders list:

  - Fix date picker announcing `orderDatePicker` instead of visible label (WCAG
    2.5.3)
  - Fix order action link obscured on keyboard navigation (WCAG 2.4.11)
  - Use semantic `<ul>/<li>` for ordered product details (WCAG 1.3.1)

- 73ee059: Fix broken border-radius selector for "Use a different address"
  button
- 0fbbf64: Adds AGENTS.MD File used for guidance for AI coding agents

## 4.1.0

### Minor Changes

- b3826fd: Begin next development cycle

### Patch Changes

- 9afe8a2: fix(AddressesWrapper): show keyboard focus indicator on the "use a
  different address" radio option (WCAG 2.4.7)
- 7f35291: fix(AddressesWrapper): mark address section title as a heading (WCAG
  2.4.6) and align the "use a different address" radio's accessible name with
  its visible text (WCAG 2.5.3)
- 0e45792: Fix incorrect and missing `autocomplete` attributes on form fields
  (WCAG 1.3.5).

  The first name, last name, and email fields on the customer account and
  addresses forms were missing an `autocomplete` attribute entirely; they now
  use `given-name`, `family-name`, and `email` respectively.

  The current password, new password, and confirm password fields on the change
  password form, and the password confirmation field shown when changing the
  account email, used invalid `autocomplete` values (`currentPassword`,
  `newPassword`, `confirmPassword`, `password`, none of which are valid HTML5
  tokens). They now use the correct `current-password` / `new-password` values.

  This helps browsers and assistive technology correctly identify the purpose of
  each field, making autofill and form-filling easier for everyone, including
  people using screen readers or who have difficulty typing.

- 660a316: Fix visual heading text not marked as heading across orders,
  addresses, payment methods and customer information sections
- 952c2ec: Bump SDK stable versions

## 4.1.0-beta.1

### Patch Changes

- 952c2ec: Bump SDK stable versions

## 4.1.0-beta.0

### Minor Changes

- b3826fd: Begin next development cycle

### Patch Changes

- 9afe8a2: fix(AddressesWrapper): show keyboard focus indicator on the "use a
  different address" radio option (WCAG 2.4.7)
- 7f35291: fix(AddressesWrapper): mark address section title as a heading (WCAG
  2.4.6) and align the "use a different address" radio's accessible name with
  its visible text (WCAG 2.5.3)
- 0e45792: Fix incorrect and missing `autocomplete` attributes on form fields
  (WCAG 1.3.5).

  The first name, last name, and email fields on the customer account and
  addresses forms were missing an `autocomplete` attribute entirely; they now
  use `given-name`, `family-name`, and `email` respectively.

  The current password, new password, and confirm password fields on the change
  password form, and the password confirmation field shown when changing the
  account email, used invalid `autocomplete` values (`currentPassword`,
  `newPassword`, `confirmPassword`, `password`, none of which are valid HTML5
  tokens). They now use the correct `current-password` / `new-password` values.

  This helps browsers and assistive technology correctly identify the purpose of
  each field, making autofill and form-filling easier for everyone, including
  people using screen readers or who have difficulty typing.

- 660a316: Fix visual heading text not marked as heading across orders,
  addresses, payment methods and customer information sections

## 4.0.0

### Major Changes

- dd20d14: Add support for Seller Assisted Buying feature that allows store
  administrators to place orders on behalf of customers. Orders placed by
  administrators are marked with a visible "Order placed by an administrator"
  label on the order details page. The feature also integrates with order
  comments to track admin actions and provide a history of administrative
  assistance throughout the order lifecycle.

### Minor Changes

- 2ced9f4: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- bc7c440: Fix .elsie.js import path for fragments
- c36188c:
- e5b4aa0: Bump to StorefrontSDK stable version
- 76482fa: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.4

### Patch Changes

- e5b4aa0: Bump to StorefrontSDK stable version

## 4.0.0-beta.3

### Patch Changes

- bc7c440: Fix .elsie.js import path for fragments

## 4.0.0-beta.2

### Patch Changes

- 76482fa: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.0

### Major Changes

- dd20d14: Add support for Seller Assisted Buying feature that allows store
  administrators to place orders on behalf of customers. Orders placed by
  administrators are marked with a visible "Order placed by an administrator"
  label on the order details page. The feature also integrates with order
  comments to track admin actions and provide a history of administrative
  assistance throughout the order lifecycle.

### Minor Changes

- 2ced9f4: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

## 3.3.0

### Minor Changes

- 573f3e7: Add fieldIdPrefix prop support to the Addresses container
- 98d4563: Adds stored payment methods to My Account: customers can see saved
  cards (and similar methods), remove a stored method, and optionally filter by
  payment method code. Data comes from GraphQL (getCustomerPaymentTokens,
  deletePaymentToken) or from the event bus when tokens are already on the
  client. The UI reuses and extends PaymentCard, introduces PaymentMethods /
  PaymentMethodsWrapper, and includes Storybook, html-host, and unit test
  coverage across API, transforms, hooks, fixtures, and containers.
- 3cbdd4f: Adds a confirmation step before removing a stored payment method in
  My Account: choosing Remove opens a PaymentModal with copy and a preview of
  the card; Cancel closes without deleting, and Remove confirms and runs the
  existing delete flow (deletePaymentToken via removeToken). Introduces
  PaymentModal (component, styles, Storybook, and tests), wires
  PaymentMethodsWrapper to pending-removal state, extends payment card modal
  props and English strings, and adds unit tests for the modal and delete
  confirmation behavior.
- 01c919b: Add a new component for a Payment Card

## 3.3.0-beta.0

### Minor Changes

- 573f3e7: Add fieldIdPrefix prop support to the Addresses container
- 98d4563: Adds stored payment methods to My Account: customers can see saved
  cards (and similar methods), remove a stored method, and optionally filter by
  payment method code. Data comes from GraphQL (getCustomerPaymentTokens,
  deletePaymentToken) or from the event bus when tokens are already on the
  client. The UI reuses and extends PaymentCard, introduces PaymentMethods /
  PaymentMethodsWrapper, and includes Storybook, html-host, and unit test
  coverage across API, transforms, hooks, fixtures, and containers.
- 3cbdd4f: Adds a confirmation step before removing a stored payment method in
  My Account: choosing Remove opens a PaymentModal with copy and a preview of
  the card; Cancel closes without deleting, and Remove confirms and runs the
  existing delete flow (deletePaymentToken via removeToken). Introduces
  PaymentModal (component, styles, Storybook, and tests), wires
  PaymentMethodsWrapper to pending-removal state, extends payment card modal
  props and English strings, and adds unit tests for the modal and delete
  confirmation behavior.
- 01c919b: Add a new component for a Payment Card

## 3.2.1

### Patch Changes

- b47c3b4: Fix customer **select/dropdown custom attributes** end-to-end: extend
  `GET_CUSTOMER` with `AttributeSelectedOptions` / `selected_options`, map those
  values in `transformCustomer`, and prefer field `defaultValue` over option
  `isDefault` in `FormInputs` selects.

  Fix **date-only** strings in `formatDateToLocale` so calendar days do not
  shift by timezone (ISO `YYYY-MM-DD` formatted with UTC; optional whitespace
  trimmed).

## 3.2.0

### Minor Changes

- d6e93e0: This PR adds `orderTime` to `OrderModel`. This is required to show
  order date and time in OrdersListCard. By default, only date is displayed.

  To show the date and the time, there is a new slot implemented
  (`OrdersListOrderTime`). To use it, it needs to be added to block in
  Boilerplate, like in the following example:

  ```javascript
  (...)
      OrdersListOrderTime: (ctx) => {
            const container = document.createElement('p');
            const tpl = `${ctx.deliveryDateText} ${ctx.orderDate} ${ctx.orderTime}`;
            container.append(tpl);
            ctx.replaceWith(container);
      },
  (...)
  ```

- 68f5eda: Enable CustomerOrder GraphQL fragment extension

### Patch Changes

- 4d27653: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- d8a9db4: Bump build-tools version
- b4c01f1: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 63456fd: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.3

### Patch Changes

- 63456fd: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 4d27653: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Patch Changes

- d8a9db4: Bump build-tools version

## 3.2.0-beta.0

### Minor Changes

- d6e93e0: This PR adds `orderTime` to `OrderModel`. This is required to show
  order date and time in OrdersListCard. By default, only date is displayed.

  To show the date and the time, there is a new slot implemented
  (`OrdersListOrderTime`). To use it, it needs to be added to block in
  Boilerplate, like in the following example:

  ```javascript
  (...)
      OrdersListOrderTime: (ctx) => {
            const container = document.createElement('p');
            const tpl = `${ctx.deliveryDateText} ${ctx.orderDate} ${ctx.orderTime}`;
            container.append(tpl);
            ctx.replaceWith(container);
      },
  (...)
  ```

- 68f5eda: Enable CustomerOrder GraphQL fragment extension

### Patch Changes

- b4c01f1: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
