import { SlotProps } from '@dropins/tools/types/elsie/src/src/lib';
import { AttributesFormModel, Country, FieldEnumList } from '../data/models';

export interface FieldsProps extends Omit<AttributesFormModel, 'options'> {
    className?: string;
    fieldType: FieldEnumList;
    id: string;
    options: Country[];
}
interface AddressFormInputsContext {
    formActions: {
        handleChange: (event: Event) => void;
    };
}
export interface FormProps {
    fieldsConfig: FieldsProps[] | [];
    name?: string;
    className?: string;
    children?: any;
    loading?: boolean;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    handleSetCountryCode: (value: string) => void;
    slots?: {
        AddressFormInputs?: SlotProps<AddressFormInputsContext>;
    };
    onChange?: (values: Record<string, FormDataEntryValue>, inputValue: Record<string, string>, event: Event) => void;
}
export interface useFormProps extends Omit<FormProps, 'children' | 'className' | 'name'> {
}
export interface FormInputsProps {
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string | number | boolean>;
    fields?: any;
    loading?: boolean;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
}
export {};
//# sourceMappingURL=form.types.d.ts.map