import { CompanyAddressModel } from '../../data/models/company-address';
import { CompanyAddressSchema } from './companyAddress.types';

export interface SetDefaultCompanyAddressResponse {
    data: {
        setDefaultCompanyAddress: CompanyAddressSchema | null;
    };
    errors?: {
        message: string;
    }[];
}
export type SetDefaultCompanyAddressResult = CompanyAddressModel;
//# sourceMappingURL=setDefaultCompanyAddress.types.d.ts.map