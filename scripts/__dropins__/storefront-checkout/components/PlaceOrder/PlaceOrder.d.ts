import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PlaceOrderProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: (e: any) => void;
    isLoading?: boolean;
}
export declare const PlaceOrder: FunctionComponent<PlaceOrderProps>;
//# sourceMappingURL=PlaceOrder.d.ts.map