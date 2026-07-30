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
import { VNode } from 'preact';
import { RequisitionList as RequisitionListModel } from '../data/models/requisitionList';
type Row = Record<string, VNode | string | number | undefined>;
type Callbacks = {
    handleOpenRenameModal: (rl: RequisitionListModel) => void;
    handleOpenDeleteModal: (rl: RequisitionListModel) => void;
};
export declare function useRequisitionListGrid(callbacks?: Callbacks, routeRequisitionListDetails?: (uid: string) => string | void, closeModal?: () => void): {
    rows: Row[];
    isLoading: boolean;
    pageInfo: {
        page_size: number;
        current_page: number;
        total_pages: number;
    } | undefined;
    totalCount: number | undefined;
    handlePageChange: (page?: number) => Promise<void>;
    handlePageSizeChange: (pageSize: number) => Promise<void>;
    isAdding: boolean;
    handleAddNew: () => void;
    handleCancelCreate: () => void;
};
export {};
