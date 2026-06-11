import { TreeItem } from '../components/Tree/Tree';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface HierarchyActionsContext {
    expandAll: () => void;
    collapseAll: () => void;
    expandedIds: Set<string>;
    setExpandedIds: (ids: Set<string>) => void;
    treeItemsCount: number;
}
export interface CompanyHierarchyProps {
    withHeader?: boolean;
    slots?: {
        Actions?: SlotProps<HierarchyActionsContext>;
    };
    className?: string;
    /** Controls whether the tree is expanded by default. If true, all nodes are expanded. If false, all nodes are collapsed. @default true */
    defaultExpanded?: boolean;
    /** Controls whether to display admin badge for companies where user is admin. If true, shows "Admin" tag for companies with is_admin=true. @default false */
    showAdminBadge?: boolean;
}
export declare enum CompanyHierarchyViewMode {
    IS_LOADING = "IS_LOADING",
    IS_EMPTY = "IS_EMPTY",
    IS_ERROR = "IS_ERROR",
    NO_ACCESS = "NO_ACCESS",
    SHOW_STRUCTURE = "SHOW_STRUCTURE"
}
export interface Company {
    id: string;
    name: string;
    is_admin: boolean;
    parent_company: {
        id: string;
        name: string;
    } | null;
    child_companies: Company[];
}
export interface CompanyHierarchyContentProps {
    className?: string;
    withHeader?: boolean;
    errorMessage?: string | null;
    treeItems: TreeItem[];
    expandedIds: Set<string>;
    setExpandedIds: (ids: Set<string>) => void;
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
    expandAll: () => void;
    collapseAll: () => void;
    canDrop: (dragId: string, targetId: string) => boolean;
    onMove?: (args: {
        id: string;
        newParentId: string;
    }) => void;
    slots?: {
        Actions?: SlotProps<HierarchyActionsContext>;
    };
    showAdminBadge?: boolean;
    translations: {
        expandAll: string;
        collapseAll: string;
        expandAllNodes: string;
        collapseAllNodes: string;
        expand: string;
        collapse: string;
        noCompaniesData: string;
        containerTitle: string;
        moveError: string;
    };
}
//# sourceMappingURL=companyHierarchy.types.d.ts.map