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
import { Money, ShippingMethod } from '.';
export interface PartialShippingAddress {
    countryCode: string;
    postCode?: string;
    region?: string;
    regionCode?: string;
    regionId?: number;
}
export interface ShippingEstimateShippingMethod {
    amount: Money;
    carrierCode: string;
    methodCode: string;
    amountExclTax?: Money;
    amountInclTax?: Money;
}
export interface ShippingEstimate {
    address: PartialShippingAddress;
    availableShippingMethods?: ShippingMethod[];
    shippingMethod: ShippingEstimateShippingMethod | null;
    success?: boolean;
}
