import { default as LocalizedError } from '../../lib/localizedError';

export interface PayPalButtonsProps {
    /**
     * Called when a PayPal button is clicked. This callback receives a 'showPaymentSheet'
     * function that must be called to begin the PayPal session and show the payment sheet.
     * If not called, the PayPal session will not start.
     *
     * If no 'onButtonClick' callback is provided, then the PayPal session will begin and the
     * payment sheet will show on button click, always.
     *
     * IMPORTANT: The 'showPaymentSheet' function MUST be called synchronously. If called
     *        ... asynchronously, calling 'showPaymentSheet' will throw exception:
     *        "showPaymentSheet() must be called synchronously inside the onButtonClick callback."
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
     * the "PaymentServices.PayPalButtons.errors" language definitions.
     */
    onError?: (localizedError: LocalizedError) => void;
    /**
     * Whether the buttons are hidden. Set this to true to hide the PayPal buttons (default: false).
     */
    hidden?: boolean;
    /**
     * Whether the buttons are disabled. Set this to true to disable the PayPal buttons (default: false).
     */
    disabled?: boolean;
}
export declare const PayPalButtons: ({ onButtonClick, onSuccess, onError, hidden, disabled, }: PayPalButtonsProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=PayPalButtons.d.ts.map
