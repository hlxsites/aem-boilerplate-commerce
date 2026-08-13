/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { TranslationList } from './fieldValidationRules';
import { FieldsProps } from '../../../types/form.types';
export type ValidationResult = {
    isValid: boolean;
    fieldErrors: Record<string, string>;
};
export type FormValidationConfig = {
    fieldsConfig: FieldsProps[];
    translations: TranslationList;
};
export declare const validateField: (fieldCode: string, value: string | string[] | number | boolean, config: FormValidationConfig) => string;
export declare const validateAllFields: (formData: Record<string, string | string[] | number | boolean>, config: FormValidationConfig) => ValidationResult;
export declare const updateFieldError: (currentErrors: Record<string, string>, fieldCode: string, errorMessage: string) => Record<string, string>;
export declare const validateSingleField: (fieldCode: string, value: string | string[] | number | boolean, fieldsConfig: FieldsProps[], translations: any) => string;
export declare const validateFormData: (formData: Record<string, string | string[] | number | boolean>, fieldsConfig: FieldsProps[], translations: any) => ValidationResult;
