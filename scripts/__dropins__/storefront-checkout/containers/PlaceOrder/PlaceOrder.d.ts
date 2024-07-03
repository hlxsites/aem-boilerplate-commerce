import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface PlaceOrderProps extends HTMLAttributes<HTMLDivElement> {
    onClick: () => void;
    handleServerError: (error: any) => void;
}
export declare const PlaceOrder: Container<PlaceOrderProps>;
//# sourceMappingURL=PlaceOrder.d.ts.map