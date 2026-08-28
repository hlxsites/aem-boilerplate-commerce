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
 * Decentralized payment services error code registry.
 *
 * @example
 *   // To add new error codes from different modules
 *   declare module "@/lib/error" {
 *     interface PaymentServicesErrorCode {
 *       "payment-services/some-new-error-code": void
 *     }
 */
export interface PaymentServicesErrorCode {
    "payment-services/unknown-error": void;
}
export type PaymentServicesErrorOptions = ErrorOptions & {
    code?: keyof PaymentServicesErrorCode;
};
/**
 * Common model for all errors surfaced at the public payment services dropin api.
 *
 * @property {string} code - error codes in the format "payment-services/string-code", e.g, "payment-services/not-initialized"
 *    or "payment-services/credit-card-form-invalid". While the message for a given error can change, the code will remain
 *    the same between backward-compatible versions of the payment services dropin.
 */
export declare class PaymentServicesError extends Error {
    readonly code: keyof PaymentServicesErrorCode;
    constructor(message: string, options: PaymentServicesErrorOptions);
    static from(unknownError: unknown): PaymentServicesError;
}
export declare function asError(unknownError: unknown): Error;
//# sourceMappingURL=error.d.ts.map