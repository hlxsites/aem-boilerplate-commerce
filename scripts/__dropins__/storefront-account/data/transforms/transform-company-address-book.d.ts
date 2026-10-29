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
import { GetCompanyAddressBookResponse } from '../../types';
import { CompanyAddressBookConfigModel, CompanyAddressBookModel } from '../models/company-address-book';
type CompanyConfigSource = {
    config?: {
        address_book_enabled?: boolean;
        address_book_custom_shipping_address_enabled?: boolean;
    };
    address_book_enabled?: boolean;
    address_book_custom_shipping_address_enabled?: boolean;
} | null;
/**
 * Reads the address book flags off a `company` payload.
 * Falls back to the flags sitting directly on `company` because older
 * backends returned them there rather than under `config`. Anything missing
 * resolves to `false`, so a customer without a company never ends up with the
 * address book treated as enabled.
 */
export declare const transformCompanyAddressBookConfig: (company: CompanyConfigSource) => CompanyAddressBookConfigModel;
export declare const transformCompanyAddressBook: (response: GetCompanyAddressBookResponse) => CompanyAddressBookModel;
export {};
