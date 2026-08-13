import { CompanyHierarchyItemResponse } from '../../types/api/getCompanyHierarchy.types';
import { Company } from '../../types';

/**
 * Transform company hierarchy item from GraphQL response to Company model
 */
export declare function transformCompanyHierarchyItem(item: CompanyHierarchyItemResponse, parentItem?: CompanyHierarchyItemResponse | null): Company;
/**
 * Transform company hierarchy from GraphQL response to Company models
 * Converts the parent/children structure to a flat array with proper relationships
 */
export declare function transformCompanyHierarchy(hierarchy: {
    parent: CompanyHierarchyItemResponse | null;
    children: CompanyHierarchyItemResponse[];
}): Company[];
/**
 * Transform company hierarchy with fallback to companies.items
 * This handles the case where hierarchy is empty but user has admin access to multiple companies
 *
 * Logic:
 * 1. Process all hierarchy items (parent + children)
 * 2. Find companies.items that are NOT in hierarchy
 * 3. Add those companies as root-level
 */
export declare function transformCompanyHierarchyWithCompanies(hierarchyArray: Array<{
    parent: CompanyHierarchyItemResponse | null;
    children: CompanyHierarchyItemResponse[];
}>, companiesItems: Array<{
    id: string;
    name: string;
    status: string;
    is_admin: boolean;
}>): Company[];
//# sourceMappingURL=transform-company-hierarchy.d.ts.map