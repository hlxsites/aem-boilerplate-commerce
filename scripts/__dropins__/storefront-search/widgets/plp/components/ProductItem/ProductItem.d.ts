import { FunctionComponent } from 'preact';
import { Product, RedirectRouteFunc } from '../../types/interface';

export interface ProductProps {
    item: Product;
    currencySymbol: string;
    currencyRate?: string;
    setRoute?: RedirectRouteFunc | undefined;
    refineProduct: (optionIds: string[], sku: string) => any;
    setCartUpdated: (cartUpdated: boolean) => void;
    setItemAdded: (itemAdded: string) => void;
    setError: (error: boolean) => void;
    addToCart?: (sku: string, options: [], quantity: number) => Promise<void | undefined>;
}
export declare const ProductItem: FunctionComponent<ProductProps>;
export default ProductItem;
//# sourceMappingURL=ProductItem.d.ts.map