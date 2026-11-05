/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/lib';
import { NegotiableQuoteModel, CartItemModel } from '../../data/models/negotiable-quote-model';
export interface ItemsQuotedProps extends HTMLAttributes<HTMLDivElement> {
    quoteData?: NegotiableQuoteModel;
    onItemCheckboxChange?: (item: CartItemModel, isSelected: boolean) => void;
    onItemDropdownChange?: (item: CartItemModel, action: string) => void;
    onUpdate?: (e: SubmitEvent) => void;
    onRemoveItemsRef?: (handler: (items: CartItemModel[]) => void) => void;
    onRemoveModalStateChange?: (isOpen: boolean) => void;
    slots?: {
        ProductListTable?: SlotProps<{
            items: NegotiableQuoteModel['items'];
            canEdit: boolean;
            readOnly?: boolean;
            onItemCheckboxChange?: (item: CartItemModel, isSelected: boolean) => void;
            onItemDropdownChange?: (item: CartItemModel, action: string) => void;
            onQuantityChange?: (item: CartItemModel, newQuantity: number) => void;
            onUpdate?: (e: SubmitEvent) => void;
            dropdownSelections?: Record<string, string | undefined>;
        }>;
        QuotePricesSummary?: SlotProps<{
            items: NegotiableQuoteModel['items'];
            prices: NegotiableQuoteModel['prices'];
        }>;
    };
}
export declare const ItemsQuoted: Container<ItemsQuotedProps>;
