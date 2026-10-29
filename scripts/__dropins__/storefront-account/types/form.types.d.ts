/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { SlotProps } from '@dropins/tools/src/lib';
import { AttributesFormModel, Country, FieldEnumList, RegionTransform } from '../data/models';
export interface FieldsProps extends Omit<AttributesFormModel, 'options' | 'className'> {
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
export type FormRef = {
    handleValidationSubmit: () => boolean;
    isDataValid: boolean;
};
export interface FormProps {
    showSaveCheckBox?: boolean;
    saveCheckBoxAddress?: boolean;
    handleSaveCheckBoxAddress?: (event: Event) => void;
    regionOptions?: RegionTransform[] | [];
    fieldIdPrefix?: string;
    slots?: {
        AddressFormInputs?: SlotProps<AddressFormInputsContext>;
    };
    forwardFormRef?: HTMLInputElement | any;
    fieldsConfig?: FieldsProps[] | [];
    name?: string;
    className?: string;
    children?: any;
    loading?: boolean;
    showFormLoader?: boolean;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    onChange?: (values: Record<string, FormDataEntryValue>, inputValue: Record<string, string>, event: Event) => void;
    setInputChange?: (values: Record<string, string | number | boolean>) => void;
}
export interface useFormProps extends Omit<FormProps, 'children' | 'className' | 'name' | 'forwardFormRef' | 'showSaveCheckBox' | 'saveCheckBoxAddress' | 'handleSaveCheckBoxAddress'> {
    formName: string;
}
export interface FormInputsProps {
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string | number | boolean>;
    fields?: any;
    loading?: boolean;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    fieldIdPrefix?: string;
    slots?: {
        [key: string]: SlotProps;
    };
}
export {};
