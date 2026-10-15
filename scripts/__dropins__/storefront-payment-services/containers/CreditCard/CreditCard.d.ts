/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
import { CreditCardFormHandle } from '../../lib/creditCard.js';
import { RefObject } from 'preact/compat';
import LocalizedError from '../../lib/localizedError.js';
export type { CreditCardFormHandle } from '../../lib/creditCard.js';
export declare enum CardTypes {
    Visa = "visa",
    MasterCard = "mastercard",
    Amex = "amex",
    Discover = "discover",
    Maestro = "maestro",
    Diners = "diners"
}
export declare enum FormFields {
    NUMBER = "number",
    EXPIRATION_DATE = "expirationDate",
    CVV = "cvv"
}
export interface CreditCardProps {
    /**
     * Should return a promise that resolves to the shopper`s cart ID.
     * @deprecated Optional. When omitted, the cart id is fetched from the `cart/data`
     * event; only pass this to override that with a custom cart id.
     */
    getCartId?: () => Promise<string>;
    /**
     * Credit card form reference. Initially, { current: null } should be passed. Once rendered, the credit card
     * container will set the 'current' property to a { validate: () => boolean; submit: () => Promise<void> } object,
     * which parent containers should use to (programmatically) validate and submit the credit card form.
     * @deprecated Use the `submitCreditCard` dropin API function instead.
     */
    creditCardFormRef?: RefObject<CreditCardFormHandle>;
    /**
     * Called when payment flow is successful.
     * @deprecated Await `submitCreditCard()` instead; it resolves on success, but without the cart id.
     */
    onSuccess?: (result: {
        cartId: string;
    }) => void;
    /**
     * Called when the payment flow was aborted due to an error.
     *
     * The function receives an object with two properties, { name: string, message: string }, containing the localized
     * error name and message. Both properties are user-facing and can be translated using the
     * "PaymentServices.CreditCard.errors" language definitions.
     * @deprecated Catch the rejection from `submitCreditCard()` instead.
     */
    onError?: (localizedError: LocalizedError) => void;
}
/**
 * Renders the Payment Services credit card form.
 *
 * @remarks Only one `CreditCard` container is supported per page. If more than one
 * is rendered, `submitCreditCard` targets the most recently mounted one, and a
 * warning is logged.
 */
export declare const CreditCard: ({ getCartId, creditCardFormRef, onSuccess, onError, ...props }: CreditCardProps) => import("preact/compat").JSX.Element;
