/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ProductItemCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    image?: VNode;
    titleNode?: VNode;
    price?: VNode;
    sku?: VNode;
    actionButton?: VNode;
    swatches?: VNode;
    initialized?: boolean;
}
export declare const ProductItemCard: FunctionComponent<ProductItemCardProps>;
