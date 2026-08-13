import { CompanyBasicInfoResponse } from './companyBasicInfo.types';

/**
 * Input for unassigning a child company from its parent company
 */
export interface UnassignChildCompanyInput {
    child_company_id: string;
}
/**
 * Raw GraphQL response for unassignChildCompany mutation
 */
export interface UnassignChildCompanyResponse {
    unassignChildCompany: {
        company_hierarchy: {
            parent: CompanyBasicInfoResponse | null;
            children: CompanyBasicInfoResponse[];
        };
    };
}
//# sourceMappingURL=unassignChildCompany.types.d.ts.map