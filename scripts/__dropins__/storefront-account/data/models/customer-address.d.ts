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
import type { CompanyAddressType } from '../../types/api/companyAddress.types';
export interface CustomerAddressesModel {
    addressType?: CompanyAddressType;
    addressTypeShipping?: boolean;
    addressTypeBilling?: boolean;
    isDefault?: boolean;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nickname?: string;
    prefix?: string;
    suffix?: string;
    city?: string;
    company?: string;
    countryCode?: string;
    region?: {
        region: string;
        regionCode: string;
        regionId: string | number;
    };
    telephone?: string;
    fax?: string;
    id?: string;
    vatId?: string;
    postcode?: string;
    street?: string;
    streetMultiline_2?: string;
    defaultShipping?: boolean;
    defaultBilling?: boolean;
    uid?: string;
}
