# @dropins/storefront-quote-management

## 1.3.0-beta.1

### Minor Changes

- 3c3a91c: Add company address support to the quote and quote template shipping
  address APIs. `setShippingAddress` and `addQuoteTemplateShippingAddress` now
  accept a `companyAddressId` and send it as `company_address_id`, which is the
  only address reference the backend accepts once a company has its address book
  enabled — a customer address is rejected with "Customer address cannot be used
  when the company address book is enabled", and a new address payload with "Use
  a company address instead".

  Also read the address references back. A quote stores its own copy of the
  shipping address, so the `uid` it returns matches nothing in either address
  book. `NegotiableQuoteShippingAddress` already exposed `customer_address_uid`
  and `company_address_id` for exactly that, but neither fragment asked for
  them, which left callers comparing address fields as strings to work out which
  saved address a quote holds. Both are now requested and surfaced on the model
  as `customerAddressUid` and `companyAddressId`, on quotes and on quote
  templates.

  `addQuoteTemplateShippingAddress` now requires exactly one address source,
  matching `setShippingAddress`. The two share an identical GraphQL input type,
  yet the template accepted several sources at once and left the backend to
  choose between them — an order of preference the schema does not document.
  Passing more than one now fails locally with a message naming the three, and
  an explicit `null` id counts as no source rather than as a null one to send.

### Patch Changes

- 3c3a91c: fix(setShippingAddress): stop rewriting the address id the caller
  passed. An id of `0` or `''` satisfied the "exactly one source" check and was
  then coerced to `null` on its way into the mutation, so the request carried
  something the caller never asked for. An explicit `null` did the reverse: it
  counted as a source, passed validation and reached the backend as a null id,
  turning a readable local error into a remote one. The check now reads a null
  id as no id, and the variables are built with nullish coalescing.
- 3c3a91c: fix(ShippingAddressDisplay): stop printing "null" in place of a
  missing region. The city line tested the region object rather than its label,
  and a company address arrives carrying a region whose label is empty — so the
  address read `San Jose, null 95110`. The label itself is now what decides
  whether the region is shown, the same way the rest of the address omits fields
  it does not have.
- 3c3a91c: fix(events): describe the `quote-management/shipping-address-set`
  payload as it is actually emitted. `addressId` was typed as a number while a
  customer address uid reaches subscribers as a string, and `companyAddressId`
  was missing from the declaration altogether even though the event carries it.
  Both are now part of the type, so a typed subscriber sees every field the
  event holds.

## 1.2.2-beta.0

### Patch Changes

- 6c71ffa: Bump SDK beta version

## 1.2.1

### Patch Changes

- a7e0156: Bump SDK beta versions
- 5fc3266: Bump SDK stable versions

## 1.2.1-beta.1

### Patch Changes

- 5fc3266: Bump SDK stable versions

## 1.2.1-beta.0

### Patch Changes

- a7e0156: Bump SDK beta versions

## 1.2.0

### Minor Changes

- 9dde3ae: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

### Patch Changes

- 21852ff: Bump commerce packages to latest
- d9eb120: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.2.0-beta.1

### Patch Changes

- d9eb120: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 1.2.0-beta.0

### Minor Changes

- 9dde3ae: Removed the `engines.node` constraint from `package.json`. This
  package targets browser environments exclusively and does not depend on a
  specific Node.js runtime version. The package is now built and distributed
  using Node.js 22 LTS.

## 1.1.2

### Patch Changes

- 0dd15e3: Make package public

## 1.1.1

### Patch Changes

- 2ee05ac: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided
  langDefinitions with the drop-in's bundled defaults before passing them to
  UIProvider. This enables label/placeholder overrides via the initializer API.

- c1aa431: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 214719a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.1

### Patch Changes

- 214719a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.0

### Patch Changes

- 2ee05ac: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided
  langDefinitions with the drop-in's bundled defaults before passing them to
  UIProvider. This enables label/placeholder overrides via the initializer API.

- c1aa431: Add Changesets-based release automation with branch-aware workflows
  (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
