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
import { CustomAttribute } from '.';
interface ExtensibleInput {
    [key: string]: any;
}
export interface AddressInput {
    city: string;
    company?: string;
    countryCode: string;
    customAttributes?: CustomAttribute[];
    fax?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    postcode?: string;
    prefix?: string;
    region?: string;
    regionId?: number;
    saveInAddressBook?: boolean;
    street: string[];
    suffix?: string;
    telephone?: string;
    vatId?: string;
}
export interface ShippingAddressInput extends ExtensibleInput {
    address?: AddressInput;
    customerAddressId?: number;
    customerAddressUid?: string;
    pickupLocationCode?: string;
}
export interface BillingAddressInput {
    address?: AddressInput;
    customerAddressId?: number;
    customerAddressUid?: string;
    sameAsShipping?: boolean;
    useForShipping?: boolean;
}
export interface PaymentMethodInput extends ExtensibleInput {
    code: string;
}
export interface ShippingMethodInput extends ExtensibleInput {
    carrierCode: string;
    methodCode: string;
}
export {};
