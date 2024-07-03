import { Summary } from '../../components/OrderSummary/OrderSummary';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface OrderSummaryProps extends HTMLAttributes<HTMLDivElement> {
}
export type OrderSummaryState = {
    isLoading: boolean;
    summary?: Summary;
};
export declare function useOrderSummary(): OrderSummaryState;
export declare const OrderSummary: Container<OrderSummaryProps>;
//# sourceMappingURL=OrderSummary.d.ts.map