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
import type { FetchGraphQL } from '@adobe-commerce/fetch-graphql';
/**
 * Manages customer group headers for GraphQL requests.
 * Singleton class that handles setting and removing group headers across multiple GraphQL modules.
 */
declare class GroupHeaderManager {
    private groupHeaderSet;
    private groupHeaderAppliers;
    private groupHeaderRemovers;
    private headerKey;
    private defaultNLICustomerGroupId;
    constructor();
    /**
     * Sets the header key used for customer group identification
     * @param headerKey - The header name to use for group ID
     */
    setHeaderKey(headerKey: string): void;
    /**
     * Configures GraphQL modules that will have group headers applied
     * @param modules - Array of GraphQL modules with header management functions
     */
    setFetchGraphQlModules(modules: FetchGraphQL[]): void;
    /**
     * Sets customer group headers for all configured GraphQL modules.
     * Always removes existing headers first before setting new ones.
     * @param groupId - The group ID to set in headers, or null to only remove headers
     */
    setGroupHeaders(groupId: string | null): void;
    /**
     * Removes customer group headers from all configured GraphQL modules
     */
    removeGroupHeaders(): void;
    /**
     * Checks if customer group headers are currently set
     * @returns true if group headers are set, false otherwise
     */
    isGroupHeaderSet(): boolean;
}
/**
 * Gets the singleton instance of GroupHeaderManager
 * @returns The GroupHeaderManager instance
 */
export declare const getGroupHeaderManager: () => GroupHeaderManager;
export {};
