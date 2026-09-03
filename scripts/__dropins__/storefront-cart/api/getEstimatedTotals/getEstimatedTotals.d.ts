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
import { CartModel } from '../../data/models';
export interface EstimateAddressShippingInput {
    countryCode: string;
    postcode?: string;
    region?: {
        region?: string;
        id?: number;
    };
    shipping_method?: {
        carrier_code?: string;
        method_code?: string;
    };
}
export declare const getEstimatedTotals: (address: EstimateAddressShippingInput) => Promise<CartModel | null>;
