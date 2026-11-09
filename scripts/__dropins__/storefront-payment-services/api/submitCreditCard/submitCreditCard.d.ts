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
/**
 * Submits the payment order for the currently selected credit/debit card payment method, either a freshly-entered
 * card or a stored (vaulted) card.
 *
 * If the currently selected payment method is {@link PaymentMethodCode.CREDIT_CARD}, this function validates and
 * submits the currently-rendered credit/debit card form.
 *
 * If the currently selected payment method is {@link PaymentMethodCode.VAULT}, this function submits the
 * currently selected vaulted credit/debit card.
 *
 * @returns a promise that resolves only when the payment flow finished successfully.
 *
 * @rejects {PaymentServicesError} with:
 *  - 'code' "payment-services/dropin-not-initialized" if the drop-in has not finished initializing
 *  - 'code' "payment-services/unsupported-payment-method" if the selected method is not supported by this API
 *  - 'code' "payment-services/missing-cart-data" if required data (e.g. cart id or selected payment method) is unavailable
 *  - 'code' "payment-services/credit-card-form-invalid" if trying to submit an invalid credit card form
 *  - 'code' "payment-services/credit-card-form-not-rendered" if trying to submit a non-rendered credit card form
 *  - 'localized' if the error 'name' and 'message' are user-friendly and localized, intended for UI display
 *  - 'code' "payment-services/unknown-error" otherwise
 */
export declare function submitCreditCard(): Promise<void>;
//# sourceMappingURL=submitCreditCard.d.ts.map