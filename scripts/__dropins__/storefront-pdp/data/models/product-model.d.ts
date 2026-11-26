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
import { ProductType } from './acdl-models';
export interface ProductModel {
    name: string;
    sku: string;
    isBundle: boolean;
    addToCartAllowed: boolean;
    inStock: boolean | null;
    shortDescription?: string;
    metaDescription?: string;
    metaKeyword?: string;
    metaTitle?: string;
    description?: string;
    /** @deprecated Use gallery instead; this list cannot represent mixed media order. */
    images?: ProductImage[];
    /** @deprecated Use gallery instead; this list cannot represent mixed media order. */
    videos?: ProductVideo[];
    gallery?: GalleryItem[];
    prices?: Prices;
    attributes?: Attribute[];
    options?: Option[];
    optionUIDs?: string[];
    url?: string;
    urlKey?: string;
    externalId?: string;
    externalParentId?: string;
    variantSku?: string;
    variantName?: string;
    productType?: ProductType | undefined;
}
export interface ProductImage {
    url: string;
    label: string;
    width?: number;
    height?: number;
    roles?: string[];
}
export interface ProductVideo {
    url: string;
    title?: string;
    description?: string;
    preview?: {
        url: string;
        label?: string;
        roles?: string[];
    };
}
export type GalleryItem = {
    type: 'image';
    url: string;
    label: string;
    roles?: string[];
} | (ProductVideo & {
    type: 'video';
});
interface Price {
    amount?: number;
    currency?: string;
    maximumAmount?: number;
    minimumAmount?: number;
    variant?: 'default' | 'strikethrough';
}
export interface Tier {
    tier: Price;
    quantity: number;
}
interface Prices {
    regular: Price;
    final: Price;
    tiers: Tier[];
    visible: boolean;
}
export interface Option {
    id: string;
    type: 'text' | 'image' | 'color' | 'dropdown';
    typename: 'ProductViewOptionValueProduct' | 'ProductViewOptionValueSwatch' | 'ProductViewOptionValueConfiguration';
    label: string;
    required: boolean;
    multiple: boolean;
    items: OptionValue[];
}
export interface OptionValue {
    id: string;
    label: string;
    inStock: boolean;
    value: string;
    selected: boolean;
    /** Default quantity from Catalog Service for bundle option values. */
    quantity?: number;
    /** When true, shoppers may change this bundle option value quantity. */
    canEditQuantity?: boolean;
    product?: any;
}
interface Attribute {
    id: string;
    label: string;
    value: string;
    roles?: string[];
}
export {};
