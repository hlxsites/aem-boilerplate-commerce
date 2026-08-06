# Commerce Pay By Link

Standalone anonymous checkout for a Pay By Link guest-clone cart.

The page resolves `?token=<token>` to a masked guest cart, initializes Checkout with that explicit ID, and never writes the normal Cart cookie. Shipping, billing, delivery, payment, Place Order, and confirmation reuse existing drop-in APIs and containers through a dedicated anonymous GraphQL client.

The Checkout cart payload also contains items and totals, so the summary and editable controls update from the same query or mutation response without a second cart read.

For local validation only, `?demo=true` creates a disposable QA guest cart with test product and address data. The production `/pay` route and branch-preview draft route require a valid token.

Local validation:

```text
http://localhost:3000/drafts/aries/pay?demo=true
http://localhost:3000/cart?pblDemo=true
```

After pushing `pbl-standalone`, use the current branch for both Cart and payment recovery:

```text
https://pbl-standalone--aem-boilerplate-commerce--hlxsites.aem.page/cart?pblDemo=true
https://pbl-standalone--aem-boilerplate-commerce--hlxsites.aem.page/drafts/aries/pay?token=<token>
```

The temporary Cart action intentionally navigates to the authored draft on the same origin so QA remains on the branch under test instead of following the backend's configured payment-link host.

## PoC constraints

- The committed Checkout runtime assets include the summary-model extension from `storefront-checkout` commit `ca2ab355`. Rebuild those assets from that source after regenerating drop-ins until the change is available in a published package.
- Confirmation renders from the successful `placeOrder` response without authentication. It is not persisted; refreshing a completed PBL token displays its terminal backend status instead of reconstructing the confirmation.


