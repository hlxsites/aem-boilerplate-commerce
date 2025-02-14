import { SearchFilter, SearchSort } from '@adobe/magento-storefront-events-sdk/dist/types/types/schemas';
import { StorefrontConfig } from '../types/storefront';

export type SearchContextState = {
    filters: SearchFilter[];
    sort: SearchSort[];
};
/**
 * useSearch isolates all search functionality into it's own hook,
 * making it easier to share between search and plp containers
 */
export declare const useSearch: (config: StorefrontConfig) => {
    search: (query: string) => Promise<{
        pageInfo: import('../data/models/page-info').PageInfoDataModel;
        products: import('../data/models/product').ProductDataModel[];
    }>;
};
//# sourceMappingURL=use-search.d.ts.map