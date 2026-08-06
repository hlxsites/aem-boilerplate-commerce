import { initializers } from '@dropins/tools/initializer.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import * as paymentServicesApi from '@dropins/storefront-payment-services/api.js';
import { fetchPlaceholders } from '../commerce.js';
import { PBL_FETCH_GRAPHQL } from './pay-by-link-client.js';

let initialization;

export default function initializePayByLinkPaymentServices() {
  if (initialization) return initialization;

  initialization = (async () => {
    const labels = await fetchPlaceholders('placeholders/payment-services.json');
    const { endpoint } = PBL_FETCH_GRAPHQL.getConfig();

    return initializers.mountImmediately(paymentServicesApi.initialize, {
      apiUrl: endpoint,
      getCustomerToken: () => null,
      storeViewCode: getHeaders('all').Store,
      langDefinitions: { default: { ...labels } },
    });
  })();

  return initialization;
}
