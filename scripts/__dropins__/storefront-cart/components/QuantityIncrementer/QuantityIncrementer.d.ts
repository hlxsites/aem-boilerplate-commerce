import { FunctionComponent } from 'preact';
import { CartModel } from '../../data/models/cart-model';

export interface QuantityIncrementerProps {
    item: CartModel['items'][0];
    disabled: boolean;
    ariaLabel: string;
    onValue: (value: number) => void;
}
export declare const QuantityIncrementer: FunctionComponent<QuantityIncrementerProps>;
//# sourceMappingURL=QuantityIncrementer.d.ts.map