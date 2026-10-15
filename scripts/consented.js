// add functionality that requires user consent here (analytics, martech, etc.)
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { getUserTokenCookie } from './initializers/index.js';
import { getConsent } from './commerce.js';
import { CONSENT_TOPICS } from './consent.js';
import {
  configureAnalyticsSubscriptions,
  finishAnalyticsEventCapture,
  startAnalyticsEventCapture,
} from './analytics-events.js';

let analyticsLoading;

function updateAnalyticsConsent(analyticsConfig) {
  const consented = getConsent(CONSENT_TOPICS.COLLECTION) && !document.prerendering;
  document.cookie = consented
    ? 'mg_dnt=; Max-Age=0; path=/; SameSite=Lax'
    : 'mg_dnt=true; path=/; SameSite=Lax';
  window.adobeDataLayer.push({
    eventForwardingContext: {
      commerce: consented,
      aep: consented && !!(analyticsConfig['aep-ims-org-id'] && analyticsConfig['aep-datastream-id']),
    },
  });
  if (window.alloy && analyticsConfig['aep-ims-org-id'] && analyticsConfig['aep-datastream-id']) {
    window.alloy('setConsent', {
      consent: [{ standard: 'Adobe', version: '1.0', value: { general: consented ? 'in' : 'out' } }],
    }).catch((error) => console.warn('Error updating analytics consent', error));
  }
}

async function initAnalytics() {
  try {
    // Load Commerce events SDK and collector
    // only if "analytics" has been added to the config.
    const analyticsConfig = getConfigValue('analytics');

    if (!analyticsConfig) return;
    updateAnalyticsConsent(analyticsConfig);
    if (analyticsConfig && getConsent(CONSENT_TOPICS.COLLECTION)) {
      if (document.prerendering || analyticsLoading) return;
      startAnalyticsEventCapture();
      window.adobeDataLayer.push(
        {
          storefrontInstanceContext: {
            baseCurrencyCode: analyticsConfig['base-currency-code'],
            environment: analyticsConfig.environment,
            environmentId: analyticsConfig['environment-id'],
            storeCode: analyticsConfig['store-code'],
            storefrontTemplate: 'EDS',
            storeId: parseInt(analyticsConfig['store-id'], 10),
            storeName: analyticsConfig['store-name'],
            storeUrl: analyticsConfig['store-url'],
            storeViewCode: analyticsConfig['store-view-code'],
            storeViewCurrencyCode: analyticsConfig['base-currency-code'],
            storeViewId: parseInt(analyticsConfig['store-view-id'], 10),
            storeViewName: analyticsConfig['store-view-name'],
            websiteCode: analyticsConfig['website-code'],
            websiteId: parseInt(analyticsConfig['website-id'], 10),
            websiteName: analyticsConfig['website-name'],
            viewId: analyticsConfig['view-id'], // applicable for ACO storefronts
            // setting locale if defined, applicable for ACO storefronts
            ...(analyticsConfig.locale && { locale: analyticsConfig.locale }),
          },
        },
        {
          eventForwardingContext: {
            commerce: true,
            aep: !!(analyticsConfig['aep-ims-org-id'] && analyticsConfig['aep-datastream-id']),
          },
        },
        {
          shopperContext: {
            shopperId: getUserTokenCookie() ? 'logged-in' : 'guest',
          },
        },
        {
          aepContext: {
            imsOrgId: analyticsConfig['aep-ims-org-id'],
            datastreamId: analyticsConfig['aep-datastream-id'],
          },
        },
      );

      // Load events SDK and collector
      analyticsLoading = (async () => {
        try {
          await import('./commerce-events-sdk.js');
          if (!getConsent(CONSENT_TOPICS.COLLECTION) || document.prerendering) {
            analyticsLoading = undefined;
            return;
          }
          configureAnalyticsSubscriptions(window.magentoStorefrontEvents);
          window.magentoStorefrontEvents.publish.pageView();
          await import('./commerce-events-collector.js');
          updateAnalyticsConsent(analyticsConfig);
        } finally {
          finishAnalyticsEventCapture();
        }
      })();
      await analyticsLoading;
    }
  } catch (error) {
    finishAnalyticsEventCapture();
    analyticsLoading = undefined;
    console.warn('Error initializing analytics', error);
  }
}

window.addEventListener('consent.update', initAnalytics);
if (document.prerendering) {
  document.addEventListener('prerenderingchange', initAnalytics, { once: true });
} else {
  initAnalytics();
}
