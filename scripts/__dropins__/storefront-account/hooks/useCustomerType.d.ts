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
 * Hook to determine customer type (B2B vs B2C).
 * Pass `enabled: false` to skip the company-context request entirely
 * (e.g. when the host page already knows B2B is off for this storefront).
 */
export declare const useCustomerType: (enabled?: boolean) => {
    isB2BCustomer: boolean;
    loading: boolean;
};
