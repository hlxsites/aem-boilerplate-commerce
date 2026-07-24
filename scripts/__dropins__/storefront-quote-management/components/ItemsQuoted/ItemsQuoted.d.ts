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
export interface ItemsQuotedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    loading?: boolean;
    table?: VNode;
    pricesSummary?: VNode;
}
export declare const ItemsQuoted: FunctionComponent<ItemsQuotedProps>;
export declare const ItemsQuotedSkeleton: FunctionComponent;
