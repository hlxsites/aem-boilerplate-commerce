import { AddressFormField } from '../data/models';
import { ComponentChildren } from 'preact';

type Context = {
    fields?: AddressFormField[];
};
type AddressFormFieldsProps = {
    children: ComponentChildren;
};
declare function AddressFormFieldsProvider({ children }: AddressFormFieldsProps): import("preact").JSX.Element;
declare function useAddressFormFields(): Context;
export { AddressFormFieldsProvider, useAddressFormFields };
//# sourceMappingURL=address-form-fields.d.ts.map