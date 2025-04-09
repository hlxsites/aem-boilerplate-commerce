/* eslint-disable import/no-cycle */
import { getConfigValue } from './configs.js';
import { getUserTokenCookie } from './initializers/index.js';
import { getConsent } from './scripts.js';

async function initAnalytics() {
  try {
    // Load Commerce events SDK and collector
    if (getConsent('commerce-collection')) {
      const config = {
        baseCurrencyCode: await getConfigValue('analytics.base-currency-code'),
        environment: await getConfigValue('analytics.environment'),
        environmentId: await getConfigValue('headers.cs.Magento-Environment-Id'),
        storeCode: await getConfigValue('headers.cs.Magento-Store-Code'),
        storefrontTemplate: 'EDS',
        storeId: parseInt(await getConfigValue('analytics.store-id'), 10),
        storeName: await getConfigValue('analytics.store-name'),
        storeUrl: await getConfigValue('analytics.store-url'),
        storeViewCode: await getConfigValue('headers.cs.Magento-Store-View-Code'),
        storeViewCurrencyCode: await getConfigValue('analytics.base-currency-code'),
        storeViewId: parseInt(await getConfigValue('analytics.store-view-id'), 10),
        storeViewName: await getConfigValue('analytics.store-view-name'),
        websiteCode: await getConfigValue('headers.cs.Magento-Website-Code'),
        websiteId: parseInt(await getConfigValue('analytics.website-id'), 10),
        websiteName: await getConfigValue('analytics.website-name'),
      };

      window.adobeDataLayer.push(
        { storefrontInstanceContext: config },
        { eventForwardingContext: { commerce: true, aep: false } },
        {
          shopperContext: {
            shopperId: getUserTokenCookie() ? 'logged-in' : 'guest',
          },
        },
      );

      // Load events SDK and collector
      import('./commerce-events-sdk.js');
      import('./commerce-events-collector.js');
    }
  } catch (error) {
    console.warn('Error initializing analytics', error);
  }
}

if (document.prerendering) {
  document.addEventListener('prerenderingchange', initAnalytics, { once: true });
} else {
  initAnalytics();
}

// add delayed functionality here
