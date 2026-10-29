# Fragment Block

Includes content from another page in the current page.

## Authoring

Add a link to the fragment page in the block, or enter its path as plain text. Use a root-relative path such as `/content/promo`; protocol-relative paths are not supported. The loader fetches the page's `.plain.html` representation under the configured site root.

Relative `./media_` image and source URLs are resolved against the fragment page path.

## Behavior

The loaded markup is decorated as page content, including loading its sections. If the fragment is the only block in its section, the section is replaced with the fragment content. Otherwise, the fragment's section children are inserted before the block and its wrapper is removed.

An unsupported path or unsuccessful response leaves the original block unchanged. Fetch or decoration errors are not handled by the block itself and propagate to its caller.