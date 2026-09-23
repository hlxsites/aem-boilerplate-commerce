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
 * Values of the `share_customer_accounts_scope` store config field. A const
 * object rather than an `enum` to avoid transpilation differences across
 * bundlers.
 */
export declare const SHARE_CUSTOMER_ACCOUNTS_SCOPE: {
    readonly GLOBAL: 0;
    readonly PER_WEBSITE: 1;
};
export type ShareCustomerAccountsScope = (typeof SHARE_CUSTOMER_ACCOUNTS_SCOPE)[keyof typeof SHARE_CUSTOMER_ACCOUNTS_SCOPE];
export interface StoreConfigModel {
    autocompleteOnStorefront: boolean;
    createAccountConfirmation: boolean;
    customerAccessTokenLifetime: number;
    minLength: number;
    requiredCharacterClasses: number;
    shareCustomerAccountsScope: ShareCustomerAccountsScope;
    shoppingAssistanceCheckboxTitle: string;
    shoppingAssistanceCheckboxTooltip: string;
    shoppingAssistanceEnabled: boolean;
    websiteCode: string;
    websiteName: string;
}
