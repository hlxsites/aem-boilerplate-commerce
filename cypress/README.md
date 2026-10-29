# Pre Setup for B2B specific
1. Created server to server auth project
   Note, these credentials are needed only for Admin Rest API interactions and not for Storefront graphql

   Reference: https://developer.adobe.com/commerce/webapi/rest/authentication/

2. Set cypress local env variable, these can be found in vault pre-fixed with LOCAL
   ```bash
   export CYPRESS_API_ENDPOINT=#######
   export CYPRESS_API_ENDPOINT_PROD=#######
   export CYPRESS_IMS_CLIENT_ID=#######
   export CYPRESS_IMS_ORG_ID=#######
   export CYPRESS_IMS_CLIENT_SECRET=#######
   ```
   Same variables are set in Github Secret management for CI, these pre-fixed with CI in vault

# Running E2E tests

1. Clone the repo and change directory to `cypress`
2. Run `npm install`
3. Run `bash run-cypress.sh`
4. Select which setup you need to run - SaaS, PaaS, B2B , as per your testing needs.
5. To run all tests use `npm run cypress:run` For This command local server needs to be running at <http://127.0.0.1:3000/>.

## Running Tests

### Headless Mode (CI/CD)
```bash
npm run cypress:b2b:saas:run -- --spec "src/tests/b2b/yourTest.spec.js"
```

### Headed Mode (Debugging)
```bash
# Run with visible browser (helpful for debugging)
npx cypress run --headed --browser chrome --config-file cypress.b2b.saas.config.js --spec 'src/tests/b2b/yourTest.spec.js'
```

### Interactive Mode
```bash
# Open Cypress UI
npm run cypress:b2b:saas:open
```

### Local Backend Requirements
- Local server must be running at <http://127.0.0.1:3000/>
- B2B features must be enabled in Magento configuration
- For B2B tests, ensure Company features are activated

## SaaS vs PaaS Configs

All commands use a base config, defined in `cypress.base.config.js` and extend in the corresponding config,  `cypress.paas.config.js`, `cypress.saas.config.js`, `cypress.b2b.saas.config`, `cypress.b2b.paas.config` This allows us to use variables for things which differ in the environments, such as gift card codes, product option uids, etc.

## Debugging Tests

### Common Issues
- **Tests timing out:** Increase wait times or check if local server is running
- **Authentication errors:** Verify environment variables are set correctly
- **Element not found:** Check if page is fully loaded, use `{ timeout: 10000 }` options
- **API call failures:** Ensure backend is accessible and credentials are valid

### Skipping Tests

For various reasons, certain tests fail against certain environments. Eventually these issues will be fixed. But for now, if a test is _expected_ to fail on a specific environment, you can assign a tag to it.

- `{ tags: '@skipSaas' }` skips the test when run with `cypress:saas:run`
- `{ tags: '@skipSaasProd' }` skips the test when run with `cypress:saas-prod:run` in a Production environment
- `{ tags: '@skipSaasNoProd' }` skips the test when run with `cypress:saas:run` in a non-Production environment
- `{ tags: '@skipPaas' }` skips the test when run with `cypress:run`
- `{ tags: '@skipAco' }` skips the test when run with `cypress:aco:run` or `cypress:b2b:aco:run`

| Skipped Tests | Backend Env | Notes |
| ------------- | ------------- | -------- |
| `verifyStoreSwitcher.spec`  | SaaS, PaaS, ACO | Story to re-configure multi store <https://jira.corp.adobe.com/browse/USF-2253> |
| `verifyAemAssets.spec` | SaaS, PaaS, ACO | Requires AEM Assets-specific configuration |
| `verifyCompanyRegistration.spec` | ACO | Some TC skipped as Guest company registration is not supported |
| `verifyB2BQuoteToOrderPlacement.spec` | ACO | Quote Management cannot be created on ACO |
| `recs.spec` | SaaS, PaaS, ACO | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-product-click.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-request-sent.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-results-view.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `verifyAuthUserCheckout.spec` | SaaSProd | Requires Payment Services specific configuration; Payment Services not configured on ACCS Prod |
| `verifyGuestUserCheckout.spec` | SaaSProd | Requires Payment Services specific configuration; Payment Services not configured on ACCS Prod |
| `verifyGuestUserVirtualCheckout.spec` | SaaSProd | Requires Payment Services specific configuration; Payment Services not configured on ACCS Prod |

