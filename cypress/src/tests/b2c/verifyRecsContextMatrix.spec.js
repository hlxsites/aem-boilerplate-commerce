import {
  assertProductContextAbsent,
  assertProductContextPresent,
  assertUrlExcludesCurrentProduct,
  assertUrlExcludesCurrentProductPrice,
  assertUrlIncludesCurrentProduct,
  interceptRecsGraphQL,
  visitPrexPage,
  waitForRecsCarousel,
  waitForRecsGraphQL,
} from '../../support/recsGraphql';

/**
 * GraphQL contract tests for the product-recommendations block → dropin → backend wiring.
 *
 * Proves the storefront passes (or omits) currentProduct correctly per environment.
 * productContext anchor: only PDP sets it (scripts/initializers/pdp.js → acdl: true).
 *
 * Environment detection: ACO is identified by the presence of `catalogApiKey` in
 * Cypress.env(), which is only set in cypress.aco.config.js. This allows a single
 * test to assert different GraphQL behavior per environment without skip tags.
 */

// --- PLP: static SKU anchor (no price) ---
// A PLP rec block with only currentsku set should never forward currentProduct
// to the GraphQL URL, regardless of environment.
describe('PREX context matrix — PLP static SKU anchor', () => {
  beforeEach(() => {
    interceptRecsGraphQL();
  });

  it('PLP with currentsku only: no currentProduct in GraphQL URL', () => {
    visitPrexPage('displayPlp');
    // PLP pages never set productContext — it is only populated on PDP via acdl: true
    assertProductContextAbsent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProduct(request.url);
    });
  });
});

// --- PDP: recid only (no currentsku/currentprice in block config) ---
// The SKU anchor comes from ACDL productContext (set by the PDP dropin).
// ACO forwards productContext.currentProductPrice as currentProduct price.
// PaaS/SaaS omit currentProduct entirely from the GraphQL URL.
describe('PREX context matrix — PDP recid only', () => {
  beforeEach(() => {
    interceptRecsGraphQL();
  });

  it('PDP with recid only: currentProduct in GraphQL URL reflects environment', () => {
    // ACO sends currentProduct with price; PaaS/SaaS omit it
    const isACO = !!Cypress.env('catalogApiKey');
    visitPrexPage('pdpAcdlOnly');
    // Wait for carousel before asserting productContext — dropin sets it asynchronously
    waitForRecsCarousel();
    assertProductContextPresent();
    waitForRecsGraphQL().then(({ request }) => {
      if (isACO) {
        assertUrlIncludesCurrentProduct(request.url, { requirePrice: true });
      } else {
        assertUrlExcludesCurrentProduct(request.url);
      }
    });
  });
});

// --- ACO only: block config price passthrough ---
// These scenarios are ACO-specific: the block explicitly sets currentsku + currentprice
// (or pins SKU without price as a guard against sending stale ACDL pricing).
describe('PREX context matrix — ACO block config price passthrough', () => {
  before(function () {
    if (!Cypress.env('catalogApiKey')) this.skip();
  });

  beforeEach(() => {
    interceptRecsGraphQL();
  });

  // PLP block with currentsku + currentprice: both values come from block config,
  // not ACDL, so ACO should forward currentProduct with price.
  it('PLP with currentsku + currentprice in block config: currentProduct with price', () => {
    visitPrexPage('plpBlockSkuAndPrice');
    assertProductContextAbsent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlIncludesCurrentProduct(request.url, { requirePrice: true });
    });
  });

  // #1272 guard: when block pins currentsku without currentprice on a PDP,
  // the ACDL productContext price must NOT be forwarded (it belongs to the anchor
  // product set via block config, not the currently viewed PDP product).
  it('PDP with block currentsku only: must not send ACDL price', () => {
    visitPrexPage('pdpBlockSkuNoPrice');
    waitForRecsCarousel();
    assertProductContextPresent();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProductPrice(request.url);
    });
  });
});

// --- Cart page: block config anchor ---
// Cart pages never set productContext (no PDP dropin). The rec block uses
// currentsku (+ currentprice on ACO) from block config as the anchor.
describe('PREX context matrix — cart page rec block', () => {
  beforeEach(() => {
    interceptRecsGraphQL();
  });

  it('cart page: anchor from block config, currentProduct reflects environment', () => {
    // ACO forwards currentsku + currentprice from block config as currentProduct with price.
    // PaaS/SaaS omit currentProduct from the GraphQL URL.
    const isACO = !!Cypress.env('catalogApiKey');
    visitPrexPage('cartRecsBlock');
    assertProductContextAbsent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      if (isACO) {
        assertUrlIncludesCurrentProduct(request.url, { requirePrice: true });
      } else {
        assertUrlExcludesCurrentProduct(request.url);
      }
    });
  });
});
