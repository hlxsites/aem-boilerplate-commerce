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
import { PaymentServicesError, PaymentServicesErrorOptions } from "./error.js";
/**
 * Represents a user-friendly, localized error intended for UI display.
 *
 * @property {string} name - A localized, user-facing string that serves as the name of the error (e.g., "Network error").
 * @property {string} message - A localized, user-facing message that describes the error in detail (e.g., "An unexpected network error occurred.").
 * @property {boolean} localized - Always true.
 *
 * @example
 *   throw new LocalizedError('Verbindingsfout', 'Er is een onverwachte netwerkfout opgetreden.');
 *
 *   // Usage
 *   try {
 *     // ...
 *   } catch (e) {
 *     if (e.localized) {
 *       showError(e.name, e.message);
 *     }
 *   }
 */
declare class LocalizedError extends PaymentServicesError {
    readonly localized = true;
    constructor(localizedName: string, localizedMessage: string, options?: PaymentServicesErrorOptions);
}
export declare function fromPaymentsSDKError(category: ErrorCategory, error: Error): LocalizedError;
export type ErrorCategory = 'CreditCard' | 'ApplePay' | 'GooglePay' | 'PayPalButtons';
export default LocalizedError;
