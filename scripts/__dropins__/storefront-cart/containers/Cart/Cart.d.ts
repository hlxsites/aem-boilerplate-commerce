import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { CartModel } from '../../data/models';

interface CheckoutRouteContext {
    cartId: string;
}
export interface CartProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (item: CartModel['items'][0]) => string;
    routeEmptyCartCTA?: () => string;
    routeCheckout?: (context: CheckoutRouteContext) => string;
}
export declare const Cart: Container<CartProps, CartModel | null>;
export {};
//# sourceMappingURL=Cart.d.ts.map