/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import type { Cart } from '../../data/models/cart';
type CartData = Cart | null;
export declare function isVirtualCart(data?: CartData): boolean;
export declare function isEmptyCart(data: CartData): boolean;
export declare function getCartShippingMethod(data: CartData): import("../../data/models").ShippingMethod | null | undefined;
export declare function getCartAddress(data: CartData, type?: 'shipping' | 'billing'): Record<string, any> | null;
export declare function getCartPaymentMethod(data: CartData): import("../../data/models").PaymentMethod | null | undefined;
export {};
