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
import { AddressInput as AddressInputModel, CartAddress as CartAddressModel, CartShippingAddress as CartShippingAddressModel } from '../models';
import { GetCartQuery } from '../../__generated__/types';
type ShippingAddresses = NonNullable<GetCartQuery['cart']>['shipping_addresses'];
type CartShippingAddress = ShippingAddresses[0];
type CartBillingAddress = NonNullable<GetCartQuery['cart']>['billing_address'];
declare const transformCartBillingAddress: (data: CartBillingAddress) => CartAddressModel | undefined;
declare const transformCartShippingAddress: (data: ShippingAddresses) => CartShippingAddressModel[];
declare const transformAddressToCartAddressInput: <T extends CartAddressModel>(address?: T | null) => AddressInputModel | undefined;
export { CartBillingAddress, CartShippingAddress, transformAddressToCartAddressInput, transformCartBillingAddress, transformCartShippingAddress, };
