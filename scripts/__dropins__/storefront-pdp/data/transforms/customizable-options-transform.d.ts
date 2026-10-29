/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2026 Adobe
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
import { CustomizableOptionsAttributeValue, RawCustomizableOptionsAttributeValue } from '../models/index.js';
/**
 * Coerces the numeric-string `price` fields delivered by Catalog Service
 * (e.g. "108.000000") into numbers, leaving every other field untouched.
 */
export declare function parseCustomizableOptionsAttribute(raw: RawCustomizableOptionsAttributeValue): CustomizableOptionsAttributeValue;
