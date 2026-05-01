import { HTMLAttributes } from 'preact/compat';

export interface AdminAssistanceAction {
    action: string;
    date: string;
    details: string;
}
export interface AdminAssistanceActionsPageInfo {
    currentPage: number;
    pageSize: number;
    totalPages: number;
}
export interface AdminAssistanceActions {
    totalCount: number;
    items: AdminAssistanceAction[];
    pageInfo: AdminAssistanceActionsPageInfo;
}
export interface SellerAssistedBuyingProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    pageSize?: number;
}
export interface SellerAssistedBuyingControlProps {
    loading: boolean;
    adminAssistanceActions: AdminAssistanceActions | null;
    tableHeaders: {
        action: string;
        date: string;
        details: string;
    };
    actionTypesMap: Record<string, string>;
    emptyStateMessage: string;
    errorMessage?: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    children?: any;
}
export interface UseSellerAssistedBuyingReturn {
    loading: boolean;
    adminAssistanceActions: AdminAssistanceActions | null;
    error: string | null;
    currentPage: number;
    handlePageChange: (page: number) => void;
}
export interface UseSellerAssistedBuyingProps {
    pageSize?: number;
}
//# sourceMappingURL=sellerAssistedBuying.types.d.ts.map