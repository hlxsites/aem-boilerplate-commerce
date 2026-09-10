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
import { UseCustomerInformationProps } from '../../types';
export declare const useCustomerInformation: ({ handleSetInLineAlert, }: UseCustomerInformationProps) => {
    createdAt: string;
    errorPasswordEmpty: boolean;
    passwordValue: string;
    showPasswordOnEmailChange: boolean;
    orderedCustomerData: {
        name: string;
        orderNumber: number | undefined;
        value: any;
        label: string | null | undefined;
    }[];
    loading: boolean;
    normalizeFieldsConfig: {
        defaultValue: any;
        code: string;
        name: string;
        id: string;
        required: boolean;
        label: string;
        options: {
            isDefault: boolean;
            text: string;
            value: string;
        }[];
        entityType: string;
        className: string;
        fieldType: import("../../data/models").FieldEnumList;
        multilineCount: number;
        isUnique: boolean;
        orderNumber: number;
        isHidden: boolean;
        customUpperCode: string;
        validateRules: Record<string, string | number | boolean>[];
    }[];
    submitLoading: boolean;
    showEditForm: boolean;
    showChangePassword: boolean;
    handleShowChangePassword: () => void;
    handleHideChangePassword: (clearStates?: () => void) => void;
    handleShowEditForm: () => void;
    handleHideEditForm: (clearStates?: () => void) => void;
    handleUpdateCustomerInformation: (event: Event, valid: boolean) => Promise<void>;
    handleInputChange: (value: Record<string, string | number | boolean>) => void;
    handleSetPassword: (value: string) => void;
    handleOnBlurPassword: (event: Event) => void;
    renderAlertMessage: (type: "success" | "error", message?: string) => void;
};
