import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { AttributesFormModel, Country } from '../data/models';

interface AddressFormActionsContext {
    handleUpdateAddress?: (event: Event, valid: boolean) => void;
    handleCreateAddress?: (event: Event, valid: boolean) => void;
    addressId: string | number;
}
interface AddressFormInputsContext {
    formActions: {
        handleChange: (event: Event) => void;
    };
}
export interface AddressFormProps {
    addressFormId?: string;
    className?: string;
    addressesFormTitle?: string;
    inputsDefaultValueSet?: AttributesFormModel;
    shippingCheckBoxValue?: boolean;
    billingCheckBoxValue?: boolean;
    showShippingCheckBox?: boolean;
    showBillingCheckBox?: boolean;
    isOpen?: boolean;
    onSubmit?: () => Promise<void>;
    slots?: {
        AddressFormActions?: SlotProps<AddressFormActionsContext>;
        AddressFormInputs?: SlotProps<AddressFormInputsContext>;
    };
    onCloseBtnClick?: () => void;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    handleRenderForm?: () => void;
    onChange?: (values: Record<string, FormDataEntryValue>, inputValue: Record<string, string>, event: Event) => void;
}
export interface AddressFormWrapperProps extends AddressFormProps {
}
export interface useAddressFormProps extends Omit<AddressFormProps, 'className' | 'addressesFormTitle' | 'handleCloseForm'> {
    countryRegionOptions: Record<string, Country[]>;
}
export {};
//# sourceMappingURL=addressForm.types.d.ts.map