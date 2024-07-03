import { AddressFormType, AddressFormValues } from '../../data/models/address-form-fields';

export declare function useAddressBackup(addressType: AddressFormType): {
    addressBackup: AddressFormValues | null;
    backup: (address: AddressFormValues) => NodeJS.Timeout;
    removeBackup: () => void;
};
//# sourceMappingURL=useAddressBackup.d.ts.map