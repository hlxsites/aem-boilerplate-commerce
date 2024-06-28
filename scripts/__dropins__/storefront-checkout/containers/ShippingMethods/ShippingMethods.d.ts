import { PreselectedShippingMethod } from '../Checkout';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface ShippingMethodsProps extends HTMLAttributes<HTMLDivElement> {
    preSelectedMethod?: PreselectedShippingMethod;
}
export declare const ShippingMethods: Container<ShippingMethodsProps>;
//# sourceMappingURL=ShippingMethods.d.ts.map