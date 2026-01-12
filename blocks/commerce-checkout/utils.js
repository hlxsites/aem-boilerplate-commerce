/* eslint-disable import/no-unresolved */
import { ProgressSpinner, provider as UI } from '@dropins/tools/components.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { events } from '@dropins/tools/event-bus.js';
import createModal from '../modal/modal.js';

/**
 * Displays an overlay spinner in the specified container
 * @param {Object} loaderRef - Ref object to store the spinner component
 * @param {HTMLElement} $loader - DOM element to render the spinner in
 */
export const displayOverlaySpinner = async (loaderRef, $loader) => {
  if (loaderRef.current) return;

  loaderRef.current = await UI.render(ProgressSpinner, {
    className: '.checkout__overlay-spinner',
  })($loader);
};

/**
 * Removes the overlay spinner and cleans up references
 * @param {Object} loaderRef - Ref object containing the spinner component
 * @param {HTMLElement} $loader - DOM element containing the spinner
 */
export const removeOverlaySpinner = (loaderRef, $loader) => {
  if (!loaderRef.current) return;

  loaderRef.current.remove();
  loaderRef.current = null;
  $loader.innerHTML = '';
};

// Modal state management
let modal;

/**
 * Shows a modal with the specified content
 * @param {HTMLElement} content - DOM element to display in the modal
 */
export const showModal = async (content) => {
  modal = await createModal([content]);
  modal.showModal();
};

/**
 * Removes the currently displayed modal and cleans up references
 */
export const removeModal = () => {
  if (!modal) return;
  modal.removeModal();
  modal = null;
};

/**
 * Renders AEM asset images for gift option swatches
 * @param {Object} ctx - The context object containing imageSwatchContext and defaultImageProps
 */
export function swatchImageSlot(ctx) {
  const { imageSwatchContext, defaultImageProps } = ctx;
  tryRenderAemAssetsImage(ctx, {
    alias: imageSwatchContext.label,
    imageProps: defaultImageProps,
    wrapper: document.createElement('span'),
    params: {
      width: defaultImageProps.width,
      height: defaultImageProps.height,
    },
  });
}

const ADDRESS_VALIDATION_ENDPOINT = 'https://3117813-avatax.adobeio-static.net/api/v1/web/avalara-avatax/address-validation';

export const validateAddress = async () => {
  try {
    const shipping = events.lastPayload('checkout/addresses/shipping').data;
    if (!shipping) return { error: 'No shipping address found' };
    const street = Array.isArray(shipping.street) ? shipping.street : [];
    const line1 = street[0] || '';
    const line2 = street[1] || '';
    if (!line1 || !shipping.city
      || !(shipping.region.region || shipping.region.regionCode)
      || !shipping.postcode || !shipping.countryCode) {
      return { error: 'Complete shipping address is required' };
    }

    const response = await fetch(ADDRESS_VALIDATION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: {
          line1,
          line2,
          city: shipping.city,
          region: shipping.region.regionCode || shipping.region.region,
          postalCode: shipping.postcode,
          country: shipping.countryCode,
        },
      }),
    });

    const result = await response.json().catch(() => null);
    if (!response.ok || !result) return { error: 'Failed to validate address. Please try again.' };
    const errors = (result.messages || []).filter((m) => (m.severity || '').toLowerCase() === 'error');
    if (errors.length) {
      const msg = errors.map((m) => m.details || m.summary).join(' ');
      return { error: msg || 'Invalid address. Please review and try again.' };
    }

    const validated = result.validatedAddress || null;
    const original = result.originalAddress || null;
    if (!validated) return { suggestion: null };
    const changed = !original || (original.line1 !== validated.line1
      || original.city !== validated.city
      || original.region !== validated.region
      || original.postalCode !== validated.postalCode
      || (original.line2 || '') !== (validated.line2 || '')
    );

    if (!changed) return { suggestion: null };
    return {
      suggestion: {
        city: validated.city,
        countryCode: validated.country,
        postcode: validated.postalCode,
        region: validated.region,
        street: [validated.line1, validated.line2].filter(Boolean),
      },
    };
  } catch (e) {
    return { error: 'Failed to validate address. Please try again.' };
  }
};
