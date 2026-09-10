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
import { Address, PaymentMethod, ShippingAddress } from '.';
import { NegotiableQuoteStatus } from '../../__generated__/types';
export interface NegotiableQuote {
    type: 'quote';
    availablePaymentMethods?: PaymentMethod[];
    billingAddress?: Address;
    email?: string;
    isEmpty: boolean;
    isVirtual: boolean;
    name: string;
    selectedPaymentMethod?: PaymentMethod;
    shippingAddresses: ShippingAddress[];
    status: NegotiableQuoteStatus;
    uid: string;
}
