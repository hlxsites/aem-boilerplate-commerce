/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { CardBrand } from '../../lib/creditCard.js';
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
