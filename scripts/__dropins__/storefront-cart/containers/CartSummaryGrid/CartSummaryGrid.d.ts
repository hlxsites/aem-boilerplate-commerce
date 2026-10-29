/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
import { CartModel } from '../../data/models';
import { Container, SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { ImageProps } from '../../../node_modules/@dropins/tools/src/components';
export interface CartSummaryGridProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (item: CartModel['items'][0]) => string;
    routeEmptyCartCTA?: () => string;
    slots?: {
        Thumbnail?: SlotProps<{
            item: CartModel['items'][number];
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const CartSummaryGrid: Container<CartSummaryGridProps, CartModel | null>;
