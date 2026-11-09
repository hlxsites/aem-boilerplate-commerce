/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/lib';
import { ImageProps } from '@dropins/tools/components';
import { Scope, SearchVariables } from '../../data/models/index.js';
import { Product } from '../../data/models/product.js';
type SlotDefaultContext = {
    product: Product;
    variables: SearchVariables | null;
};
export interface SearchResultsProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (product: Product) => string;
    scope?: Scope;
    imageWidth?: number;
    imageHeight?: number;
    skeletonCount?: number;
    onSearchResult?: (payload: Product[]) => void;
    slots?: {
        ProductActions?: SlotProps<SlotDefaultContext>;
        ProductPrice?: SlotProps<SlotDefaultContext>;
        ProductName?: SlotProps<SlotDefaultContext>;
        ProductImage?: SlotProps<SlotDefaultContext & {
            defaultImageProps: ImageProps;
        }>;
        NoResults?: SlotProps<{
            error: string | null;
            variables: SearchVariables | null;
        }>;
        Header?: SlotProps<{
            products: Product[];
            variables: SearchVariables | null;
        }>;
        Footer?: SlotProps<{
            products: Product[];
            variables: SearchVariables | null;
        }>;
    };
}
export declare const SearchResults: Container<SearchResultsProps>;
export {};
