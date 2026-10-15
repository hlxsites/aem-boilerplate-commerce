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
import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';
import { PaymentLocation } from '../api.js';
export declare function getCheckoutCartId(): Promise<string>;
/**
 * Uses the checkout cart or creates a PDP shadow cart.
 * The callback receives the pending promise so cancellation can clean up before creation finishes.
 */
export declare function resolveGetCartId(location: PaymentLocation, sdk: PaymentServicesSDK, onPdpCartIdPromiseResolved?: (cartIdPromise: Promise<string>) => void): () => Promise<string>;
/**
 * Creates a shadow cart from `pdp/data` and `pdp/values`.
 */
export declare function getPdpCartId(sdk: PaymentServicesSDK): Promise<string>;
