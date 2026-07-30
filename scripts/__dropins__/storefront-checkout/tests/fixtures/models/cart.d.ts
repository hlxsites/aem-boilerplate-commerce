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
import { Cart } from '../../../data/models/cart';
import { ShippingMethod } from '../../../data/models/shipping-method';
declare const emptyCart: Cart;
declare const simpleCart: Cart;
declare const guestCart: Cart;
declare const cartWithShippingInfo: ({ methods, selection, }?: {
    methods?: ShippingMethod[];
    selection?: ShippingMethod;
}) => Cart;
declare const virtualCart: Cart;
export { cartWithShippingInfo, emptyCart, guestCart, simpleCart, virtualCart };
