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
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { PageInfo, Product, Wishlist as WishlistModel, Item } from '../../data/models';
import { ImageProps } from '../../../node_modules/@dropins/tools/src/components';
export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    wishlistData: WishlistModel;
    wishlistAlert: VNode | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
    getProductData?: (sku: string) => Promise<Product | null>;
    getRefinedProduct?: (sku: string, optionUIDs: string[], anchorOptions?: string[], raw?: boolean) => Promise<Product | null>;
    routeEmptyWishlistCTA?: () => string;
    onLoginClick?: () => void;
    routeProdDetailPage: (product: Product) => string;
    pageInfo?: PageInfo;
    activePage?: number;
    onPageChange?: (page: number) => void;
    isLoadingPage?: boolean;
    slots?: {
        image?: SlotProps<{
            defaultImageProps: ImageProps;
            item: Item;
        }>;
    };
}
export declare const Wishlist: FunctionComponent<WishlistProps>;
