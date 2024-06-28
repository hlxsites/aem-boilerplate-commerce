import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { OrderDetails } from '../../reducers/orderConfirmation';

export interface DetailsProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    orderDetails: OrderDetails | null;
}
export declare const Details: FunctionComponent<DetailsProps>;
//# sourceMappingURL=Details.d.ts.map