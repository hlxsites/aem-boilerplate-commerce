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
export interface ApplePayProps {
    /**
     * The URL to the Adobe Commerce GraphQL endpoint, such as "https://example.com/graphql".
     */
    apiUrl: string;
    /**
     * Should return a promise that resolves to the shopper's cart ID.
     */
    getCartId: () => Promise<string>;
    /**
     * Should return a promise that resolves to a boolean indicating if the cart is virtual.
     */
    isVirtualCart: () => Promise<boolean>;
    /**
     * The Apple Pay container may send GraphQL requests on behalf of the shopper. This requires GraphQL authorization,
     * which can be performed using authorization tokens or session cookies.
     *
     * For token-based authorization, the "getCustomerToken" function should return a customer token as a string, or null
     * for guest checkouts. The "getCustomerToken" function should not be provided for session-based authorization.
     *
     * For more information, see: https://developer.adobe.com/commerce/webapi/graphql/usage/authorization-tokens/.
     */
    getCustomerToken?: (() => string | null) | null;
    /**
     * Called before the payment flow starts, after clicking on the Pay button
     */
    onStart: () => Promise<void>;
    /**
     * Called when payment flow is successful.
     */
    onSuccess: (result: any) => void;
    /**
     * Called when payment flow was aborted due to an error.
     */
    onError: (error: Error) => void;
    /**
     * Called when payment flow was cancelled by the customer.
     */
    onCancel: () => void;
    /**
     * The location of the Apple Pay button.
     */
    location: "CHECKOUT" | "PRODUCT_DETAIL" | "CART" | "MINICART";
}
export declare const ApplePay: ({ apiUrl, getCartId, isVirtualCart, getCustomerToken, onStart, onSuccess, onError, onCancel, location, ...props }: ApplePayProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=ApplePay.d.ts.map