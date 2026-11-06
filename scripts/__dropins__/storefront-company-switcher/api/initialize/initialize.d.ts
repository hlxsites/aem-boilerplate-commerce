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
import type { FetchGraphQL } from '../fetch-graphql';
import { Initializer } from '@dropins/tools/lib';
import { Lang } from '../../../node_modules/@dropins/tools/src/i18n';
/**
 * Configuration properties for the company switcher initialization
 */
interface ConfigProps {
    /** Optional language definitions for internationalization */
    langDefinitions?: Lang;
    /** HTTP header name for company identification */
    companyHeader: string;
    /** HTTP header name for customer group identification */
    customerGroupHeader: string;
    /** Session storage key for persisting company context */
    companySessionStorageKey: string;
    /** Session storage key for persisting group context */
    groupSessionStorageKey: string;
    /** GraphQL modules that will have company headers applied */
    fetchGraphQlModules: FetchGraphQL[];
    /** GraphQL modules that will have group headers applied */
    groupGraphQlModules: FetchGraphQL[];
    /** GraphQL modules that will have catalog-view headers applied */
    catalogViewGraphQlModules: FetchGraphQL[];
    /** HTTP header name for the catalog view id */
    catalogViewHeader: string;
    /** HTTP header name for the catalog view access token */
    catalogViewAccessTokenHeader: string;
    /**
     * Default/public catalog view id the view-id header is reset to on
     * clear/logout. Leave empty to remove the header on clear instead.
     */
    catalogViewDefault: string;
}
/**
 * Initializer for the company switcher drop-in.
 * Configures headers, storage, and GraphQL modules for company management.
 */
export declare const initialize: Initializer<ConfigProps>;
/**
 * Configuration object for getting and setting company switcher configuration.
 * Provides methods to access and update the current configuration.
 */
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
