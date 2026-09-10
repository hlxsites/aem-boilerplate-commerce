import { default as LocalizedError } from '../../lib/localizedError';

export interface GooglePayProps {
    /**
     * Called when the user clicks the Google Pay button. This callback receives a 'showPaymentSheet'
     * function as its only argument that must be called to begin the Google Pay checkout and show the
     * payment sheet.
     *
     * IMPORTANT: The 'showPaymentSheet' function MUST be called synchronously. If called
     *        ... asynchronously, calling 'showPaymentSheet' may (in some browsers) throw exception
     *        ... "PaymentRequest.show() calls after the first (per page load) require either
     *        ... transient user activation or delegated payment request capability."
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
     * The function receives an object with two properties, { name: string, message: string }, containing
     * the localized error name and message. Both properties are user-facing and can be translated using
     * the "PaymentServices.GooglePay.errors" language definitions.
     */
    onError?: (localizedError: LocalizedError) => void;
    /**
     * Whether the button is hidden. Set this to true to hide the Google Pay button (default: false).
     */
    hidden?: boolean;
    /**
     * Whether the button is disabled. Set this to true to disable the Google Pay button (default: false).
     */
    disabled?: boolean;
}
export declare const GooglePay: ({ onButtonClick, onSuccess, onError, hidden, disabled, }: GooglePayProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=GooglePay.d.ts.map