/**
 * Resolves host-managed PDF branding without reading Commerce Admin settings.
 * @param {object|undefined} config Effective site/root invoice-pdf-branding configuration.
 * @returns {Promise<object|undefined>} Branding accepted by the Order drop-in.
 */
export default async function loadInvoicePdfBranding(config) {
  if (config === undefined || config === null) return undefined;

  if (typeof config !== 'object' || Array.isArray(config)) {
    throw new Error('Invalid invoice-pdf-branding configuration.');
  }
  const { logoUrl, storeName, addressLines } = config;
  if ((storeName !== undefined && typeof storeName !== 'string')
    || (addressLines !== undefined
      && (!Array.isArray(addressLines) || addressLines.some((line) => typeof line !== 'string')))
    || (logoUrl !== undefined && (typeof logoUrl !== 'string' || !logoUrl.trim()))) {
    throw new Error('Invalid invoice-pdf-branding configuration.');
  }

  const branding = { storeName, addressLines };
  if (!logoUrl) return branding;

  const url = new URL(logoUrl, window.location.href);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Invoice PDF logo must use an HTTP(S) URL.');
  }

  const image = new Image();
  image.crossOrigin = 'anonymous';
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error(
      'Unable to load the invoice PDF logo. Check its URL and CORS permissions.',
    ));
    image.src = url.href;
  });

  if (!image.naturalWidth || !image.naturalHeight) {
    throw new Error('Invoice PDF logo has no usable image dimensions.');
  }

  const scale = Math.min(1, 1200 / image.naturalWidth, 400 / image.naturalHeight);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Unable to convert the invoice PDF logo to PNG.');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  branding.logoDataUrl = canvas.toDataURL('image/png');
  return branding;
}
