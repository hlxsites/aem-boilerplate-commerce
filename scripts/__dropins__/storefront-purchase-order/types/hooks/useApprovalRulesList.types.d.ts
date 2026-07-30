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
import { CustomerRolePermissionsModel } from '../../data/models';
import { PageSizeListProps, PaginationState } from '../components/pagination.types';
import { Column, Row } from '../components/purchaseOrdersTable.types';
export interface UseApprovalRulesList {
    initialPageSize: PageSizeListProps[];
    permissions: CustomerRolePermissionsModel;
    loadingPermissions: boolean;
    routeCreateApprovalRule?: (id: string) => string;
    routeEditApprovalRule?: (id: string) => string;
    routeApprovalRuleDetails?: (id: string) => string;
    setColumns?: (defaultColumns: Column[]) => Column[];
    setRowsData?: (defaultRows: Row[]) => Row[];
    t: Record<string, string>;
}
export interface UseApprovalRulesListReturn {
    loading: boolean;
    totalCount: number;
    tableConfig: {
        columns: Column[];
        rows: Row[];
        expandedRows?: Set<number>;
    };
    paginationConfig: PaginationState;
    pageSizeConfig: {
        pageSizeOptionsList: PageSizeListProps[];
        onChange: (event: Event) => void;
    };
    handleCreateUrl: (id: string, type: 'edit' | 'new' | 'view') => string;
}
