// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';

// Dropin Components
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';

// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';

// Recommendations Dropin
import ProductList from '@dropins/storefront-recommendations/containers/ProductList.js';
import { render as provider } from '@dropins/storefront-recommendations/render.js';
import { publishRecsItemAddToCartClick } from '@dropins/storefront-recommendations/api.js';

// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';

// Block-level
import { readBlockConfig } from '../../scripts/aem.js';
import {
  fetchPlaceholders, getProductLink, getStoreIdentifier, isConsentGranted,
} from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/recommendations.js';
import '../../scripts/initializers/wishlist.js';

const isMobile = window.matchMedia('only screen and (max-width: 900px)').matches;

/**
 * Validates and returns a product view history entry if valid
 * @param {Object} entry - The history entry to validate
 * @returns {Object|null} - Validated history entry or null if invalid
 */
function getValidViewEntry(entry) {
  // Basic validation to ensure the entry has necessary properties
  if (entry && typeof entry === 'object' && entry.sku && entry.date) {
    return {
      sku: entry.sku,
      date: entry.date,
    };
  }
  return null;
}

/**
 * Gets product view history from localStorage
 * @returns {Array|undefined} History items, or undefined when access is not allowed
 */
export function getProductViewHistory() {
  if (!isConsentGranted()) return undefined;
  const storeIdentifier = getStoreIdentifier();
  try {
    if (!storeIdentifier) {
      return [];
    }
    const viewHistory = window.localStorage.getItem(`${storeIdentifier}:productViewHistory`) || '[]';
    const parsedHistory = JSON.parse(viewHistory);
    if (!Array.isArray(parsedHistory)) {
      throw new Error('Product view history is not an array');
    }
    const validHistory = parsedHistory.map(getValidViewEntry).filter((entry) => entry !== null);
    if (validHistory.length === 0) {
      // If no valid entries, clear the history to prevent future parsing issues
      window.localStorage.removeItem(`${storeIdentifier}:productViewHistory`);
    }
    return validHistory;
  } catch (e) {
    window.localStorage.removeItem(`${storeIdentifier}:productViewHistory`);
    console.error('Error parsing product view history', e);
    return [];
  }
}

/**
 * Validates and returns a purchase history entry if valid
 * @param {Object} entry - The history entry to validate
 * @returns {Object|null} - Validated history entry or null if invalid
 */
function getValidPurchaseEntry(entry) {
  // Basic validation to ensure the entry has necessary properties
  const { items, date } = entry ?? {};
  if (Array.isArray(items) && items.every((item) => typeof item === 'string') && date) {
    return { items, date };
  }
  return null;
}

/**
 * Gets purchase history from localStorage
 * @returns {Array|undefined} History items, or undefined when access is not allowed
 */
export function getPurchaseHistory() {
  if (!isConsentGranted()) return undefined;
  const storeIdentifier = getStoreIdentifier();
  try {
    if (!storeIdentifier) {
      return [];
    }
    const purchaseHistory = window.localStorage.getItem(`${storeIdentifier}:purchaseHistory`) || '[]';
    const parsedHistory = JSON.parse(purchaseHistory);
    if (!Array.isArray(parsedHistory)) {
      throw new Error('Purchase history is not an array');
    }
    const validHistory = parsedHistory.map(getValidPurchaseEntry).filter((entry) => entry !== null);
    if (validHistory.length === 0) {
      // If no valid entries, clear the history to prevent future parsing issues
      window.localStorage.removeItem(`${storeIdentifier}:purchaseHistory`);
    }
    return validHistory;
  } catch (e) {
    window.localStorage.removeItem(`${storeIdentifier}:purchaseHistory`);
    console.error('Error parsing purchase history', e);
    return [];
  }
}

