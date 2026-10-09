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
import { FunctionComponent } from 'preact';
import { SharedRequisitionListResult } from '../../api/getSharedRequisitionList';
export type SharedRequisitionListStatus = 'preview_loading' | 'preview_loaded' | 'preview_error' | 'importing' | 'import_success' | 'import_error' | 'cart_adding' | 'cart_success' | 'cart_error';
export interface SharedRequisitionListProps {
    status: SharedRequisitionListStatus;
    previewData: SharedRequisitionListResult | null;
    errorMessage: string;
    onImport: () => void;
    isPublic?: boolean;
    onAddToCart?: (itemUids?: string[]) => void;
    selectedItemUids?: string[];
    onSelectedItemsChange?: (itemUids: string[]) => void;
    onPageChange?: (page: number) => void;
    canAddToCart?: boolean;
    routeProduct?: (urlKey: string, sku: string) => string;
    translations: {
        loading: string;
        previewTitle: string;
        senderLabel: string;
        listNameLabel: string;
        descriptionLabel: string;
        itemsCountLabel: string;
        importButton: string;
        importingButton: string;
        successImport: string;
        skuHeader: string;
        qtyHeader: string;
        optionsHeader: string;
        addToCart?: string;
        addSelectedToCart?: string;
        addingToCart?: string;
        cartSuccess?: string;
        cartError: string;
        selectItem?: string;
        previousPage?: string;
        nextPage?: string;
        productHeader?: string;
    };
}
export declare const SharedRequisitionList: FunctionComponent<SharedRequisitionListProps>;
