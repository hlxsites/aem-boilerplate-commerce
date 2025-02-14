import { FunctionComponent } from 'preact';

export interface CartAttributesContext {
    cart: CartProps;
    initializeCustomerCart: () => Promise<string>;
    addToCartGraphQL: (sku: string) => Promise<any>;
    refreshCart?: () => void;
}
interface CartProps {
    cartId: string;
}
declare const useCart: () => CartAttributesContext;
declare const CartProvider: FunctionComponent;
export { CartProvider, useCart };
//# sourceMappingURL=cart.d.ts.map