import { ProductSearchResult, SearchVariables } from '../models/index.js';
import { Product } from '../models/product.js';
export declare function transformProductSearchResponse(data: any, searchVariables?: SearchVariables): ProductSearchResult;
export declare const transformSearchResultProducts: (searchResponse: {
    productSearch: {
        items: any[];
    };
}) => Product[];
