import { Image, ImageProps } from '@dropins/tools/components.js';

/** Reports whether AEM Assets are being used as the asset source. */
export function isAemAssetsEnabled(): boolean;

/** The formats that can be used for an image. */
export type AemAssetsImageFormat = 'gif' | 'jpg' | 'jpeg' | 'png' | 'webp';

/** The rotations that can be applied to an image. */
export type AemAssetsImageRotation = 90 | 180 | 270;

/** The flips that can be applied to an image. */
export type AemAssetsImageFlip = 'h' | 'v' | 'hv';

/** Whether an image is an attachment or not. */
export type AemAssetsImageIsAttachment = 'true' | 'false' | '1' | '0';

/**
 * Defines a crop region of an image.
 * @example
 * ```ts
 * // Crop the image to a 80% width and height, starting at 10% from the top and left.
 * const cropSettings: AemAssetsCropSettings = {
 *   xOrigin: 10,
 *   yOrigin: 10,
 *   width: 80,
 *   height: 80,
 * };
*/
export interface AemAssetsCropSettings {
  /** The (relative) x origin of the crop (between 0 and 100) */
  xOrigin?: number;

  /** The (relative) y origin of the crop (between 0 and 100) */
  yOrigin?: number;

  /** The width of the crop (between 0 and 100) */
  width?: number;

  /** The height of the crop (between 0 and 100) */
  height?: number;
}

/** Defines the size of an image. */
export interface AemAssetsSizeSettings {
  width: number;
  height: number;
}

/**
 * The parameters accepted by the `AEM Assets` image optimization API.
 * @see https://adobe-aem-assets-delivery-experimental.redoc.ly/
 */
export interface AemAssetsImageOptimizationParams {
  format: AemAssetsImageFormat;
  rotation?: AemAssetsImageRotation;
  flip?: AemAssetsImageFlip;
  crop?: AemAssetsCropSettings;
  size?: AemAssetsSizeSettings;
  attachment?: AemAssetsImageIsAttachment;
  width?: number;
  height?: number;
  quality?: number;
  smartCrop?: string;
}

/** The configuration for an image slot. */
export interface AemAssetsImageSlotConfig {
  /** The base URL of the AEM Assets image */
  src: string;

  /** The alias (i.e. seoName) of the image */
  alias: string;

  /** The element that will contain the image in the slot */
  wrapper?: HTMLElement;

  /** The parameters to be applied to the asset (known width required when using a slot) */
  params: Omit<AemAssetsImageOptimizationParams, 'size'> & { width: number };

  /** The props to be applied to the underlying {@link Image} component */
  imageProps?: Omit<ImageProps, 'params' | 'src' | 'onLoad' | 'width' | 'height'>;
}

/** The default optimization parameters used globally, unless overriden (per use case). */
export function getDefaultAemAssetsOptimizationParams(): AemAssetsImageOptimizationParams;

/** Generates an optimized URL for AEM Assets. */
export function generateAemAssetsOptimizedUrl(
  url: string,
  alias: string,
  params?: Partial<AemAssetsImageOptimizationParams>
): string;

/** Tries to generate an optimized URL for AEM Assets (returns `url` if AEM Assets are not enabled). */
export function tryGenerateAemAssetsOptimizedUrl(
  url: string,
  alias: string,
  params?: Partial<AemAssetsImageOptimizationParams>
): string;

/** Creates a slot for an image. */
export function makeAemAssetsImageSlot(
  config: AemAssetsImageSlotConfig
): (ctx: any) => void;

/** Tries to render an image (does nothing if AEM Assets are not enabled). */
export function tryRenderAemAssetsImage<T>(
  ctx: T,
  config: AemAssetsImageSlotConfig
): void;
