/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export declare enum CompanyAddressTypeEnum {
    SHIPPING = "SHIPPING",
    BILLING = "BILLING"
}
export type CompanyAddressType = `${CompanyAddressTypeEnum}`;
export interface CompanyAddressAttribute {
    code?: string;
    attribute_code?: string;
    value?: string | number | boolean | null;
}
export interface CompanyAddressSchema {
    id: string;
    company_id: string;
    address_type: CompanyAddressType;
    is_default: boolean;
    company?: string;
    city?: string;
    country_code?: string;
    street?: string[];
    telephone?: string;
    postcode?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    nickname?: string;
    prefix?: string;
    suffix?: string;
    fax?: string;
    vat_id?: string;
    uid?: string;
    region_id?: string | number;
    region?: {
        region?: string;
        region_code?: string;
        region_id?: string | number;
    };
    custom_attributes?: CompanyAddressAttribute[];
    extension_attributes?: CompanyAddressAttribute[];
}
