import { ProductSearchResult } from '../models';
import { Product } from '../models/product';

export declare function transformProductSearchResponse(data: any): ProductSearchResult;
export declare const transformSearchResultProducts: (searchResponse: {
    productSearch: {
        items: any[];
    };
}) => Product[];
//# sourceMappingURL=api.d.ts.map