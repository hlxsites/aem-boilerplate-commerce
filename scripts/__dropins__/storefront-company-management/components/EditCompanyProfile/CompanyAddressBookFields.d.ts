import { FunctionComponent } from 'preact';

export type CompanyAddressBookField = 'addressBookEnabled' | 'customShippingAddressEnabled';
interface CompanyAddressBookFieldsProps {
    loading?: boolean;
    value: {
        addressBookEnabled: boolean;
        customShippingAddressEnabled: boolean;
    };
    onChange: (field: CompanyAddressBookField, value: boolean) => void;
}
export declare const CompanyAddressBookFields: FunctionComponent<CompanyAddressBookFieldsProps>;
export default CompanyAddressBookFields;
//# sourceMappingURL=CompanyAddressBookFields.d.ts.map