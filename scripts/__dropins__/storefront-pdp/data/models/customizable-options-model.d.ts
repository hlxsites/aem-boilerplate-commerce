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
export type SelectableRenderType = 'drop_down' | 'radio' | 'checkbox' | 'multiple';
export type ShopperInputRenderType = 'field' | 'area' | 'date' | 'date_time' | 'time';
export interface SelectableOptionValue {
    id: string;
    label: string;
    price: number;
    priceType: 'fixed' | 'percent';
    sku: string | null;
    sortOrder: string;
    isDefault: boolean;
    qty?: string | null;
    imageUrl?: string | null;
    infoUrl?: string | null;
}
export interface SelectableOption {
    id: string;
    label: string;
    renderType: SelectableRenderType;
    type: 'custom_option';
    required: string;
    sortOrder: string;
    values: SelectableOptionValue[];
}
export interface ShopperInputOption {
    id: string;
    label: string;
    renderType: ShopperInputRenderType;
    required: string;
    price?: number;
    sku?: string | null;
    sortOrder: string;
    range?: {
        from?: string;
        to?: string;
    };
    productSku?: string;
}
export interface CustomizableOptionsAttributeValue {
    schemaVersion: number;
    selectable: SelectableOption[];
    shopperInput: ShopperInputOption[];
}
export interface RawSelectableOptionValue extends Omit<SelectableOptionValue, 'price'> {
    price: string;
}
export interface RawSelectableOption extends Omit<SelectableOption, 'values'> {
    values: RawSelectableOptionValue[];
}
export interface RawShopperInputOption extends Omit<ShopperInputOption, 'price'> {
    price?: string;
}
export interface RawCustomizableOptionsAttributeValue extends Omit<CustomizableOptionsAttributeValue, 'selectable' | 'shopperInput'> {
    selectable: RawSelectableOption[];
    shopperInput: RawShopperInputOption[];
}
//# sourceMappingURL=customizable-options-model.d.ts.map