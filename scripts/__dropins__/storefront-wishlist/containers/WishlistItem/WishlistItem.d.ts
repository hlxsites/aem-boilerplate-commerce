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
import { Container } from '../../../node_modules/@dropins/tools/src/lib';
import { Item, Product } from '../../data/models';
import { ImageNodeRenderProps } from '../../../node_modules/@dropins/tools/src/components';
import { JSX } from 'preact';
export interface WishlistItemProps extends HTMLAttributes<HTMLDivElement> {
    item: Item;
    getProductData?: (sku: string) => Promise<Product | null>;
    getRefinedProduct?: (sku: string, optionUIDs: string[], anchorOptions?: string[], raw?: boolean) => Promise<Product | null>;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
        optionsUIDs?: [];
        enteredOptions?: [];
    }[]) => Promise<any>;
    routeProdDetailPage: (product: Product) => string;
    imageNode?: (props: {
        defaultImageProps: ImageNodeRenderProps;
    }) => JSX.Element;
}
export declare const WishlistItem: Container<WishlistItemProps>;
