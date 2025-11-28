/* eslint-disable import/no-unresolved */
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import createModal from '../modal/modal.js';

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
