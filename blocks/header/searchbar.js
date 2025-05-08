/* eslint-disable import/no-unresolved */
import { render as provider } from '@dropins/storefront-search/render.js';
import SearchPopover from '@dropins/storefront-search/containers/SearchPopover.js';
import {
  setFetchGraphQlHeaders,
} from '@dropins/storefront-search/api.js';
import { rootLink } from '../../scripts/scripts.js';

import { getConfigValue, getHeaders } from '../../scripts/configs.js';

export default async function initSearchPopover() {
  import('../../scripts/initializers/search.js');
  try {
    const storeDetails = {
      apiUrl: getConfigValue('commerce-endpoint'),
      config: {
        pageSize: 8,
        perPageConfig: {
          pageSizeOptions: '12,24,36',
          defaultPageSizeOption: '24',
        },
        minQueryLength: '2',
        currencySymbol: '$',
        currencyRate: '1',
        displayOutOfStock: true,
        allowAllProducts: false,
      },
      context: {
        customerGroup: getConfigValue('headers.cs.Magento-Customer-Group'),
      },
      route: ({ sku, urlKey }) => rootLink(`/products/${urlKey}/${sku}`),
      searchRoute: {
        route: rootLink('/search'),
        query: 'q',
      },
    };
    setFetchGraphQlHeaders(getHeaders('cs'));
    const rootElement = document.getElementById('search_autocomplete');

    if (rootElement) {
      provider.render(SearchPopover, { storefrontDetails: storeDetails })(
        rootElement,
      );
    } else {
      console.error('Root element #search_autocomplete not found.');
    }
  } catch (error) {
    console.error('Failed to initialize search popover:', error);
  }
}
