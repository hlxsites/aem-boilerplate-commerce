import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CartTaxItem } from '../../__generated__/types';

export type Summary = {
    total: {
        inclTax: {
            amount: number;
            currency: string;
        };
        exclTax?: {
            amount: number;
            currency: string;
        };
    };
    subtotal: {
        amount: number;
        currency: string;
        isTaxIncl: boolean;
    };
    shipping?: {
        amount: number;
        currency: string;
        isEstimated: boolean;
    };
    tax?: {
        amount: number;
        currency: string;
        breakdown?: CartTaxItem[];
    };
};
export interface OrderSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'summary'> {
    isLoading?: boolean;
    summary: Summary;
}
export declare const OrderSummary: FunctionComponent<OrderSummaryProps>;
//# sourceMappingURL=OrderSummary.d.ts.map