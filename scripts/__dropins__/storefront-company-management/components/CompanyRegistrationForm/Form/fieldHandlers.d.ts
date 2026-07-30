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
import React from 'react';
import { CompanyFormData } from '../../../data/models/company';
import { FieldsProps } from '../../../types/form.types';
export type FieldChangeHandler = (key: string, value: string | string[] | number | boolean) => void;
export type ValidationHandler = (fieldCode: string, value: string | string[] | number | boolean) => void;
export interface FieldHandlersConfig {
    setFormData: React.Dispatch<React.SetStateAction<CompanyFormData>>;
    hasRegions: boolean;
    regionOptions: any[];
    fieldsConfig: FieldsProps[];
    formTranslations: any;
    setFieldErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}
export declare const createFieldHandlers: (config: FieldHandlersConfig) => {
    handleInputChange: (event: Event) => void;
    handleInputChangeFromValues: (values: Record<string, string | string[] | number | boolean>) => void;
    handleStreetChange: (value: string | string[]) => void;
    handleStreetLine2Change: (value: string) => void;
    handleRegionTextChange: (value: string) => void;
    handleRegionCodeChange: (value: string) => void;
    handleRegionDropdownChange: (value: string | number) => void;
    handleCountryChange: (value: string) => void;
    handleGenericFieldChange: (key: string, value: string | string[] | number | boolean) => void;
};
