/* eslint-disable import/no-cycle */
import { FetchGraphQL } from '@dropins/tools/fetch-graphql.js';
import { getHeaders } from './configs.js';
import { getUserTokenCookie } from './initializers/index.js';
import { getConsent } from './scripts.js';
import { commerceEndpointWithQueryParams } from './commerce.js';

async function initAnalytics() {
  const gql = new FetchGraphQL(
    await commerceEndpointWithQueryParams(),
    await getHeaders('cs'),
  );

  try {
    // fetch data from storeconfig
    const { data } = await gql.fetchGraphQl(`
      query DSContextQuery {  
        config: dataServicesStorefrontInstanceContext {
          storeId: store_id
          websiteId: website_id
          environment
          storeCode: store_code
          storeViewId: store_view_id
          baseCurrencyCode: base_currency_code
          storeViewCurrencyCode: store_view_currency_code
          storeViewName: store_view_name
          storeName: store_name
          websiteName: website_name
          storeCode: store_code
          websiteCode: website_code
          storeUrl: store_url
          environmentId: environment_id
          storeViewCode: store_view_code
        }
      }
    `, { method: 'GET', cache: 'force-cache' });

    // Load Commerce events SDK and collector
    if (getConsent('commerce-collection')) {
      const config = {
        ...data?.config ?? {},
        storefrontTemplate: 'EDS',
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
