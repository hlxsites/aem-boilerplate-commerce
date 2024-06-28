import { Container } from '@dropins/tools/types/elsie/src/lib';
import { CheckboxProps } from '@dropins/tools/types/elsie/src/components';
import { ShippingAddress, BillingAddress } from '../../data/models/address';
import { AddressFormField } from '../../data/models/address-form-fields';

export declare function compareAddresses(addressFormFields: AddressFormField[], first: BillingAddress | undefined, second: ShippingAddress | undefined): boolean;
export interface BillToShippingAddressProps extends Omit<CheckboxProps, 'name' | 'label'> {
}
export declare const BillToShippingAddress: Container<BillToShippingAddressProps>;
//# sourceMappingURL=BillToShippingAddress.d.ts.map