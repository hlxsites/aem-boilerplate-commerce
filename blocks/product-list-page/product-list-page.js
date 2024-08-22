import { readBlockConfig } from '../../scripts/aem.js';
import { getConfigValue } from '../../scripts/configs.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // eslint-disable-next-line import/no-absolute-path, import/no-unresolved
  await import('/scripts/widgets/search.js');

  const { category, urlpath, type } = readBlockConfig(block);
  block.textContent = '';

  const storeDetails = {
    environmentId: await getConfigValue('commerce-environment-id'),
    environmentType: (await getConfigValue('commerce-endpoint')).includes(
      'sandbox'
    )
      ? 'testing'
      : '',
    apiKey: await getConfigValue('commerce-x-api-key'),
    websiteCode: await getConfigValue('commerce-website-code'),
    storeCode: await getConfigValue('commerce-store-code'),
    storeViewCode: await getConfigValue('commerce-store-view-code'),
    config: {
      pageSize: 8,
      perPageConfig: {
        pageSizeOptions: '8,12,24,36',
        defaultPageSizeOption: '8',
      },
      minQueryLength: '2',
      currencySymbol: '$',
      currencyRate: '1',
      displayOutOfStock: true,
      allowAllProducts: false,
      imageCarousel: false,
      optimizeImages: true,
      imageBaseWidth: 200,
      listview: true,
      displayMode: '', // "" for plp || "PAGE" for category/catalog
      addToCart: async (...args) => {
        const { cartApi } = await import('../../scripts/minicart/api.js');
        return cartApi.addToCart(...args);
      },
    },
    context: {
      customerGroup: await getConfigValue('commerce-customer-group'),
    },
    route: ({ sku, urlKey }) => `/products/${urlKey}/${sku}`,
  };

  if (type !== 'search') {
    storeDetails.config.categoryName = document.querySelector(
      '.default-content-wrapper > h1'
    )?.innerText;
    storeDetails.config.currentCategoryId = category;
    storeDetails.config.currentCategoryUrlPath = urlpath;

    // Enable enrichment
    block.dataset.category = category;
  }

  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.LiveSearchPLP) {
        clearInterval(interval);
        resolve();
      }
    }, 200);
  });
  const pic = col.querySelector('picture');
  if (pic) {
    const picWrapper = pic.closest('div');
    if (picWrapper && picWrapper.children.length === 1) {
      // picture is only content in column

      const img = pic.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ width: '800', height: 'auto' }]
        );
        pic.replaceWith(optimizedPicture);
      }
    }
  }

  return window.LiveSearchPLP({ storeDetails, root: block });
}
