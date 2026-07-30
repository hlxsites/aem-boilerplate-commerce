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
export interface QuoteSummaryListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    heading?: VNode | null;
    footer?: VNode | null;
    products?: VNode | null;
    outOfStockMessage?: VNode | null;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
}
export declare const QuoteSummaryList: FunctionComponent<QuoteSummaryListProps>;
