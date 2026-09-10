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
import { CustomerPaymentTokenItem } from '../../types';
import { StoredPaymentMethodDisplay } from '../models/stored-payment-method';
/** End of calendar month for MM/YYYY (e.g. 09/2022). */
export declare function isExpirationDatePast(expirationDate: string | undefined): boolean;
export declare function transformStoredPaymentTokens(items: CustomerPaymentTokenItem[], filterPaymentMethodCodes?: string[]): StoredPaymentMethodDisplay[];
