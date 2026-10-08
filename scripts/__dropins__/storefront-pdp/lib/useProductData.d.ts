/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2024 Adobe
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
import { ProductModel, CustomizableOptionsAttributeValue } from '../data/models/index.js';
import { ValuesModel } from '../data/models/values-model.js';
export interface UseProductDataOptions {
    scope?: string;
    initialData?: ProductModel | null;
    initialValues?: Partial<ValuesModel>;
}
export interface UseProductDataResult {
    data: ProductModel | null;
    values: ValuesModel;
}
/**
 * Custom hook for subscribing to PDP data and values events.
 * Provides a reusable way to access product data and configuration values
 * across container components.
 */
export declare function useProductData({ scope, initialData, initialValues, }?: UseProductDataOptions): UseProductDataResult;
export interface AttributeResult<T = any> {
    id: string;
    label: string;
    value: T;
}
/**
 * Utility function to find and parse all attributes by their ID from product data.
 * Returns an array of all matching attributes.
 * Handles JSON parsing of attribute values and provides type safety.
 * If JSON parsing fails, returns the attribute with the raw value or a default empty structure.
 */
export declare function getAttributesById<T = any>(data: ProductModel | null, attributeId: string): AttributeResult<T>[];
/**
 * Typed accessor for the `ac_customizable_options` product attribute.
 * Returns `undefined` when the product has no such attribute, or when its
 * value is malformed (for example, an invalid JSON string that
 * `getAttributesById` fell back to returning raw).
 */
export declare function getCustomizableOptionsAttribute(data: ProductModel | null): CustomizableOptionsAttributeValue | undefined;
export declare function preserveCustomizableOptionUIDs(data: ProductModel | null, prevUIDs: string[] | undefined, nextUIDs: string[] | undefined): string[] | undefined;
