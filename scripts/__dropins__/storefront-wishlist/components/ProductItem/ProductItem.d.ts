import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Product } from '../../data/models';

export interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
    item?: Product;
    onCartActionButtonClick?: () => boolean;
    onTrashButtonClick?: () => boolean;
}
export declare const ProductItem: FunctionComponent<ProductItemProps>;
//# sourceMappingURL=ProductItem.d.ts.map