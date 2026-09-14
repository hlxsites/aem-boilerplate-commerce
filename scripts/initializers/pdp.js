import { initializers } from '@dropins/tools/initializer.js';
import { Image, provider as UI } from '@dropins/tools/components.js';
import { initialize, setEndpoint, fetchProductData } from '@dropins/storefront-pdp/api.js';
import { isAemAssetsEnabled, tryGenerateAemAssetsOptimizedUrl } from '@dropins/tools/lib/aem/assets.js';
import { initializeDropin } from './index.js';
import {
  CS_FETCH_GRAPHQL,
  fetchPlaceholders,
  getOptionsUIDsFromUrl,
  getProductSku,
  getProductJsonLd,
  IS_UE,
  isProductBusPDP,
  loadErrorPage,
  preloadFile,
} from '../commerce.js';
import { getMetadata } from '../aem.js';

export const IMAGES_SIZES = {
  width: 960,
  height: 1191,
};

/**
 * Extracts the main product image URL from JSON-LD or meta tags
 * @returns {string|null} The image URL or null if not found
 */
function extractMainImageUrl() {
  // Cache DOM query to avoid repeated lookups
  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

  if (!jsonLdScript?.textContent) {
    return getMetadata('og:image') || getMetadata('image');
  }

  try {
    const jsonLd = JSON.parse(jsonLdScript.textContent);

    // Verify this is product structured data before extracting image
    if (jsonLd?.['@type'] === 'Product' && jsonLd?.image) {
      debugger
      return jsonLd.image;
    }

    return getMetadata('og:image') || getMetadata('image');
  } catch (error) {
    console.debug('Failed to parse JSON-LD:', error);
    return getMetadata('og:image') || getMetadata('image');
  }
}

/**
 * Builds the raw ComplexProductView `options` (one per configurable
 * attribute, e.g. color) from JSON-LD offers. Each offer only carries the
 * one value it was selected with, so the full list of choices is
 * reconstructed by collecting the distinct values seen across all offers.
 * @param {object} jsonLd
 * @returns {Array<object>}
 */
function buildComplexOptions(jsonLd) {
  const valuesById = new Map();

  (jsonLd?.offers ?? []).forEach((offer) => {
    (offer?.options ?? []).forEach(({ id, value, uid }) => {
      if (!valuesById.has(id)) valuesById.set(id, new Map());
      if (!valuesById.get(id).has(uid)) {
        valuesById.get(id).set(uid, {
          id: uid,
          // TODO: JSON-LD only carries the selected value's display text
          // (e.g. "Brushed Stainless Metal Finish"), not a swatch type
          // (color/text/image) or per-value stock beyond this one offer's.
          title: value,
          type: 'dropdown',
          value: uid,
          inStock: offer.availability === 'https://schema.org/InStock',
          __typename: 'ProductViewOptionValueSwatch',
        });
      }
    });
  });

  return [...valuesById.entries()].map(([id, values]) => ({
    id,
    // TODO: JSON-LD has no option group label (e.g. "Color"); the id is
    // capitalized as a stand-in.
    title: id.charAt(0).toUpperCase() + id.slice(1),
    required: true,
    // Raw ProductViewOption field is `multi`, not `multiple` — the dropin's
    // own transform renames it on the way to the ProductModel it builds.
    multi: false,
    values: [...values.values()],
  }));
}

/**
 * Builds the raw ComplexProductView `priceRange` by scanning every offer's
 * price. JSON-LD only carries a final price per offer, plus a
 * `priceSpecification` with the regular (list) price when that offer is on
 * sale; when absent, regular equals final.
 * @param {Array<object>} offers
 * @returns {object}
 */
function buildPriceRange(offers) {
  const currency = offers[0]?.priceCurrency;
  const finals = offers.map((offer) => Number(offer.price)).filter(Number.isFinite);
  const regulars = offers
    .map((offer) => Number(offer.priceSpecification?.price ?? offer.price))
    .filter(Number.isFinite);

  return {
    minimum: {
      regular: { amount: { value: Math.min(...regulars), currency } },
      final: { amount: { value: Math.min(...finals), currency } },
      roles: ['visible'],
    },
    maximum: {
      regular: { amount: { value: Math.max(...regulars), currency } },
      final: { amount: { value: Math.max(...finals), currency } },
      roles: ['visible'],
    },
  };
}

/**
 * Preloads PDP Dropins assets for optimal performance
 */
function preloadPDPAssets() {
  // Preload PDP Dropins assets
  preloadFile('/scripts/__dropins__/storefront-pdp/api.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/render.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductHeader.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductPrice.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductShortDescription.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductOptions.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductQuantity.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductDescription.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductAttributes.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductGallery.js', 'script');

  // Extract and preload main product image
  const imageUrl = extractMainImageUrl();

  if (imageUrl) {
    preloadFile(imageUrl, 'image');
  } else {
    console.warn('Unable to infer main image from JSON-LD or meta tags');
  }
}

