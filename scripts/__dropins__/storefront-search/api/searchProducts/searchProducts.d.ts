import { ProductDataModel } from '../../data/models/product';

export declare const searchProducts: (searchPhrase?: string, size?: number) => Promise<{
    pageInfo: import('../../data/models/page-info').PageInfoDataModel;
    products: ProductDataModel[];
}>;
//# sourceMappingURL=searchProducts.d.ts.map