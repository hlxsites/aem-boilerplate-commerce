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
 * Filter operator math (STATIC range, GT_CURRENT, DYNAMIC, PERCENTAGE) and rec unit types
 * are covered by Cell integration tests and Studio Playwright — not duplicated here.
 * This file proves the storefront passes (or omits) currentProduct correctly per environment.
 *
 * productContext anchor: only PDP sets it today (scripts/initializers/pdp.js → acdl: true).
 * Cart/search/category use shoppingCartContext / pageContext — not productContext.
 */

describe('PREX context matrix — ACO dynamic price passthrough', () => {
  beforeEach(() => {
    interceptRecsGraphQL();
  });

  it('PDP with recid only: ACDL productContext drives currentProduct with price', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('pdpAcdlOnly');
    assertProductContextPresent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlIncludesCurrentProduct(request.url, { requirePrice: true });
    });
  });

  it('PLP with currentsku + currentprice in block config: currentProduct with price', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('plpBlockSkuAndPrice');
    assertProductContextAbsent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlIncludesCurrentProduct(request.url, { requirePrice: true });
    });
  });

  it('PDP with block currentsku only: must not send ACDL price (#1272 guard)', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('pdpBlockSkuNoPrice');
    assertProductContextPresent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProductPrice(request.url);
    });
  });
});

describe('PREX context matrix — static / MLT anchor (no price in GraphQL)', () => {
  beforeEach(() => {
    interceptRecsGraphQL();
  });

  it('PLP with currentsku only: no currentProduct price (PaaS)', {
    tags: ['@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('plpStaticSkuOnly');
    assertProductContextAbsent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProduct(request.url);
    });
  });

  it('PLP with currentsku only: no currentProduct price (ACCS)', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('plpStaticSkuOnly');
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProduct(request.url);
    });
  });

  it('PLP with currentsku only: no currentProduct price (ACO static unit)', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('plpStaticSkuOnly');
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProduct(request.url);
    });
  });
});

describe('PREX context matrix — non-ACO must omit currentProduct price', () => {
  beforeEach(() => {
    interceptRecsGraphQL();
  });

  it('PDP with recid only: no currentProduct in GraphQL (PaaS)', {
    tags: ['@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('pdpAcdlOnly');
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProduct(request.url);
    });
  });

  it('PDP with recid only: no currentProduct in GraphQL (ACCS)', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('pdpAcdlOnly');
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProduct(request.url);
    });
  });
});

describe('PREX context matrix — non-PDP pages use block config, not ACDL productContext', () => {
  beforeEach(() => {
    interceptRecsGraphQL();
  });

  it('cart page rec block: anchor from block config, not productContext (ACO)', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('cartRecsBlock');
    assertProductContextAbsent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlIncludesCurrentProduct(request.url, { requirePrice: true });
    });
  });

  it('cart page rec block: no currentProduct price on PaaS', {
    tags: ['@skipPaas', '@skipSaas', '@skipAco'],
  }, () => {
    visitPrexPage('cartRecsBlock');
    assertProductContextAbsent();
    waitForRecsCarousel();
    waitForRecsGraphQL().then(({ request }) => {
      assertUrlExcludesCurrentProduct(request.url);
    });
  });
});
