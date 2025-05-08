/* eslint-disable import/no-unresolved */
import { ProductListingPage } from '@dropins/storefront-search/containers/ProductListingPage.js';
import { render as provider } from '@dropins/storefront-search/render.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { getConfigValue, getHeaders } from '../../scripts/configs.js';
import { rootLink } from '../../scripts/scripts.js';

// Initializer
import('../../scripts/initializers/search.js');

export default async function decorate(block) {
  const { urlpath, category, type } = readBlockConfig(block);
  block.textContent = '';

  // Store Config
  const storeConfig = {
    type: 'eds',
    environmentType: getConfigValue('analytics.environment').includes('Production') ? '' : 'testing',
    apiUrl: getConfigValue('commerce-endpoint'),
    customerGroup: getConfigValue('headers.cs.Magento-Customer-Group'),
    route: ({ sku, urlKey }) => {
      const a = new URL(window.location.origin);
      a.pathname = rootLink(`/products/${urlKey}/${sku}`);
      return a.toString();
    },
    defaultHeaders: {
      'Content-Type': 'application/json',
      ...getHeaders('cs'),
    },
    // PLP config
    config: {
      pageSize: 8,
      perPageConfig: {
        pageSizeOptions: '12, 24, 36',
        defaultPageSizeOption: '12',
      },
      minQueryLength: '2',
      currencySymbol: '$',
      currencyRate: '1',
      displayOutOfStock: true,
      allowAllProducts: false,
      imageCarousel: false,
      optimizeImages: true,
      imageBaseWidth: 200,
      listview: false,
      currentCategoryUrlPath: null,
      displayMode: '', // "" for plp || "PAGE" for category/catalog
      addToCart: async (...args) => {
        const { addProductsToCart } = await import('../../scripts/__dropins__/storefront-cart/api.js');
        await addProductsToCart([{
          sku: args[0],
          options: args[1],
          quantity: args[2],
        }]);
      },
      route: {
        route: rootLink('/search'),
        query: 'q',
      },
    },
  };

  // for non search pages
  if (type !== 'search') {
    storeConfig.config.categoryName = document.querySelector('.default-content-wrapper > h1')?.innerText;
    storeConfig.config.currentCategoryId = category;
    storeConfig.config.currentCategoryUrlPath = urlpath;

    // Enable enrichment
    block.dataset.category = category;
  }

  const widget = document.createElement('div');
  widget.id = 'plp-widget-container';
  block.appendChild(widget);

  const rootElement = document.getElementById('plp-widget-container');

  if (rootElement) {
    provider.render(ProductListingPage, { storeConfig })(
      rootElement,
    );
  } else {
    console.warn('Root element #plp-widget-container not found.');
  }
}