## Metadata/SKUs in Tests

The `pdp-metadata` tool can be used to generate the [bulk metadata](https://www.aem.live/docs/bulk-metadata) for a site.
This tool queries a _single endpoint_ for product data. This means that the metadata output the tool creates may not contain test product metadata.
As a workaround, you have to manually add the products to the file, and update the count.

As of 8/15/2025, these entries were added manually:

```json
{
  "URL": "/products/cypress-configurable-product-latest/cypress456",
  "title": "Cypress configurable product latest",
  "description": "Cypress configurable product latest",
  "keywords": "",
  "sku": "CYPRESS456",
  "og:type": "product",
  "og:title": "Cypress configurable product latest",
  "og:description": "Cypress configurable product latest",
  "og:url": "https://www.aemshop.net/products/cypress-configurable-product-latest/cypress456",
  "og:image": "https://www.aemshop.net/media/catalog/product/adobestoredata/CYPRESS456.jpg",
  "og:image:secure_url": "https://www.aemshop.net/media/catalog/product/adobestoredata/CYPRESS456.jpg",
  "last-modified": "2025-01-27T12:00:00.000Z",
  "json-ld": "{\"@context\":\"http://schema.org\",\"@type\":\"Product\",\"name\":\"Cypress configurable product latest\",\"description\":\"Cypress configurable product latest\",\"image\":\"https://www.aemshop.net/media/catalog/product/adobestoredata/CYPRESS456.jpg\",\"offers\":[{\"@type\":\"Offer\",\"price\":99.99,\"priceCurrency\":\"USD\",\"availability\":\"http://schema.org/InStock\"}],\"productID\":\"cypress456\",\"sku\":\"CYPRESS456\",\"url\":\"/products/cypress-configurable-product-latest/cypress456\",\"@id\":\"/products/cypress-configurable-product-latest/cypress456\"}"
},
{
  "URL": "/products/gift-packaging/adb102",
  "title": "Gift packaging",
  "description": "Gift packaging",
  "keywords": "",
  "sku": "ADB102",
  "og:type": "product",
  "og:title": "Gift packaging",
  "og:description": "Gift packaging",
  "og:url": "https://www.aemshop.net/products/gift-packaging/adb102",
  "og:image": "https://www.aemshop.net/media/catalog/product/adobestoredata/ADB102.jpg",
  "og:image:secure_url": "https://www.aemshop.net/media/catalog/product/adobestoredata/ADB102.jpg",
  "last-modified": "2025-01-27T12:00:00.000Z",
  "json-ld": "{\"@context\":\"http://schema.org\",\"@type\":\"Product\",\"name\":\"Gift packaging\",\"description\":\"Gift packaging\",\"image\":\"https://www.aemshop.net/media/catalog/product/adobestoredata/ADB102.jpg\",\"offers\":[{\"@type\":\"Offer\",\"price\":19.99,\"priceCurrency\":\"USD\",\"availability\":\"http://schema.org/InStock\"}],\"productID\":\"adb102\",\"sku\":\"ADB102\",\"url\":\"/products/gift-packaging/adb102\",\"@id\":\"/products/gift-packaging/adb102\"}"
},
{
  "URL": "/products/virtual-product/virtual123",
  "title": "Virtual product",
  "description": "Virtual product",
  "keywords": "",
  "sku": "VIRTUAL123",
  "og:type": "product",
  "og:title": "Virtual product",
  "og:description": "Virtual product",
  "og:url": "https://main--boilerplate-paas--adobe-commerce.aem.live/products/virtual-product/virtual123",
  "og:image": "https://main--boilerplate-paas--adobe-commerce.aem.live/media/catalog/product/adobestoredata/VIRTUAL123.jpg",
  "og:image:secure_url": "https://main--boilerplate-paas--adobe-commerce.aem.live/media/catalog/product/adobestoredata/VIRTUAL123.jpg",
  "last-modified": "2025-01-27T12:00:00.000Z",
  "json-ld": "{\"@context\":\"http://schema.org\",\"@type\":\"Product\",\"name\":\"Virtual product\",\"description\":\"Virtual product\",\"image\":\"https://main--boilerplate-paas--adobe-commerce.aem.live/media/catalog/product/adobestoredata/VIRTUAL123.jpg\",\"offers\":[{\"@type\":\"Offer\",\"price\":29.99,\"priceCurrency\":\"USD\",\"availability\":\"http://schema.org/InStock\"}],\"productID\":\"virtual123\",\"sku\":\"VIRTUAL123\",\"url\":\"/products/virtual-product/virtual123\",\"@id\":\"/products/virtual-product/virtual123\"}"
}
```

Here's the process for updating metadata:

1. Update the `metadata` file in the content folder with the new file.
2. Publish this file.
3. Use Helix Admin API to publish this file _again_ for each of the test environments, as well as the main site.

```bash
curl -X POST https://admin.hlx.page/live/hlxsites/aem-boilerplate-commerce/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
curl -X POST https://admin.hlx.page/live/adobe-commerce/boilerplate-accs/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
curl -X POST https://admin.hlx.page/live/adobe-commerce/boilerplate-aco/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
curl -X POST https://admin.hlx.page/live/adobe-commerce/boilerplate-paas/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
```

## Consent verification

Run a local AEM server against the sandbox content/config used by stacked PRs:

```sh
npm start -- --url https://main--boilerplate-accs--adobe-commerce.aem.live/ --no-open
```

From `cypress/`, run the consent, positive event/navigation, and history cases:

```sh
npm run cypress:saas:run -- --spec 'src/tests/b2c/events/*.spec.js,src/tests/b2c/verifyRecsStorageHydration.spec.js' --config retries=0
```

The dedicated `events/consent.spec.js` is backend-agnostic, so it runs only in
`run-e2e-tests.yaml` and is exempted from the SaaS and ACO shard-coverage check.
It checks upstream's URL consent values,
retained denied events, real SDK/collector execution and intercepted Commerce
transport, native subscription replay during slow collector loading, ACDL-before-
consent startup, prerender activation deferral, missing analytics config, and local
history deduplication/20-entry caps. Recommendation privacy cases start with
stored viewing/purchase histories, add a real product to the cart, and reload:
requests remain available but must omit history/cart inputs until the accepted
notification. A held upstream script proves requests initially omit those inputs
and the mounted list updates after the real notification.
Late-block cases load backend-authored recommendation blocks after accepted and
declined notifications. Each case uses real checked-in libraries; outbound
collector HTTP and recommendation responses are stubbed in the privacy cases.
AEP configuration is removed from the fetched test config to isolate Commerce
transport. Held module responses are real bodies and are released in teardown.
The consent notification synchronizes the decision, not analytics readiness;
native nonce-bearing module scripts provide evaluation barriers where needed.

The positive initialization suite verifies contexts on home, PDP, cart, and
checkout, plus query retention across clicked navigation and reload.
`consentTestSupport` reapplies `consent=accept` before every document's scripts,
preserving queries/hashes, and waits for the executed SDK and Commerce forwarding
state rather than a resource entry or notification. The dedicated gate spec
intentionally does not use this helper. Product-history hydration and cart-cache
cases require no consent parameter: recording local data is independent of
permission to transmit it. The context matrix and display specs additionally
exercise real recommendation responses and public current-product anchors.

Shared image-list assertions re-query the current image by selector and index
after scrolling, then require both visibility and `naturalWidth > 0`. This keeps
the assertions valid when an asynchronous carousel or grid redraw replaces nodes.

For the search specs skipped on SaaS, restart the owned server against
`https://main--boilerplate-paas--adobe-commerce.aem.live/`, then run:

```sh
npm run cypress:run -- --spec 'src/tests/b2c/events/search-*.spec.js' --config retries=0
```

Respect configured skips and authentication prerequisites; skipped or blocked
cases are not passing evidence. These cases do not validate a real AEP datastream.
Prerender coverage emulates `document.prerendering` and its activation event, not
real Chromium speculation. The URL gate is not a production CMP or a compliance
claim; see [Analytics loading](../README.md#analytics-loading).
