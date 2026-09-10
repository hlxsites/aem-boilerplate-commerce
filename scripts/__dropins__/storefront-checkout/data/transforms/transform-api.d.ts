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
import { BillingAddressInput as BillingAddressInputModel, PaymentMethodInput as PaymentMethodInputModel, ShippingAddressInput as ShippingAddressInputModel, ShippingMethodInput as ShippingMethodInputModel } from '../models/api';
import { BillingAddressInput, NegotiableQuoteBillingAddressInput, NegotiableQuotePaymentMethodInput, NegotiableQuoteShippingAddressInput, PaymentMethodInput, ShippingAddressInput, ShippingMethodInput } from '../../__generated__/types';
export declare function transformPaymentMethodInputModelToCartInput({ code, ...additionalData }: PaymentMethodInputModel): PaymentMethodInput;
export declare function transformPaymentMethodInputModelToQuoteInput({ code, ...additionalData }: PaymentMethodInputModel): NegotiableQuotePaymentMethodInput;
export declare const transformShippingMethodInput: (input: ShippingMethodInputModel | ShippingMethodInput) => ShippingMethodInput;
export declare function transformShippingMethodsInputModel(input: Array<ShippingMethodInputModel | ShippingMethodInput>): Array<ShippingMethodInput>;
export declare function transformShippingAddressInputModelToCartInput(input: ShippingAddressInputModel): ShippingAddressInput;
export declare function transformShippingAddressInputModelToQuoteInput(input: ShippingAddressInputModel): NegotiableQuoteShippingAddressInput;
export declare function transformBillingAddressInputModelToCartInput(input: BillingAddressInputModel): BillingAddressInput;
export declare function transformBillingAddressInputModelToQuoteInput(input: BillingAddressInputModel): NegotiableQuoteBillingAddressInput;
