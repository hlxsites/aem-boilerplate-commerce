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
import { PaymentMethod } from '../models/payment-method';
import { GetCartQuery } from '../../__generated__/types';
type SelectedPaymentMethod = NonNullable<GetCartQuery['cart']>['selected_payment_method'];
type AvailablePaymentMethods = NonNullable<GetCartQuery['cart']>['available_payment_methods'];
declare const transformSelectedPaymentMethod: (data: SelectedPaymentMethod) => PaymentMethod | undefined;
declare const transformAvailablePaymentMethods: (data: AvailablePaymentMethods) => PaymentMethod[] | undefined;
export { transformAvailablePaymentMethods, transformSelectedPaymentMethod };
