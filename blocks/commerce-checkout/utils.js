/* eslint-disable import/no-unresolved */
import { ProgressSpinner, provider as UI } from '@dropins/tools/components.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { fetchPlaceholders } from '../../scripts/commerce.js';
import createModal from '../modal/modal.js';

/**
 * Displays an overlay spinner in the specified container
 * @param {Object} loaderRef - Ref object to store the spinner component
 * @param {HTMLElement} $loader - DOM element to render the spinner in
 * @param {HTMLElement} [$loaderStatus] - Persistent live region for screen-reader announcement
 */
export const displayOverlaySpinner = async (loaderRef, $loader, $loaderStatus) => {
  // Kept as a separate, persistently mounted live region so the
  // announcement isn't missed when the spinner mounts and unmounts
  // together with the live region attached to it.
  if ($loaderStatus) {
    const placeholders = await fetchPlaceholders('placeholders/checkout.json');
    $loaderStatus.textContent = placeholders?.Checkout?.Loader?.placingOrder ?? 'Placing your order…';
  }

  if (loaderRef.current) return;

  loaderRef.current = await UI.render(ProgressSpinner, {
    className: '.checkout__overlay-spinner',
  })($loader);
};

/**
 * Removes the overlay spinner and cleans up references
 * @param {Object} loaderRef - Ref object containing the spinner component
 * @param {HTMLElement} $loader - DOM element containing the spinner
 * @param {HTMLElement} [$loaderStatus] - Persistent live region for screen-reader announcement
 */
export const removeOverlaySpinner = (loaderRef, $loader, $loaderStatus) => {
  if ($loaderStatus) $loaderStatus.textContent = '';

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
