/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setEndpoint,
  setFetchGraphQlHeaders,
  fetchProductData,
} from '@dropins/storefront-pdp/api.js';
import { initializeDropin } from './index.js';
import { commerceEndpointWithQueryParams, getOptionsUIDsFromUrl, getSkuFromUrl } from '../commerce.js';
import { getConfigValue } from '../configs.js';
import { fetchPlaceholders } from '../aem.js';

await initializeDropin(async () => {
  // Set Fetch Endpoint (Service)
  setEndpoint(await commerceEndpointWithQueryParams());

  // Set Fetch Headers (Service)
  setFetchGraphQlHeaders({
    'Content-Type': 'application/json',
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  });

  const sku = getSkuFromUrl();
  const optionsUIDs = getOptionsUIDsFromUrl();

  const [product, labels] = await Promise.all([
    fetchProductData(sku, { optionsUIDs, skipTransform: true }),
    fetchPlaceholders(),
  ]);

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    ProductDetails: {
      initialData: { ...product },
    },
  };

  // Initialize Dropins
  await initializers.mountImmediately(initialize, {
    sku,
    optionsUIDs,
    langDefinitions,
    models,
    acdl: true,
    persistURLParams: true,
  });
})();
