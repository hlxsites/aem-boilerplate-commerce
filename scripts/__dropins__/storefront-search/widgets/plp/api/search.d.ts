import { AttributeMetadataResponse, ClientProps, ProductSearchQuery, ProductSearchResponse, RefinedProduct, RefineProductQuery } from '../types';

declare const getProductSearch: ({ apiUrl, phrase, pageSize, displayOutOfStock, currentPage, filter, sort, context, categorySearch, headers, }: ProductSearchQuery & ClientProps) => Promise<ProductSearchResponse["data"]>;
declare const getAttributeMetadata: ({ apiUrl, headers, }: ClientProps) => Promise<AttributeMetadataResponse["data"]>;
declare const refineProductSearch: ({ apiUrl, optionIds, sku, headers, }: RefineProductQuery & ClientProps) => Promise<RefinedProduct>;
export { getAttributeMetadata, getProductSearch, refineProductSearch };
//# sourceMappingURL=search.d.ts.map