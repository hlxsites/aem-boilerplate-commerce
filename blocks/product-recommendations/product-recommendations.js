/* eslint-disable no-underscore-dangle */

// Dropin Tools
// import { events } from '@dropins/tools/event-bus.js';
// import { initializers } from '@dropins/tools/initializer.js';

// Dropin Components
import { Button, provider as UI } from '@dropins/tools/components.js';

// Cart Dropin
import { addProductsToCart } from '@dropins/storefront-cart/api.js';

// Recommendations Dropin
import ProductList from '@dropins/storefront-recommendations/containers/ProductList.js';
import { render as provider } from '@dropins/storefront-recommendations/render.js';

// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';

// Block-level
import { readBlockConfig } from '../../scripts/aem.js';
// import { performCatalogServiceQuery } from '../../scripts/commerce.js';
import { getConfigValue } from '../../scripts/configs.js';
import { rootLink } from '../../scripts/scripts.js';

// Initializers
import '../../scripts/initializers/recommendations.js';
import '../../scripts/initializers/wishlist.js';

const isMobile = window.matchMedia('only screen and (max-width: 900px)').matches;

/**
 * Gets product view history from localStorage
 * @param {string} storeViewCode - The store view code
 * @returns {Array} - Array of view history items
 */
function getProductViewHistory(storeViewCode) {
  try {
    const viewHistory =
      window.localStorage.getItem(`${storeViewCode}:productViewHistory`) ||
      '[]';
    return JSON.parse(viewHistory);
  } catch (e) {
    window.localStorage.removeItem(`${storeViewCode}:productViewHistory`);
    console.error('Error parsing product view history', e);
    return [];
  }
}

function renderItem(unitId, product) {
  let image = product.images[0]?.url;
  if (image) {
    image = image.replace('http://', '//');
  }

  const clickHandler = () => {
    window.adobeDataLayer.push((dl) => {
      dl.push({ event: 'recs-item-click', eventInfo: { ...dl.getState(), unitId, productId: parseInt(product.externalId, 10) || 0 } });
    });
  };

  const ctaText =
    product.__typename === 'SimpleProductView'
      ? 'Add to Cart'
      : 'Select Options';
  const item = document.createRange()
    .createContextualFragment(`<div class="product-grid-item">
    <a href="${rootLink(`/products/${product.urlKey}/${product.sku}`)}">
      <picture>
        <source type="image/webp" srcset="${image}?width=300&format=webply&optimize=medium" />
        <img loading="lazy" alt="Image of ${product.name}" width="300" height="375" src="${image}?width=300&format=jpg&optimize=medium" />
      </picture>
      <span>${product.name}</span>
    </a>
    <div class="product-grid-actions">
      <span class="product-grid-cta"></span>
      <span class="product-grid-wishlist"></span>
    </div>
  </div>`);
  item.querySelector('a').addEventListener('click', clickHandler);
  const buttonEl = item.querySelector('.product-grid-cta');
  const buttonWishlist = item.querySelector('.product-grid-wishlist');
  UI.render(Button, {
    children: ctaText,
    onClick: addToCartHandler,
  })(buttonEl);
  wishlistRender.render(WishlistToggle, {
    product,
  })(buttonWishlist);
  return item;
}

// Render the initial containers
function renderItems(block, results) {
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

  // Title
  block.querySelector('h2').textContent = recommendation.storefrontLabel;

  // Grid
  const grid = block.querySelector('.product-grid');
  grid.innerHTML = '';
  const { productsView } = recommendation;
  productsView.forEach((product) => {
    grid.appendChild(renderItem(recommendation.unitId, product));
  });

  const inViewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.adobeDataLayer.push((dl) => {
            dl.push({
              event: 'recs-unit-view',
              eventInfo: { ...dl.getState(), unitId: recommendation.unitId },
            });
          });
        }
      });
    },
    { threshold: 0.5 },
  );
  inViewObserver.observe(block);
}

const mapProduct = (product, index) => ({
  rank: index,
  score: 0,
  sku: product.sku,
  name: product.name,
  productId: parseInt(product.externalId, 10) || 0,
  type: product.__typename,
  visibility: undefined,
  categories: [],
  weight: 0,
  image: product.images.length > 0 ? product.images[0].url : undefined,
  url: new URL(
    rootLink(`/products/${product.urlKey}/${product.sku}`),
    window.location.origin
  ).toString(),
  queryType: 'primary',
});

