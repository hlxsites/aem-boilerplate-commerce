import { CompanyAddressModel } from '../../data/models/company-address';
import { CompanyAddressSchema } from './companyAddress.types';

export interface CreateCompanyAddressResponse {
    data: {
        createCompanyAddress: CompanyAddressSchema | null;
    };
    errors?: {
        message: string;
    }[];
}
export type CreateCompanyAddressResult = CompanyAddressModel;
//# sourceMappingURL=createCompanyAddress.types.d.ts.map