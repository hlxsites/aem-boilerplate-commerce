import { Order, ShoppingCart } from '../../types/CompleteCheckoutContextSchemas';
import { Cart } from '../../data/models/cart';

export declare const cartWithDefaultValues: Cart;
export declare const expectedShoppingCartContextWithDefaultValues: ShoppingCart;
export declare const expectedOrderContextWithDefaultValues: Order;
export declare const expectedEventWithDefaultValues: {
    event: string;
    eventInfo: {
        shoppingCartContext: ShoppingCart;
        orderContext: Order;
    };
};
export declare const cartWithDefaultValuesWithoutItems: Cart;
export declare const expectedShoppingCartContextWithDefaultValuesWithoutItems: ShoppingCart;
export declare const expectedOrderContextWithDefaultValuesWithoutItems: Order;
export declare const expectedEventWithDefaultValuesWithoutItems: {
    event: string;
    eventInfo: {
        shoppingCartContext: ShoppingCart;
        orderContext: Order;
    };
};
export declare const cartWithSimpleAndConfigurableItems: Cart;
export declare const expectedShoppingCartContextWithSimpleAndConfigurableItems: ShoppingCart;
export declare const expectedOrderContextWithSimpleAndConfigurableItems: Order;
export declare const expectedEventWithSimpleAndConfigurableItems: {
    event: string;
    eventInfo: {
        shoppingCartContext: ShoppingCart;
        orderContext: Order;
    };
};
export declare const cartWithVirtualItem: Cart;
export declare const expectedShoppingCartContextWithVirtualItem: ShoppingCart;
export declare const expectedOrderContextWithVirtualItem: Order;
export declare const expectedEventWithVirtualItem: {
    event: string;
    eventInfo: {
        shoppingCartContext: ShoppingCart;
        orderContext: Order;
    };
};
//# sourceMappingURL=fixtures.d.ts.map