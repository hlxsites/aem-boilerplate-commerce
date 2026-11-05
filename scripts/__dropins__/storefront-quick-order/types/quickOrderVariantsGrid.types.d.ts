/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
import { SlotProps } from '@dropins/tools/lib/slot';
import { VNode } from 'preact';
export interface ProductVariantAttribute {
    name: string;
    label: string;
    value: string | number;
    roles: string[];
}
export interface ProductVariantImage {
    url: string;
}
export interface ProductVariantPrice {
    final: {
        amount: {
            currency: string;
            value: number;
        };
    };
}
export interface ProductVariant {
    selections?: string[];
    parentSku?: string;
    product: {
        sku: string;
        name: string;
        inStock: boolean;
        images: ProductVariantImage[];
        attributes: ProductVariantAttribute[];
        price: ProductVariantPrice;
    };
}
export interface VariantRow {
    id: string;
    image: VNode | string;
    sku: VNode | string;
    availability: VNode | string;
    price: VNode | string;
    quantity: VNode | number;
    subtotal: VNode | string;
    [key: string]: VNode | string | number | undefined;
}
export interface VariantWithQuantity extends ProductVariant {
    quantity: number;
}
export interface VariantTableData {
    sku: string;
    name: string;
    inStock: boolean;
    attributes: Record<string, {
        label: string;
        value: string | number;
    }>;
    price: number;
    quantity: number;
    subtotal: number;
    image: string;
    optionsUIDs?: string[];
    parentSku?: string;
}
export type VariantActionsContext = {
    onClear: () => void;
    onSaveToCsv: () => void;
    onCollectData: () => VariantTableData[];
    isDisabled: boolean;
    variantsCount: number;
};
export type VariantCellContext = {
    variant: ProductVariant;
    quantity: number;
    onQuantityChange: (sku: string, quantity: number) => void;
};
export interface UseQuickOrderVariantsDataProps {
    initialVariants?: ProductVariant[];
    onVariantsLoaded?: (variants: VariantWithQuantity[]) => void;
    onSelectedVariantsChange?: (data: VariantTableData[]) => void;
    debounceMs?: number;
    initialLoading?: boolean;
}
export interface UseQuickOrderVariantsDataReturn {
    variants: VariantWithQuantity[];
    loading: boolean;
    updateQuantity: (sku: string, quantity: number) => void;
    clearAllQuantities: () => void;
    exportToCsv: () => void;
    collectTableData: () => VariantTableData[];
    variantsWithQuantity: number;
}
export interface QuickOrderVariantsActionsProps {
    t: Record<string, string>;
    onClear: () => void;
    onSaveToCsv: () => void;
    onCollectData?: () => VariantTableData[];
    isDisabled?: boolean;
    variantsCount?: number;
    className?: string;
    slots?: {
        Actions?: SlotProps<VariantActionsContext>;
    };
}
export interface QuickOrderVariantsGridComponentProps {
    t: Record<string, string>;
    variants: VariantWithQuantity[];
    loading?: boolean;
    className?: string;
    onQuantityChange: (sku: string, quantity: number) => void;
    visibleVariantsLimit?: number;
    columns?: Array<{
        key: string;
        label: string;
        sortBy?: 'asc' | 'desc' | true;
    }>;
    slots?: {
        ImageCell?: SlotProps<VariantCellContext>;
        SKUCell?: SlotProps<VariantCellContext>;
        AvailabilityCell?: SlotProps<VariantCellContext>;
        PriceCell?: SlotProps<VariantCellContext>;
        QuantityCell?: SlotProps<VariantCellContext>;
        SubtotalCell?: SlotProps<VariantCellContext>;
    } & Record<string, SlotProps<VariantCellContext> | undefined>;
}
export interface QuickOrderVariantsGridProps {
    className?: string;
    initialVariants?: ProductVariant[];
    onVariantsLoaded?: (variants: VariantWithQuantity[]) => void;
    onSelectedVariantsChange?: (data: VariantTableData[]) => void;
    debounceMs?: number;
    initialLoading?: boolean;
    visibleVariantsLimit?: number;
    columns?: Array<{
        key: string;
        label: string;
        sortBy?: 'asc' | 'desc' | true;
    }>;
    slots?: {
        Actions?: SlotProps<VariantActionsContext>;
        ImageCell?: SlotProps<VariantCellContext>;
        SKUCell?: SlotProps<VariantCellContext>;
        AvailabilityCell?: SlotProps<VariantCellContext>;
        PriceCell?: SlotProps<VariantCellContext>;
        QuantityCell?: SlotProps<VariantCellContext>;
        SubtotalCell?: SlotProps<VariantCellContext>;
    } & Record<string, SlotProps<VariantActionsContext | VariantCellContext> | undefined>;
}
