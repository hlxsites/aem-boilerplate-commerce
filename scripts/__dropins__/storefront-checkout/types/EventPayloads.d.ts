import { PlaceOrderMutation } from '../__generated__/types';
import { Item } from '../data/models';

export type CheckoutConfig = {
    cartId?: string;
    guestViewCookieExpirationDays?: number;
    storeKey: string;
};
export type CheckoutOrder = NonNullable<PlaceOrderMutation['placeOrder']>['orderV2'] | undefined;
export type ErrorPayload = {
    source: string;
    type: string;
    error: Error;
};
export type CartMerged = {
    oldCartItems: Item[];
};
//# sourceMappingURL=EventPayloads.d.ts.map