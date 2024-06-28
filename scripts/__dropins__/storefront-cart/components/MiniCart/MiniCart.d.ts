import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface MiniCartProps extends HTMLAttributes<HTMLDivElement> {
    emptyCart: VNode;
    heading?: VNode;
    products?: VNode;
    subtotal?: VNode;
    subtotalExcludingTaxes?: VNode;
    ctas?: VNode;
}
export declare const MiniCart: FunctionComponent<MiniCartProps>;
//# sourceMappingURL=MiniCart.d.ts.map