import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { ProductModel } from '../../data/models';

export interface ProductCustomizableOptionsProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
}
export declare const ProductCustomizableOptions: Container<ProductCustomizableOptionsProps, ProductModel | null>;
//# sourceMappingURL=ProductCustomizableOptions.d.ts.map