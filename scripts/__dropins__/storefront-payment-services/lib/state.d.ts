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
/**
 * Payment Services drop-in state.
 */
export type State = {
    status: 'initializing' | 'error' | 'ready';
    /**
     * Invariants
     *  - (status === "ready") === (paymentsSDK !== null)
     *  - (paymentsSDK !== null) -> sdk.Payment.init() called and awaited for all locations
     */
    paymentsSDK: {
        checkout: PaymentServicesSDK;
        productDetail: PaymentServicesSDK;
    } | null;
};
/**
 * Reactive atomic drop-in state.
 */
export declare const state: import("@preact/signals-core").Signal<State>;
