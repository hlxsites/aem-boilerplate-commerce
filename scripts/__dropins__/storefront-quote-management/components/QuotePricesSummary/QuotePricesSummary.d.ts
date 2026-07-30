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
interface Entry {
    label: string;
    id: string;
    value: VNode;
    strong?: boolean;
    children?: Entry[];
}
export interface QuotePricesSummaryProps extends HTMLAttributes<HTMLDivElement> {
    entries?: Entry[];
}
export declare const QuotePricesSummary: FunctionComponent<QuotePricesSummaryProps>;
export {};
