import { HTMLAttributes } from 'preact/compat';
import { Container, ResolveImageUrlOptions, SlotProps } from '@dropins/tools/lib';
import { ImageProps } from '@dropins/tools/components';
import { ProductModel } from '../../data/models/product-model.js';
type DefaultSlotContext = {
    data: ProductModel | null;
};
type VideosProp = boolean | {
    position: 'first' | 'last';
};
export interface ProductGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'controls'> {
    scope?: string;
    controls?: 'thumbnailsRow' | 'thumbnailsColumn' | 'dots' | null;
    loop?: boolean;
    peak?: boolean;
    gap?: 'small' | 'medium' | 'large' | null;
    arrows?: boolean;
    arrowsOnMainImage?: boolean;
    imageParams?: ResolveImageUrlOptions;
    thumbnailParams?: ResolveImageUrlOptions;
    zoom?: {
        closeButton: boolean;
    } | boolean;
    videos?: VideosProp;
    slots?: {
        CarouselThumbnail?: SlotProps<DefaultSlotContext & {
            defaultImageProps: ImageProps;
            mediaType?: 'image' | 'video';
            previewUrl?: string;
        }>;
        CarouselMainImage?: SlotProps<DefaultSlotContext & {
            defaultImageProps: ImageProps;
            mediaType?: 'image' | 'video';
            previewUrl?: string;
        }>;
    };
}
export declare const ProductGallery: Container<ProductGalleryProps, ProductModel | null>;
export {};
