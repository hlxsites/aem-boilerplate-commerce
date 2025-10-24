import { Column, PageSizeListProps, Row } from '../components';

export interface PurchaseOrderApprovalRulesListProps {
    initialPageSize?: PageSizeListProps[];
    routeCreateApprovalRule?: (id: string) => string;
    routeEditApprovalRule?: (id: string) => string;
    routeApprovalRuleDetails?: (id: string) => string;
    setColumns?: (defaultColumns: Column[]) => Column[];
    setRowsData?: (defaultRows: Row[]) => Row[];
    className?: string;
    withHeader?: boolean;
    withWrapper?: boolean;
    skeletonRowCount?: number;
}
//# sourceMappingURL=purchaseOrderApprovalRulesList.types.d.ts.map