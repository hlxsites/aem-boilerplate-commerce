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
import { PartialShippingAddress, ShippingEstimateShippingMethod, ShippingMethod } from '../models';
import { EstimateShippingMethodsMutation } from '../../__generated__/types';
type AvailableShippingMethods = EstimateShippingMethodsMutation['estimateShippingMethods'];
type TransformShippingEstimatePartialAddressInput = {
    country_id: string;
    postcode?: string;
    region_id?: number;
    region?: string;
};
export declare const transformShippingEstimatePartialAddress: (data: TransformShippingEstimatePartialAddressInput) => PartialShippingAddress;
export declare const transformShippingEstimateShippingMethod: (data: ShippingMethod) => ShippingEstimateShippingMethod;
export declare const transformEstimateShippingMethods: (data: AvailableShippingMethods) => ShippingMethod[];
export {};
