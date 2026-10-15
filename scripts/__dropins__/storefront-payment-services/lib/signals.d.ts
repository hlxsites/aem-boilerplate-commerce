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
import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';
interface SdkSignal {
    checkout?: PaymentServicesSDK;
    productDetail?: PaymentServicesSDK;
}
/**
 * Payment Services SDK signal. Invariants:
 *  - (paymentsSDK !== null) -> sdk.Payment.init() called and awaited for all locations
 */
export declare const paymentsSDK: import("@preact/signals-core").ReadonlySignal<SdkSignal>;
/**
 * Payment Services drop-in status signal.
 */
export declare const status: import("@preact/signals-core").ReadonlySignal<"initializing" | "error" | "ready">;
export {};
