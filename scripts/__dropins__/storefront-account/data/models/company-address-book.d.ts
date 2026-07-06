import { CompanyAddressModel } from './company-address';

export interface CompanyAddressesModel {
    items: CompanyAddressModel[];
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
    totalCount: number;
}
export interface CompanyAddressBookModel {
    addressBookEnabled: boolean;
    addressBookCustomShippingAddressEnabled: boolean;
    addresses: CompanyAddressesModel;
}
//# sourceMappingURL=company-address-book.d.ts.map