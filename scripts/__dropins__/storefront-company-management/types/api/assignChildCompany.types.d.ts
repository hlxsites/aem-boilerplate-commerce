import { CompanyBasicInfoResponse } from './companyBasicInfo.types';

/**
 * Input for assigning a child company to a parent company
 */
export interface AssignChildCompanyInput {
    child_company_id: string;
    parent_company_id: string;
}
/**
 * Raw GraphQL response for assignChildCompany mutation
 */
export interface AssignChildCompanyResponse {
    assignChildCompany: {
        company_hierarchy: {
            parent: CompanyBasicInfoResponse | null;
            children: CompanyBasicInfoResponse[];
        };
    };
}
//# sourceMappingURL=assignChildCompany.types.d.ts.map