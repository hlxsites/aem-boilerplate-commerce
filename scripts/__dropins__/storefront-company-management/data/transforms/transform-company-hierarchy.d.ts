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
