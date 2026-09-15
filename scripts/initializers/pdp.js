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

export const IMAGES_SIZES = {
  width: 960,
  height: 1191,
};

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

  async function getProductBusData() {
    const jsonLd = getProductJsonLd();
    const offers = Array.isArray(jsonLd?.offers) ? jsonLd.offers : [];
    const offer = offers[0];
    const priceValue = Number(offer?.price ?? 0);

    return {
      __typename: 'SimpleProductView',
      sku: jsonLd?.sku,
      name: jsonLd?.name,
      description: jsonLd?.description,
      url: jsonLd?.url,
      images: Array.isArray(jsonLd?.image)
        ? jsonLd.image.map((url) => ({ url, label: null, roles: [] }))
        : [],
      attributes: [],
      inStock: offer?.availability === 'https://schema.org/InStock',
      price: {
        roles: ['visible'],
        regular: {
          amount: {
            value: priceValue,
            currency: offer?.priceCurrency,
          },
        },
        final: {
          amount: {
            value: priceValue,
            currency: offer?.priceCurrency,
          },
        },
      },
      options: null,
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
