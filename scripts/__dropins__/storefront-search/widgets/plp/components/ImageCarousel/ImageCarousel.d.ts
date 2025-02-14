import { FunctionComponent } from 'preact';
import { SetStateAction } from '../../../../../preact/compat';

export interface ImageCarouselProps {
    images: string[] | {
        src: string;
        srcset: any;
    }[];
    productName: string;
    carouselIndex: number;
    setCarouselIndex: (carouselIndex: number | SetStateAction<number>) => void;
}
export declare const ImageCarousel: FunctionComponent<ImageCarouselProps>;
//# sourceMappingURL=ImageCarousel.d.ts.map