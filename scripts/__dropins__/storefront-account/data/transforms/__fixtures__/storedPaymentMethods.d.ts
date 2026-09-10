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
import type { StoredPaymentMethodDisplay } from '../../models/stored-payment-method';
/** Sample payment methods for Storybook (mirrors cart `sampleDataCart` + `events.emit`). */
export declare const sampleDataCustomerPaymentMethods: StoredPaymentMethodDisplay[];
/** Subset matching `filterPaymentMethodCodes: ['paypal']` stories. */
export declare const sampleDataCustomerPaymentMethodsPaypalOnly: StoredPaymentMethodDisplay[];
