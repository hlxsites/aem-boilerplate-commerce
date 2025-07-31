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
  setEndpoint(await commerceEndpointWithQueryParams());
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

  const labels = await fetchPlaceholders('placeholders/search.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    ProductSearchResult: {
      // We must extend the ProductSearchResult model with the new data fetched from the API in the
      // build.mjs file. The `data` object is the raw API response. The returned object will be
      // merged into the ProductSearchResult model, which will then be available via the `ctx`
      // object in the `ProductSearchResult` slot.
      transformer: (data) => ({
        // The returned object will be deeb merged into the ProductSearchResult model.
        // You only need to return the properties you want to extend.
        facets: data.productSearch.facets
          ?.filter((facet) => facet.attribute === 'categories') // apply filter to only include categories facets
          .map((facet, index) => ({
            buckets: facet.buckets?.map((bucket) => ({
              icon: `https://picsum.photos/40?key=${bucket.path}&index=${index}`,
              name: bucket.path,
            })),
          })),
      }),
    },
    Product: {
      // We must extend the Product model with the new data fetched from the API in the build.mjs
      // file. The `data` object is the raw API response. The returned object will be merged into
      // the Product model, which will then be available via the `ctx` object in the
      // `ProductActions` slot.
      transformer: (data) => ({
        options: data?.options,
      }),
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions, models });
})();
