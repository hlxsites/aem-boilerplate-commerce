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
import { RequisitionListActionPayload } from 'adobe-commerce/event-bus';
import { RequisitionList } from '../data/models/requisitionList';
export interface UseRequisitionListTransferOptions {
    sourceListUid: string;
    selectedItems: Set<string>;
    currentPageSize: number;
    currentPage: number;
    enrichConfigurableProductsInList: (list: RequisitionList) => Promise<RequisitionList>;
    fetchAndMergeProducts: (list: RequisitionList) => Promise<RequisitionList>;
    setCurrentRequisitionList: (list: RequisitionList) => void;
    setSelectedItems: (items: Set<string>) => void;
    handleRequisitionListAlert: (payload: RequisitionListActionPayload) => void;
}
export declare function useRequisitionListTransfer({ sourceListUid, selectedItems, currentPageSize, currentPage, enrichConfigurableProductsInList, fetchAndMergeProducts, setCurrentRequisitionList, setSelectedItems, handleRequisitionListAlert, }: UseRequisitionListTransferOptions): {
    showMoveToListModal: boolean;
    setShowMoveToListModal: import("preact/hooks").Dispatch<import("preact/hooks").StateUpdater<boolean>>;
    movingToList: boolean;
    showCopyToListModal: boolean;
    setShowCopyToListModal: import("preact/hooks").Dispatch<import("preact/hooks").StateUpdater<boolean>>;
    copyingToList: boolean;
    handleMoveToList: (destinationListUid: string) => Promise<void>;
    handleCopyToList: (destinationListUid: string) => Promise<void>;
};
