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
import { StoreConfigModel } from '../../types';
export declare const DEFAULT_COUNTRY = "US";
export declare const STORE_CONFIG_DEFAULTS: StoreConfigModel;
/**
 * Retrieves store configuration settings for company forms.
 *
 * Returns store-specific defaults used to pre-populate country/region
 * selectors in company registration and profile forms.
 *
 * @returns Promise resolving to store configuration with default country and store code
 *
 * @example
 * ```typescript
 * const config = await getStoreConfig();
 * // { defaultCountry: 'US', storeCode: 'default' }
 * // Use config.defaultCountry to pre-select country in address forms
 * ```
 */
export declare const getStoreConfig: () => Promise<StoreConfigModel>;
