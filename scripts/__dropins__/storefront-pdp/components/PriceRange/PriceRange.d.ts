/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2023 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
import { HTMLAttributes } from 'preact/compat';
import { FunctionalComponent } from 'preact';
export interface PriceRangeProps extends HTMLAttributes<HTMLDivElement> {
    locale?: string;
    variant?: 'default' | 'strikethrough';
    currency?: string;
    amount?: number;
    sale?: boolean;
    minimumAmount?: number;
    maximumAmount?: number;
}
export declare const PriceRange: FunctionalComponent<PriceRangeProps>;
