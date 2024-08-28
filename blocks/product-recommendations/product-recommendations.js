/* eslint-disable no-underscore-dangle */
import {fetchPlaceholders, readBlockConfig} from '../../scripts/aem.js';
import { performCatalogServiceQuery } from '../../scripts/commerce.js';
import { ProductCard } from '../product-list-page/ProductList.js';
import { getConfig, getConfigValue } from '../../scripts/configs.js';
import { h, render } from '../../scripts/preact.js';
import { htm } from "../../scripts/htm.js";
const html = htm.bind(h);

const isMobile = window.matchMedia('only screen and (max-width: 900px)').matches;

const recommendationsQuery = `query GetRecommendations(
  $pageType: PageType!
  $category: String
  $currentSku: String
  $cartSkus: [String]
  $userPurchaseHistory: [PurchaseHistory]
  $userViewHistory: [ViewHistory]
) {
  recommendations(
    cartSkus: $cartSkus
    category: $category
    currentSku: $currentSku
    pageType: $pageType
    userPurchaseHistory: $userPurchaseHistory
    userViewHistory: $userViewHistory
  ) {
    results {
      displayOrder
      pageType
      productsView {
        name
        sku
        url
        images {
          url
        }
        externalId
        __typename
      }
      storefrontLabel
      totalProducts
      typeId
      unitId
      unitName
    }
    totalResults
  }
}`;

let unitsPromise;
let placeholders;

function renderPlaceholder(block,config) {
  const c = config.hasOwnProperty('count') ? parseInt(config.count) : 5;
  const p = html`<div class="product-grid"><ol>
    ${Array(c).fill().map(() => html`<${ProductCard} loading=${true} />`)}
  </ol></div>`;

  block.innerHTML = '';
  render(p, block);
}

function renderItem(unitId, product, config) {
  const clickHandler = () => {
    window.adobeDataLayer.push((dl) => {
      dl.push({ event: 'recs-item-click', eventInfo: { ...dl.getState(), unitId, productId: parseInt(product.externalId, 10) || 0 } });
    });
  };

  const item = document.createDocumentFragment();

  const i = html`<${ProductCard} key=${product.sku} product=${product} locale=${config['store-locale']} currency=${config['store-currency-code']} placeholders=${placeholders} />`;
  render(i, item);
  item.firstElementChild.querySelector('a').addEventListener('click', clickHandler);
  return item.firstElementChild;
}

function renderItems(block, results, config, count) {
  // Render only first recommendation
  const [recommendation] = results;
  if (!recommendation) {
    // Hide block content if no recommendations are available
    block.textContent = '';
    return;
  }

  window.adobeDataLayer.push((dl) => {
    dl.push({ event: 'recs-unit-impression-render', eventInfo: { ...dl.getState(), unitId: recommendation.unitId } });
  });

  const h2 = block.querySelector('h2');
  h2.classList.remove('shimmer');
  h2.classList.remove('shimmer-text');
  if(recommendation.productsView.length > 0){
    h2.textContent = recommendation.storefrontLabel;
  }

  // Grid
  const grid = block.querySelector('.product-grid ol');
  grid.innerHTML = '';
  const { productsView } = recommendation;
  productsView.slice(0, count).forEach((product) => {
    grid.appendChild(renderItem(recommendation.unitId, product, config));
  });

  const inViewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.adobeDataLayer.push((dl) => {
          dl.push({ event: 'recs-unit-view', eventInfo: { ...dl.getState(), unitId: recommendation.unitId } });
        });
        inViewObserver.disconnect();
      }
    });
  });
  inViewObserver.observe(block);
}

const mapUnit = (unit) => ({
  ...unit,
  unitType: 'primary',
  searchTime: 0,
  primaryProducts: unit.totalProducts,
  backupProducts: 0,
  products: unit.productsView.map((product, index) => ({
    ...product,
    rank: index,
    score: 0,
    productId: parseInt(product.externalId, 10) || 0,
    type: '?',
    queryType: product.__typename,
  })),
});

