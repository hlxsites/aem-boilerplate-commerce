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
import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';
export interface RequisitionListGridWrapperProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    isLoading?: boolean;
    header?: VNode;
    rows: Array<Record<string, VNode | string | number | undefined>>;
    skeletonRowCount: number;
    pageInfo?: {
        total_pages?: number;
        current_page?: number;
        page_size?: number;
    };
    totalCount?: number;
    handlePageChange: (page?: number) => Promise<void>;
    handlePageSizeChange?: (pageSize: number) => Promise<void>;
    defaultPageSize?: number;
    isAdding: boolean;
    handleAddNew: () => void;
    handleCancelCreate: () => void;
}
export declare const RequisitionListGridWrapper: FunctionComponent<RequisitionListGridWrapperProps>;
