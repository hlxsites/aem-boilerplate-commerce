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
import type { Option } from '../data/models/index.js';
/** Single-select option group (one chosen item UID). */
export type ProductOptionSelectionSingle = {
    label: string;
    value: string;
};
/** Multi-select option group (one or more chosen item UIDs). */
export type ProductOptionSelectionMulti = {
    label: string;
    values: string[];
};
export type ProductOptionSelectionEntry = ProductOptionSelectionSingle | ProductOptionSelectionMulti;
export type ProductOptionSelectionMap = {
    [optionId: string]: ProductOptionSelectionEntry;
};
/**
 * Flatten selection map to UID list. When `optionsOrder` is provided (e.g. `data.options`),
 * UIDs are emitted in that order for stable URLs and API payloads.
 */
export declare function selectionMapToOptionUIDs(selections: ProductOptionSelectionMap, optionsOrder?: Option[]): string[];
/**
 * Whether the shopper has satisfied all option groups for add-to-cart.
 * Bundle multi-select may contribute more than one UID while still satisfying one group.
 */
export declare function isProductOptionsSelectionComplete(options: Option[] | undefined, optionUIDs: string[] | undefined, isBundle: boolean | undefined): boolean;
