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
//# sourceMappingURL=getStoreConfig.d.ts.map