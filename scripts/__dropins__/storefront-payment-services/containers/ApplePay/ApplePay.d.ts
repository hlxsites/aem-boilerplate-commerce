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
     * Should return a promise that resolves to the shopper's cart ID.
     */
    getCartId: () => Promise<string>;
    /**
     * Whether the cart contains only virtual/downloadable products.
     */
    isVirtualCart: boolean;
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
    onSuccess?: (result: any) => void;
    /**
     * Called when payment flow was aborted due to an error.
     */
    onError?: (error: Error) => void;
}
export declare const ApplePay: ({ getCartId, isVirtualCart, onButtonClick, onSuccess, onError, ...props }: ApplePayProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=ApplePay.d.ts.map