import {
  InLineAlert,
  Icon,
  Button,
  provider as UI,
} from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import { events } from '@dropins/tools/event-bus.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { render as pdpRendered } from '@dropins/storefront-pdp/render.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';

import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { WishlistAlert } from '@dropins/storefront-wishlist/containers/WishlistAlert.js';

// Containers
import ProductHeader from '@dropins/storefront-pdp/containers/ProductHeader.js';
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductShortDescription from '@dropins/storefront-pdp/containers/ProductShortDescription.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';
import ProductQuantity from '@dropins/storefront-pdp/containers/ProductQuantity.js';
import ProductDescription from '@dropins/storefront-pdp/containers/ProductDescription.js';
import ProductAttributes from '@dropins/storefront-pdp/containers/ProductAttributes.js';
import ProductGallery from '@dropins/storefront-pdp/containers/ProductGallery.js';
import ProductGiftCardOptions from '@dropins/storefront-pdp/containers/ProductGiftCardOptions.js';

// Libs
import {
  rootLink,
  setJsonLd,
  fetchPlaceholders,
  getProductLink,
  CORE_FETCH_GRAPHQL,
  CS_FETCH_GRAPHQL,
} from '../../scripts/commerce.js';
import { fetchVariantMatrix, renderMatrix } from './variant-matrix.js';
import { renderStockIndicator, renderSourceList } from './availability-ui.js';
import createModal from '../modal/modal.js';

// Initializers
import { IMAGES_SIZES } from '../../scripts/initializers/pdp.js';
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/wishlist.js';

/**
 * Checks if the page has prerendered product JSON-LD data
 * @returns {boolean} True if product JSON-LD exists and contains @type=Product
 */
function isProductPrerendered() {
  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

  if (!jsonLdScript?.textContent) {
    return false;
  }

  try {
    const jsonLd = JSON.parse(jsonLdScript.textContent);
    return jsonLd?.['@type'] === 'Product';
  } catch (error) {
    console.debug('Failed to parse JSON-LD:', error);
    return false;
  }
}

// Function to update the Add to Cart button text
function updateAddToCartButtonText(addToCartInstance, inCart, labels) {
  const buttonText = inCart
    ? labels.Global?.UpdateProductInCart
    : labels.Global?.AddProductToCart;
  if (addToCartInstance) {
    addToCartInstance.setProps((prev) => ({
      ...prev,
      children: buttonText,
    }));
  }
}

/**
 * Formats numeric attribute values for display (e.g., "10.000000" → "10").
 * Non-numeric values are returned as-is.
 */
function formatNumericAttributeValue(value) {
  const trimmed = value.trim();
  if (!/^[+-]?\d+(\.\d+)?$/.test(trimmed)) return value;
  return new Intl.NumberFormat(document.documentElement.lang).format(Number(trimmed));
}

// sourceAvailability is a core-endpoint query (Catalog Service has no stock). available_qty is null
// above the store display threshold; the query is off until enabled for the store.
const SOURCE_AVAILABILITY_QUERY = `
  query GET_SOURCE_AVAILABILITY($skus: [String!]!) {
    sourceAvailability(skus: $skus) {
      sku
      sources {
        source_code
        available_qty
        is_in_stock
      }
    }
  }
`;

// Stock line from a SKU's sources: out of stock / only N left (all exact) / in stock.
function badgeFromSources(sources, labels) {
  const inStock = sources.filter((s) => s.is_in_stock);
  const t = labels?.Custom?.SaleableQty ?? {};
  if (inStock.length === 0) return { state: 'out-of-stock', text: t.OutOfStock ?? 'Out of stock' };
  if (inStock.every((s) => s.available_qty != null)) {
    const total = inStock.reduce((sum, s) => sum + Number(s.available_qty), 0);
    const qty = new Intl.NumberFormat(document.documentElement.lang).format(total);
    return { state: 'low', text: (t.OnlyXLeft ?? 'Only {qty} left').replace('{qty}', qty) };
  }
  return { state: 'in-stock', text: t.InStock ?? 'In stock' };
}

