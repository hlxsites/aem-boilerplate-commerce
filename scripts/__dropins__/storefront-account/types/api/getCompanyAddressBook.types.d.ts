import { CompanyAddressSchema } from './companyAddress.types';

export interface CompanyAddressesResponse {
    items?: CompanyAddressSchema[];
    page_info?: {
        current_page?: number;
        page_size?: number;
        total_pages?: number;
    };
    total_count?: number;
}
export interface GetCompanyAddressBookResponse {
    data: {
        company?: {
            address_book_enabled?: boolean;
            address_book_custom_shipping_address_enabled?: boolean;
            default_billing_address?: CompanyAddressSchema | null;
            default_shipping_address?: CompanyAddressSchema | null;
            addresses?: CompanyAddressesResponse | null;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCompanyAddressBook.types.d.ts.map