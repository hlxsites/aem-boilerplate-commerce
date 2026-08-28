# Widget Block

## Overview

The Widget block loads an externally-hosted HTML/CSS/JS bundle at runtime and decorates it into the page. It lets authors embed a widget by linking to its `.html` asset; the block resolves the sibling `.css` and `.js` files from the same path and injects/executes them.

## Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| Link (`a[href]`) | URL | — | Href pointing to the widget's `.html` asset under `/widgets/<path>/<name>.html`. | **Yes** | Determines the widget path/name used to resolve the matching `.css` and `.js` assets |

## Integration Details

- **Asset resolution**: given a link to `/widgets/<path>/<name>.html`, the block fetches `<name>.html` for markup, loads `<name>.css` via `loadCSS`, and dynamically imports `<name>.js`, invoking its default export (if present) with the block element.
- **URL parameters**: any query string parameters on the source link are copied onto the block element as `data-*` attributes (e.g. `?foo=bar` becomes `data-foo="bar"`).
- **DOM changes**: after decoration, the block element gets the widget's name as a class (and loses the generic `block` class); if wrapped in a `.widget-wrapper`/`.widget-container`, those are similarly renamed to `<name>-wrapper`/`<name>-container`.

## Behavior Patterns

- The widget's HTML, CSS, and JS load in parallel; the block only finishes decorating once all three have resolved.
- `widget.dataset.source` is set to the original link href for reference by the loaded widget script.

## Error Handling

- If fetching or importing any widget asset fails, the error is logged to the console (`failed to load widget <path>/<name>`) and decoration stops; the block is left without the widget's classes/content.
