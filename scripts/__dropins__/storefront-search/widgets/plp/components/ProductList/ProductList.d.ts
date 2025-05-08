import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Product } from '../../types/interface';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    products: Array<Product> | null | undefined;
    numberOfColumns: number;
    showFilters: boolean;
}
export declare const ProductList: FunctionComponent<ProductListProps>;
//# sourceMappingURL=ProductList.d.ts.map