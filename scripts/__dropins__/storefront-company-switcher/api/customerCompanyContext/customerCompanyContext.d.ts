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
import type { CatalogViewContext, CustomerCompanyInfo } from '../../types/company';
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
     * Fetches the company-scoped catalog view context in an ISOLATED GraphQL
     * operation, deliberately separate from the shared company query.
     *
     * Robust against cases where feature is not yet deployed on target backend:
     * an unknown-field schema error is treated as the expected "feature absent"
     * (deploy-skew) case and skipped silently, while a real/transient error is
     * surfaced loudly (still returning null, as there is no UI to render).
     *
     * @returns Promise resolving to the catalog view context, or null on any failure
     * @throws Will not throw errors - returns null on failure
     */
    getCatalogViewContext(): Promise<CatalogViewContext | null>;
    /**
     * Decides whether a GraphQL error array represents the expected "feature not
     * deployed" case — an unknown-field SCHEMA VALIDATION error for
     * `catalogViewContext` — versus a real/transient error that must not be
     * silently swallowed as deploy-skew.
     *
     * The unknown-field case is a pre-execution validation error, so it carries
     * NO Magento runtime `extensions.category` (`graphql-*`); its only signal is
     * the webonyx-generated English message `Cannot query field
     * "catalogViewContext" ...` (or, via API Mesh, a `GRAPHQL_VALIDATION_FAILED`
     * code). We treat the batch as "feature absent" only when NO error carries a
     * real Magento runtime category AND at least one error matches the
     * unknown-field signature for our field.
     *
     * `extensions` is typed as non-optional by the fetch-graphql client but is
     * `undefined` for validation errors, so every access is null-guarded.
     *
     * NOTE: an API Mesh in front of Commerce can rewrite both the message and the
     * extensions, so this remains a best-effort heuristic, not a hard contract.
     */
    private isCatalogViewFieldAbsent;
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
export declare const getCatalogViewContext: () => Promise<CatalogViewContext | null>;
