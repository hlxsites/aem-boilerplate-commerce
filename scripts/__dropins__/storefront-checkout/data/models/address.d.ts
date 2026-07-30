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
import { Country, CustomAttribute, Region, ShippingMethod } from '.';
export interface Address {
    city: string;
    company?: string;
    country: Country;
    customAttributes: CustomAttribute[];
    customerAddressUid?: string;
    fax?: string;
    firstName: string;
    id?: number;
    lastName: string;
    middleName?: string;
    postCode?: string;
    prefix?: string;
    region?: Region;
    street: string[];
    suffix?: string;
    telephone?: string;
    uid: string;
    vatId?: string;
}
export interface ShippingAddress extends Address {
    availableShippingMethods?: ShippingMethod[];
    selectedShippingMethod?: ShippingMethod;
}
