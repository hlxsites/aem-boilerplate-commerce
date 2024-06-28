import { Item } from '.';
import { Cart as GeneratedCart } from '../transforms/transform-cart';
import { PaymentMethod } from './payment-method';
import { ShippingAddress, BillingAddress } from './address';

type Coupon = {
    code: string;
};
export type Cart = {
    availablePaymentMethods?: PaymentMethod[];
    billingAddress?: BillingAddress;
    coupons: Coupon[];
    email?: string;
    id: string;
    items: Item[];
    prices?: GeneratedCart['prices'];
    selectedPaymentMethod?: PaymentMethod;
    shippingAddresses?: ShippingAddress[];
    totalQty: number;
    virtual: boolean;
};
export {};
//# sourceMappingURL=cart.d.ts.map