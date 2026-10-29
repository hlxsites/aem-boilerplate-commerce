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
/**
 * Company address book ACL identifiers, exported so consumers (storefronts,
 * other drop-ins) don't hardcode the raw strings.
 *
 * These are the current `Magento_CompanyAddressStorefrontCompatibility::*`
 * ids only. Legacy aliases (`::set_default` and the older
 * `Magento_Company::*_address` ids) stay internal to the permission resolver —
 * they exist for backwards compatibility with older backends and are not part
 * of the public contract.
 */
export declare const COMPANY_ADDRESS_PERMISSIONS: {
    readonly VIEW: "Magento_CompanyAddressStorefrontCompatibility::company_address";
    readonly ADD: "Magento_CompanyAddressStorefrontCompatibility::add";
    readonly EDIT: "Magento_CompanyAddressStorefrontCompatibility::edit";
    readonly DELETE: "Magento_CompanyAddressStorefrontCompatibility::delete";
    readonly SET_DEFAULT: "Magento_CompanyAddressStorefrontCompatibility::default";
};
