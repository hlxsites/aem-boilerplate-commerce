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
import { PageSizeListProps, PaginationState } from '../components/pagination.types';
import { Column, Row } from '../components/purchaseOrdersTable.types';
import { EnumPurchaseOrdersView } from '../api';
import { CustomerRolePermissionsModel } from '../../data/models';
export type AlertMessageConfigType = {
    heading: string;
    description: string;
    type: 'error' | 'warning' | 'success';
};
export interface UsePurchaseOrdersParams {
    initialPageSize: PageSizeListProps[];
    routePurchaseOrderDetails?: (poId: string) => string;
    setColumns?: (defaultColumns: Column[]) => Column[];
    setRowsData?: (defaultRows: Row[]) => Row[];
    t: Record<string, string>;
    view: EnumPurchaseOrdersView;
    permissions: CustomerRolePermissionsModel;
    loadingPermissions: boolean;
}
export interface UsePurchaseOrdersReturn {
    isRequireApprovalPOsView: boolean;
    isAdmin: boolean;
    totalCount: number;
    loading: boolean;
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
    selectedOrderIds: string[];
    handleRejectSelected: () => void;
    handleApproveSelected: () => void;
    alertMessageConfig: AlertMessageConfigType;
}
