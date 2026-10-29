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
import { CartModel } from '../../models/cart-model';
export declare const cart: CartModel;
export declare const sampleDataCart: CartModel;
export declare const sampleDataWithCoupons: CartModel;
export declare const sampleDataWithGiftCodes: CartModel;
export declare const sampleGiftWrappingConfig: {
    design: string;
    uid: string;
    selected: boolean;
    image: {
        url: string;
        label: string;
    };
    price: {
        currency: string;
        value: number;
    };
}[];
