# Widget Block

Loads a standalone widget's HTML, CSS, and JavaScript from the site's `/widgets/` directory.

## Authoring

Add a link to a widget HTML file, for example `/widgets/example.html` or `/widgets/category/example.html`. Query parameters on the link are copied to the widget element's `dataset` before the widget JavaScript runs.

## Behavior

The block derives the widget name and optional subdirectory from the link path, applies widget-specific classes to the block and its section shell, and loads the HTML. It then loads the matching CSS and JavaScript assets from `window.hlx.codeBasePath/widgets/` in parallel. If the JavaScript module has a default export, it is called with the widget element.

Errors during widget loading or decoration are logged to the console. The block does not provide a separate fallback UI.