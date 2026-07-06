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
 * Temporary B2B feature flags for mocked implementation
 *
 * TODO - [EDS-1010 | EDS-1011]: Remove mock config once company endpoints and ACL integration are enabled.
 *
 * TODO: Remove this file when backend integration is complete:
 * 1. StoreConfig will provide real b2b_enabled flag
 * 2. Customer type will be detected via getCustomerCompany() API
 * 3. Permissions will come from real ACL data
 */
/**
 * Mock flag to simulate B2B functionality being enabled at store level
 * In production, this comes from storeConfig.b2b_enabled GraphQL field
 */
export declare const MOCK_B2B_ENABLED = true;
/**
 * Mock flag to simulate current customer being a B2B customer
 * In production, this is detected by checking if customer.company !== null
 */
export declare const MOCK_IS_B2B_CUSTOMER = true;
/**
 * Mock permissions for B2B address management
 * In production, these come from customer.role.permissions via ACL system
 */
export declare const MOCK_COMPANY_ADDRESS_PERMISSIONS: {
    canAccessAddressBook: boolean;
    canViewAddress: boolean;
    canCreateAddress: boolean;
    canEditAddress: boolean;
    canDeleteAddress: boolean;
    canSetDefaultAddress: boolean;
};
//# sourceMappingURL=mockB2BConfig.d.ts.map