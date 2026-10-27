# Product Details Block

## Overview

The Product Details block composes product detail, cart, and wishlist drop-ins. It displays product information and options and lets shoppers add or update a cart item. The header rating belongs to the PDP drop-in; the separate [Product Reviews block](../product-reviews/README.md) owns the review list and lower aggregate rating.

## Integration

### Block Configuration

The block uses the PDP initializer to resolve the product and load its data. Product identification follows these rules:

- On storefront pages, `sku` page metadata takes precedence over the SKU in `/products/{urlKey}/{sku}`.
- In authoring modes (`dapreview` present or `quick-edit=on`), `sku` metadata takes precedence over the authored `defaultsku` block configuration.

| Configuration Key | Type | Default | Description | Required | Side Effects |
| --- | --- | --- | --- | --- | --- |
| `defaultsku` | string | None | Fallback SKU for authoring when `sku` page metadata is absent. Ignored for normal storefront product identification. | No | Selects the product previewed in the editor. |

### URL Parameters

| Parameter | Format | Behavior |
| --- | --- | --- |
| `itemUid` | Cart item UID | Selects update mode only when the UID matches an item in the current `cart/data` payload. Otherwise, the block stays in add mode. |
| `optionsUIDs` | Comma-separated option UIDs | Passed to PDP initialization to preselect product options. Wishlist updates use the current selection; an explicitly empty `optionsUIDs=` clears option UIDs from the wishlist context. |
| `dapreview` | Presence of the parameter | Enables authoring SKU resolution through page metadata or `defaultsku`. |
| `quick-edit` | `on` | Enables the same authoring SKU resolution. Other values do not enable this mode. |

After a successful cart-item update, the block redirects to the localized cart page with the matching `itemUid` query parameter.

<!-- ### Local Storage

This block does not directly read or write localStorage. Imported drop-ins manage their own persistence. -->

### Localization

PDP labels are loaded through `placeholders/pdp.json`. Cart action labels use the
shared `Global` dictionary, including `AddProductToCart`, `UpdateProductInCart`,
`AddingToCart`, and `UpdatingInCart`.

### Events

#### Event Listeners

These listeners belong to [product-details.js](./product-details.js).

| Event | Payload used | Effect |
| --- | --- | --- |
| `pdp/data` | Product data, including `sku` and `inStock` | Updates the current product, purchase-button stock state, and action label. Replays the last event on subscription. |
| `pdp/valid` | Boolean | Updates purchase-button availability using configuration validity and current stock state. Replays the last event. |
| `pdp/values` | Reads current selection through `getProductConfigurationValues()` | Updates the WishlistToggle product and option UIDs. Replays the last event. |
| `wishlist/alert` | `{ action, item }` | Renders a wishlist alert, scrolls it into view, and clears it after five seconds. |
| `cart/data` | Cart data with `items[].uid` | Checks whether `itemUid` exists in the cart and updates add/update mode and button text. Replays the last event. |
| `commerce/customer-context` | Payload is not read | Refetches the current product with the selected option UIDs so pricing reflects the new customer context. |

#### Event Emitters

- `pdp/data`: emitted with refreshed product data after a `commerce/customer-context` refetch succeeds.

Cart and wishlist operations also produce their respective drop-in events. The block delegates those operations to the drop-in APIs rather than emitting replacement result events itself.

## Behavior Patterns

### Page Context Detection

- **Add mode**: the current cart does not contain the requested `itemUid`. Valid selections are passed to `addProductsToCart`.
- **Update mode**: the current cart contains the requested `itemUid`. Selections and the UID are passed to `updateProductsFromCart`, then the shopper returns to the cart.
- **Product configuration**: PDP containers manage options and quantity; validity and stock events update purchase availability.

### User Interaction Flows

1. **Product display**: renders the gallery, header rating, price, short description, options, quantity, full description, and attributes.
2. **Cart action**: adds the current configuration or updates a matching cart item. The button shows progress and a live status announces the operation.
3. **Wishlist action**: toggles wishlist membership using the current product selection and displays the resulting alert.
4. **SEO**: prerendering is responsible for metadata and JSON-LD. The block does not write SEO metadata at runtime.

### Error Handling

- **Cart requests**: show a dismissible alert with the returned error message and restore the purchase-button label after the operation.

## Development

The PDP dependency temporarily uses the repository-local compiled snapshot
`vendor/storefront-pdp-3.3.2-5af110c.tgz`, built from
`5af110ca2da8c367753b043d95e3a0352fd4efdc` (`ACCS-1477-product-rating`).

The PDP snapshot includes `ProductRating` and reproduces the feature branch's existing vendored PDP assets. Its source package version is `3.3.2`; the formerly configured `3.4.0` alpha did not include that container.

A remote checkout does not need a sibling repository. Include the archive and
generated PDP assets when delivering the branch; `.hlxignore` excludes the archive
from remote delivery. Replace the snapshot when a published version includes the
matching rating implementation.
