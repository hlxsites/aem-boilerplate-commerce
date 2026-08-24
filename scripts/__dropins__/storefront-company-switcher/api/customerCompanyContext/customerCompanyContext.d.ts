/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import type { CustomerCompanyInfo } from '../../types/company';
export declare class CustomerCompanyContext {
    private static instance;
    private readonly EMPTY_CUSTOMER_COMPANY_CONTEXT;
    private cache;
    /**
     * Get singleton instance
     */
    static getInstance(): CustomerCompanyContext;
    /**
     * Transforms a company object into a company option for UI components
     */
    private transformCompanyToOption;
    /**
     * Decodes base64 string and returns SHA1 hash
     */
    private processCustomerGroupId;
    /**
     * Checks if the user is authenticated by verifying the Authorization header
     */
    private isUserAuthenticated;
    resetCache(): void;
    /**
     * Fetches and updates only the customer group information in the cache
     *
     * @returns Promise containing the updated customer group ID
     * @throws Will not throw errors - returns null on failure
     */
    updateCustomerGroup(): Promise<string | null>;
    /**
     * Fetches customer company information including the current company and all available companies
     *
     * @returns Promise containing current company and list of available companies
     * @throws Will not throw errors - returns empty data on failure
     */
    getCustomerCompanyInfo(pageSize?: number): Promise<CustomerCompanyInfo>;
}
export declare const getCustomerCompanyInfo: (pageSize?: number) => Promise<CustomerCompanyInfo>;
export declare const updateCustomerGroup: () => Promise<string | null>;
