import { Address, PaymentMethod, ShippingMethod } from '.';

export interface ValuesModel {
    billingAddress: Address | null;
    email: string;
    isBillToShipping: boolean;
    selectedPaymentMethod: PaymentMethod | null;
    selectedShippingMethod: ShippingMethod | null;
    shippingAddress: Address | null;
}
//# sourceMappingURL=values.d.ts.map