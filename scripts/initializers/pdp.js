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
  IS_DA,
  IS_EW,
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
  const cdnBase = 'https://3655614-commercedropinscdn-stage.adobeio-static.net/storefront-pdp/3.3.2/';
  preloadFile(`${cdnBase}api.js`, 'script');
  preloadFile(`${cdnBase}render.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductHeader.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductPrice.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductShortDescription.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductOptions.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductQuantity.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductDescription.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductAttributes.js`, 'script');
  preloadFile(`${cdnBase}containers/ProductGallery.js`, 'script');
}

await initializeDropin(async () => {
  // Inherit Fetch GraphQL Instance (Catalog Service)
  setEndpoint(CS_FETCH_GRAPHQL);

  // Preload PDP assets immediately when this module is imported
  preloadPDPAssets();

  // Fetch product data
  const sku = getProductSku();
  const optionsUIDs = getOptionsUIDsFromUrl();

  if (!sku && !IS_DA && !IS_EW) {
    return loadErrorPage();
  }

  const [product, labels] = await Promise.all([
    fetchProductData(sku, { optionsUIDs, skipTransform: true }).then(preloadImageMiddleware),
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
