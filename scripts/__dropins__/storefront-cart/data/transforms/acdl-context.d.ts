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
import { ShoppingCartContext, ShoppingCartItem } from '../models/acdl-models';
import { CartModel, Item } from '../models/cart-model';
type TransformShoppingCartParams = {
    cart: CartModel;
    locale?: string;
};
export declare function transformShoppingCart(params: TransformShoppingCartParams): ShoppingCartContext;
export declare function transformItems(items: Item[], locale: string): ShoppingCartItem[];
export {};
