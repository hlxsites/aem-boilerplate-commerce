/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
import type { AvailableFreeGiftRule } from '../../data/models';
/**
 * Lazily fetches the free-gift catalog payload for the current cart.
 * Kept separate from `getCartData`/`CART_FRAGMENT` so the heavy products
 * payload is only requested when `has_available_free_gifts` is true.
 */
export declare const getAvailableFreeGiftsForCart: () => Promise<AvailableFreeGiftRule[]>;
