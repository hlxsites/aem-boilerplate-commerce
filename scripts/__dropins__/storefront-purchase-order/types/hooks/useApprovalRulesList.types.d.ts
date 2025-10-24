import { CustomerRolePermissionsModel } from '../../data/models';
import { PageSizeListProps, PaginationState } from '../components/pagination.types';
import { Column, Row } from '../components/purchaseOrdersTable.types';

export interface UseApprovalRulesList {
    initialPageSize: PageSizeListProps[];
    permissions: CustomerRolePermissionsModel;
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
    };
    paginationConfig: PaginationState;
    pageSizeConfig: {
        pageSizeOptionsList: PageSizeListProps[];
        onChange: (event: Event) => void;
    };
    handleCreateUrl: (id: string, type: 'edit' | 'new' | 'view') => string;
}
//# sourceMappingURL=useApprovalRulesList.types.d.ts.map