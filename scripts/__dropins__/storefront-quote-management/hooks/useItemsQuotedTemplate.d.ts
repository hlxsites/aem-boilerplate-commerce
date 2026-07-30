/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { CartItemModel } from '../data/models/negotiable-quote-model';
export interface UseItemsQuotedTemplateReturn {
    dropdownSelections: Record<string, string | undefined>;
    handleItemDropdownChange: (item: CartItemModel, action: string) => void;
    handleDismissRemoveBanner: () => void;
    clearDropdownSelection: (item: CartItemModel) => void;
}
export interface UseItemsQuotedTemplateParams {
    handleRemoveItems: (items: CartItemModel[]) => void;
}
/**
 * Custom hook to manage dropdown selections and item actions for quote template items
 */
export declare const useItemsQuotedTemplate: (params: UseItemsQuotedTemplateParams) => UseItemsQuotedTemplateReturn;
