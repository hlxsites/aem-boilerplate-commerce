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
export type BundleOptionQuantities = Record<string, number>;
export declare function readCanEditQuantity(value: Record<string, unknown>): boolean;
export declare function readDefaultOptionQuantity(value: Record<string, unknown>): number;
export declare function buildBundleOptionQuantitiesFromOptions(options: Option[] | undefined, optionUIDs: string[] | undefined): BundleOptionQuantities;
export declare function mergeBundleOptionQuantities(previous: BundleOptionQuantities | undefined, options: Option[] | undefined, optionUIDs: string[] | undefined): BundleOptionQuantities;
export declare function bundleOptionQuantitiesToEnteredOptions(quantities: BundleOptionQuantities | undefined): Array<{
    uid: string;
    value: string;
}>;
export declare function bundleOptionQuantitiesFromEnteredOptions(enteredOptions: Array<{
    uid: string;
    value: string;
}> | undefined): BundleOptionQuantities;
export declare function mergeBundleEnteredOptions(enteredOptions: Array<{
    uid: string;
    value: string;
}> | undefined, previous: BundleOptionQuantities | undefined, next: BundleOptionQuantities): Array<{
    uid: string;
    value: string;
}>;
