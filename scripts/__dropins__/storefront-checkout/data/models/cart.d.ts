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
import { Address, PaymentMethod, ShippingAddress } from '.';
export interface CartAddress extends Address {
}
export type CartShippingAddress = CartAddress & ShippingAddress & {
    sameAsBilling?: boolean;
};
export interface Cart {
    type: 'cart';
    availablePaymentMethods?: PaymentMethod[];
    billingAddress?: CartAddress;
    email?: string;
    id: string;
    isEmpty: boolean;
    isGuest: boolean;
    isVirtual: boolean;
    selectedPaymentMethod?: PaymentMethod;
    shippingAddresses: CartShippingAddress[];
}
