import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Item } from '../../data/models';

export interface CartSummaryItemProps extends HTMLAttributes<HTMLDivElement> {
    item: Item;
    taxIncluded?: boolean;
}
export declare const CartSummaryItem: FunctionComponent<CartSummaryItemProps>;
//# sourceMappingURL=CartSummaryItem.d.ts.map