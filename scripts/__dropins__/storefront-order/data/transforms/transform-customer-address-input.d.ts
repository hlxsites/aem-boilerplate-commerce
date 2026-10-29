/********************************************************************
 * ADOBE CONFIDENTIAL
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
import { OrderAddressModel } from '../models';
export declare function transformCustomerAddressInput(address: OrderAddressModel): {
    region: {
        region_id: number | null;
        region: string | undefined;
    };
    city: string | undefined;
    company: string | undefined;
    country_code: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    middlename: string | undefined;
    postcode: string | undefined;
    street: string[] | undefined;
    telephone: string | undefined;
    custom_attributesV2: {
        attribute_code: string;
        value: string;
    }[];
};
