import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export type AsideSections = {
    cartSummary: VNode;
    orderSummary: VNode;
};
declare const Aside: FunctionComponent<{
    sections: AsideSections;
}>;
export type MainSections = {
    billingAddress: VNode;
    billToShippingAddress?: VNode;
    login: VNode;
    paymentMethods: VNode;
    placeOrder: VNode;
    shippingAddress?: VNode;
    shippingMethods?: VNode;
};
declare const Main: FunctionComponent<{
    outOfStock?: VNode;
    sections?: MainSections;
}>;
export interface CheckoutProps extends HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
}
interface CheckoutComponent extends FunctionComponent<CheckoutProps> {
    Main: typeof Main;
    Aside: typeof Aside;
}
export declare const Checkout: CheckoutComponent;
export {};
//# sourceMappingURL=Checkout.d.ts.map