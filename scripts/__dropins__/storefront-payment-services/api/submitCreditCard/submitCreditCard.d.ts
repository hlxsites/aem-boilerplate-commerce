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
 * Validates and submits the currently-rendered credit card form.
 *
 * Returns a promise that resolves only when the payment flow finished successfully.
 *
 * @rejects {PaymentServicesError} with:
 *  - 'code' "payment-services/credit-card-form-invalid" if trying to submit an invalid credit card form
 *  - 'code' "payment-services/credit-card-form-not-rendered" if trying to submit a non-rendered credit card form
 *  - 'localized' if the error 'name' and 'message' are user-friendly and localized, intended for UI display
 *  - 'code' "payment-services/credit-card-form-not-rendered" otherwise
 */
export declare function submitCreditCard(): Promise<void>;
//# sourceMappingURL=submitCreditCard.d.ts.map