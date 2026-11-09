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
export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
    productTitle: VNode;
    sku?: VNode;
    image?: VNode;
    configurations?: VNode;
    alert?: VNode;
    warning?: VNode;
}
export declare const Item: FunctionComponent<ItemProps>;
