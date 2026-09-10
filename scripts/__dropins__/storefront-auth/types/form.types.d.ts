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
import { SlotProps } from '../../node_modules/@dropins/tools/src/lib';
import { AttributesFormItemsProps, FieldEnumList } from '../data/models';
import { ComponentChildren } from 'preact';
export interface FormProps {
    slots?: {
        [key: string]: SlotProps;
    };
    fieldsConfig?: any;
    name?: string;
    className?: string;
    /** Required. Form wraps all content in a Slot; when the host does not provide a Form slot, default content is shown. */
    formSlot: {
        name: string;
        slot?: SlotProps;
        context?: Record<string, unknown>;
        dataTestId?: string;
    };
    children?: any;
    loading: boolean;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
}
export interface useFormProps extends Omit<FormProps, 'children' | 'className' | 'name' | 'loading' | 'formSlot'> {
}
export interface FormInputsProps {
    slots?: {
        [key: string]: SlotProps;
    };
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string | number | boolean>;
    fields?: any;
    loading?: boolean;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
    onFocus?: (event: Event) => void;
}
export interface FieldsProps extends Omit<AttributesFormItemsProps, 'options'> {
    className: string;
    fieldType: FieldEnumList;
    id: string;
    options: {
        value: string;
        text: string;
    }[];
}
export type FormElementProps = {
    item: any;
    valueMessage: string;
    errorConfig: string;
    className: string;
    itemClassName: string;
    loading?: boolean;
    onBlur?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
};
export type FieldElementProps = {
    item: any;
    errorConfig: string;
    className: string;
    itemClassName: string;
    loading?: boolean;
    children: ComponentChildren;
};
export type FormSlotProps = {
    slots?: {
        [key: string]: SlotProps;
    };
    item: any;
    handleOnChange?: (e: any) => void;
    handleOnBlur?: (e: any) => void;
    handleOnFocus?: (e: any) => void;
    errorConfig: string;
    errors: Record<string, string>;
};
