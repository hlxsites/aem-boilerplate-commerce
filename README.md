# Edge Delivery Services + Adobe Commerce Boilerplate

This project boilerplate is for Edge Delivery Services projects that integrate with Adobe Commerce.

## Documentation

Before using the boilerplate, we recommend you to go through the documentation on <https://experienceleague.adobe.com/developer/commerce/storefront/> and more specifically:

1. [Storefront Developer Tutorial](https://experienceleague.adobe.com/developer/commerce/storefront/get-started/)
1. [AEM Docs](https://www.aem.live/docs/)
1. [AEM Developer Tutorial](https://www.aem.live/developer/tutorial)
1. [The Anatomy of an AEM Project](https://www.aem.live/developer/anatomy-of-a-project)
1. [Web Performance](https://www.aem.live/developer/keeping-it-100)
1. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Getting Started

Use the [Site Creator Tool](https://da.live/app/adobe-commerce/storefront-tools/tools/site-creator/site-creator) to quickly spin up your own copy of code and content.

Alternatively, you can follow our [Guide](https://experienceleague.adobe.com/developer/commerce/storefront/get-started/) for a more detailed walkthrough.

## Adding a new front-end NPM dependency

To add a new front-end NPM dependency:

**Install the dependency:**

```bash
npm install your-library-name@^1.0.0
```

**Add the dependency to the libraries section in `package.json`:**

```json
{
  "libraries": [
    {
      "name": "your-library-name",
      "include": ["dist/**/*"]
    }
  ]
}
```

**Configuration Options:**
- `name`: The npm package name (must match the name in dependencies)
- `include`: Array of glob patterns for files to include (supports globbing like `**/*`, `dist/*.js`, etc.)

**Copy front-end libraries:**

The `postinstall` script automatically copies specified files from `node_modules` to `scripts/__/[package-name]/` making them available for Edge Delivery Services to serve. This gives you fine-grained control over which files are copied.

```bash
npm run postinstall
```

**Import and use in your code:**

```javascript
import { someFunction } from './scripts/__/your-library-name/dist/index.js';
```

## Updating Drop-in dependencies

You may need to update one of the drop-in components to a new version. Besides checking the release notes for any breaking changes, ensure you also execute the `postinstall` script so that the dependenices in your `scripts/__` directory are updated to the latest build. This should be run immediately after you update the component, for example:

```bash
npm install @dropins/storefront-cart@2.0. # Updates the storefront-cart dependency in node_modules/
npm run postinstall # Copies scripts from node_modules into scripts/__
```

This is a custom script which copies files out of `node_modules` and into a local directory which EDS can serve. You must manually run `postinstall` due to a design choice in `npm` which does not execute `postinstall` after you install a _specific_ package.

## Changelog

Major changes are described and documented as part of pull requests and tracked via the `changelog` tag. To keep your project up to date, please follow this list:

<https://github.com/hlxsites/aem-boilerplate-commerce/issues?q=label%3Achangelog+is%3Aclosed>
