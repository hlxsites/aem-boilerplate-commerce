import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { Scope } from '../../data/models';
import { Product } from '../../data/models/product';

export interface SearchResultsProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (product: Product) => string;
    scope?: Scope;
    imageWidth?: number;
    imageHeight?: number;
    skeletonCount?: number;
    slots?: {
        ProductActions?: SlotProps<{
            product: Product;
        }>;
        ProductPrice?: SlotProps<{
            product: Product;
        }>;
        ProductName?: SlotProps<{
            product: Product;
        }>;
        ProductImage?: SlotProps<{
            product: Product;
            defaultImageProps: ImageProps;
        }>;
        NoResults?: SlotProps;
    };
}
export declare const SearchResults: Container<SearchResultsProps>;
//# sourceMappingURL=SearchResults.d.ts.map