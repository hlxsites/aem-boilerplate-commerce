/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { Item, Product } from '../../data/models';
import { ImageProps } from '../../../node_modules/@dropins/tools/src/components';
export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    routeEmptyWishlistCTA?: () => string;
    routeToWishlist?: string;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
    routeProdDetailPage: (product: Product) => string;
    getProductData?: (sku: string) => Promise<Product | null>;
    getRefinedProduct?: (sku: string, optionUIDs: string[], anchorOptions?: string[], raw?: boolean) => Promise<Product | null>;
    slots?: {
        image?: SlotProps<{
            defaultImageProps: ImageProps;
            item: Item;
        }>;
    };
}
export declare const Wishlist: Container<WishlistProps>;
