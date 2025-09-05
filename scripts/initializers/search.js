import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setFetchGraphQlHeaders,
  setEndpoint,
} from '@dropins/storefront-product-discovery/api.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders, commerceEndpointWithQueryParams } from '../commerce.js';

await initializeDropin(async () => {
  let groupIdHeader = null;
  setFetchGraphQlHeaders((prev) => {
    const headers = {
      ...prev,
      ...getHeaders('cs'),
    };
    if (prev['Magento-Customer-Group']) {
      headers['Magento-Customer-Group'] = prev['Magento-Customer-Group'];
      groupIdHeader = prev['Magento-Customer-Group'];
    }
    return headers;
  });
  setEndpoint(await commerceEndpointWithQueryParams(groupIdHeader));

  const labels = await fetchPlaceholders('placeholders/search.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
