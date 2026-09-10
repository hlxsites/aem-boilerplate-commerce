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
import { Address as AddressModel, ShippingAddress as ShippingAddressModel } from '../models';
import { GetNegotiableQuoteQuery } from '../../__generated__/types';
type QuoteShippingAddresses = NonNullable<GetNegotiableQuoteQuery['negotiableQuote']>['shipping_addresses'];
type QuoteShippingAddress = QuoteShippingAddresses[0];
type QuoteBillingAddress = NonNullable<GetNegotiableQuoteQuery['negotiableQuote']>['billing_address'];
declare const transformQuoteBillingAddress: (data: QuoteBillingAddress) => AddressModel | undefined;
declare const transformQuoteShippingAddress: (data: QuoteShippingAddresses) => ShippingAddressModel[];
export { QuoteBillingAddress, QuoteShippingAddress, transformQuoteBillingAddress, transformQuoteShippingAddress, };
