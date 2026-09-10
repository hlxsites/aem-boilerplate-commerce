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
import { AdditionalActionsAlertProps, UseUpdatePasswordFormProps } from '../../types';
export declare const useUpdatePasswordForm: ({ isEmailConfirmationRequired, signInOnSuccess, passwordConfigs, routeRedirectOnSignIn, routeWrongUrlRedirect, onErrorCallback, onSuccessCallback, handleSetInLineAlertProps, routeRedirectOnPasswordUpdate, routeSignInPage, }: UseUpdatePasswordFormProps) => {
    additionalActionsAlert: AdditionalActionsAlertProps;
    passwordError: boolean;
    isSuccessful: {
        userName: string;
        status: boolean;
    };
    updatePasswordValue: string;
    isClickSubmit: boolean;
    isLoading: boolean;
    submitUpdatePassword: (event: Event) => Promise<void>;
    handleSetUpdatePasswordValue: (value: string) => void;
    setIsClickSubmit: import("preact/hooks").Dispatch<import("preact/hooks").StateUpdater<boolean>>;
};
