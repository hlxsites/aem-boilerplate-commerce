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
import type { PaymentCardProps } from '../../types';
/**
 * View model for {@link PaymentCard}: vault row + `publicHash` for list keys and delete.
 * Fields match {@link PaymentCardProps} (except `onRemove`, set by the container).
 */
export type StoredPaymentMethodDisplay = Pick<PaymentCardProps, 'cardBrand' | 'lastFourDigits' | 'expired' | 'variant'> & {
    publicHash: string;
};
