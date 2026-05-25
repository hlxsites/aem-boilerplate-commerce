# @dropins/storefront-auth

## 3.3.0-beta.1

### Minor Changes

- 1703268: Upgraded Elsie package to use the 1.9.0-beta.0 version

## 3.3.0-beta.0

### Minor Changes

- 85883d0: Migrate to Node.js 24 LTS

  Minimum required Node.js version is now 24. Updated engines.node from >=20 to >=24.

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
