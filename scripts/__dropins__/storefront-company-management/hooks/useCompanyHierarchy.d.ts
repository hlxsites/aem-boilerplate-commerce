import { CompanyHierarchyViewMode, Company } from '../types';
import { TreeItem } from '../components/Tree/Tree';

/**
 * Virtual root node ID used ONLY for drag-and-drop to root level.
 * This node is hidden from UI but allows dropping companies to make them root-level.
 */
export declare const VIRTUAL_ROOT_ID: "__ROOT__";
export declare const useCompanyHierarchy: (defaultExpanded?: boolean) => {
    companies: Company[];
    setCompanies: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<Company[]>>;
    treeItems: TreeItem[];
    loading: boolean;
    setLoading: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
    viewMode: CompanyHierarchyViewMode;
    setViewMode: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<CompanyHierarchyViewMode>>;
    expandedIds: Set<string>;
    setExpandedIds: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<Set<string>>>;
    selectedId: string | null;
    setSelectedId: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<string | null>>;
    expandAll: () => void;
    collapseAll: () => void;
    canDrop: (dragId: string, targetId: string) => boolean;
    onMove: (args: {
        id: string;
        newParentId: string;
    }) => void;
    isAdmin: boolean;
    errorMessage: string | null;
};
//# sourceMappingURL=useCompanyHierarchy.d.ts.map