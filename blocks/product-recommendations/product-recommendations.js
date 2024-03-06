import { performCatalogServiceQuery } from '../../scripts/commerce.js';

const recommendationsQuery = `query GetRecommendations(
  $pageType: PageType!
  $category: String
  $currentSku: String
  $userViewHistory: [ViewHistory]
) {
  recommendations(
    cartSkus: []
    category: $category
    currentSku: $currentSku
    pageType: $pageType
    userPurchaseHistory: []
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

let recommendationsPromise;

function renderPlaceholder(block) {
  block.innerHTML = `<h2></h2>
  <div class="scrollable">
    <div class="product-grid">
      ${[...Array(5)].map(() => `
        <div class="placeholder">
          <picture><img width="300" height="375" src="" /></picture>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderItem(product) {
  const urlKey = product.url.split('/').pop().replace('.html', '');
  const image = product.images[0]?.url;

  return document.createRange().createContextualFragment(`<div class="product-grid-item">
    <a href="/products/${urlKey}/${product.sku.toLowerCase()}">
      <picture>
        <source type="image/webp" srcset="${image}?width=300&format=webply&optimize=medium" />
        <img loading="lazy" alt="${product.name}" width="300" height="375" src="${image}?width=300&format=jpg&optimize=medium" />
      </picture>
      <span>${product.name}</span>
    </a>
  </div>`);
}

function renderItems(block, recommendations) {
  // Render only first recommendation
  const [recommendation] = recommendations.results;
  if (!recommendation) {
    // Hide block content if no recommendations are available
    block.textContent = '';
    return;
  }

  // Title
  block.querySelector('h2').textContent = recommendation.storefrontLabel;

  // Grid
  const grid = block.querySelector('.product-grid');
  grid.innerHTML = '';
  const { productsView } = recommendation;
  productsView.forEach((product) => {
    grid.appendChild(renderItem(product));
  });
}

async function loadRecommendation(block, context) {
  // Only proceed if all required data is available
  if (!context.pageType
    || (context.pageType === 'Product' && !context.currentSku)
    || (context.pageType === 'Category' && !context.category)) {
    return;
  }

  if (recommendationsPromise) {
    return;
  }

  // Get user view history
  // TODO
  /* let productViews = window
    .adobeDataLayer.getState('productContext', [-10, 0], { flatten: false }) || [];
  if (!Array.isArray(productViews) && productViews) {
    productViews = [productViews];
  }
  context.userViewHistory = productViews
    .map(({ sku }) => ({ sku }))
    .reduce((acc, current) => {
      const x = acc.find((p) => p.sku === current.sku);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []); */

  recommendationsPromise = performCatalogServiceQuery(recommendationsQuery, context);
  const { recommendations } = await recommendationsPromise;
  renderItems(block, recommendations);
}

export default async function decorate(block) {
  renderPlaceholder(block);

  const context = {};

  function handleProductChanges({ productContext }) {
    context.currentSku = productContext.sku;
    loadRecommendation(block, context);
  }

  function handleCategoryChanges({ categoryContext }) {
    context.category = categoryContext.name;
    loadRecommendation(block, context);
  }

  function handlePageTypeChanges({ pageContext }) {
    context.pageType = pageContext.pageType;
    loadRecommendation(block, context);
  }

  window.adobeDataLayer.push((dl) => {
    dl.addEventListener('adobeDataLayer:change', handlePageTypeChanges, { path: 'pageContext' });
    dl.addEventListener('adobeDataLayer:change', handleProductChanges, { path: 'productContext' });
    dl.addEventListener('adobeDataLayer:change', handleCategoryChanges, { path: 'categoryContext' });
  });
}
