# Enrichment Block

## Overview

The Enrichment block loads and inlines content fragments that are targeted at the current product or category page. It reads an index of fragments, filters them by the current page's product SKU or category, and inserts the matching fragment content directly into the page.

## Integration

### Block Configuration

- `type` (required): The targeting type, either `product` or `category`. Determines how the current page's context is resolved.
- `position`: An optional value used to further filter which fragments match, passed through as a `positions` filter alongside `products`/`categories`.

### URL Parameters

No URL parameters are read directly; the product SKU is resolved via `getProductSku()`, which may consult the URL depending on page context.

### Local Storage

No localStorage keys are used by this block.

### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block.

## Behavior Patterns

### Fragment Targeting

- **Product context** (`type="product"`): Resolves the current product SKU via `getProductSku()` and filters the `enrichment/enrichment` index by `products`.
- **Category context** (`type="category"`): Looks up the nearest `.product-list-page` block on the page and filters the index by its `urlpath` under `categories`.
- **Position filter**: When configured, further narrows matches by `positions`.

### User Interaction Flows

1. Block reads its configuration (`type`, `position`) and resolves the current page context (SKU or category).
2. Fetches the `enrichment/enrichment` index and finds fragments whose filter values include the resolved context.
3. Loads each matching fragment and inlines its section(s) into the page in place of the block's wrapper.
4. If a fragment has a single section, that section's classes are merged onto the block's own section; if it has multiple sections, they are inserted as siblings after the block's section.

### Error Handling

- Missing `type`, missing product SKU (for `type="product"`), or a missing `.product-list-page`/category (for `type="category"`) throw and are logged via `console.error`; no fragment content is inserted in these cases.
- Regardless of success or failure, the block's wrapper element is always removed once processing completes.
