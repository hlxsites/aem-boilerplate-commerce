# Product Compare Bar Block

## Overview

A persistent fixed bottom bar that collects products for side-by-side comparison. Authors place it on any page where product browsing occurs. Products are added or removed via the `compare/products` event bus event emitted by other blocks (PLP, PDP product cards). When the visitor is ready, the Compare button navigates to the configured compare page with the selected SKUs as a URL parameter.

## Integration

### Block Configuration

| Configuration Key | Format | Description |
|---|---|---|
| `page` | URL path string | Path to the product comparison page. Defaults to `/product-compare`. |

**Example:**

```
| Product Compare Bar |                  |
| page                | /product-compare |
```

### Event Bus

The bar listens to the `compare/products` event from `@dropins/tools/event-bus.js`.

**Event name:** `compare/products`

**Payload:**

| Field | Type | Description |
|-------|------|-------------|
| `sku` | `string` | Product SKU — used as the unique key and appended to the compare URL. |
| `img` | `string` | Product image URL shown in the bar. |
| `name` | `string` | Product name shown in the bar and used for accessible button labels. |

**Emit from any block:**

```js
import { events } from '@dropins/tools/event-bus.js';

events.emit('compare/products', { sku: 'MH01-XS-Black', img: '/path/to/image.jpg', name: 'Chaz Kangeroo Hoodie' });
```

**Toggle behavior:** Emitting the event for a SKU already in the bar removes it. This allows PLP "Compare" buttons to reflect active/inactive state without additional coordination.

### URL Parameter

When the visitor clicks Compare, the bar navigates to `{page}?compare=SKU1,SKU2,SKU3`. This matches the `?compare=` parameter consumed by the `product-compare` block.

## Behavior

- **Max 3 products** — additional `compare/products` events are ignored once 3 products are selected.
- **In-memory state** — selections reset on page navigation.
- **Bar visibility** — hidden until the first product is added; shown automatically on add.
- **Remove button** — clicking `×` on a product card removes that product from the selection.
- **Clear All** — removes all products and hides the bar.
- **Compare link** — disabled (via `aria-disabled`) when no products are selected.
