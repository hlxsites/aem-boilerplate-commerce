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
import { AddAllToCartContext, OrderItem, ProductOptionsContext, ProductPriceContext, QuickOrderItemSearchContext, QuickOrderSearchAutocompleteItemContext } from './index.js';
import { SlotProps } from '@dropins/tools/lib/slot';
export interface SearchItem {
    sku: string;
    [key: string]: any;
}
export interface SearchProps<T extends SearchItem = SearchItem> {
    t: Record<string, string>;
    value: string;
    onChange: (e: Event) => void;
    items: T[];
    shouldShowResults?: boolean;
    className?: string;
    onItemClick?: (item: T) => void;
    slots?: {
        AddAllToCartButton?: SlotProps<AddAllToCartContext>;
        ProductPrice?: SlotProps<ProductPriceContext>;
        ProductOptions?: SlotProps<ProductOptionsContext>;
        QuickOrderItemSearch?: SlotProps<QuickOrderItemSearchContext>;
        QuickOrderSearchAutocompleteItem?: SlotProps<QuickOrderSearchAutocompleteItemContext<T>>;
    };
}
export interface UseItemSearchProps {
    productsSearch?: (params: {
        phrase: string;
        filter: Array<{
            attribute: string;
            in: string[];
        }>;
    }) => Promise<{
        items: OrderItem[];
    }>;
    initialSku: string;
    replaceItemSku?: string;
    searchFilter?: Array<{
        attribute: string;
        in: string[];
    }>;
}
