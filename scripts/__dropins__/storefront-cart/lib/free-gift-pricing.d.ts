/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *******************************************************************/
import type { CartModel } from '../data/models';
type FreeGiftLineItem = Pick<CartModel['items'][number], 'price' | 'regularPrice' | 'originalItemPrice' | 'quantity'>;
/**
 * Unit amount shown for free-gift lines: line price when set (e.g. catalog special),
 * otherwise catalog `original_item_price` (reflects catalog special price; unlike
 * `regularPrice`, which is the full catalog price for configurable items and would
 * overstate the struck-through amount), falling back to `regularPrice` when unset.
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
