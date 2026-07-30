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
import { UseChangePasswordProps } from '../../types';
export declare const DEFAULT_ERRORS_STATE: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
export declare const useChangePassword: ({ passwordConfigs, handleSetInLineAlert, handleHideChangePassword, }: UseChangePasswordProps) => {
    hideChangePassword: () => void;
    handleOnBlurPassword: (event: Event) => void;
    handleConfirmPasswordChange: (value: string) => void;
    handleNewPasswordChange: (value: string) => void;
    handleCurrentPasswordChange: (value: string) => void;
    mutationChangePassword: (event: Event) => void;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    passwordErrors: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    };
    submitLoading: boolean;
    isClickSubmit: boolean;
};
