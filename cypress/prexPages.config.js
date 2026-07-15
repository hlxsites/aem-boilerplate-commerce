/**
 * Tenant-specific da.live draft paths for PREX Cypress tests.
 *
 * Shared content authoring is used for most storefront pages. Rec-related tests
 * use specialized drafts under /drafts/tests/products/{paas|saas|aco}/ because
 * recId (and block config) must match the backend tenant configured in config.json.
 *
 * Authoring checklist per path (see cypress/README.md):
 * - Create rec unit in that environment's admin, copy recId into the block
 * - PDP draft pages must have a metadata block with sku set to the UPPERCASE SKU (e.g. ADB125)
 *   The Catalog Service query is case-sensitive and will return empty products for lowercase SKUs.
 * - pdpAcdlOnly: recid only (PDP dropin populates productContext via acdl)
 * - displayPlp: recid + currentsku (static / MLT anchor, no currentprice) — also used for display test
 * - plpBlockSkuAndPrice: recid + currentsku + currentprice (ACO dynamic on non-PDP)
 * - pdpBlockSkuNoPrice: PDP page + block currentsku, no currentprice (#1272 guard)
 * - cartRecsBlock: cart page with rec block + currentsku (+ currentprice on ACO dynamic)
 */
function buildPrexPages(envFolder) {
  const pdpBase = `/drafts/tests/products/${envFolder}`;
  const isPaas = envFolder === 'paas';

  return {
    displayPlp: isPaas ? '/drafts/tests/apparel' : `/drafts/tests/apparel-${envFolder}`,
    displayPdp: `${pdpBase}/adb125`,
    pdpAcdlOnly: `${pdpBase}/adb125`,
    plpBlockSkuAndPrice: `/drafts/tests/apparel-${envFolder}-price`,
    pdpBlockSkuNoPrice: `${pdpBase}/adb125-sku`,
    cartRecsBlock: `/drafts/tests/cart-recs-${envFolder}`,
  };
}

module.exports = { buildPrexPages };
