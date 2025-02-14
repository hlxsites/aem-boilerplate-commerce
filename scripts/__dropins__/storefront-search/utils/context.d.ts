import { SearchFilter } from '@adobe/magento-storefront-events-sdk/dist/types/types/schemas';
import { searchProducts } from '../api';

export declare const updateSearchInputCtx: (searchUnitId: string, searchRequestId: string, phrase: string, filters: SearchFilter[], pageSize: number) => void;
export declare const updateSearchResultsCtx: (searchUnitId: string, searchRequestId: string, results: Awaited<ReturnType<typeof searchProducts>>) => void;
/** Create a Product record for analytics events */
//# sourceMappingURL=context.d.ts.map