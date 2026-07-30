/********************************************************************
 * ADOBE CONFIDENTIAL
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
import { FieldEnumList } from '../../types';
export interface AttributesFormItemsProps {
    code?: string;
    name?: string;
    id?: string;
    required?: boolean;
    label?: string;
    options?: {
        is_default: boolean;
        label: string;
        value: string;
    }[];
    entityType?: string;
    className?: string;
    defaultValue?: string | boolean | number;
    fieldType?: FieldEnumList;
    multilineCount?: number;
    isUnique?: boolean;
    orderNumber: number;
    isHidden?: boolean;
    customUpperCode: string;
    validateRules: Record<string, string>[];
}
export interface AttributesFormModel extends AttributesFormItemsProps {
}
