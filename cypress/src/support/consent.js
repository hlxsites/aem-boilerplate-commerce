const CONSENT_KEY = 'consentOverride';

/**
 * Overrides cy.visit so that, when a describe/spec block has opted in via
 * withConsent(), a `consent` query parameter is appended to every visited URL.
 *
 * The storefront gates consented scripts (analytics, martech, etc.) behind a
 * consent check that defaults to "declined". Appending `?consent=accept` loads
 * them so event-related tests can assert on the collector and adobeDataLayer.
 *
 * Does nothing when no block has opted in, and never clobbers a `consent`
 * param that a test set explicitly.
 */
Cypress.Commands.overwrite('visit', (orig, url, options) => {
  const consent = Cypress.env(CONSENT_KEY);
  if (consent && typeof url === 'string' && !/[?&]consent=/.test(url)) {
    const separator = url.includes('?') ? '&' : '?';
    return orig(`${url}${separator}consent=${consent}`, options);
  }
  return orig(url, options);
});

/**
 * Opts a describe/spec block into loading consented scripts. Every cy.visit()
 * within the block gets `?consent=<value>` appended. Call once at the top of
 * the block (before the it() cases).
 *
 * @example
 * import { withConsent } from '../../../support/consent';
 * withConsent();
 * it('sends an event', () => { cy.visit('/'); ... });
 *
 * @param {string} [value='accept'] consent value to request
 */
export function withConsent(value = 'accept') {
  beforeEach(() => Cypress.env(CONSENT_KEY, value));
  afterEach(() => Cypress.env(CONSENT_KEY, null));
}
