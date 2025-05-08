import { FunctionComponent } from 'preact';
import { Product, RefinedProduct } from '../../types/interface';

export interface ProductPriceProps {
    isComplexProductView: boolean;
    item: Product | RefinedProduct;
    isBundle: boolean;
    isGrouped: boolean;
    isGiftCard: boolean;
    isConfigurable: boolean;
    discount: boolean | undefined;
    currencySymbol: string;
    currencyRate?: string;
}
export declare const ProductPrice: FunctionComponent<ProductPriceProps>;
export default ProductPrice;
//# sourceMappingURL=ProductPrice.d.ts.map