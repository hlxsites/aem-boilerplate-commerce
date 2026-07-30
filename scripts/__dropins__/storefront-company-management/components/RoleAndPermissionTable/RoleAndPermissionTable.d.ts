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
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CompanyRoleModel } from '../../data/models/company-role';
export interface RoleAndPermissionTableProps extends HTMLAttributes<HTMLDivElement> {
    roles: CompanyRoleModel[];
    isLoading: boolean;
    canManageRoles?: boolean;
    onShowCreateForm: () => void;
    onShowEditForm: (roleId: string) => void;
    onDuplicateRole?: (roleId: string) => void;
    onDeleteRole?: (roleId: string) => void;
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    onSortChange?: (columnKey: string, direction: 'asc' | 'desc') => void;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
}
export declare const RoleAndPermissionTable: FunctionComponent<RoleAndPermissionTableProps>;
