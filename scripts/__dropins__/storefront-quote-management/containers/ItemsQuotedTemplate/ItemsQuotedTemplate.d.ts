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
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';
import { CartItemModel } from '../../data/models/negotiable-quote-model';
export interface ItemsQuotedTemplateProps extends HTMLAttributes<HTMLDivElement> {
    templateData?: NegotiableQuoteTemplateModel;
    slots?: {
        ProductListTable?: SlotProps<{
            items: NegotiableQuoteTemplateModel['items'];
            canEdit: boolean;
            dropdownSelections: Record<string, string | undefined>;
            handleItemDropdownChange: (item: CartItemModel, action: string) => void;
            handleQuantityChange: (item: CartItemModel, newQuantity: number) => void;
            handleUpdate: (e: SubmitEvent) => void;
            onItemDropdownChange?: (item: any, action: string) => void;
        }>;
        QuotePricesSummary?: SlotProps<{
            items: NegotiableQuoteTemplateModel['items'];
            prices: NegotiableQuoteTemplateModel['prices'];
        }>;
    };
}
export declare const ItemsQuotedTemplate: Container<ItemsQuotedTemplateProps>;
