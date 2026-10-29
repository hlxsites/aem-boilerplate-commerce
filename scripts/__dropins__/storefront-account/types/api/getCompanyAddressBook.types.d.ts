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
import { CompanyAddressSchema } from './companyAddress.types';
export interface CompanyAddressesResponse {
    items?: CompanyAddressSchema[];
    page_info?: {
        current_page?: number;
        page_size?: number;
        total_pages?: number;
    };
    total_count?: number;
}
export interface GetCompanyAddressBookResponse {
    data: {
        company?: {
            config?: {
                address_book_enabled?: boolean;
                address_book_custom_shipping_address_enabled?: boolean;
            };
            address_book_enabled?: boolean;
            address_book_custom_shipping_address_enabled?: boolean;
            default_billing_address?: CompanyAddressSchema | null;
            default_shipping_address?: CompanyAddressSchema | null;
            addresses?: CompanyAddressesResponse | null;
        };
    };
    errors?: {
        message: string;
        path?: string[];
        extensions?: {
            category?: string;
        };
    }[];
}
