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
import { HTMLAttributes } from 'preact/compat';
import { AdminAssistanceActions } from '../data/models';
export type { AdminAssistanceAction, AdminAssistanceActions, AdminAssistanceActionsPageInfo, } from '../data/models';
export interface SellerAssistedBuyingActivityProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    pageSize?: number;
    withWrapper?: boolean;
}
export interface SellerAssistedBuyingActivityTableProps {
    loading: boolean;
    adminAssistanceActions: AdminAssistanceActions | null;
    tableHeaders: {
        action: string;
        date: string;
        details: string;
    };
    actionTypesMap: Record<string, string>;
    emptyStateMessage: string;
    featureDisabledMessage: string;
    isRemoteShoppingAssistanceAvailable?: boolean;
    errorMessage?: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    withWrapper?: boolean;
}
export interface UseSellerAssistedBuyingActivityReturn {
    loading: boolean;
    adminAssistanceActions: AdminAssistanceActions | null;
    error: string | null;
    currentPage: number;
    handlePageChange: (page: number) => void;
}
export interface UseSellerAssistedBuyingActivityProps {
    pageSize?: number;
}
