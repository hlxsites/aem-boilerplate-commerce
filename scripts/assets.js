import { provider as UI, Image } from '@dropins/tools/components.js';
import { getConfigValue } from './configs.js';

/** Reports whether AEM Assets are being used as the asset source. */
export async function isAemAssetsEnabled() {
  const config = await getConfigValue('commerce-assets-enabled');
  return config === 'true';
}

/**
 * The default optimization parameters used globally, unless overriden (per use case).
 * @returns {AemAssetsImageOptimizationParams}
 */
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
 * @param {AemAssetsImageOptimizationParams} params - The parameters to be applied to the asset.
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
 * Returns a slot that renders an AEM Assets image
 * @param {AemAssetsImageSlotConfig} config - The config of the slot.
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
 * @param {AemAssetsImageSlotConfig} config - The config of the slot.
 */
export async function tryRenderAemAssetsImage(ctx, config) {
  const assetsEnabled = await isAemAssetsEnabled();

  if (!(assetsEnabled)) {
    // No-op, doesn't do anything.
    return;
  }

  makeAemAssetsImageSlot(config)(ctx);
}

/**
 * @typedef {'gif' | 'jpg' | 'jpeg' | 'png' | 'webp'} AemAssetsImageFormat
 * @typedef {90 | 180 | 270} AemAssetsImageRotation
 * @typedef {'h' | 'v' | 'hv'} AemAssetsImageFlip
 * @typedef {'true' | 'false' | '1' | '0'} AemAssetsImageIsAttachment
 */

/**
 * @typedef {Object} AemAssetsCropSettings
 * @property {number} [xOrigin] - The (relative) x origin of the crop (between 0 and 100)
 * @property {number} [yOrigin] - The (relative) y origin of the crop (between 0 and 100)
 * @property {number} [width] - The width of the crop (between 0 and 100)
 * @property {number} [height] - The height of the crop (between 0 and 100)
 */

/**
 * @typedef {Object} AemAssetsSizeSettings
 * @property {number} width - The width of the image
 * @property {number} height - The height of the image
 */

/**
 * @typedef {Object} AemAssetsImageOptimizationParams
 * @property {AemAssetsImageFormat} format - The format of the image
 * @property {AemAssetsImageRotation} [rotation] - The rotation of the image
 * @property {AemAssetsImageFlip} [flip] - The flip of the image
 * @property {AemAssetsCropSettings} [crop] - The crop settings of the image
 * @property {AemAssetsSizeSettings} [size] - The size settings of the image
 * @property {AemAssetsImageIsAttachment} [attachment] - Force a download prompt for the image
 * @property {number} [width] - The width of the image
 * @property {number} [height] - The height of the image
 * @property {number} [quality] - The quality of the image (between 0 and 100)
 * @property {string} [smartCrop] - The smart crop of the image (e.g. QHD)
 */

/**
 * @typedef {Object} AemAssetsImageSlotConfig
 * @property {string} src - The source URL of the image
 * @property {string} alias - The alias (i.e. seoName) of the image
 * @property {HTMLElement} [wrapper] - The wrapper element
 * @property {Omit<AemAssetsImageOptimizationParams, 'size'> & {width: number}} params -
 *  The parameters to be applied to the asset (known width required when using a slot).
 * @property {Omit<import('@dropins/tools/components.js').ImageProps,
 *  'params' | 'src' | 'onLoad' | 'width' | 'height'>} [imageProps] - The image props
 */
