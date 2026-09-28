/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { CartModel, type AvailableFreeGiftRule } from '../models';
export declare function transformAvailableFreeGifts(rules: any[] | null | undefined): AvailableFreeGiftRule[];
/** Supports Commerce `is_salable` and legacy mesh fields that still expose `is_available`. */
export declare function resolveIsSalable(item: {
    is_salable?: boolean | null;
    is_available?: boolean | null;
}): boolean;
export declare function transformCart(data: any): CartModel | null;
