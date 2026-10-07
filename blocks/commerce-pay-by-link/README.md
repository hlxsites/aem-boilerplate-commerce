# Commerce Pay By Link

Standalone anonymous checkout for a Pay By Link guest-clone cart.

The page resolves `?token=<token>` to a masked guest cart, initializes Checkout with that explicit ID, and never writes the normal Cart cookie. Shipping, billing, delivery, payment, Place Order, and confirmation reuse existing drop-in APIs and containers through a dedicated anonymous GraphQL client.

The Checkout cart payload also contains items and totals, so the summary and editable controls update from the same query or mutation response without a second cart read.

The `pbl-standalone` branch connects to sandbox instance `KcDQwuVVEcCb6is7pNwYR3` through both Commerce endpoints in `config.json`.

For payment-link creation, set Storefront Base URL in Commerce Admin under Stores > Configuration > General > Store Email Addresses > General for the cart's store view. This configures `trans_email/general/storefront_url`, which the backend requires to build the emailed link.

For local validation only, `?demo=true` creates a disposable guest cart on the configured backend with test product and address data. The demo seed requires SKU `ADB111` to be available on that instance; it does not create catalog data. The production `/pay` route and branch-preview draft route require a valid token.

Local validation:

```text
http://localhost:3000/drafts/aries/pay?demo=true
http://localhost:3000/cart
```

After pushing `pbl-standalone`, use the current branch for both Cart and payment recovery:

```text
https://pbl-standalone--aem-boilerplate-commerce--hlxsites.aem.page/cart
https://pbl-standalone--aem-boilerplate-commerce--hlxsites.aem.page/drafts/aries/pay?token=<token>
```

The backend builds emailed links from its configured storefront URL and `paybylink/general/pay_url_path` (`pay` by default). The temporary Cart action intentionally navigates to the authored draft on the same origin so the demo remains on the branch under test instead of following the backend's configured payment-link host.

## PoC constraints

- The committed Checkout runtime assets include the summary-model extension from `storefront-checkout` commit `ca2ab355`. Rebuild those assets from that source after regenerating drop-ins until the change is available in a published package.
- `postinstall.js` fails explicitly when regenerated Checkout assets do not contain that extension, preventing a silent summary regression.
- Confirmation renders from the successful `placeOrder` response without authentication. It is not persisted; refreshing a completed PBL token displays its terminal backend status instead of reconstructing the confirmation.