// Query per-source stock for one concrete SKU (a simple product or a selected variant) and render
// the "only N left" line + per-source list. A configurable uses the matrix, not this.
async function renderAvailability($badge, $list, sku, labels, isCurrent = () => true) {
  if (!sku) {
    renderStockIndicator($badge, null);
    renderSourceList($list, { sources: [] });
    return;
  }
  $badge.setAttribute('data-loading', ''); $badge.hidden = false;
  $list.setAttribute('data-loading', ''); $list.hidden = false;

  let res;
  try {
    res = await CORE_FETCH_GRAPHQL.fetchGraphQl(SOURCE_AVAILABILITY_QUERY, {
      method: 'GET',
      variables: { skus: [sku] },
    });
  } catch (error) {
    console.debug('sourceAvailability fetch failed', error);
    if (isCurrent()) {
      renderStockIndicator($badge, null);
      renderSourceList($list, { sources: [] });
    }
    return;
  }
  if (!isCurrent()) return; // a newer selection landed while this request was in flight
  // Off for the store, a backend without it, or no data: hide rather than assert out of stock.
  const sources = res?.errors?.length
    ? []
    : (res?.data?.sourceAvailability?.find((s) => s.sku === sku)?.sources ?? []);
  if (sources.length === 0) {
    renderStockIndicator($badge, null);
    renderSourceList($list, { sources: [] });
    return;
  }
  renderStockIndicator($badge, badgeFromSources(sources, labels), isCurrent);
  renderSourceList($list, { sources, labels, isCurrent });
}

// Per-variant overview, behind a trigger that opens the matrix in a modal. Configurables only.
function setupVariantMatrix($el, product, labels) {
  if (!$el) return;
  const sku = product?.sku;
  if (!sku || (product?.options?.length ?? 0) === 0) {
    $el.hidden = true;
    $el.replaceChildren();
    return;
  }

  const t = labels?.Custom?.SaleableQty ?? {};
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'product-details__matrix-trigger';
  trigger.textContent = t.ViewMatrix ?? 'See availability for all options';

  let model; // memoize a resolved fetch (including a definitive null) across re-opens
  trigger.addEventListener('click', async () => {
    const content = document.createElement('div');
    content.className = 'product-details__matrix-modal';
    content.textContent = t.Loading ?? 'Loading…';
    const modal = await createModal([content]);
    modal.showModal();

    if (model === undefined) {
      try {
        model = await fetchVariantMatrix(sku, {
          csFetch: CS_FETCH_GRAPHQL,
          coreFetch: CORE_FETCH_GRAPHQL,
        });
      } catch (error) {
        console.debug('variant-matrix: failed', error);
        content.textContent = t.Unavailable ?? 'Variant availability is unavailable.';
        return; // leave model unset so re-opening retries the fetch
      }
    }
    if (model) {
      content.textContent = '';
      renderMatrix(content, model, labels);
    } else {
      content.textContent = t.Unavailable ?? 'Variant availability is unavailable.';
    }
  });
  $el.replaceChildren(trigger);
  $el.hidden = false;
}

