# Pre Setup for B2B specific
1. Created server to server auth project 
   Note, these credentials are needed only for Admin Rest API interactions and not for Storefront graphql
 
   Reference: https://developer.adobe.com/commerce/webapi/rest/authentication/ 

2. Set cypress local env variable, these can be found in vault pre-fixed with LOCAL
   ```bash
   export CYPRESS_API_ENDPOINT=#######
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

For various reasons, certain tests fail against certain environments. Eventually these will issues will be fixed. But for now, if a test is _expected_ to fail on a specific environment, you can assign a tag to it.

- `{ tags: '@skipSaas' }` skips the test when run with `cypress:saas:run`
- `{ tags: '@skipPaas' }` skips the test when run with `cypress:run`
- `{ tags: '@skipAco' }` skips the test when run with `cypress:aco:run`

## Product Recommendations (PREX) E2E tests

Specs: `verifyRecsDisplay.spec.js` (carousel smoke), `verifyRecsContextMatrix.spec.js` (GraphQL wiring).

### Scope — what boilerplate Cypress does NOT cover

Per-operator filter math (STATIC range, GT/LT current, DYNAMIC, PERCENTAGE) and exhaustive rec unit types are **already covered** by:

- Cell integration tests (`RecServiceFilterTests`, `RecPreviewGQLTests`)
- Studio Playwright (`e2e-qa-aco`, COMOPT-1868)

Boilerplate Cypress validates **storefront wiring only**: block → dropin → GraphQL request shape. One **static** rec unit + one **dynamic** rec unit per tenant is enough — do not duplicate the IT/Studio operator matrix here.

### productContext — where it comes from (verified in codebase)

| Source | Sets `productContext`? | Used by rec block for anchor? |
| --- | --- | --- |
| **PDP** (`scripts/initializers/pdp.js`, `acdl: true`) | ✅ sku + pricing | ✅ primary anchor on PDP |
| PLP, category, search, cart, checkout | ❌ | ❌ — use block `currentsku` / `currentprice` |
| Cart (`shoppingCartContext`) | ❌ for anchor | ✅ `cartSkus` only (dedup), not sku/price anchor |

Only the PDP dropin publishes `productContext` to ACDL today. Non-PDP pages with a rec block **must** set `currentsku` (and `currentprice` on ACO for dynamic filters) in Document Authoring.

### `prexPages` — tenant-specific da.live drafts

Defined in `prexPages.config.js`, wired per config via `buildPrexPages('paas'|'saas'|'aco')`.

| Key | Block config | Page type | What it tests |
| --- | --- | --- | --- |
| `displayPlp` / `displayPdp` | recid (+ optional currentsku) | PLP / PDP | Carousel smoke |
| `pdpAcdlOnly` | recid only | PDP | ACDL → currentProduct + price (ACO) |
| `plpStaticSkuOnly` | recid + currentsku | PLP | Static/MLT anchor, no price in GQL |
| `plpBlockSkuAndPrice` | recid + currentsku + currentprice | PLP | ACO dynamic from block config |
| `pdpBlockSkuNoPrice` | recid + currentsku on PDP | PDP | #1272 guard — no ACDL price leak |
| `plpRecidOnly` | recid only | PLP | Optional — unit types without anchor |
| `cartRecsBlock` | recid + block anchor fields | Cart | Non-PDP block-config path |

Paths under `/drafts/decepticons/products/{paas|saas|aco}/…` except PaaS `displayPlp` / `plpStaticSkuOnly` which use `/drafts/tests/apparel` today.

### Enabling skipped PREX tests

Remove `@skipSaas`, `@skipAco`, or both once the da.live page exists **and** a rec unit is created in that environment's admin:

| Environment | Config | Proxy URL for local `aem up --url` |
| --- | --- | --- |
| PaaS | `cypress.paas.config.js` | `main--boilerplate-paas--adobe-commerce.aem.live` |
| ACCS | `cypress.saas.config.js` | `main--boilerplate-accs--adobe-commerce.aem.live` |
| ACO | `cypress.aco.config.js` | `b2b--boilerplate-aco-b2b--adobe-commerce.aem.live` |

```bash
npm run cypress:run -- --spec "src/tests/b2c/verifyRecs*.spec.js"
npm run cypress:saas:run -- --spec "src/tests/b2c/verifyRecs*.spec.js"
npm run cypress:aco:run -- --spec "src/tests/b2c/verifyRecs*.spec.js"
npm run cypress:aco:prex:run   # same as CI (run-e2e-tests-aco.yaml)
```

CI `run-e2e-tests-aco.yaml` runs **`cypress:aco:prex:run` only** (not the full B2C suite). Full ACO checkout/assets coverage is tracked separately in PR #1246.

| Skipped Tests | Backend Env | Notes |
| ------------- | ------------- | -------- |
| `verifyStoreSwitcher.spec`  | SaaS, PaaS | Story to re-configire multi store <https://jira.corp.adobe.com/browse/USF-2253> |
| `verifyUserAccount.spec` | SaaS, PaaS | Task <https://jira.corp.adobe.com/browse/USF-2310> |
| `recs.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-product-click.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-request-sent.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-results-view.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `verifyRecsDisplay` PaaS PLP | — | Runs on `/drafts/tests/apparel` today |
| `verifyRecsDisplay` PaaS PDP | PaaS | Remove `@skipPaas` when `…/paas/adb125` has rec block + recId |
| `verifyRecsDisplay` ACCS PLP/PDP | ACCS | Remove `@skipSaas` when `…/saas/recs-plp` and `…/saas/adb125` exist |
| `verifyRecsDisplay` ACO PLP/PDP | ACO | Remove `@skipAco` when tenant drafts + recIds exist |
| `verifyRecsContextMatrix` PaaS PDP | PaaS | Remove `@skipPaas` when `…/paas/adb125` has rec block + recId |
| `verifyRecsContextMatrix` | ACCS, ACO | Remove skips per scenario when matching da.live page is authored |

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
