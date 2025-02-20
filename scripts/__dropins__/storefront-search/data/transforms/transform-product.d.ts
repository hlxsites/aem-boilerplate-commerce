import { ProductView } from '../../__generated__/types';
import { ProductDataModel } from '../models/product';

interface ExtendedProductView extends Omit<ProductView, "uid" | "price"> {
    uid: string;
    price: {
        regular: {
            amount: {
                value: number;
                currency: string;
            };
        };
        final?: {
            amount: {
                value: number;
                currency: string;
            };
        };
    };
}
export declare function transformProduct(productView: ExtendedProductView, rank: number, currencySymbol?: string, currencyRate?: string): ProductDataModel;
export declare function transformProducts(products: ExtendedProductView[], currencySymbol?: string, currencyRate?: string): ProductDataModel[];
export {};
//# sourceMappingURL=transform-product.d.ts.map