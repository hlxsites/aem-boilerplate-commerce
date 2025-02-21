/* eslint-disable import/no-unresolved */
import { ProductListingPage } from '@dropins/storefront-search/containers/ProductListingPage.js';
import { render as provider } from '@dropins/storefront-search/render.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { getConfigValue, getHeaders } from '../../scripts/configs.js';
import { getProperty } from '../../scripts/commerce.js';

// Initializer
await import('../../scripts/initializers/search.js');

export default async function decorate(block) {
  const { type } = readBlockConfig(block);
  block.textContent = '';

  const urlpath = window.location.pathname.slice(1);

  const categoryData = await window.categoryData;
  const categoryId = getProperty(
    categoryData.data.categories.items,
    'id',
    { url: window.location.pathname.slice(1) },
  );

  // a hack to determine if current page is a category page.
  const isCategory = !!document.querySelectorAll('.product-list-page-container').length;

  if (isCategory) {
    const categoryName = getProperty(
      categoryData.data.categories.items,
      'name',
      { url: window.location.pathname.slice(1) },
    );

    if (categoryName) {
      const bannerCopy = block.closest('.product-list-page-container').querySelector('h2');
      bannerCopy.textContent = categoryName;
      window.document.title = categoryName;
    } else {
      console.warn('Category name not found for the current URL path.');
    }
  }

  if (!categoryId) {
    console.warn('missing category id in data/data.json for urlpath', urlpath);
  }
  // PLP Config
  const plpConfig = {
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
    optimizeImages: false,
    imageBaseWidth: 200,
    listview: false,
    currentCategoryUrlPath: type !== 'search' ? urlpath : null,
    displayMode: '',
    addToCart: async (...args) => {
      const { addProductsToCart } = await import('../storefront-cart/api.js');
      await addProductsToCart([{
        sku: args[0],
        options: args[1],
        quantity: args[2],
      }]);
    },
    route: {
      route: '/search',
      query: 'q',
    },
  };

  // Get Config Values
  const environmentId = await getConfigValue('commerce.headers.cs.Magento-Environment-Id');
  const apiKey = await getConfigValue('commerce.headers.cs.x-api-key');
  const apiUrl = await getConfigValue('commerce-endpoint');
  const websiteCode = await getConfigValue('commerce.headers.cs.Magento-Website-Code');
  const storeCode = await getConfigValue('commerce.headers.cs.Magento-Store-Code');
  const storeViewCode = await getConfigValue('commerce.headers.cs.Magento-Store-View-Code');
  const customerGroup = await getConfigValue('commerce.headers.cs.Magento-Customer-Group');
  const configHeaders = await getHeaders('cs');

  // Store Config
  const storeConfig = {
    type: 'eds',
    environmentId,
    environmentType: (async () => ((apiUrl.includes('sandbox')) ? 'testing' : ''))(),
    apiKey,
    apiUrl,
    websiteCode,
    storeCode,
    storeViewCode,
    customerGroup,
    route: ({ sku, urlKey }) => `/products/${urlKey}/${sku}`,
    defaultHeaders: {
      'Content-Type': 'application/json',
      ...configHeaders,
    },
    config: plpConfig,
  };

  // for non search pages
  if (type !== 'search') {
    // Enable enrichment
    block.dataset.category = categoryId;
  }

  const widget = document.createElement('div');
  block.appendChild(widget);
  provider.render(ProductListingPage, { storeConfig })(widget);
}
