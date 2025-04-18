import { ProductViewMedia } from '../types';

declare const getProductImageURLs: (images: ProductViewMedia[], amount?: number, topImageUrl?: string) => string[];
export interface ResolveImageUrlOptions {
    width: number;
    height?: number;
    auto?: string;
    quality?: number;
    crop?: boolean;
    fit?: string;
}
declare const generateOptimizedImages: (imageUrls: string[], baseImageWidth: number) => {
    src: string;
    srcset: any;
}[];
export { generateOptimizedImages, getProductImageURLs };
//# sourceMappingURL=getProductImage.d.ts.map