export default async function decorate(block) {
  // Configuration
  const { typeid: typeId } = readBlockConfig(block);
  const filters = {};
  if (typeId) {
    filters.typeId = typeId;
  }

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="recommendations__wrapper">
      <div class="recommendations__list"></div>
    </div>
  `);

  const $list = fragment.querySelector(".recommendations__list");

  block.appendChild(fragment);

  const context = {};
  let visibility = !isMobile;

  const addToCartHandler = async (unitId, product) => {
    // Always emit the add-to-cart event, regardless of product type.
    window.adobeDataLayer.push((dl) => {
      dl.push({
        event: "recs-item-add-to-cart",
        eventInfo: {
          ...dl.getState(),
          unitId,
          productId: parseInt(product.externalId, 10) || 0,
        },
      });
    });
    if (product.__typename === "SimpleProductView") {
      // Only add simple products directly to cart (no options selections needed)
      try {
        await addProductsToCart([
          {
            sku: product.sku,
            quantity: 1,
          },
        ]);
      } catch (error) {
        console.error("Error adding products to cart", error);
      }
    } else {
      // Navigate to page for non-simple products
      window.location.href = rootLink(
        `/products/${product.urlKey}/${product.sku}`
      );
    }
  };

  async function loadRecommendation(
    block,
    context,
    visibility,
    filters,
    container
  ) {
    // Only load once the recommendation becomes visible
    if (!visibility) {
      return;
    }

    const storeViewCode = getConfigValue("headers.cs.Magento-Store-View-Code");

    // Get product view history
    context.userViewHistory = getProductViewHistory(storeViewCode);

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

      window.adobeDataLayer.push((dl) => {
      dl.push({ event: "recs-api-request-sent", eventInfo: { ...dl.getState() } });
    });

    await Promise.all([
      provider.render(ProductList, {
        pageType: context.pageType,
        currentSku: context.currentSku,
        userViewHistory: context.userViewHistory,
        userPurchaseHistory: context.userPurchaseHistory,
        slots: {
          Footer: (ctx) => {
            const wrapper = document.createElement("div");
            wrapper.className = "footer__wrapper";
            const addToCart = document.createElement("div");
            addToCart.className = "footer__button--add-to-cart";
            wrapper.appendChild(addToCart);

            if (ctx.product.itemType === "SimpleProductView") {
              // Add to Cart Button
              UI.render(Button, {
                children: ctx.dictionary.Recommendations.ProductList.addToCart,
                onClick: () =>
                  addToCartHandler(ctx.product.unitId, ctx.product.sku),
                variant: "primary",
              })(addToCart);
            } else {
              // View Product Button
              UI.render(Button, {
                children:
                  ctx.dictionary.Recommendations.ProductList.selectOptions,
                onClick: () =>
                  (window.location.href = rootLink(
                    `/products/${ctx.product.urlKey}/${ctx.product.sku}`
                  )),
                variant: "tertiary",
              })(addToCart);
            }

            ctx.replaceWith(wrapper);
          },
        },
      })(container),
    ]);
  }

  function handleProductChanges({ productContext }) {
    context.currentSku = productContext?.sku;
    loadRecommendation(block, context, visibility, filters, $list);
  }

  function handleCategoryChanges({ categoryContext }) {
    context.category = categoryContext?.name;
    loadRecommendation(block, context, visibility, filters, $list);
  }

  function handlePageTypeChanges({ pageContext }) {
    context.pageType = pageContext?.pageType;
    loadRecommendation(block, context, visibility, filters, $list);
  }

  function handleCartChanges({ shoppingCartContext }) {
    context.cartSkus = shoppingCartContext?.totalQuantity === 0
      ? []
      : shoppingCartContext?.items?.map(({ product }) => product.sku);
    loadRecommendation(block, context, visibility, filters, $list);
  }

  window.adobeDataLayer.push((dl) => {
    dl.addEventListener('adobeDataLayer:change', handlePageTypeChanges, { path: 'pageContext' });
    dl.addEventListener('adobeDataLayer:change', handleProductChanges, { path: 'productContext' });
    dl.addEventListener('adobeDataLayer:change', handleCategoryChanges, { path: 'categoryContext' });
    dl.addEventListener('adobeDataLayer:change', handleCartChanges, { path: 'shoppingCartContext' });
  });

  if (isMobile) {
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
