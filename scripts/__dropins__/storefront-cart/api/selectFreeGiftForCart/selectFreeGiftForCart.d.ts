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
import { CartModel } from '../../data/models';
export type SelectFreeGiftForCartInput = {
    ruleId: number;
    sku: string;
    quantity?: number;
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
    /**
     * Configurable: configurable option value UIDs.
     * Bundle: one `BundleItemOption.uid` per bundle slot (same as `addProductsToCart` `selected_options`).
     */
    selectedOptions?: string[];
};
/**
 * Persists a free-gift choice for one rule via `selectFreeGiftForCart`
 * (`Magento_SalesRuleFreeGift`).
 */
export declare const selectFreeGiftForCart: ({ ruleId, sku, quantity, enteredOptions, selectedOptions, }: SelectFreeGiftForCartInput) => Promise<CartModel | null>;
