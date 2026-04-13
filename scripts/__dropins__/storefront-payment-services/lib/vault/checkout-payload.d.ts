import { PaymentLocation } from '../../data/models/location';
import { PaymentMethodCode } from '../../data/models/method';

export type VaultPaymentOrderIds = {
    paypalOrderId: string;
    paymentsOrderId: string;
};
export type CreatePaymentOrderForVaultResult = {
    id?: string;
    mp_order_id?: string;
    status?: string;
};
export declare function createVaultAdditionalData(token: {
    publicHash?: string;
}, paymentOrder?: {
    paypal_order_id: string;
    payments_order_id: string;
}): Record<string, unknown>;
export declare function buildVaultCreatePaymentOrderInput(cartId: string): {
    cartId: string;
    methodCode: PaymentMethodCode;
    paymentSource: string;
    location: PaymentLocation;
    vaultIntent: boolean;
};
export declare function extractVaultPaymentOrderIds(created: CreatePaymentOrderForVaultResult | null | undefined): VaultPaymentOrderIds | null;
//# sourceMappingURL=checkout-payload.d.ts.map