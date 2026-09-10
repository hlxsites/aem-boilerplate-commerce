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
import { UseSingUpFormProps } from '../../types';
export declare const useSignUpForm: ({ requireRetypePassword, addressesData, translations, isEmailConfirmationRequired, apiVersion2, passwordConfigs, isAutoSignInEnabled, routeRedirectOnSignIn, routeSignIn, onErrorCallback, onSuccessCallback, setActiveComponent, handleSetInLineAlertProps, routeRedirectOnEmailConfirmationClose, }: UseSingUpFormProps) => {
    showPasswordErrorMessage: boolean;
    confirmPassword: string;
    confirmPasswordMessage: string;
    isKeepMeLogged: boolean;
    userEmail: string;
    showEmailConfirmationForm: boolean;
    isSuccessful: {
        userName: string;
        status: boolean;
    };
    isClickSubmit: boolean;
    signUpPasswordValue: string;
    isLoading: boolean;
    onSubmitSignUp: (event: SubmitEvent, isValid: boolean) => Promise<void>;
    signInButton: () => void;
    handleSetSignUpPasswordValue: (value: string) => void;
    onKeepMeLoggedChange: ({ target }: any) => void;
    handleHideEmailConfirmationForm: () => void;
    handleConfirmPasswordChange: (value: string) => void;
    onBlurPassword: (event: Event) => void;
    onBlurConfirmPassword: (event: Event) => void;
};
