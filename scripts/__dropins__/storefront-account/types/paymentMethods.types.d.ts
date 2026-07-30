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
import { HTMLAttributes } from 'preact/compat';
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement> {
    /** When true, hides the section header (title). */
    withHeader?: boolean;
    /**
     * Compact layout for dashboard-style embeds: compact empty state and each payment
     * card on one row (brand, number, tag, Remove).
     */
    minifiedView?: boolean;
    /**
     * If set, only tokens whose `payment_method_code` equals or starts with one of
     * these values are shown (e.g. Payment Services vault codes).
     */
    filterPaymentMethodCodes?: string[];
}
export interface PaymentMethodsWrapperProps extends PaymentMethodsProps {
}
