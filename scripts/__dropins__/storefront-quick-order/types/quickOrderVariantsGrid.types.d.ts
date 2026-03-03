import { SlotProps } from '@dropins/tools/types/elsie/src/lib/slot';
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
    variant: VNode | string;
    sku: VNode | string;
    availability: VNode | string;
    price: VNode | string;
    minOrder?: VNode | string | number;
    quantity: VNode | number;
    subtotal: VNode | string;
    [key: string]: VNode | string | number | undefined;
}
export interface VariantWithQuantity extends ProductVariant {
    quantity: number;
}
export type VariantActionsContext = {
    onClear: () => void;
    onSaveToCsv: () => void;
    onCollectData: () => any[];
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
    fetchVariants?: () => Promise<ProductVariant[]>;
    onVariantsLoaded?: (variants: VariantWithQuantity[]) => void;
    onTableDataChange?: (data: any[]) => void;
    debounceMs?: number;
    initialLoading?: boolean;
}
export interface UseQuickOrderVariantsDataReturn {
    variants: VariantWithQuantity[];
    loading: boolean;
    error: string | null;
    updateQuantity: (sku: string, quantity: number) => void;
    clearAllQuantities: () => void;
    exportToCsv: () => void;
    refetchVariants: () => Promise<void>;
    collectTableData: () => any[];
    variantsWithQuantity: number;
}
export interface QuickOrderVariantsActionsProps {
    t: Record<string, string>;
    onClear: () => void;
    onSaveToCsv: () => void;
    onCollectData?: () => any[];
    isDisabled?: boolean;
    variantsCount?: number;
    className?: string;
    slots?: {
        Actions?: SlotProps<VariantActionsContext>;
    };
}
export interface QuickOrderVariantsGridProps {
    t: Record<string, string>;
    variants: VariantWithQuantity[];
    loading?: boolean;
    className?: string;
    onQuantityChange: (sku: string, quantity: number) => void;
    initialVisibleVariantsCount?: number;
    columns?: Array<{
        key: string;
        label: string;
        sortBy?: 'asc' | 'desc' | true;
    }>;
    slots?: {
        ImageCell?: SlotProps<VariantCellContext>;
        VariantCell?: SlotProps<VariantCellContext>;
        SKUCell?: SlotProps<VariantCellContext>;
        AvailabilityCell?: SlotProps<VariantCellContext>;
        PriceCell?: SlotProps<VariantCellContext>;
        QuantityCell?: SlotProps<VariantCellContext>;
        SubtotalCell?: SlotProps<VariantCellContext>;
    } & Record<string, SlotProps<VariantCellContext> | undefined>;
}
export interface QuickOrderVariantsGridContainerProps {
    className?: string;
    variants?: ProductVariant[];
    fetchVariants?: () => Promise<ProductVariant[]>;
    onVariantsLoaded?: (variants: VariantWithQuantity[]) => void;
    onTableDataChange?: (data: any[]) => void;
    debounceMs?: number;
    initialLoading?: boolean;
    showMinOrder?: boolean;
    initialVisibleVariantsCount?: number;
    columns?: Array<{
        key: string;
        label: string;
        sortBy?: 'asc' | 'desc' | true;
    }>;
    slots?: {
        Actions?: SlotProps<VariantActionsContext>;
        ImageCell?: SlotProps<VariantCellContext>;
        VariantCell?: SlotProps<VariantCellContext>;
        SKUCell?: SlotProps<VariantCellContext>;
        AvailabilityCell?: SlotProps<VariantCellContext>;
        PriceCell?: SlotProps<VariantCellContext>;
        QuantityCell?: SlotProps<VariantCellContext>;
        SubtotalCell?: SlotProps<VariantCellContext>;
    } & Record<string, SlotProps<VariantActionsContext | VariantCellContext> | undefined>;
}
//# sourceMappingURL=quickOrderVariantsGrid.types.d.ts.map