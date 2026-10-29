import { CardBrand } from '../../lib/creditCard';

/** Vault token's billing address subset. */
interface VaultedCreditCardBillingAddress {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    countryCode?: string;
    region?: string;
    postalCode?: string;
}
/** Vault token details. */
export interface VaultedCreditCardDetailsProps {
    /** Card type. Falls back to the "Credit card" label when absent. */
    type?: 'CREDIT' | 'DEBIT' | 'PREPAID' | 'STORE' | 'FSA';
    /** Card brand. If no brand is passed or the brand has no known icon, a generic card icon will be rendered. */
    brand?: CardBrand;
    /**
     * Last four digits of the card number.
     * https://experienceleague.adobe.com/en/docs/commerce/payment-services/payments-checkout/vaulting#security
     */
    lastFourDigits?: string;
    /** Cardholder name. */
    cardholderName?: string;
    /** Vault token's billing address subset. */
    billingAddress?: VaultedCreditCardBillingAddress;
}
export declare const VaultedCreditCardDetails: (props: VaultedCreditCardDetailsProps) => import("preact").JSX.Element;
export {};
//# sourceMappingURL=VaultedCreditCardDetails.d.ts.map