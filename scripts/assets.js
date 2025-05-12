import { provider as UI, Image } from '@dropins/tools/components.js';
import { getConfigValue } from './configs.js';

/** @type {import('./assets.d.ts').isAemAssetsEnabled} */
export function isAemAssetsEnabled() {
  const config = getConfigValue('commerce-assets-enabled');
  return config && (
    (typeof config === 'string' && config.toLowerCase() === 'true')
    || (typeof config === 'boolean' && config === true)
  );
}

/** @type {import('./assets.d.ts').getDefaultAemAssetsOptimizationParams} */
export function getDefaultAemAssetsOptimizationParams() {
  // See: https://adobe-aem-assets-delivery-experimental.redoc.ly/
  return {
    quality: 80,
    format: 'webp',
  };
}

/**
 * Normalizes the given URL to ensure it is a valid URL.
 * @param {string} url - The URL to normalize.
 * @returns {string} The normalized URL.
 */
function normalizeUrl(url) {
  let imageUrl = url;

  if (imageUrl.startsWith('//')) {
    // Use current window's protocol.
    const { protocol } = window.location;
    imageUrl = protocol + imageUrl;
  }

  return imageUrl;
}

/** @type {import('./assets.d.ts').isAemAssetsUrl} */
export function isAemAssetsUrl(url) {
  const assetsUrl = typeof url === 'string' ? new URL(normalizeUrl(url)) : url;

  if (!assetsUrl.pathname.startsWith('/adobe/assets/urn:aaid:aem')) {
    return false;
  }

  return true;
}

/** @type {import('./assets.d.ts').generateAemAssetsOptimizedUrl} */
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

/** @type {import('./assets.d.ts').tryGenerateAemAssetsOptimizedUrl} */
export function tryGenerateAemAssetsOptimizedUrl(url, alias, params = {}) {
  const assetsEnabled = isAemAssetsEnabled();

  if (!(assetsEnabled)) {
    // No-op, doesn't do anything.
    return url;
  }

  const assetsUrl = new URL(normalizeUrl(url));

  if (!isAemAssetsUrl(assetsUrl)) {
    // Not an AEM Assets URL, so no-op.
    return url;
  }

  const base = assetsUrl.origin + assetsUrl.pathname;
  return generateAemAssetsOptimizedUrl(base, alias, params);
}

/** @type {import('./assets.d.ts').makeAemAssetsImageSlot} */
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

/** @type {import('./assets.d.ts').tryRenderAemAssetsImage} */
export function tryRenderAemAssetsImage(ctx, config) {
  // Renders an equivalent of the default image.
  function renderDefaultImage() {
    const container = config.wrapper ?? document.createElement('div');
    const { imageProps } = config;

    UI.render(Image, imageProps)(container);
    ctx.replaceWith(container);
  }

  const assetsEnabled = isAemAssetsEnabled();

  if (!(assetsEnabled)) {
    // No-op, render the default image.
    renderDefaultImage(ctx);
    return;
  }

  const { imageProps, src, ...slotConfig } = config;
  const assetsUrl = new URL(normalizeUrl(src ?? imageProps.src));

  if (!isAemAssetsUrl(assetsUrl)) {
    // Not an AEM Assets URL, so render the default image.
    renderDefaultImage(ctx);
    return;
  }

  makeAemAssetsImageSlot({
    // Use the default image props for params and src.
    // Unless overriden by the slot config.
    src: assetsUrl.toString(),
    params: {
      width: imageProps.width,
      height: imageProps.height,
      ...slotConfig.params,
    },

    ...slotConfig,
  })(ctx);
}
