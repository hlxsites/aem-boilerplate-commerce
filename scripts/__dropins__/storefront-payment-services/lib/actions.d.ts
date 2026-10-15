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
import { CreditCardFormHandle } from './creditCard';
/**
 * Finalize Payment Services drop-in initialization with "ready" status.
 */
export declare function initializationSucceeded(paymentsSDK: {
    checkout: PaymentServicesSDK;
    productDetail: PaymentServicesSDK;
}): void;
/**
 * Finalize Payment Services drop-in initialization with "error" status.
 */
export declare function initializationFailed(): void;
/**
 * Register the currently-rendered CreditCard form ref in global dropin state.
 * At most one CreditCard container is expected per page.
 */
export declare function creditCardFormMounted(handle: CreditCardFormHandle): void;
/**
 * Unregister the CreditCard form ref when the CreditCard container unmounts.
 * Only clears it when `ref` is still the active one, so a form unmounting after
 * a newer one registered does not wipe the newer ref.
 */
export declare function creditCardFormUnmounted(ref: CreditCardFormHandle): void;
