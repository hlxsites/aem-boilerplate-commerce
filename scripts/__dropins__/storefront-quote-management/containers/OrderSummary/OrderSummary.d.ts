/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { OrderSummaryLineItem } from '../../components';
import { NegotiableQuoteModel } from '../../data/models';
import { Container } from '@dropins/tools/lib';
import { HTMLAttributes } from 'preact/compat';
export interface OrderSummaryProps extends HTMLAttributes<HTMLDivElement> {
    showTotalSaved?: boolean;
    updateLineItems?: (lineItems: Array<OrderSummaryLineItem>) => Array<OrderSummaryLineItem>;
}
export declare const OrderSummary: Container<OrderSummaryProps, NegotiableQuoteModel | null>;
