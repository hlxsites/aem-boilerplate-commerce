// Real (non-draft) catalog PDPs — same SKUs resolve on both the ACCS and ACO
// demo catalogs, unlike the env-specific /drafts/tests/products/{env}/adb125
// pages used by the rec-carousel tests in verifyRecsDisplay.spec.js.
const PRODUCT_VIEW_HISTORY_PRODUCTS = [
  { sku: 'ADB125', path: '/products/aluminum-pen-stylus/ADB125' },
  { sku: 'ADB156', path: '/products/papermate-inkjoy-gel-pens/ADB156' },
];

// Simple (non-configurable) products, so a single "Add to Cart" click suffices.
const CART_SKU_PRODUCTS = [
  { sku: 'ADB174', path: '/products/recycled-performance-hat/adb174' },
  { sku: 'ADB251', path: '/products/premiere-pro-crewneck/adb251' },
];

/**
 * Mirrors getStoreIdentifier() in scripts/commerce.js: productViewHistory is
 * written to localStorage keyed by whichever of Magento-Store-View-Code (SaaS)
 * or ac-view-id (ACO) is present in the site's cached config.json headers.
 */
function getStoreViewIdentifier(win) {
  const cached = win.sessionStorage.getItem('config');
  const { public: { default: siteConfig } = {} } = JSON.parse(cached || '{}');
  const headers = { ...siteConfig?.headers?.all, ...siteConfig?.headers?.cs };
  const identifierKey = Object.keys(headers).find(
    (key) => ['magento-store-view-code', 'ac-view-id'].includes(key.toLowerCase()),
  );
  return identifierKey ? headers[identifierKey] : undefined;
}

// cy.window().should(fn) retries fn until it passes (unlike .then()), so this
// tolerates the async delay between PDP navigation and the dropin populating
// ACDL productContext.
function waitForProductContextSku(sku) {
  cy.window().should((win) => {
    const ctx = win.adobeDataLayer?.getState?.('productContext');
    expect(ctx?.sku, 'productContext.sku').to.equal(sku);
  });
}

// SaaS (ACCS) and ACO only — recommendations aren't enabled on the PaaS demo.
describe('Verify recs-related client storage hydration', { tags: '@skipPaas' }, () => {
  it('records viewed PDPs in productViewHistory keyed by store view code / ac-view-id', () => {
    PRODUCT_VIEW_HISTORY_PRODUCTS.forEach(({ sku, path }) => {
      cy.visit(path);
      waitForProductContextSku(sku);
    });

    // Simulate closing the last PDP tab and reopening the storefront home
    // page in the same browser session — localStorage persists across visits.
    cy.visit('/');

    cy.window().should((win) => {
      const storeIdentifier = getStoreViewIdentifier(win);
      expect(storeIdentifier, 'store view code or ac-view-id resolved from config.json')
        .to.be.a('string').and.not.be.empty;

      const key = `${storeIdentifier}:productViewHistory`;
      const raw = win.localStorage.getItem(key);
      expect(raw, `localStorage key "${key}" exists`).to.exist;

      const viewedSkus = JSON.parse(raw).map((entry) => entry.sku);
      PRODUCT_VIEW_HISTORY_PRODUCTS.forEach(({ sku }) => {
        expect(viewedSkus, `productViewHistory includes ${sku}`).to.include(sku);
      });
    });
  });

  it('never resolves an undefined productViewHistory key', () => {
    const { sku, path } = PRODUCT_VIEW_HISTORY_PRODUCTS[0];
    cy.visit(path);
    waitForProductContextSku(sku);

    cy.window().should((win) => {
      const storeIdentifier = getStoreViewIdentifier(win);
      // A missing header would otherwise silently stringify to the literal
      // "undefined" in the template literal below instead of failing loudly.
      expect(storeIdentifier, 'store view code or ac-view-id header value').to.not.be.undefined;
      expect(storeIdentifier, 'store view code or ac-view-id header value')
        .to.be.a('string').and.not.be.empty;

      const key = `${storeIdentifier}:productViewHistory`;
      expect(key, 'productViewHistory key').to.not.include('undefined');
    });
  });

  it('caches added items in DROPIN__CART__CART__DATA, the source cartSkus reads from', () => {
    // The cart dropin persists its own cart state to sessionStorage on every
    // 'cart/data' event; product-recommendations.js derives its cartSkus
    // context field from that same event's items (item.sku), so this cache
    // is what backs the "hide items already in cart" recs behavior.
    CART_SKU_PRODUCTS.forEach(({ path }, index) => {
      cy.visit(path);
      cy.contains('Add to Cart').should('be.visible').and('not.be.disabled').click();
      // Navigating away immediately can outrun the add-to-cart round-trip
      // (network call -> cart/data event -> sessionStorage write), silently
      // dropping the item; wait for the header badge to confirm it landed.
      cy.get('.nav-cart-button').should('have.attr', 'data-count', String(index + 1));
    });

    cy.window().should((win) => {
      const raw = win.sessionStorage.getItem('DROPIN__CART__CART__DATA');
      expect(raw, 'DROPIN__CART__CART__DATA exists in sessionStorage').to.exist;

      const cartData = JSON.parse(raw);
      expect(cartData.items, 'cart data items').to.be.an('array');

      const cartSkus = cartData.items.map((item) => item.sku);
      CART_SKU_PRODUCTS.forEach(({ sku }) => {
        expect(cartSkus, `cart items include ${sku}`).to.include(sku);
      });
    });
  });
});
