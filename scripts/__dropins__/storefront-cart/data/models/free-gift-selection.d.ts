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
/** Mirrors `Magento\\SalesRuleFreeGift` GraphQL `AvailableFreeGift`. */
export interface AvailableFreeGiftRule {
    ruleId: number;
    /** Storefront label from GraphQL `rule_label` (per-store rule label / fallback). */
    ruleLabel?: string;
    giftQty: number;
    availableSkus: string[];
    products: FreeGiftProduct[];
}
export interface FreeGiftProductThumbnail {
    url?: string;
    label?: string;
}
export interface FreeGiftConfigurableValue {
    uid: string;
    label: string;
}
export interface FreeGiftConfigurableOption {
    /** Option row uid from GraphQL when present (distinct from `attributeUid`). */
    uid?: string;
    attributeUid: string;
    label: string;
    values: FreeGiftConfigurableValue[];
}
/** One selectable value within a bundle slot (`BundleItem.options[]`). */
export interface FreeGiftBundleValue {
    uid: string;
    label: string;
    isDefault?: boolean;
}
/**
 * One bundle slot (maps to `BundleProduct.items[]`).
 * The shopper picks exactly one `values[].uid` per slot for typical radio/select bundle rows.
 */
export interface FreeGiftBundleItem {
    /** `BundleItem.uid` — stable key for selection state. */
    uid: string;
    title: string;
    required?: boolean;
    position?: number;
    values: FreeGiftBundleValue[];
}
export interface FreeGiftProduct {
    sku: string;
    /** Parent configurable SKU when the picker lists a simple variant. */
    parentSku?: string;
    name: string;
    typeName?: string;
    thumbnail?: FreeGiftProductThumbnail | null;
    configurableOptions?: FreeGiftConfigurableOption[];
    /** Present for `BundleProduct` gifts: one UI row per item, each with its own option list. */
    bundleItems?: FreeGiftBundleItem[];
}
/** @deprecated Use `AvailableFreeGiftRule` */
export type FreeGiftPromotionRule = AvailableFreeGiftRule;
