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
import { StoredPaymentMethodDisplay } from '../../data/models/stored-payment-method';
/** Sentinel for `actionError` when delete succeeds at the transport layer but returns false. */
export declare const PAYMENT_METHOD_REMOVE_FAILED = "__REMOVE_FAILED__";
export declare const usePaymentMethods: (filterPaymentMethodCodes?: string[]) => {
    items: StoredPaymentMethodDisplay[];
    loading: boolean;
    loadError: string | null;
    actionError: string | null;
    removingHash: string | null;
    removeToken: (publicHash: string) => Promise<void>;
    refetch: () => Promise<void>;
};