export default async function decorate(block) {
  const labels = await fetchPlaceholders();

  // Hide configuration rows if they exist
  const children = [...block.children];
  children.forEach((child) => {
    child.style.display = 'none';
  });

  // Configuration
  const { currentsku, currentprice, recid } = readBlockConfig(block);

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="recommendations__wrapper">
      <div class="recommendations__list"></div>
    </div>
  `);

  const $wrapper = fragment.querySelector('.recommendations__wrapper');

  block.appendChild(fragment);

  let visibility = !isMobile;
  let isLoading = false;
  let loadTimeout = null;
  let recommendationList;
  let reloadPending = false;
  let consented = isConsentGranted();

  async function loadRecommendation(
    context,
    isVisible,
    forceReload = false,
  ) {
    // Only load once the recommendation becomes visible
    if (!isVisible) {
      return;
    }

    // Prevent multiple simultaneous loads
    if (isLoading) {
      reloadPending = reloadPending || forceReload;
      return;
    }

    // Reuse the mounted list unless its request context changed.
    if (recommendationList && !forceReload) {
      return;
    }

    isLoading = true;

    const createProductLink = (item) => getProductLink(item.urlKey, item.sku);

    let recommendationsData = null;

    // Get data from the event bus to set publish events
    events.on(
      'recommendations/data',
      (data) => {
        recommendationsData = data;
        if (data?.items?.length) {
          recommendationsData = data;
        }
      },
      { eager: true },
    );

    try {
      const skuFromConfig = !!currentsku;
      const resolvedSku = currentsku || context.currentSku;
      const isACO = getConfigValue('adobe-commerce-optimizer') === true
        || getConfigValue('adobe-commerce-optimizer') === 'true';
      // Price source must match SKU source: if SKU is pinned via block config,
      // do not pull price from ACDL context (it would belong to a different product).
      let resolvedPrice = null;
      if (isACO) {
        if (currentprice != null) {
          resolvedPrice = Number(currentprice);
        } else if (!skuFromConfig && consented) {
          resolvedPrice = context.currentProductPrice ?? null;
        }
      }
      const currentProduct = resolvedSku
        ? { sku: resolvedSku, ...(resolvedPrice != null && { price: resolvedPrice }) }
        : undefined;

      const requestContext = {
        currentProduct,
        cartSkus: consented ? context.cartSkus : undefined,
        userViewHistory: getProductViewHistory(),
        userPurchaseHistory: getPurchaseHistory(),
      };
      if (recommendationList) {
        recommendationList.setProps((prev) => ({ ...prev, ...requestContext }));
        return;
      }

      [recommendationList] = await Promise.all([
        provider.render(ProductList, {
          routeProduct: createProductLink,
          recId: recid,
          ...requestContext,
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
                  children: labels.Global?.AddProductToCart,
                  icon: Icon({ source: 'Cart' }),
                  onClick: ctx.item.inStock
                    ? (event) => {
                      cartApi.addProductsToCart([
                        { sku: ctx.item.sku, quantity: 1 },
                      ]);
                      // Prevent the click event from bubbling up to the parent span
                      // to avoid triggering the recs-item-click event
                      event.stopPropagation();
                      // Publish ACDL event for add to cart click
                      const recommendationUnit = recommendationsData?.find(
                        (unit) => unit.items?.some(
                          (unitItem) => unitItem.sku === ctx.item.sku,
                        ),
                      );
                      publishRecsItemAddToCartClick({
                        recommendationUnit,
                        pagePlacement: 'product-list',
                        yOffsetTop: addToCart.getBoundingClientRect().top ?? 0,
                        yOffsetBottom:
                          addToCart.getBoundingClientRect().bottom ?? 0,
                        productId: ctx.index,
                      });
                    }
                    : undefined,
                  variant: 'primary',
                  disabled: !ctx.item.inStock,
                })(addToCart);
              } else {
                // Select Options Button
                UI.render(Button, {
                  children:
                    labels.Global?.SelectProductOptions,
                  href: createProductLink(ctx.item),
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

            Thumbnail: (ctx) => {
              const { item, defaultImageProps } = ctx;
              const wrapper = document.createElement('a');
              wrapper.href = createProductLink(item);

              tryRenderAemAssetsImage(ctx, {
                alias: item.sku,
                imageProps: defaultImageProps,
                wrapper,

                params: {
                  width: defaultImageProps.width,
                  height: defaultImageProps.height,
                },
              });
            },
          },
        })($wrapper),
      ]);
    } finally {
      isLoading = false;
      if (reloadPending) {
        reloadPending = false;
        debouncedLoadRecommendation(true);
      }
    }
  }

  const context = {};
  // Debounced loader to prevent excessive API calls
  function debouncedLoadRecommendation(forceReload = false) {
    reloadPending = reloadPending || forceReload;
    if (loadTimeout) {
      clearTimeout(loadTimeout);
    }

    loadTimeout = setTimeout(() => {
      const reload = reloadPending;
      reloadPending = false;
      loadRecommendation(context, visibility, reload);
    }, 300); // 300ms debounce
  }

  window.addEventListener('consent.update', () => {
    const next = isConsentGranted();
    if (next !== consented) {
      consented = next;
      debouncedLoadRecommendation(true);
    }
  });

  // Track previous context values to detect significant changes
  let previousContext = {};

  function shouldReloadRecommendations(newContext) {
    // Check if significant context changes occurred that warrant reloading recommendations
    const significantChanges = ['currentSku', 'currentProductPrice', 'pageType', 'category'];

    const hasSignificantChanges = significantChanges.some(
      (key) => newContext[key] !== previousContext[key] && newContext[key] !== undefined,
    );

    // cartSkus is a new array reference on every update, so compare by content
    const cartSkusChanged = newContext.cartSkus !== undefined
      && (newContext.cartSkus.length !== previousContext.cartSkus?.length
        || newContext.cartSkus.some((sku, index) => sku !== previousContext.cartSkus?.[index]));

    return hasSignificantChanges || cartSkusChanged;
  }

  function updateContext(updates) {
    const hasSignificantChanges = shouldReloadRecommendations({
      ...context,
      ...updates,
    });

    // Update context
    Object.assign(context, updates);

    // Update previous context for next comparison
    previousContext = { ...context };

    // Load or reload recommendations based on whether significant changes occurred
    if (hasSignificantChanges && recommendationList) {
      // Force reload if recommendations already exist and context changed significantly
      debouncedLoadRecommendation(true);
    } else {
      // Initial load or minor context changes
      debouncedLoadRecommendation(false);
    }
  }

  function handleProductChanges({ productContext }) {
    const incomingSku = productContext?.sku;
    // Ignore productContext pushes for a different SKU once currentSku is set
    // (e.g. the cart dropin's own add-to-cart tracking push for another product).
    if (context.currentSku !== undefined && incomingSku !== context.currentSku) {
      return;
    }
    const pricing = productContext?.pricing;
    const price = pricing
      ? (pricing.specialPrice ?? pricing.regularPrice)
      : undefined;
    updateContext({
      currentSku: incomingSku,
      currentProductPrice: price,
    });
  }

  function handleCategoryChanges({ categoryContext }) {
    updateContext({ category: categoryContext?.name });
  }

  function handlePageTypeChanges({ pageContext }) {
    updateContext({ pageType: pageContext?.pageType });
  }

  function handleCartChanges(cartData) {
    const cartSkus = !cartData || cartData.totalQuantity === 0
      ? []
      : cartData.items?.map((item) => item.sku) ?? [];
    updateContext({ cartSkus });
  }

  events.on('cart/data', handleCartChanges, { eager: true });

  window.adobeDataLayer.push((dl) => {
    dl.addEventListener('adobeDataLayer:change', handlePageTypeChanges, { path: 'pageContext' });
    dl.addEventListener('adobeDataLayer:change', handleProductChanges, { path: 'productContext' });
    dl.addEventListener('adobeDataLayer:change', handleCategoryChanges, { path: 'categoryContext' });
  });

  if (isMobile) {
    const section = block.closest('.section');
    const inViewObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibility = true;
          debouncedLoadRecommendation(false);
          inViewObserver.disconnect();
        }
      });
    });
    inViewObserver.observe(section);
  }
}
