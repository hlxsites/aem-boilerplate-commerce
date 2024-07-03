import { Cart } from '../data/models';
import { FunctionComponent } from 'preact';
import { Dispatch } from 'preact/hooks';

export declare enum CheckoutState {
    EMPTY = "EMPTY",
    IN_PROGRESS = "IN_PROGRESS",
    INIT = "INIT",
    LOADING = "LOADING",
    COMPLETE = "COMPLETE"
}
export declare enum CheckoutEvent {
    CART_UPDATED = 0,
    ORDER_PLACED = 1,
    USER_AUTHENTICATED = 2,
    USER_UNAUTHENTICATED = 3,
    USER_SIGN_OUT = 4
}
type CartUpdated = {
    type: CheckoutEvent.CART_UPDATED;
    payload?: Cart | null;
};
type UserAuthenticated = {
    type: CheckoutEvent.USER_AUTHENTICATED;
};
type UserUnAuthenticated = {
    type: CheckoutEvent.USER_UNAUTHENTICATED;
};
type UserSignedOut = {
    type: CheckoutEvent.USER_SIGN_OUT;
};
type OrderPlaced = {
    type: CheckoutEvent.ORDER_PLACED;
};
type CheckoutAction = CartUpdated | UserAuthenticated | UserUnAuthenticated | OrderPlaced | UserSignedOut;
type CheckoutContextValue = {
    state: CheckoutState;
    dispatch: Dispatch<CheckoutAction>;
};
export declare const CheckoutContext: import('preact').Context<CheckoutContextValue | undefined>;
export declare const CheckoutStateProvider: FunctionComponent;
export declare function useCheckoutState(): CheckoutContextValue;
export {};
//# sourceMappingURL=checkout.d.ts.map