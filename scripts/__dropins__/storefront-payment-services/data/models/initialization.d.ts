import { PaymentMethodCode } from "./method.js";
export interface LocationInitializedEventPayload {
    /**
     * List of payment methods available for this location.
     */
    availablePaymentMethods: PaymentMethodCode[];
}
