import { provider as UI, Image } from '@dropins/tools/components.js';
import { getConfigValue } from './configs.js';

/** Reports whether AEM Assets are being used as the asset source. */
export function isAemAssetsEnabled() {
  const config = getConfigValue('commerce-assets-enabled');
  return config === 'true';
}

/** The default optimization parameters used globally, unless overriden (per use case). */
export function getDefaultAemAssetsOptimizationParams() {
  // See: https://adobe-aem-assets-delivery-experimental.redoc.ly/
  return {
    quality: 80,
    format: 'webp',
  };
}

/**
 * Generates an optimized URL for AEM Assets.
 * @param {string} url - The base URL of the asset.
 * @param {string} alias - The alias (i.e. seoName) of the asset.
 * @param {import('./assets.js').AemAssetsImageOptimizationParams} params -
 *   The parameters to be applied to the asset.
 */
export function generateAemAssetsOptimizedUrl(url, alias, params = {}) {
  const defaultParams = getDefaultAemAssetsOptimizationParams();
  const mergedParams = { ...defaultParams, ...params };

  // Destructure the ones that need special handling
  const {
    format,
    crop,
    size,
    ...optimizedParams
  } = mergedParams;

  const searchParams = new URLSearchParams(optimizedParams);

  if (crop) {
    const [xOrigin, yOrigin] = [crop.xOrigin || 0, crop.yOrigin || 0];
    const [width, height] = [crop.width || 100, crop.height || 100];

    const cropTransform = `${xOrigin}p,${yOrigin}p,${width}p,${height}p`;
    searchParams.set('crop', cropTransform);
  }

  // Both values must be present
  if (size && size.width && size.height) {
    searchParams.set('size', `${size.width},${size.height}`);
  }

  return `${url}/as/${alias}.${format}?${searchParams.toString()}`;
}

/**
 * Tries to generate an optimized URL for AEM Assets (if enabled).
 * @param {string} url - The base URL of the asset.
 * @param {string} alias - The alias (i.e. seoName) of the asset.
 * @param {import('./assets.d.ts').AemAssetsImageOptimizationParams} params -
 *   The parameters to be applied to the asset.
 */
export function tryGenerateAemAssetsOptimizedUrl(url, alias, params = {}) {
  const assetsEnabled = isAemAssetsEnabled();

  if (!(assetsEnabled)) {
    // No-op, doesn't do anything.
    return url;
  }

  const [base] = url.split('?');
  return generateAemAssetsOptimizedUrl(base, alias, params);
}

/**
 * Returns a slot that renders an AEM Assets image.
 * @param {import('./assets.d.ts').AemAssetsImageSlotConfig} config - The config of the slot.
 */
export function makeAemAssetsImageSlot(
  config,
) {
  return (ctx) => {
    const {
      wrapper,
      alias,
      params,
      imageProps,
      src,
    } = config;

    const container = wrapper ?? document.createElement('div');
    const imageSrc = generateAemAssetsOptimizedUrl(src, alias, params);

    UI.render(Image, {
      ...imageProps,

      src: imageSrc,
      params: {
        width: params.width,
        height: params.height,

        // If not null, they will be applied by default.
        // And they are not compatible with the AEM Assets API.
        crop: null,
        fit: null,
        auto: null,
      },
    })(container);

    ctx.replaceWith(container);
  };
}

/**
 * Returns a function that renders an AEM Assets image with the given parameters.
 * @template T
 * @param {T} ctx - The context of the slot.
 * @param {import('./assets.d.ts').AemAssetsImageSlotConfig} config - The config of the slot.
 */
export function tryRenderAemAssetsImage(ctx, config) {
  const assetsEnabled = isAemAssetsEnabled();

  if (!(assetsEnabled)) {
    // No-op, doesn't do anything.
    return;
  }

  makeAemAssetsImageSlot(config)(ctx);
}
