# Commerce Breadcrumbs

Renders a breadcrumb using the SDK `Breadcrumbs` component (`@dropins/tools/components.js`).

## Authoring

The block reads its content directly from the HTML — no key/value config. Author an `<ol>` (or `<ul>`) with one `<li>` per crumb, in order. Wrap a crumb in `<a>` to make it a link; leave it as plain text for the leaf (current page).

```html
<div class="commerce-breadcrumbs">
  <div>
    <div>
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/men">Men</a></li>
        <li><a href="/men/clothing">Men's Clothing</a></li>
        <li>Sprite Yoga Strap</li>
      </ol>
    </div>
  </div>
</div>
```

Every crumb (including `Home`) is provided by the author; the block does not prepend or append anything.

## Context propagation (PLP → PDP)

When the user clicks any link inside `main .product-list-page`, the block writes the full breadcrumb (ancestors + current page) to `sessionStorage` keyed to the destination path. On the PDP, if the stored entry's `path` matches the current pathname, its trail replaces the authored ancestors so the user sees the path they actually took (e.g. `Home / Men / Men's Clothing / Sprite Yoga Strap`). The leaf still comes from the authored HTML.

### SessionStorage shape

```json
{
  "path": "/products/sprite-yoga-strap",
  "trail": [
    { "label": "Home", "url": "/" },
    { "label": "Men", "url": "/men" },
    { "label": "Men's Clothing", "url": "/men/clothing" }
  ]
}
```

## Notes

Drop the `commerce-breadcrumbs` block in wherever page you want a breadcrumb. The PLP→PDP trail propagation is the only "smart" commerce feature, and it gracefully degrades to "just render what the author wrote" everywhere else.