async function loadRecommendation(block, context, visibility, filters) {
  // Only load once the recommendation becomes visible
  if (!visibility) {
    return;
  }

  // Only proceed if all required data is available
  if (!context.pageType
    || (context.pageType === 'Product' && !context.currentSku)
    || (context.pageType === 'Category' && !context.category)
    || (context.pageType === 'Cart' && !context.cartSkus)) {
    return;
  }

  if (!unitsPromise) {
    const storeViewCode = await getConfigValue('commerce-store-view-code');
    // Get product view history
    try {
      const viewHistory = window.localStorage.getItem(`${storeViewCode}:productViewHistory`) || '[]';
      context.userViewHistory = JSON.parse(viewHistory);
    } catch (e) {
      window.localStorage.removeItem('productViewHistory');
      console.error('Error parsing product view history', e);
    }

    // Get purchase history
    try {
      const purchaseHistory = window.localStorage.getItem(`${storeViewCode}:purchaseHistory`) || '[]';
      context.userPurchaseHistory = JSON.parse(purchaseHistory);
    } catch (e) {
      window.localStorage.removeItem('purchaseHistory');
      console.error('Error parsing purchase history', e);
    }

    window.adobeDataLayer.push((dl) => {
      dl.push({ event: 'recs-api-request-sent', eventInfo: { ...dl.getState() } });
    });

    unitsPromise = performCatalogServiceQuery(recommendationsQuery, context);
    const { recommendations } = await unitsPromise;

    window.adobeDataLayer.push((dl) => {
      dl.push({ recommendationsContext: { units: recommendations.results.map(mapUnit) } });
      dl.push({ event: 'recs-api-response-received', eventInfo: { ...dl.getState() } });
    });
  }

  let { results } = (await unitsPromise).recommendations;
  results = results.filter((unit) => (filters.typeId ? unit.typeId === filters.typeId : true));

  renderItems(block, results);
}

export default async function decorate(block,config = null) 
{
  if (!config) {
    config = readBlockConfig(block);
  }
  const filters = {};
  if (config.typeid) {
    filters.typeId = config.typeid;
  }

  if (config.count) {
    filters.count = config.count;
  }

  renderPlaceholder(block, config);

  const context = {};

  if (config.pageType) {
    context.pageType = config.pageType;
  }

  if (config.callFrom) {
    filters.callFrom = config.callFrom;
  }

  let visibility = !isMobile;

  if (config.callFrom) {
    unitsPromise = null;
    visibility = true
  }

  const h2 = document.createElement('h2');
  h2.classList.add('product-grid-buy-box-header');
  h2.classList.add('shimmer');
  h2.classList.add('shimmer-text');
  block.prepend(h2);
  
  function handleProductChanges({ productContext }) {
    context.currentSku = productContext?.sku;
    loadRecommendation(block, context, visibility, filters);
  }

  function handleCategoryChanges({ categoryContext }) {
    context.category = categoryContext?.name;
    loadRecommendation(block, context, visibility, filters);
  }

  function handlePageTypeChanges({ pageContext }) {
    context.pageType = pageContext?.pageType;
    loadRecommendation(block, context, visibility, filters);
  }

  function handleCartChanges({ shoppingCartContext }) {
    context.cartSkus = shoppingCartContext?.items?.map(({ product }) => product.sku);
    loadRecommendation(block, context, visibility, filters);
  }

  window.adobeDataLayer.push((dl) => {
    dl.addEventListener('adobeDataLayer:change', handlePageTypeChanges, { path: 'pageContext' });
    dl.addEventListener('adobeDataLayer:change', handleProductChanges, { path: 'productContext' });
    dl.addEventListener('adobeDataLayer:change', handleCategoryChanges, { path: 'categoryContext' });
    dl.addEventListener('adobeDataLayer:change', handleCartChanges, { path: 'shoppingCartContext' });
  });

  if (isMobile && !config.callFrom) {
    const section = block.closest('.section');
      const inViewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibility = true;
            loadRecommendation(block, context, visibility, filters);
            inViewObserver.disconnect();
          }
        });
      });
      inViewObserver.observe(section);
  }
}