export default async function decorate(block) {
  const eventProduct = events.lastPayload('pdp/data') ?? null;
  // bug: the pdp sends an object with event data even if product is not found.
  const product = eventProduct?.sku ? eventProduct : null;

  const labels = await fetchPlaceholders();

  // Read itemUid from URL
  const urlParams = new URLSearchParams(window.location.search);
  const itemUidFromUrl = urlParams.get('itemUid');

  // State to track if we are in update mode
  let isUpdateMode = false;

  // State to track if the current product/variant is out of stock
  let isOutOfStock = false;

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="product-details__alert"></div>
    <div class="product-details__wrapper">
      <div class="product-details__left-column">
        <div class="product-details__gallery"></div>
      </div>
      <div class="product-details__right-column">
        <div class="product-details__header"></div>
        <div class="product-details__price"></div>
        <div class="product-details__saleable-qty" role="status" aria-live="polite" hidden></div>
        <div class="product-details__gallery"></div>
        <div class="product-details__short-description"></div>
        <div class="product-details__gift-card-options"></div>
        <div class="product-details__configuration">
          <div class="product-details__options"></div>
          <div class="product-details__quantity"></div>
          <div class="product-details__buttons">
            <div class="product-details__buttons__add-to-cart"></div>
            <div class="product-details__buttons__add-to-wishlist"></div>
          </div>
          <div class="product-details__add-to-cart-status" role="status" aria-live="polite"></div>
        </div>
        <div class="product-details__source-availability" hidden></div>
        <div class="product-details__variant-matrix" hidden></div>
        <div class="product-details__description"></div>
        <div class="product-details__attributes"></div>
      </div>
    </div>
  `);

  const $alert = fragment.querySelector('.product-details__alert');
  const $gallery = fragment.querySelector('.product-details__gallery');
  const $header = fragment.querySelector('.product-details__header');
  const $price = fragment.querySelector('.product-details__price');
  const $saleableQty = fragment.querySelector('.product-details__saleable-qty');
  const $sourceAvailability = fragment.querySelector('.product-details__source-availability');
  const $variantMatrix = fragment.querySelector('.product-details__variant-matrix');
  const $galleryMobile = fragment.querySelector('.product-details__right-column .product-details__gallery');
  const $shortDescription = fragment.querySelector('.product-details__short-description');
  const $options = fragment.querySelector('.product-details__options');
  const $quantity = fragment.querySelector('.product-details__quantity');
  const $giftCardOptions = fragment.querySelector('.product-details__gift-card-options');
  const $addToCart = fragment.querySelector('.product-details__buttons__add-to-cart');
  const $wishlistToggleBtn = fragment.querySelector('.product-details__buttons__add-to-wishlist');
  // Kept mounted at all times so the "Adding to Cart" status is reliably
  // announced instead of relying on the button's text/disabled state
  // changing, which isn't announced by screen readers on its own.
  const $addToCartStatus = fragment.querySelector('.product-details__add-to-cart-status');
  const $description = fragment.querySelector('.product-details__description');
  const $attributes = fragment.querySelector('.product-details__attributes');

  block.replaceChildren(fragment);

  // The "only N left" line + per-source list are per-SKU: shown for a simple product or a selected
  // variant. A configurable with nothing chosen shows neither; the matrix is the all-options view.
  // eager:true replays pdp/data; a token drops out-of-order responses.
  let availSku;
  let availReq = 0;

  function refreshAvailability(sku) {
    if (sku === availSku) return;
    availSku = sku;
    const token = availReq + 1;
    availReq = token;
    renderAvailability($saleableQty, $sourceAvailability, sku, labels, () => token === availReq);
  }

  const skuFor = (data) => data?.variantSku
    || ((data?.options?.length ?? 0) > 0 ? undefined : data?.sku);

  events.on('pdp/data', (data) => refreshAvailability(skuFor(data)), { eager: true });
  // Runtime option changes emit pdp/values (not pdp/data), so re-query for the selected variant.
  events.on('pdp/values', () => {
    refreshAvailability(pdpApi.getProductConfigurationValues?.()?.variantSku);
  });

  // Per-variant matrix trigger, keyed on the parent sku so it rebuilds only when that changes.
  let matrixSku;
  events.on('pdp/data', (data) => {
    if (data?.sku === matrixSku) return;
    matrixSku = data?.sku;
    setupVariantMatrix($variantMatrix, data, labels);
  }, { eager: true });

  const gallerySlots = {
    CarouselThumbnail: (ctx) => {
      if (ctx.mediaType === 'image') {
        tryRenderAemAssetsImage(ctx, {
          ...imageSlotConfig(ctx),
          wrapper: document.createElement('span'),
        });
      }
    },

    CarouselMainImage: (ctx) => {
      if (ctx.mediaType === 'image') {
        tryRenderAemAssetsImage(ctx, {
          ...imageSlotConfig(ctx),
        });
      }
    },
  };

  // Alert
  let inlineAlert = null;
  const routeToWishlist = rootLink('/wishlist');

  const [
    _galleryMobile,
    _gallery,
    _header,
    _price,
    _shortDescription,
    _options,
    _quantity,
    _giftCardOptions,
    _description,
    _attributes,
    wishlistToggleBtn,
  ] = await Promise.all([
    // Gallery (Mobile)
    pdpRendered.render(ProductGallery, {
      controls: 'dots',
      arrows: true,
      peak: false,
      gap: 'small',
      loop: false,
      videos: true, // Display videos if available
      imageParams: {
        ...IMAGES_SIZES,
      },

      slots: gallerySlots,
    })($galleryMobile),

    // Gallery (Desktop)
    pdpRendered.render(ProductGallery, {
      controls: 'thumbnailsColumn',
      arrows: true,
      peak: true,
      gap: 'small',
      loop: false,
      videos: true, // Display videos if available
      imageParams: {
        ...IMAGES_SIZES,
      },

      slots: gallerySlots,
    })($gallery),

    // Header
    pdpRendered.render(ProductHeader, {})($header),

    // Price
    pdpRendered.render(ProductPrice, {})($price),

    // Short Description
    pdpRendered.render(ProductShortDescription, {})($shortDescription),

    // Configuration - Swatches
    pdpRendered.render(ProductOptions, {
      hideSelectedValue: false,
      slots: {
        SwatchImage: (ctx) => {
          tryRenderAemAssetsImage(ctx, {
            ...imageSlotConfig(ctx),
            wrapper: document.createElement('span'),
          });
        },
      },
    })($options),

    // Configuration  Quantity
    pdpRendered.render(ProductQuantity, {})($quantity),

    // Configuration  Gift Card Options
    pdpRendered.render(ProductGiftCardOptions, {})($giftCardOptions),

    // Description
    pdpRendered.render(ProductDescription, {})($description),

    // Attributes
    pdpRendered.render(ProductAttributes, {
      formatValue: formatNumericAttributeValue,
    })($attributes),

    // Skip if the product wasn't found; WishlistToggle reads product.topLevelSku
    // and throws on a null product, which would sink the rest of this render.
    product && wishlistRender.render(WishlistToggle, {
      product,
    })($wishlistToggleBtn),
  ]);

  // Configuration – Button - Add to Cart
  const addToCart = await UI.render(Button, {
    children: labels.Global?.AddProductToCart,
    icon: h(Icon, { source: 'Cart' }),
    onClick: async () => {
      const buttonActionText = isUpdateMode
        ? labels.Global?.UpdatingInCart
        : labels.Global?.AddingToCart;
      try {
        addToCart.setProps((prev) => ({
          ...prev,
          children: buttonActionText,
          disabled: true,
        }));
        $addToCartStatus.textContent = buttonActionText ?? 'Adding to Cart';

        // get the current selection values
        const values = pdpApi.getProductConfigurationValues();
        const valid = pdpApi.isProductConfigurationValid();

        // add or update the product in the cart
        if (valid) {
          if (isUpdateMode) {
            // --- Update existing item ---
            const { updateProductsFromCart } = await import(
              '@dropins/storefront-cart/api.js'
            );

            await updateProductsFromCart([{ ...values, uid: itemUidFromUrl }]);

            // --- START REDIRECT ON UPDATE ---
            const updatedSku = values?.sku;
            if (updatedSku) {
              const cartRedirectUrl = new URL(
                rootLink('/cart'),
                window.location.origin,
              );
              cartRedirectUrl.searchParams.set('itemUid', itemUidFromUrl);
              window.location.href = cartRedirectUrl.toString();
            } else {
              // Fallback if SKU is somehow missing (shouldn't happen in normal flow)
              console.warn(
                'Could not retrieve SKU for updated item. Redirecting to cart without parameter.',
              );
              window.location.href = rootLink('/cart');
            }
            return;
          }
          // --- Add new item ---
          const { addProductsToCart } = await import(
            '@dropins/storefront-cart/api.js'
          );
          await addProductsToCart([{ ...values }]);
        }

        // reset any previous alerts if successful
        inlineAlert?.remove();
      } catch (error) {
        // add alert message
        inlineAlert = await UI.render(InLineAlert, {
          heading: 'Error',
          description: error.message,
          icon: h(Icon, { source: 'Warning' }),
          'aria-live': 'assertive',
          role: 'alert',
          onDismiss: () => {
            inlineAlert.remove();
          },
        })($alert);

        // Scroll the alertWrapper into view
        $alert.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } finally {
        // Reset button text using the helper function which respects the current mode
        updateAddToCartButtonText(addToCart, isUpdateMode, labels);
        // Re-enable button, unless the current variant is out of stock
        addToCart.setProps((prev) => ({
          ...prev,
          disabled: isOutOfStock,
        }));
        $addToCartStatus.textContent = '';
      }
    },
  })($addToCart);

  // Lifecycle Events
  events.on('pdp/data', (data) => {
    isOutOfStock = data?.inStock === false;
    addToCart.setProps((prev) => ({ ...prev, disabled: isOutOfStock }));
  }, { eager: true });

  events.on('pdp/valid', (valid) => {
    // update add to cart button disabled state based on product selection validity and stock status
    addToCart.setProps((prev) => ({ ...prev, disabled: isOutOfStock || !valid }));
  }, { eager: true });

  // Handle option changes
  events.on('pdp/values', () => {
    if (wishlistToggleBtn) {
      const configValues = pdpApi.getProductConfigurationValues();

      // Check URL parameter for empty optionsUIDs
      const urlOptionsUIDs = urlParams.get('optionsUIDs');

      // If URL has empty optionsUIDs parameter, treat as base product (no options)
      const optionUIDs = urlOptionsUIDs === '' ? undefined : (configValues?.optionsUIDs || undefined);

      wishlistToggleBtn.setProps((prev) => ({
        ...prev,
        product: {
          ...product,
          optionUIDs,
        },
      }));
    }
  }, { eager: true });

  events.on('wishlist/alert', ({ action, item }) => {
    wishlistRender.render(WishlistAlert, {
      action,
      item,
      routeToWishlist,
    })($alert);

    setTimeout(() => {
      $alert.innerHTML = '';
    }, 5000);

    setTimeout(() => {
      $alert.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 0);
  });

  // --- Add new event listener for cart/data ---
  events.on(
    'cart/data',
    (cartData) => {
      let itemIsInCart = false;
      if (itemUidFromUrl && cartData?.items) {
        itemIsInCart = cartData.items.some(
          (item) => item.uid === itemUidFromUrl,
        );
      }
      // Set the update mode state
      isUpdateMode = itemIsInCart;

      // Update button text based on whether the item is in the cart
      updateAddToCartButtonText(addToCart, itemIsInCart, labels);
    },
    { eager: true },
  );

  // Set JSON-LD and Meta Tags
  events.on('aem/lcp', () => {
    const isPrerendered = isProductPrerendered();
    if (product && !isPrerendered) {
      setJsonLdProduct(product);
      setMetaTags(product);
      document.title = product.name;
    }
  }, { eager: true });

  return Promise.resolve();
}

async function setJsonLdProduct(product) {
  const {
    name,
    inStock,
    description,
    sku,
    urlKey,
    price,
    priceRange,
    images,
    attributes,
  } = product;
  const amount = priceRange?.minimum?.final?.amount || price?.final?.amount;
  const brand = attributes?.find((attr) => attr.name === 'brand');

  // get variants
  const { data } = await pdpApi.fetchGraphQl(`
    query GET_PRODUCT_VARIANTS($sku: String!) {
      variants(sku: $sku) {
        variants {
          product {
            sku
            name
            inStock
            images(roles: ["image"]) {
              url
            }
            ...on SimpleProductView {
              price {
                final { amount { currency value } }
              }
            }
          }
        }
      }
    }
  `, {
    method: 'GET',
    variables: { sku },
  });

  const variants = data?.variants?.variants || [];

  const ldJson = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images[0]?.url,
    offers: [],
    productID: sku,
    brand: {
      '@type': 'Brand',
      name: brand?.value,
    },
    url: new URL(getProductLink(urlKey, sku), window.location),
    sku,
    '@id': new URL(getProductLink(urlKey, sku), window.location),
  };

  if (variants.length > 1) {
    ldJson.offers.push(...variants
      // A variant can come back without a resolved product (e.g. an
      // unavailable option combination); skip those so JSON-LD generation
      // doesn't throw on null property access.
      .filter((variant) => variant.product)
      .map((variant) => ({
        '@type': 'Offer',
        name: variant.product.name,
        image: variant.product.images?.[0]?.url,
        price: variant.product.price?.final?.amount?.value,
        priceCurrency: variant.product.price?.final?.amount?.currency,
        availability: variant.product.inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
        sku: variant.product.sku,
      })));
  } else {
    ldJson.offers.push({
      '@type': 'Offer',
      price: amount?.value,
      priceCurrency: amount?.currency,
      availability: inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
    });
  }

  setJsonLd(ldJson, 'product');
}

function createMetaTag(property, content, type) {
  if (!property || !type) {
    return;
  }
  let meta = document.head.querySelector(`meta[${type}="${property}"]`);
  if (meta) {
    if (!content) {
      meta.remove();
      return;
    }
    meta.setAttribute(type, property);
    meta.setAttribute('content', content);
    return;
  }
  if (!content) {
    return;
  }
  meta = document.createElement('meta');
  meta.setAttribute(type, property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setMetaTags(product) {
  if (!product?.sku) {
    return;
  }

  const price = product.prices.final.minimumAmount ?? product.prices.final.amount;

  createMetaTag('title', product.metaTitle || product.name, 'name');
  createMetaTag('description', product.metaDescription, 'name');
  createMetaTag('keywords', product.metaKeyword, 'name');

  createMetaTag('og:type', 'product', 'property');
  createMetaTag('og:description', product.shortDescription, 'property');
  createMetaTag('og:title', product.metaTitle || product.name, 'property');
  createMetaTag('og:url', window.location.href, 'property');
  const mainImage = product?.images?.filter((image) => image.roles.includes('thumbnail'))[0];
  const metaImage = mainImage?.url || product?.images[0]?.url;
  createMetaTag('og:image', metaImage, 'property');
  createMetaTag('og:image:secure_url', metaImage, 'property');
  createMetaTag('product:price:amount', price.value, 'property');
  createMetaTag('product:price:currency', price.currency, 'property');
}

/**
 * Returns the configuration for an image slot.
 * @param ctx - The context of the slot.
 * @returns The configuration for the image slot.
 */
function imageSlotConfig(ctx) {
  const { data, defaultImageProps } = ctx;
  return {
    alias: data.sku,
    imageProps: defaultImageProps,

    params: {
      width: defaultImageProps.width,
      height: defaultImageProps.height,
    },
  };
}
