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
import { CartModel } from '../../data/models';
type UpdateProductsFromCart = Array<{
    uid: string;
    quantity: number;
    sku?: string;
    parentSku?: string;
    optionsUIDs?: string[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
    giftOptions?: {
        gift_wrapping_id?: string | null;
        gift_message: {
            to: string;
            from: string;
            message: string;
        };
    };
    customFields?: Record<string, any>;
}>;
export declare const updateProductsFromCart: (items: UpdateProductsFromCart) => Promise<CartModel | null>;
export {};
