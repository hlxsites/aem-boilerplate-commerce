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
import { AdditionalActionsAlertProps, useSignInFormProps } from '../../types';
export declare const useSignInForm: ({ emailConfirmationStatusMessage, translations, initialEmailValue, routeSignUp, routeForgotPassword, routeRedirectOnSignIn, onErrorCallback, setActiveComponent, onSuccessCallback, onSignUpLinkClick, handleSetInLineAlertProps, routeRedirectOnEmailConfirmationClose, apiErrorMessageOverride, }: useSignInFormProps) => {
    additionalActionsAlert: AdditionalActionsAlertProps;
    userEmail: string;
    defaultEnhancedEmailFields: any;
    passwordError: boolean;
    isSuccessful: {
        userName: string;
        status: boolean;
    };
    isLoading: boolean;
    signInPasswordValue: string;
    showEmailConfirmationForm: boolean;
    setShowEmailConfirmationForm: import("preact/hooks").Dispatch<import("preact/hooks").StateUpdater<boolean>>;
    setSignInPasswordValue: import("preact/hooks").Dispatch<import("preact/hooks").StateUpdater<string>>;
    submitLogInUser: (event: SubmitEvent, isValid: boolean) => Promise<void>;
    forgotPasswordCallback: () => void;
    onSignUpLinkClickCallback: () => void;
    handledOnPrimaryButtonClick: () => void;
    handleSetPassword: (value: string) => void;
    onBlurPassword: () => void;
};
