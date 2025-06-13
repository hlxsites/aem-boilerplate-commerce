import ProductList from '@dropins/storefront-product-discovery/containers/ProductList.js';
import Facets from '@dropins/storefront-product-discovery/containers/Facets.js';
import ResultsInfo from '@dropins/storefront-product-discovery/containers/ResultsInfo.js';
import SearchBarInput from '@dropins/storefront-product-discovery/containers/SearchBarInput.js';
// import SearchBarResults from "@dropins/storefront-product-discovery/containers/SearchBarResults.js";

import { render as plpRender } from '@dropins/storefront-product-discovery/render.js';
import * as plpApi from '@dropins/storefront-product-discovery/api.js';
import { rootLink } from '../../scripts/scripts.js';
import { getConfigValue } from '../../scripts/configs.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  // eslint-disable-next-line import/no-absolute-path, import/no-unresolved
  // await import('/scripts/widgets/search.js');

  const { category, urlpath, type } = readBlockConfig(block);
  block.textContent = '';

  const storeDetails = {
    environmentId: getConfigValue('headers.cs.Magento-Environment-Id'),
    environmentType: getConfigValue('commerce-endpoint').includes('sandbox')
      ? 'testing'
      : '',
    apiKey: getConfigValue('headers.cs.x-api-key'),
    apiUrl: getConfigValue('commerce-endpoint'),
    websiteCode: getConfigValue('headers.cs.Magento-Website-Code'),
    storeCode: getConfigValue('headers.cs.Magento-Store-Code'),
    storeViewCode: getConfigValue('headers.cs.Magento-Store-View-Code'),
    config: {
      pageSize: 8,
      perPageConfig: {
        pageSizeOptions: '12,24,36',
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
      listview: true,
      displayMode: '', // "" for plp || "PAGE" for category/catalog
      addToCart: async (...args) => {
        const { addProductsToCart } = await import(
          '../../scripts/__dropins__/storefront-cart/api.js'
        );
        await addProductsToCart([
          {
            sku: args[0],
            options: args[1],
            quantity: args[2],
          },
        ]);
      },
    },
    context: {
      customerGroup: getConfigValue('headers.cs.Magento-Customer-Group'),
    },
    route: ({ sku, urlKey }) => {
      const a = new URL(window.location.origin);
      a.pathname = rootLink(`/products/${urlKey}/${sku}`);
      return a.toString();
    },
  };

  const fragment = document.createRange().createContextualFragment(`
    <div class="search__input"></div>
    <div class="search__wrapper">
      <div class="search__left-column">
        <div class="search__result-info"></div>
        <div class="search__facets"></div>
      </div>
      <div class="search__right-column">
        <div class="search__product-list"></div>
      </div>
    </div>
  `);

  const $input = fragment.querySelector('.search__input');
  const $resultInfo = fragment.querySelector('.search__result-info');
  const $facets = fragment.querySelector('.search__facets');
  const $productList = fragment.querySelector('.search__product-list');

  block.innerHTML = '';
  block.appendChild(fragment);
  console.log('PLP BLOCK INITILIZATION');
  await Promise.all([
    plpApi.initialize(storeDetails),
    plpRender($input, SearchBarInput, { storeDetails }),
    plpRender($resultInfo, ResultsInfo, { storeDetails }),
    plpRender($facets, Facets, { storeDetails }),
    plpRender($productList, ProductList, { storeDetails }),
  ]);

  if (type !== 'search') {
    storeDetails.config.categoryName = document.querySelector(
      '.default-content-wrapper > h1',
    )?.innerText;
    storeDetails.config.currentCategoryId = category;
    storeDetails.config.currentCategoryUrlPath = urlpath;

    // Enable enrichment
    block.dataset.category = category;
  }

  // await new Promise((resolve) => {
  //   const interval = setInterval(() => {
  //     if (window.LiveSearchPLP) {
  //       clearInterval(interval);
  //       resolve();
  //     }
  //   }, 200);
  // });

  // return window.LiveSearchPLP({ storeDetails, root: block });
  return Promise.resolve();
}
