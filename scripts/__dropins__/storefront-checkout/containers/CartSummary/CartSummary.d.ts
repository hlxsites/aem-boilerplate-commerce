import { Item } from '../../data/models';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface CartSummaryProps extends HTMLAttributes<HTMLDivElement> {
    routeCart?: () => string;
}
type CartSummaryState = {
    canDisplayMoreItems: boolean;
    hasHiddenItems: boolean;
    isLoading: boolean;
    isTaxIncluded: boolean;
    totalQuantity: number;
    visibleItems: Item[];
};
export declare function useCartSummary(displayMaxItems: boolean): CartSummaryState;
export declare const CartSummary: Container<CartSummaryProps>;
export {};
//# sourceMappingURL=CartSummary.d.ts.map