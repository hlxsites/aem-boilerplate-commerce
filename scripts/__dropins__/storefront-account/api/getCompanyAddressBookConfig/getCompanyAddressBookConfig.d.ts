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
import { CompanyAddressBookConfigModel } from '../../data/models/company-address-book';
export interface GetCompanyAddressBookConfigResponse {
    data?: {
        company?: {
            config?: {
                address_book_enabled?: boolean;
                address_book_custom_shipping_address_enabled?: boolean;
            };
        } | null;
    };
    errors?: Array<{
        message: string;
    }>;
}
/**
 * Returns the company address book configuration on its own, without touching
 * address data — so it also works for customers who may not read addresses.
 *
 * Deliberately fails open: network failures, GraphQL errors, a customer with no
 * company, and backends that don't know these fields all resolve to "disabled"
 * rather than rejecting. Callers use this to decide whether to *hide* the
 * standard address UI, so a failure must never leave a customer with no address
 * section at all.
 */
export declare const getCompanyAddressBookConfig: () => Promise<CompanyAddressBookConfigModel>;
