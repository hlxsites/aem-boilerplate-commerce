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
import { RequisitionList } from '../data/models/requisitionList';
type UseRequisitionListSelectedItems = {
    currentRequisitionList: RequisitionList | null;
    setCurrentRequisitionList: (value: RequisitionList | null | ((prev: RequisitionList | null) => RequisitionList | null)) => void;
    selectedItems: Set<string>;
    setSelectedItems: (value: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
    handleItemSelection: (itemUid: string, isSelected: boolean) => void;
    handleSelectAll: () => void;
    handleSelectNone: () => void;
};
export declare function useRequisitionListSelectedItems(): UseRequisitionListSelectedItems;
export {};
