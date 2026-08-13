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
import { CompanyRoleModel, CompanyAclResourceModel, CompanyRoleCreateInputModel, CompanyRoleUpdateInputModel, GetCompanyRolesVariables } from '../api/companyRoles';
export declare const DEFAULT_PAGINATION_SIZE = 10;
export interface UseCompanyRolesReturn {
    roles: CompanyRoleModel[];
    aclResources: CompanyAclResourceModel[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    error: string | null;
    fetchRoles: (variables?: GetCompanyRolesVariables) => Promise<void>;
    fetchAclResources: () => Promise<void>;
    createRole: (input: CompanyRoleCreateInputModel) => Promise<CompanyRoleModel | null>;
    updateRole: (input: CompanyRoleUpdateInputModel) => Promise<CompanyRoleModel | null>;
    deleteRole: (id: string) => Promise<boolean>;
    checkRoleNameAvailability: (name: string) => Promise<boolean>;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    refresh: () => Promise<void>;
    clearError: () => void;
}
export declare const useCompanyRoles: (initialPageSize?: number, autoFetch?: boolean, clientSidePagination?: boolean) => UseCompanyRolesReturn;
