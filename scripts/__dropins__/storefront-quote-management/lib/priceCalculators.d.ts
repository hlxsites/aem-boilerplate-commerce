/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { CartItemModel as NegotiableQuoteItemModel, StoreConfigModel } from '../data/models';
export interface PriceCalculatorOptions {
    dictionary: Record<string, string>;
    quoteDisplaySettings?: StoreConfigModel['quoteDisplaySettings'];
}
/**
 * Get price props for an item
 */
export declare const getPriceProps: (item: NegotiableQuoteItemModel, options: PriceCalculatorOptions) => {
    amount: any;
    currency: any;
    style: {
        font: string;
    };
    'data-testid': string;
};
/**
 * Get savings amount props for an item
 */
export declare const getSavingsAmount: (item: NegotiableQuoteItemModel) => {
    amount: any;
    currency: any;
    style: {
        font: string;
    };
    'data-testid': string;
};
/**
 * Calculate total price props and discount props for an item
 */
export declare const getTotalPriceProps: (item: NegotiableQuoteItemModel, options: PriceCalculatorOptions) => {
    totalProps: any;
    discountProps: any;
};
