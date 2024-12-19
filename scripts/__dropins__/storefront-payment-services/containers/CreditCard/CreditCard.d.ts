import { CreditCard as PaymentServicesCreditCard } from '@adobe-commerce/payment-services-sdk/payment';

export declare enum CardTypes {
    Visa = "visa",
    MasterCard = "mastercard",
    Amex = "amex",
    Discover = "discover",
    Maestro = "maestro",
    Diners = "diners"
}
export declare const CREDIT_CARD_CODE = "payment_services_paypal_hosted_fields";
export interface CreditCardProps {
    /**
     * Adobe Commerce GraphQL API URL, e.g., "https://magento.test/graphql".
     */
    apiUrl: string;
    /**
     * Should return the cart id for which to make a payment.
     */
    getCartId: () => Promise<string>;
    /**
     * The Credit Card component may send GraphQL requests on behalf of the
     * customer. This requires GraphQL Authorization, which can be done in two
     * ways: (1) Authorization tokens; (2) Session cookies.
     *
     *   (getCustomerToken === undefined) | (getCustomerToken === null)
     *     If no getCustomerToken function is provided, then the component
     *     will assume that the Adobe Commerce instance behind 'apiUrl' is set up
     *     to use session-based authorization. In that case, the component
     *     will send along same-origin cookies in every GraphQL request.
     *
     *   (typeof getCustomerToken === 'function')
     *     If a getCustomerToken function is provided, then the component
     *     will embed the return value of the getCustomerToken function as an
     *     Authorization header in every request. If the getCustomerToken function
     *     returns null, then the component will assume that the
     *     customer is not logged in.
     *
     * For more information, see:
     * https://developer.adobe.com/commerce/webapi/graphql/usage/authorization-tokens/
     */
    getCustomerToken?: (() => string | null) | null;
    /**
     * Called when payment flow is successful.
     */
    onSuccess: () => void;
    /**
     * Called when payment flow was aborted due to an error.
     */
    onError: (error: Error) => void;
    /**
     * Set this callback to be notified when the credit card fields are rendered.
     * Use this to execute any logic that depends on the credit card fields being rendered.
     * Credit Card may be re-rendered if an error occurs during submission.
     *
     * @param creditCard - The PaymentServicesCreditCard instance.
     */
    onRender?: (creditCard: PaymentServicesCreditCard) => Promise<void>;
    /**
     * Set this callback to be notified when the credit card fields are validated.
     * @param isFormValid - true if all fields are valid, false otherwise.
     */
    onValidation?: (isFormValid: boolean) => void;
}
export declare const CreditCard: ({ apiUrl, getCartId, getCustomerToken, onSuccess, onError, onRender, onValidation, ...props }: CreditCardProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=CreditCard.d.ts.map