await initializeDropin(async () => {
  // Inherit Fetch GraphQL Instance (Catalog Service)
  setEndpoint(CS_FETCH_GRAPHQL);

  // Preload PDP assets immediately when this module is imported
  preloadPDPAssets();

  // Fetch product data
  const sku = getProductSku();
  const optionsUIDs = getOptionsUIDsFromUrl();

  // If we cannot find a sku, and we are not in UE, there's a problem.
  if (!sku && !IS_UE) {
    return loadErrorPage();
  }

  // Product Bus?

  /**
   * Fills the gaps JSON-LD can't cover (metaTitle/metaDescription, real
   * attributes, and — for configurable products — real option group
   * labels/swatch types instead of the `buildComplexOptions` heuristic) with
   * a single, minimal Catalog Service request. GET is used for CDN
   * cacheability, and the field list is kept as small as possible (price,
   * images and stock are already covered by JSON-LD) so this doesn't add
   * meaningful latency riding alongside the placeholders fetch below.
   * Best-effort: if the SKU isn't in Catalog Service, or the request fails,
   * callers fall back to JSON-LD-only data.
   * @returns {Promise<object|null>}
   */
  function getProductBusEnrichment() {
    return CS_FETCH_GRAPHQL.fetchGraphQl(`
      query GET_PDP_BUS_ENRICHMENT($sku: String!) {
        products(skus: [$sku]) {
          attributes(roles: ["visible_in_pdp"]) {
            name
            label
            value
            roles
          }
          ... on ComplexProductView {
            options {
              id
              title
              required
              multi
              values {
                id
                title
                inStock
                __typename
                ... on ProductViewOptionValueSwatch {
                  type
                  value
                }
              }
            }
          }
        }
      }
    `, {
      method: 'GET',
      variables: { sku },
    }).then(({ data }) => data?.products?.[0] ?? null)
      .catch((error) => {
        console.debug('Failed to enrich Product Bus data from Catalog Service:', error);
        return null;
      });
  }

  async function getProductBusData() {
    const jsonLd = getProductJsonLd();
    const offers = Array.isArray(jsonLd?.offers) ? jsonLd.offers : [];
    // `type` page metadata isn't a reliable signal here — some Product Bus
    // implementations omit it even for configurable products. Any offer
    // carrying `options` means there's more than one purchasable combination.
    const isComplex = offers.some((offer) => Array.isArray(offer?.options) && offer.options.length > 0);

    // Get the Catalog Service enrichment data (attributes, option labels/types)
    const enrichment = await getProductBusEnrichment();

    // The PDP dropin's `models.ProductDetails.initialData` is fed through its
    // own raw-data transform (the same one used for the Catalog Service
    // GraphQL `ProductView` response), so this must mirror that raw shape —
    // not the already-transformed ProductModel — and let the dropin do the
    // transform.
    const base = {
      sku: jsonLd?.sku,
      name: jsonLd?.name,
      description: jsonLd?.description,
      url: jsonLd?.url,
      images: jsonLd?.image?.map((url) => ({ url, label: null, roles: [] })),
      attributes: enrichment?.attributes,
      // Default to purchasable: some Product Bus feeds omit `custom.addToCart`
      // entirely rather than explicitly disallowing it.
      addToCartAllowed: jsonLd?.custom?.addToCart !== 'No',
    };

    if (!isComplex) {
      const offer = offers[0];
      return {
        ...base,
        __typename: 'SimpleProductView',
        inStock: offer?.availability === 'https://schema.org/InStock',
        price: {
          roles: ['visible'],
          regular: {
            amount: {
              value: Number(offer?.priceSpecification?.price ?? offer?.price),
              currency: offer?.priceCurrency,
            },
          },
          final: {
            amount: { value: Number(offer?.price), currency: offer?.priceCurrency },
          },
        },
        options: null,
      };
    }

    return {
      ...base,
      __typename: 'ComplexProductView',
      // TODO: JSON-LD has no top-level stock status for the configurable
      // parent; `custom.parentAvailability` is the closest analogue, falling
      // back to "in stock if any variant is" when it's missing.
      inStock: jsonLd?.custom?.parentAvailability
        ? jsonLd.custom.parentAvailability === 'InStock'
        : offers.some((offer) => offer.availability === 'https://schema.org/InStock'),
      // Prefer Catalog Service's real option data (proper group labels,
      // swatch types, per-value inStock) over the JSON-LD reconstruction.
      options: enrichment?.options ?? buildComplexOptions(jsonLd),
      priceRange: buildPriceRange(offers),
    };
  }

  const [product, labels] = await Promise.all([
    isProductBusPDP()
      ? getProductBusData()
      : fetchProductData(sku, { optionsUIDs, skipTransform: true }).then(preloadImageMiddleware),
    fetchPlaceholders('placeholders/pdp.json'),
  ]);

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    ProductDetails: {
      initialData: { ...product },
    },
  };

  // Initialize Dropins
  return initializers.mountImmediately(initialize, {
    sku,
    optionsUIDs,
    langDefinitions,
    models,
    acdl: true,
    persistURLParams: true,
  });
})();

async function preloadImageMiddleware(data) {
  const image = data?.images?.[0]?.url?.replace(/^https?:/, '');

  if (image) {
    let url = image;
    let imageParams = {
      ...IMAGES_SIZES,
    };
    if (isAemAssetsEnabled()) {
      url = tryGenerateAemAssetsOptimizedUrl(image, data.sku, {});
      imageParams = {
        ...imageParams,
        crop: undefined,
        fit: undefined,
        auto: undefined,
      };
    }
    await UI.render(Image, {
      src: url,
      ...IMAGES_SIZES.mobile,
      params: imageParams,
      loading: 'eager',
    })(document.createElement('div'));
  }
  return data;
}
