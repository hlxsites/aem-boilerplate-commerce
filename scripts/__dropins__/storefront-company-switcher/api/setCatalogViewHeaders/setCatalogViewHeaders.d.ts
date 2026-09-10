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
import type { FetchGraphQL } from '@adobe-commerce/fetch-graphql';
import type { CatalogViewContext } from '../../types/company';
/**
 * Manages catalog-view headers for GraphQL requests.
 *
 * Owns two independent headers derived from the company-scoped catalog view
 * context:
 *  - `AC-View-Id` (from `catalogViewId`): stamped whenever a view id is present.
 *    On clear (logout / null context) it is RESET to the configured default
 *    view id when one is provided, or removed when none is configured.
 *  - `AC-Catalog-View-Access-Token` (from `accessToken`): stamped only when the
 *    token is truthy; removed while the token is null and always removed on clear.
 *
 * The access token is null until a restricted access key is provisioned.
 * Handling the two headers independently is what lets the token start mounting
 * later with zero code change: once the backend returns a non-null token, this
 * manager stamps it automatically.
 *
 * The shared GraphQL client is config-seeded with a default/public `AC-View-Id`
 * (the default view used for guest browsing). So on clear the view-id header is
 * RESET to that configured default rather than bare-removed — mirroring the
 * reset-to-default pattern in `GroupHeaderManager` — preserving the default view
 * scope on the shared client. When no default is configured the header is
 * removed instead, so hosts that seed nothing are not broken. The access-token
 * header has no default and stays remove-on-clear.
 */
declare class CatalogViewHeaderManager {
    private catalogViewHeaderSet;
    private headerAppliers;
    private headerRemovers;
    private viewIdHeaderKey;
    private accessTokenHeaderKey;
    private viewIdDefault;
    constructor();
    /**
     * Sets the header key used for the catalog view id
     * @param headerKey - The header name to use for the view id
     */
    setViewIdHeaderKey(headerKey: string): void;
    /**
     * Sets the header key used for the catalog view access token
     * @param headerKey - The header name to use for the access token
     */
    setAccessTokenHeaderKey(headerKey: string): void;
    /**
     * Sets the default catalog view id the view-id header is reset to on clear.
     * When empty, the view-id header is removed on clear instead of reset.
     * @param defaultViewId - The default/public view id, or '' to disable reset
     */
    setViewIdDefault(defaultViewId: string): void;
    /**
     * Configures GraphQL modules that will have catalog-view headers applied
     * @param modules - Array of GraphQL modules with header management functions
     */
    setFetchGraphQlModules(modules: FetchGraphQL[]): void;
    /**
     * Sets catalog-view headers for all configured GraphQL modules.
     *
     * When the context is null or carries no view id, the clear path runs (see
     * {@link removeCatalogViewHeaders}): the view-id header is reset to the
     * configured default (or removed when none is configured) and the
     * access-token header is removed.
     *
     * The view-id header is always stamped when present; the access-token header
     * is stamped only when the token is truthy and removed otherwise.
     *
     * @param context - The catalog view context, or null to clear the headers
     */
    setCatalogViewHeaders(context: CatalogViewContext | null): void;
    /**
     * Clears the catalog-view headers on all configured GraphQL modules.
     *
     * The view-id header is RESET to the configured default view id when one is
     * set (preserving the default/public view scope on the shared client), or
     * removed entirely when no default is configured. The access-token header is
     * always removed (it has no default).
     */
    removeCatalogViewHeaders(): void;
    /**
     * Checks if catalog-view headers are currently set
     * @returns true if the view-id header is set, false otherwise
     */
    isCatalogViewHeaderSet(): boolean;
}
/**
 * Gets the singleton instance of CatalogViewHeaderManager
 * @returns The CatalogViewHeaderManager instance
 */
export declare const getCatalogViewHeaderManager: () => CatalogViewHeaderManager;
export {};
