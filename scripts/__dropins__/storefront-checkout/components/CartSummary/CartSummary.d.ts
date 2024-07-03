import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Item } from '../../data/models';

export type CartSummaryActionProps = {
    type: 'view-more' | 'view-all';
    onClick: () => void;
};
export interface CartSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'action'> {
    action?: VNode<CartSummaryActionProps>;
    taxIncluded: boolean;
    isLoading: boolean;
    items: Item[];
    routeCart?: () => string;
    totalQuantity: number;
}
export declare const CartSummaryAction: FunctionComponent<CartSummaryActionProps>;
export declare const CartSummary: FunctionComponent<CartSummaryProps>;
//# sourceMappingURL=CartSummary.d.ts.map