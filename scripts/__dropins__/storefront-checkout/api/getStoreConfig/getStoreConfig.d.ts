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
import { StoreConfig } from '../../data/models';
export declare const DEFAULT_COUNTRY = "US";
export declare const STORE_CONFIG_DEFAULTS: StoreConfig;
export declare const getStoreConfig: () => Promise<StoreConfig>;
export declare const getStoreConfigCache: () => StoreConfig | null;
