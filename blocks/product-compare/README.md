# Product Compare Block

## Overview

The Product Compare block renders a side-by-side comparison table for up to three products. Products are loaded from the Catalog Service via the `@dropins/storefront-product-discovery` search API and displayed with images, prices, and product attributes. Authors place the block on a page; visitors populate it by searching for products through the built-in search form.

## Integration

### Block Configuration

Both keys are optional. Omitting them falls back to showing all attributes and searching all products.

| Configuration Key | Format | Description |
|---|---|---|
| `attributes` | Comma-separated attribute names | Restricts which product attributes appear as rows in the comparison table, in the authored order. Names must match the `name` field returned by the Catalog Service (e.g. `color, weight, sensor_size`). |
| `filter` | Comma-separated `attribute:value` pairs | Narrows which products are eligible for comparison. Applied to both the search dropdown and the initial SKU lookup. Use this to restrict comparisons to a category or a merchant-defined flag (e.g. `comparable:1, product_type:camera`). The attribute must be configured as **filterable** in the Adobe Commerce Catalog for the filter to take effect. |

**Example — cameras only, specific attributes:**

```
| Product Compare |                                       |
| attributes      | sensor_size, iso_range, weight, color  |
| filter          | product_type:camera, comparable:1      |
```

### URL Parameters

| Parameter | Format | Description |
|-----------|--------|-------------|
| `compare` | `?compare=SKU1,SKU2,SKU3` | Comma-separated list of SKUs to compare. Written on add/remove; read on page load to restore state. |

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Initial load with `?compare=` SKUs**: Fetches products by SKU and renders the comparison table immediately.
- **Initial load without SKUs**: Renders only the search form, ready to add products.
- **Maximum columns reached (3)**: Hides the search form until a product is removed.

### User Interaction Flows

1. **Search**: Visitor types in the search field; results debounce at 300 ms and appear in a dropdown.
2. **Add product**: Clicking a search result appends a column to the table without a full re-render; clears the search field. If no table exists yet, a full render is performed.
3. **Remove product**: Clicking the × button on a column header removes that column by index, keeping `thead` and `tbody` in sync. Updates the `?compare=` URL parameter.
4. **Remove last product**: Removes the table entirely and shows the search form.
5. **Clear search**: Clicking the × button inside the search field or selecting a product clears the input and hides the dropdown.

### Price Display

- **Simple product, no sale**: displays regular price.
- **Simple product, on sale**: displays final price (normal) + regular price (struck through).
- **Configurable product**: displays min–max price range using `display="from to"`. Shows both final and regular ranges when on sale.

### Image Optimization

- Uses the dropin `Image` component with `width: 400, height: 400` params.
- When AEM Assets is enabled (`isAemAssetsEnabled()`), generates an optimized URL via `tryGenerateAemAssetsOptimizedUrl` and clears `crop`/`fit`/`auto` params.
- No image URL: the image link is rendered empty rather than showing a broken placeholder.

### Error Handling

- **Fetch failure**: Catches API errors and renders an "Unable to load product comparison" message.
- **No matching products**: Renders a "No matching products found" message.
- **Unknown SKU in URL**: The API returns no item for that SKU; it is silently skipped in the rendered table.
