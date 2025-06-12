/* eslint-disable no-underscore-dangle */

// Dropin Tools
// import { events } from '@dropins/tools/event-bus.js';
// import { initializers } from '@dropins/tools/initializer.js';

// Dropin Components
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';

// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';

// Recommendations Dropin
import ProductList from '@dropins/storefront-recommendations/containers/ProductList.js';
import { render as provider } from '@dropins/storefront-recommendations/render.js';

// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';

// Block-level
import { readBlockConfig } from '../../scripts/aem.js';
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

/**
 * Gets purchase history from localStorage
 * @param {string} storeViewCode - The store view code
 * @returns {Array} - Array of purchase history items
 */
function getPurchaseHistory(storeViewCode) {
  try {
    const purchaseHistory =
      window.localStorage.getItem(`${storeViewCode}:purchaseHistory`) || '[]';
    return JSON.parse(purchaseHistory);
  } catch (e) {
    window.localStorage.removeItem(`${storeViewCode}:purchaseHistory`);
    console.error('Error parsing purchase history', e);
    return [];
  }
}

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

  const $list = fragment.querySelector('.recommendations__list');

  block.appendChild(fragment);

  const context = {};
  let visibility = !isMobile;

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
    console.log('🟢block', block);

    console.log('🟢container', container);
    // Only proceed if container is empty
    if (container.children.length > 0) {
      return;
    }

    const storeViewCode = getConfigValue('headers.cs.Magento-Store-View-Code');

    // Get product view history
    context.userViewHistory = getProductViewHistory(storeViewCode);

    // Get purchase history
    context.userPurchaseHistory = getPurchaseHistory(storeViewCode);

    await Promise.all([
      provider.render(ProductList, {
        routeProduct: (item) => {
          return rootLink(`/products/${item.urlKey}/${item.sku}`);
        },
        pageType: context.pageType,
        currentSku: context.currentSku,
        userViewHistory: context.userViewHistory,
        userPurchaseHistory: context.userPurchaseHistory,
        slots: {
          Footer: (ctx) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'footer__wrapper';

            const addToCart = document.createElement('div');
            addToCart.className = 'footer__button--add-to-cart';
            wrapper.appendChild(addToCart);

            if (ctx.item.itemType === 'SimpleProductView') {

              // Add to Cart Button
              UI.render(Button, {
                children: ctx.dictionary.Recommendations.ProductList.addToCart,
                icon: Icon({ source: 'Cart' }),
                onClick: () => cartApi.addProductsToCart([{ sku: ctx.item.sku, quantity: 1 }]),
                variant: 'primary',
              })(addToCart);

            } else {

              // Select Options Button
              UI.render(Button, {
                children: ctx.dictionary.Recommendations.ProductList.selectOptions,
                onClick: () =>
                  (window.location.href = rootLink(
                    `/products/${ctx.item.urlKey}/${ctx.item.sku}`
                  )),
                variant: 'tertiary',
              })(addToCart);
            }

            // Wishlist Button
            const $wishlistToggle = document.createElement('div');
            $wishlistToggle.classList.add('footer__button--wishlist-toggle');

            // Render Icon
            wishlistRender.render(WishlistToggle, {
              product: ctx.item,
            })($wishlistToggle);

            // Append to Cart Item
            wrapper.appendChild($wishlistToggle);

            ctx.replaceWith(wrapper);
          },
        },
      })(block),
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
          loadRecommendation(block, context, visibility, filters, $list);
          inViewObserver.disconnect();
        }
      });
    });
    inViewObserver.observe(section);
  }
}
