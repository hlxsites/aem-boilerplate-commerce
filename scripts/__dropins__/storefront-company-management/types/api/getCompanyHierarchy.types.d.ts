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
/**
 * Raw GraphQL response for company hierarchy
 */
export interface CompanyHierarchyResponse {
    customer: {
        companies: {
            items: Array<{
                id: string;
                name: string;
                status: string;
                is_admin: boolean;
            }>;
        };
        company_hierarchy: Array<{
            parent: CompanyHierarchyItemResponse | null;
            children: CompanyHierarchyItemResponse[];
        }>;
    };
}
/**
 * Company item in the hierarchy from GraphQL response
 */
export interface CompanyHierarchyItemResponse {
    id: string;
    name: string;
    status?: string | null;
    is_admin: boolean;
    legal_name?: string | null;
    __typename: string;
}
//# sourceMappingURL=getCompanyHierarchy.types.d.ts.map