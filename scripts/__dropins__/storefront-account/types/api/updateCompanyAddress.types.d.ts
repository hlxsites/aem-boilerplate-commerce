import { CompanyAddressModel } from '../../data/models/company-address';
import { CompanyAddressSchema } from './companyAddress.types';

export interface UpdateCompanyAddressResponse {
    data: {
        updateCompanyAddress: CompanyAddressSchema | null;
    };
    errors?: {
        message: string;
    }[];
}
export type UpdateCompanyAddressResult = CompanyAddressModel;
//# sourceMappingURL=updateCompanyAddress.types.d.ts.map