/* eslint-disable import/no-unresolved */
import { render as provider } from '@dropins/storefront-search/render.js';
import SearchPopover from '@dropins/storefront-search/containers/SearchPopover.js';

async function getStoreDetails() {
  return {
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
    route: ({ sku, urlKey }) => `/products/${urlKey}/${sku}`,
    searchRoute: {
      route: '/search',
      query: 'q',
    },
  };
}

async function initSearchPopover() {
  import('../../scripts/initializers/search.js');

  try {
    const storeDetails = await getStoreDetails();
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

initSearchPopover();
