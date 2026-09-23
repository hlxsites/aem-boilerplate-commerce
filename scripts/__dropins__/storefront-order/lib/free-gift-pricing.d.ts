/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *******************************************************************/
import type { OrderItemModel } from '../data/models';
type FreeGiftLineItem = Pick<OrderItemModel, 'price' | 'regularPrice' | 'totalQuantity' | 'itemPrices'>;
/**
 * Unit amount shown for free-gift lines: line price when set (e.g. catalog special),
 * otherwise catalog original / regularPrice.
 */
export declare function getFreeGiftDisplayUnit(item: FreeGiftLineItem): {
    value: number;
    currency: string;
};
/** Row strike total for free-gift lines (display unit × quantity). */
export declare function getFreeGiftLineStrikeTotal(item: FreeGiftLineItem): {
    value: number;
    currency: string;
};
export {};
