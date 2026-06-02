export const RECS_GRAPHQL_ALIAS = 'recsGraphql';

/**
 * Intercept storefront recommendations GraphQL GET requests.
 * Negative lookahead excludes fetch-graphql.js module downloads.
 */
export function interceptRecsGraphQL() {
  cy.intercept({ method: 'GET', url: /graphql(?!\.js)/ }).as(RECS_GRAPHQL_ALIAS);
}

export function waitForRecsGraphQL() {
  return cy.wait(`@${RECS_GRAPHQL_ALIAS}`);
}

export function decodeGraphqlUrl(url) {
  return decodeURIComponent(url);
}

export function assertUrlIncludesCurrentProduct(url, { sku, requirePrice = false } = {}) {
  const decoded = decodeGraphqlUrl(url);
  expect(decoded, 'GraphQL URL includes currentProduct').to.include('currentProduct');
  if (sku) {
    expect(decoded, 'GraphQL URL includes anchor SKU').to.include(sku);
  }
  if (requirePrice) {
    assertUrlIncludesCurrentProductPrice(url);
  }
}

export function assertUrlIncludesCurrentProductPrice(url) {
  const decoded = decodeGraphqlUrl(url);
  expect(decoded, 'GraphQL URL includes currentProduct with price').to.match(/currentProduct[^&]*price/i);
}

export function assertUrlExcludesCurrentProduct(url) {
  expect(decodeGraphqlUrl(url), 'GraphQL URL excludes currentProduct').not.to.include('currentProduct');
}

/**
 * When block pins currentsku without currentprice on ACO, price must not be sent
 * even if PDP productContext has pricing (COMOPT-2042 / #1272 guard).
 */
export function assertUrlExcludesCurrentProductPrice(url) {
  const decoded = decodeGraphqlUrl(url);
  if (!decoded.includes('currentProduct')) {
    return;
  }
  const match = decoded.match(/currentProduct[^&]*/i);
  expect(match?.[0] ?? '', 'currentProduct payload excludes price').not.to.match(/price/i);
}

export function getPrexPage(key) {
  const pages = Cypress.env('prexPages');
  const path = pages?.[key];
  if (!path) {
    throw new Error(`prexPages.${key} is not configured for this Cypress environment`);
  }
  return path;
}

export function visitPrexPage(key) {
  cy.visit(getPrexPage(key));
}

export function waitForRecsCarousel(minProducts = 1) {
  cy.get('.recommendations-product-list__content', { timeout: 60000 })
    .should('be.visible')
    .scrollIntoView();
  cy.get('.recommendations-product-list__content img', { timeout: 60000 })
    .should('have.length.at.least', minProducts);
}

/**
 * productContext is populated only on PDP pages (storefront-pdp initializer with acdl: true).
 * Non-PDP pages rely on block config currentsku / currentprice instead.
 */
export function assertProductContextAbsent() {
  cy.window().then((win) => {
    const ctx = win.adobeDataLayer?.getState?.('productContext');
    expect(ctx?.sku, 'productContext.sku absent on non-PDP').to.be.undefined;
  });
}

export function assertProductContextPresent() {
  cy.window().then((win) => {
    const ctx = win.adobeDataLayer?.getState?.('productContext');
    expect(ctx?.sku, 'productContext.sku is set on PDP').to.be.a('string').and.not.be.empty;
  });
}
