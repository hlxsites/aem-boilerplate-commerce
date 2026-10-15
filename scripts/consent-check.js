import { getConsent } from './consent.js';

let consentedLoaded = false;

/**
 * Dummy consent implementation.
 *
 * By default consent is declined, so consented scripts (analytics, martech, etc.)
 * are not loaded. This stands in for a real CMP (OneTrust, etc.) and can be
 * swapped out later.
 *
 * The default can be overridden with a query parameter for testing:
 *   ?consent=accept   grant consent (loads consented.js)
 *   ?consent=decline  decline consent (default behavior)
 *
 * @returns {boolean} true if the user has consented
 */
function hasConsent() {
  const localTestHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
  if (!localTestHosts.has(window.location.hostname)) return false;

  const consent = new URLSearchParams(window.location.search).get('consent');
  if (consent !== null) {
    return ['accept', 'true', '1', 'yes'].includes(consent.toLowerCase());
  }
  // default: decline
  return false;
}

/**
 * Loads consented scripts once consent is available.
 */
function loadConsented() {
  if (consentedLoaded) return;
  consentedLoaded = true;
  import('./consented.js').catch((error) => {
    consentedLoaded = false;
    console.warn('Error loading consented scripts', error);
  });
}

/**
 * Loads consented scripts when the shared global consent state is granted.
 */
function onConsentUpdate() {
  if (getConsent()) {
    loadConsented();
  }
}

console.warn('Using the consent-check.js testing placeholder; integrate the merchant CMP before production.');

window.addEventListener('consent.update', onConsentUpdate);
window.dispatchEvent(
  new CustomEvent('consent.update', {
    detail: { consented: hasConsent() },
  }),
);
