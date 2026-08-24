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
import { CompanyUser, CompanyUsersFilter } from '../../types';
export type FilterType = 'all' | 'active' | 'inactive';
export interface UseCompanyUsersProps {
    translations: {
        ariaDataLoaded: string;
        ariaDataError: string;
    };
}
export interface UseCompanyUsersReturn {
    users: CompanyUser[];
    userPermissions: Set<string> | null;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    filterType: FilterType;
    filter: CompanyUsersFilter | undefined;
    loading: boolean;
    announcement: string;
    canEditUsers: boolean;
    handleFilterChange: (newFilter: FilterType) => void;
    handlePageSizeChange: (event: Event | {
        target?: {
            value: string;
        };
    } | string) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    handlePageChange: (newPage: number) => void;
    refreshUsers: () => Promise<void>;
}
export declare const useCompanyUsers: ({ translations }: UseCompanyUsersProps) => UseCompanyUsersReturn;
