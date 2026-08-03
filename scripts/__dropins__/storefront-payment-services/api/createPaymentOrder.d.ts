import { PaymentLocation } from '../data/models/location';

interface CreatePaymentOrderParams {
    cartId: string;
    location: PaymentLocation;
    methodCode: string;
    paymentSource: string;
    vaultIntent?: boolean;
}
export default function createPaymentOrder(params: CreatePaymentOrderParams): Promise<string>;
export {};
//# sourceMappingURL=createPaymentOrder.d.ts.map