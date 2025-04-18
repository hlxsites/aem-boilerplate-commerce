import { ProductSearchResponse } from '../types';
import { SearchFilter, SearchSort } from '@adobe/magento-storefront-events-sdk/dist/types/types/schemas';

declare const updateSearchInputCtx: (searchUnitId: string, searchRequestId: string, phrase: string, filters: Array<SearchFilter>, pageSize: number, currentPage: number, sort: Array<SearchSort>) => void;
declare const updateSearchResultsCtx: (searchUnitId: string, searchRequestId: string, results: ProductSearchResponse["data"]["productSearch"]) => void;
export { updateSearchInputCtx, updateSearchResultsCtx };
//# sourceMappingURL=events.d.ts.map