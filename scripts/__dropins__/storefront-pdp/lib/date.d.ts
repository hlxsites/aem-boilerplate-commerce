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
import type { ShopperInputRenderType } from '../data/models/index.js';
export declare function toCustomizableOptionValue(type: ShopperInputRenderType, value: string): string;
export declare function fromCustomizableOptionValue(type: ShopperInputRenderType, value: string): string;
export declare function toDateString(value: string, locale?: string): string;
export declare function isDateValid(dateString: string): boolean;
