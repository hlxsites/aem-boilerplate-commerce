# Commerce Pay By Link

Standalone anonymous checkout for a Pay By Link guest-clone cart.

The page resolves `?token=<token>` to a masked guest cart, initializes Checkout with that explicit ID, and never writes the normal Cart cookie. Shipping, billing, delivery, payment, Place Order, and confirmation reuse existing drop-in APIs and containers through a dedicated anonymous GraphQL client.

The Checkout cart payload also contains items and totals, so the summary and editable controls update from the same query or mutation response without a second cart read.

For local validation only, `?demo=true` creates a disposable QA guest cart with test product and address data. The production `/pay` route requires a valid token.

On the localhost draft path only, add `&pocAuthenticated=true` to seed a valid-looking authenticated event, cookie, Cart flag, and shared-client header immediately before the probe. This avoids requiring or storing a real customer token.


