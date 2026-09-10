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
import { SlotProps } from '../../node_modules/@dropins/tools/src/lib';
import { activeComponentType } from './authCombine.types';
import { InLineAlertInterface } from './notification.types';
type DefaultSlotContext = {
    isSuccessful: {
        userName: string;
        status: boolean;
    };
};
export interface SignInProps {
    slots?: {
        Form?: SlotProps<DefaultSlotContext>;
        Title?: SlotProps<DefaultSlotContext>;
        SuccessNotification?: SlotProps<DefaultSlotContext>;
        Buttons?: SlotProps<DefaultSlotContext>;
    };
    labels?: Record<string, string>;
    formSize?: 'default' | 'small';
    renderSignUpLink?: boolean;
    initialEmailValue?: string;
    enableEmailConfirmation?: boolean;
    hideCloseBtnOnEmailConfirmation?: boolean;
    routeRedirectOnEmailConfirmationClose?: () => string;
    routeForgotPassword?: () => string;
    routeSignUp?: () => string;
    routeRedirectOnSignIn?: () => string;
    onSuccessCallback?: (value?: {
        userName: string;
        status: boolean;
    }) => Promise<void>;
    onErrorCallback?: (error?: unknown) => void;
    onSignUpLinkClick?: () => void;
    apiErrorMessageOverride?: string;
}
export interface SignInFormProps extends SignInProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
}
export interface useSignInFormProps extends Omit<SignInFormProps, 'formSize' | 'slots'> {
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
    emailConfirmationStatusMessage?: {
        text: string;
        status: '' | 'success' | 'error';
    };
    translations: Record<string, string>;
}
export {};
