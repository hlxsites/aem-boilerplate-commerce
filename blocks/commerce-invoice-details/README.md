# Invoice details: host-managed PDF branding

The block supplies optional branding through the Order drop-in's
`getInvoicePdfBranding` callback. No branding lookup or GraphQL request is added
to `storefront-order`.

Add `invoice-pdf-branding` to the effective Storefront Configuration, for example
under `public.default`:

```json
{
  "invoice-pdf-branding": {
    "logoUrl": "/media/merchant-logo.png",
    "storeName": "Example Merchant",
    "addressLines": ["123 Example Street", "Austin, TX 78701", "United States"]
  }
}
```

The example logo path must be replaced with an existing image. Use the existing
`public["/store-root"]` configuration overrides for different storefronts. Branding
is selected from the current page's effective configuration; it does not look up
the historical store context of an invoice.

The logo is loaded only when Download PDF is clicked and converted to PNG.
Relative URLs resolve against the current page; use a leading `/` for a
site-root-relative asset. External images must allow anonymous CORS access.
The PDF uses `storeName` and `addressLines` as provided. These values are public:
do not include credentials or private configuration.

The updated Order renderer reserves a 36 mm by 18 mm logo box, preserves image
aspect ratio, and separates it from company text with a 5 mm gap. Without an
embedded logo, company details start at the left edge. Text wraps within separate
company and invoice columns, and the header grows to fit.

An absent configuration preserves the existing unbranded download. A configured
logo that cannot be loaded or converted causes the branding callback to reject
and logs an error; it does not silently download an unbranded PDF.

## Local trial without publishing configuration

On the local storefront, run this in the browser console, then reload:

```js
const config = JSON.parse(sessionStorage.getItem('config'));
config.public.default['invoice-pdf-branding'] = {
  logoUrl: '/path/to/an-existing-logo.png',
  storeName: 'Example Merchant',
  addressLines: ['123 Example Street', 'Austin, TX 78701', 'United States'],
};
sessionStorage.setItem('config', JSON.stringify(config));
location.reload();
```

Replace the logo URL with a real image on your site. Root-specific configuration
can override these defaults. To end the trial, remove this property from the
session configuration and reload, or remove the `config` session key to reload
the published configuration. Do not publish demonstration merchant details.

This is independent AEM configuration. It does **not** automatically read or
synchronize Commerce Admin's PDF logo/address settings.

## Refreshing local changes

AEM block JavaScript does not require `npm run build` or an AEM server restart.
Reload the page after editing it. The Order renderer does require a build in
`storefront-order` and copying the resulting drop-in files into this project.
Disable the browser cache in DevTools and reload to test the updated modules.

Storefront configuration is cached in `sessionStorage.config`. Publishing new
configuration does not replace an existing session override: remove that key and
reload to fetch the published configuration. For a local trial, keep the override
above instead; clearing the key would remove the trial branding.

The smoke-test PDF uses fictional branding supplied by the test. Downloading an
invoice on the site does not use those values unless branding is configured there.

## Adapter tests

```sh
node --experimental-default-type=module --test tests/invoice-pdf-branding.test.mjs
```
