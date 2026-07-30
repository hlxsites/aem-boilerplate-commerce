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
import { useFormProps } from '../../types';
export declare const useForm: ({ fieldsConfig, onSubmit, onChange, setInputChange, formName, }: useFormProps) => {
    isDataValid: boolean;
    formData: Record<string, string | number>;
    errors: Record<string, string>;
    formRef: import("preact").RefObject<HTMLFormElement>;
    handleInputChange: (event: Event, errorsProp?: Record<string, string>) => void;
    onFocus: (event: Event) => void;
    handleBlur: (event: Event, errorsProp?: Record<string, string>) => void;
    handleSubmit: (event: SubmitEvent) => void;
    handleValidationSubmit: (disableShowError?: boolean) => boolean;
};
