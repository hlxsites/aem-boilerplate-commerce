import { StoreConfig } from '../data/models';
import { FunctionComponent } from 'preact';

export declare const DEFAULT_COUNTRY = "US";
export declare const DEFAULT_NUMBER_OF_ITEMS = 10;
export declare const STORE_CONFIG_DEFAULTS: StoreConfig;
interface ContextData {
    config?: StoreConfig;
}
export declare const StoreProvider: FunctionComponent;
export declare function useStore(): ContextData;
export {};
//# sourceMappingURL=store.d.ts.map