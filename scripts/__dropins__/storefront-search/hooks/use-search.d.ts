import { SearchFilter, SearchSort } from '@adobe/magento-storefront-events-sdk/dist/types/types/schemas';
import { StorefrontConfig } from '../types/storefront';

export interface SearchContextState {
    filters: SearchFilter[];
    sort: SearchSort[];
}
/**
 * useSearch isolates all search functionality into its own hook,
 * making it easier to share between search and PLP containers
 */
export declare const useSearch: (config: StorefrontConfig) => {
    search: (query: string) => Promise<{
        pageInfo: import('../data/models/page-info').PageInfoDataModel;
        products: import('../data/models/product').ProductDataModel[];
    }>;
    setInStockFilter: (value: boolean) => void;
    filters: SearchFilter[];
    sort: SearchSort[];
};
//# sourceMappingURL=use-search.d.ts.map