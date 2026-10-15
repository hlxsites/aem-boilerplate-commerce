/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import LocalizedError from '../../lib/localizedError.js';
import { PaymentLocation } from '../../api.js';
import { CartItem } from '../../lib/cartItem.js';
export interface ApplePayProps {
    /**
     * Location where the Apple Pay button is to be rendered.
     */
    location: PaymentLocation;
    /**
     * Required if createCart not provided.
     * Should return a promise that resolves to the shopper's cart ID.
     */
    getCartId?: () => Promise<string>;
    /**
     * Required if getCartId not provided.
     */
    createCart?: {
        /**
         * Should return a list with the cart items to purchase.
         *
         * The list must contain at least one cart item.
         */
        getCartItems: () => CartItem[];
    };
    /**
     * Called when the user clicks the Apple Pay button. This callback receives a 'showPaymentSheet' function as its only
     * argument that must be called to begin the Apple Pay session and show the payment sheet.
     *
     * IMPORTANT: The 'showPaymentSheet' function must be called synchronously. If called asynchronously, it will throw
     *        ... an exception "Must create a newApplePaySession from a user gesture handler."
     */
    onButtonClick?: (showPaymentSheet: () => void) => void;
    /**
     * Called when payment flow is successful.
     */
    onSuccess?: (result: {
        cartId: string;
    }) => void;
    /**
     * Called when the payment flow was aborted due to an error.
     *
     * The function receives an object with two properties, { name: string, message: string }, containing the localized
     * error name and message. Both properties are user-facing and can be translated using the
     * "PaymentServices.ApplePay.errors" language definitions.
     */
    onError?: (localizedError: LocalizedError) => void;
    /**
     * Whether the button is hidden. Set this to true to hide the Apple Pay button (default: false).
     */
    hidden?: boolean;
    /**
     * Whether the button is disabled. Set this to true to disable the Apple Pay button (default: false).
     */
    disabled?: boolean;
}
export declare const ApplePay: ({ location, getCartId, createCart, onButtonClick, onSuccess, onError, hidden, disabled, }: ApplePayProps) => import("preact/compat").JSX.Element;
