import { PaymentServicesError } from './error';
import { RefObject } from 'preact/compat';
import { CardType } from '@adobe-commerce/payment-services-sdk/payment';

/** Global ref to the currently rendered credit card form. */
export declare const activeCreditCardForm: RefObject<CreditCardFormHandle>;
/** Publicly exposed imperative handle to credit card form. */
export interface CreditCardFormHandle {
    /**
     * Returns true only if all credit card form inputs are valid, and focuses the first
     * input that is invalid, if any.
     */
    validate: () => boolean;
    /**
     * Use this method to submit the credit card form and initiate the payment flow.
     */
    submit: () => Promise<void>;
}
declare module "@/lib/error" {
    interface PaymentServicesErrorCode {
        "payment-services/credit-card-form-invalid": void;
        "payment-services/credit-card-form-not-rendered": void;
    }
}
export declare class InvalidCreditCardFormError extends PaymentServicesError {
    constructor();
}
export declare class CreditCardFormNotRendered extends PaymentServicesError {
    constructor();
}
/**
 * Card brand enum.
 *
 * Values replicate `code` fields of {@link import("@adobe-commerce/payment-services-sdk/payment").CardType}.
 */
export declare enum CardBrand {
    AMEX = "amex",
    DINERS = "diners",
    DISCOVER = "discover",
    ELO = "elo",
    HIPER = "hiper",
    JCB = "jcb",
    MAESTRO = "maestro",
    MASTERCARD = "mastercard",
    VISA = "visa"
}
export declare namespace CardBrand {
    const fromPaymentServicesSdkCardType: ({ code }: CardType) => CardBrand | undefined;
}
//# sourceMappingURL=creditCard.d.ts.map