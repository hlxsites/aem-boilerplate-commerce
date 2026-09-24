/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
import { StoreConfigModel } from '../../data/models';
export interface GetStoreConfigOptions {
    /**
     * Cache mode for the request. Defaults to `force-cache`, which suits UI
     * configuration.
     *
     * Callers that need the response to describe the *current* website must pass
     * `no-store`: the endpoint URL is identical across websites, so a cached
     * response can belong to a different one.
     */
    cache?: RequestCache;
}
export declare const getStoreConfig: ({ cache, }?: GetStoreConfigOptions) => Promise<StoreConfigModel>;
