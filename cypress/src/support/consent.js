// URL of the storefront's consent gate, dynamically imported by scripts.js
// loadDelayed(). The `**` prefix tolerates any code base path.
const CONSENT_CHECK_URL = '**/scripts/consent-check.js';

/**
 * Rewrites the served consent-check.js so hasConsent() returns the desired
 * decision, without touching the real (shipped) file. An unconditional return
 * is injected at the top of hasConsent(); the original body below is left
 * intact but unreachable.
 *
 * The intercept stays active for the whole test, and the rewritten response is
 * served with `cache-control: no-store` so the module is never cached. Every
 * page load therefore re-fetches it through this intercept, which means consent
 * also applies to app-initiated navigations (redirects, anchor clicks) — a
 * query param on the initial cy.visit URL would not survive those. (We rely on
 * no-store here rather than globally disabling the browser cache, which would
 * slow every request and widen timing races in async event assertions.)
 *
 * Mirrors the body-rewriting idiom in interceptConfig.js.
 *
 * @param {boolean} granted whether hasConsent() should return true
 */
function interceptConsentCheck(granted) {
  cy.intercept(CONSENT_CHECK_URL, { middleware: true, method: 'GET' }, (req) => {
    req.on('before:response', (res) => {
      // Force the module to not be cached so every navigation re-fetches it.
      res.headers['cache-control'] = 'no-store';
    });

    req.on('response', (res) => {
      res.body = res.body.replace(
        'function hasConsent() {',
        `function hasConsent() {\n  return ${granted};`,
      );
      res.send(res);
    });
  }).as('consentCheck');
}

/**
 * Opts a describe/spec block into loading consented scripts (analytics, martech,
 * etc.). The storefront gates them behind a consent check that defaults to
 * "declined"; this forces it to grant consent for the block's tests so they can
 * assert on the events collector and adobeDataLayer. Call once at the top of the
 * block (before the it() cases).
 *
 * @example
 * import { withConsent } from '../../../support/consent';
 * withConsent();
 * it('sends an event', () => { cy.visit('/'); ... });
 *
 * @param {string} [value='accept'] consent decision; 'accept' grants consent
 */
export function withConsent(value = 'accept') {
  const granted = value === 'accept';
  beforeEach(() => interceptConsentCheck(granted));
}
