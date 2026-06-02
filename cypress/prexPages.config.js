/**
 * Tenant-specific da.live draft paths for PREX Cypress tests.
 *
 * Shared content authoring is used for most storefront pages. Rec-related tests
 * use specialized drafts under /drafts/decepticons/products/{paas|saas|aco}/ because
 * recId (and block config) must match the backend tenant configured in config.json.
 *
 * Authoring checklist per path (see cypress/README.md):
 * - Create rec unit in that environment's admin, copy recId into the block
 * - pdpAcdlOnly: recid only (PDP dropin populates productContext via acdl)
 * - plpStaticSkuOnly: recid + currentsku (static / MLT anchor, no currentprice)
 * - plpBlockSkuAndPrice: recid + currentsku + currentprice (ACO dynamic on non-PDP)
 * - pdpBlockSkuNoPrice: PDP page + block currentsku, no currentprice (#1272 guard)
 * - plpRecidOnly: recid only on non-PDP (optional — unit types that need no anchor)
 * - cartRecsBlock: cart page with rec block + currentsku (+ currentprice on ACO dynamic)
 */
function buildPrexPages(envFolder) {
  const base = `/drafts/decepticons/products/${envFolder}`;
  const isPaas = envFolder === 'paas';

  return {
    displayPlp: isPaas ? '/drafts/tests/apparel' : `${base}/recs-plp`,
    displayPdp: `${base}/adb125`,
    pdpAcdlOnly: `${base}/adb125`,
    plpStaticSkuOnly: isPaas ? '/drafts/tests/apparel' : `${base}/recs-static-plp`,
    plpBlockSkuAndPrice: `${base}/recs-plp-block-price`,
    pdpBlockSkuNoPrice: `${base}/recs-pdp-block-sku`,
    plpRecidOnly: `${base}/recs-plp-recid-only`,
    cartRecsBlock: `${base}/recs-cart`,
  };
}

module.exports = { buildPrexPages };
