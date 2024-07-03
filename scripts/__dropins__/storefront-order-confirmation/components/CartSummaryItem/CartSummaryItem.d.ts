import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { transformItems } from '../../data/transforms/transform-order-items';

export interface CartSummaryItemProps extends HTMLAttributes<HTMLDivElement> {
    item: ReturnType<typeof transformItems>;
    taxIncluded?: boolean;
}
export declare const CartSummaryItem: FunctionComponent<CartSummaryItemProps>;
//# sourceMappingURL=CartSummaryItem.d.ts.map