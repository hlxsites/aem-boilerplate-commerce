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
export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    productList?: VNode[];
    header?: VNode;
    footer?: VNode;
    imageWidth?: number;
    imageHeight?: number;
}
export declare const ProductList: FunctionComponent<ProductListProps>;
