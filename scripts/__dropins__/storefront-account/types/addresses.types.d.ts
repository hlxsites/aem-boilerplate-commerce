import { HTMLAttributes } from 'preact/compat';
import { AttributesFormModel, CustomerAddressesModel } from '../data/models';
import { FieldsProps } from './form.types';

export interface DefaultCheckBox extends Omit<FieldsProps, 'options'> {
}
export interface AddressesProps {
    className?: string;
    withHeader?: boolean;
    minifiedView: boolean;
    withActionsInMinifiedView?: boolean;
    withActionsInFullSizeView?: boolean;
    inputsDefaultValueSet?: AttributesFormModel;
    addressesFormTitle?: string;
    showShippingCheckBox?: boolean;
    showBillingCheckBox?: boolean;
    shippingCheckBoxValue?: boolean;
    billingCheckBoxValue?: boolean;
    routeAddressesPage?: () => string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}
export interface AddressesWrapperProps extends AddressesProps {
}
export interface useAddressesProps extends Omit<AddressesProps, 'className' | 'inputsDefaultValueSet' | 'addressesFormTitle' | 'shippingCheckBoxValue' | 'billingCheckBoxValue'> {
}
export interface KeysSortOrderProps {
    name?: string;
    orderNumber?: number;
    label?: string | null;
}
export interface AddressCardProps {
    minifiedView: boolean;
    addressData: CustomerAddressesModel | undefined;
    keysSortOrder?: KeysSortOrderProps[];
    loading?: boolean;
    setAddressId?: (id: string) => void;
    handleRenderModal?: () => void | undefined;
    handleRenderForm?: () => void | undefined;
}
export interface AddressActionsProps extends HTMLAttributes<HTMLButtonElement> {
    minifiedView: boolean;
    addNewAddress: boolean;
    viewAllAddressesText?: string;
    routeAddressesPage: () => void;
}
export interface AddressModalProps {
    minifiedView: boolean;
    addressData?: CustomerAddressesModel;
    keysSortOrder?: KeysSortOrderProps[];
    open: boolean;
    submitLoading: boolean;
    onRemoveAddress: () => void;
    closeModal: () => void;
}
//# sourceMappingURL=addresses.types.d.ts.map