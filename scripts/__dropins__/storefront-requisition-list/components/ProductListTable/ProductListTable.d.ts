/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { RequisitionList as RequisitionListModel } from '../../data/models/requisitionList';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ProductListTableProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
    className?: string;
    items: RequisitionListModel['items'];
    selectedItems: Set<string>;
    currentPage: number;
    pageSize: number;
    canEdit?: boolean;
    handleItemSelection: (itemUid: string, isSelected: boolean) => void;
    handleUpdateQuantity: (itemUid: string, newQuantity: number) => Promise<void>;
    onAddToCart: (itemUids: string[] | undefined) => void;
    onDeleteItem: (itemUids: string[] | undefined) => void;
    /**
     * Mirrors the admin "Configurable Product Image" setting
     * (checkout/cart/configurable_product_image). When true, configurable
     * items always display the parent product's own thumbnail/price/SKU
     * instead of the selected variant's, consistent with the cart.
     */
    useParentConfigurableThumbnail?: boolean;
}
export declare const ProductListTable: FunctionComponent<ProductListTableProps>;
