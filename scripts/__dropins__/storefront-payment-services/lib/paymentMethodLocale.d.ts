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
import { Lang } from '@dropins/tools/i18n';
/**
 * Maps an elsie locale to the format that the Payment Services SDK expects for payment method
 * button locales: a formatted string consisting of an ISO-639-1 language code and an ISO-3166-1
 * region code, separated by a hyphen (-), e.g., "en-US".
 */
export declare function toPaymentMethodLocale(locale: Lang): string;
