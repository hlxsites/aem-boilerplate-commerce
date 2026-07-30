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
import { inputsDefaultValueSetProps } from '../../types';
interface UseGetAttributesFormProps {
    fieldsConfigForApiVersion1: {}[];
    apiVersion2: boolean;
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
}
export declare const useGetAttributesForm: ({ inputsDefaultValueSet, fieldsConfigForApiVersion1, apiVersion2, }: UseGetAttributesFormProps) => {
    fieldsListConfigs: {
        autocomplete?: string | undefined;
        code?: string;
        name?: string;
        id?: string;
        defaultValue?: string | boolean | number;
        entityType?: string;
        className?: string;
        fieldType?: import("../../data/models").FieldEnumList;
        multilineCount: number;
        required?: boolean;
        unique?: boolean;
        label?: string;
        orderNumber: number;
        options?: {
            is_default: boolean;
            label: string;
            value: string;
        }[];
        hidden?: boolean;
        customUpperCode: string;
    }[];
};
export {};
