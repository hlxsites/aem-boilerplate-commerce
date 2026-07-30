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
import { CompanyCreditHistoryItem } from '../../data/models';
import { GetCompanyCreditHistoryParams } from '../../types/api/getCompanyCreditHistoryParams.types';
export interface UseCompanyCreditHistoryProps {
    /** Initial parameters for the credit history query */
    initialParams?: GetCompanyCreditHistoryParams;
    /** Translations for accessibility announcements */
    translations: {
        ariaDataLoaded: string;
        ariaDataError: string;
    };
}
export interface UseCompanyCreditHistoryReturn {
    items: CompanyCreditHistoryItem[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    loading: boolean;
    announcement: string;
    handlePageSizeChange: (event: Event | {
        target?: {
            value: string;
        };
    } | string) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    handlePageChange: (page: number) => void;
    refreshCreditHistory: () => Promise<void>;
}
export declare const useCompanyCreditHistory: ({ initialParams, translations }: UseCompanyCreditHistoryProps) => UseCompanyCreditHistoryReturn;
