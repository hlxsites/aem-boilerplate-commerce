/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */

import { initializers } from '@dropins/tools/initializer.js';
import { Image, provider as UI } from '@dropins/tools/components.js';
import {
  initialize,
  setEndpoint,
  setFetchGraphQlHeaders,
  fetchProductData,
} from '@dropins/storefront-pdp/api.js';
import { initializeDropin } from './index.js';
import {
  fetchPlaceholders,
  commerceEndpointWithQueryParams,
  getOptionsUIDsFromUrl,
  getProductSku,
  loadErrorPage,
} from '../commerce.js';
import { getHeaders } from '../configs.js';

export const IMAGES_SIZES = {
  width: 960,
  height: 1191,
};

await initializeDropin(async () => {
  // Set Fetch Endpoint (Service)
  setEndpoint(await commerceEndpointWithQueryParams());

  // Set Fetch Headers (Service)
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

  const sku = getProductSku();
  const optionsUIDs = getOptionsUIDsFromUrl();

  // Use SSG data if available and refinement is needed based on optionsUIDs avalability
  let product;
  if (window.product && !optionsUIDs?.length) {
    product = await preloadImageMiddleware(window.product);
  } else {
    product = await fetchProductData(sku, {
      optionsUIDs,
      skipTransform: true,
    }).then(preloadImageMiddleware);
  }

  const labels = await fetchPlaceholders();

  if (!product?.sku) {
    return loadErrorPage();
  }

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
  return initializers.mountImmediately(initialize, {
    sku,
    optionsUIDs,
    langDefinitions,
    models,
    acdl: true,
    persistURLParams: true,
  });
})();

async function preloadImageMiddleware(data) {
  const image = data?.images?.[0]?.url?.replace(/^https?:/, '');

  if (image) {
    await UI.render(Image, {
      src: image,
      ...IMAGES_SIZES.mobile,
      params: {
        ...IMAGES_SIZES,
      },
      loading: 'eager',
    })(document.createElement('div'));
  }
  return data;
}
