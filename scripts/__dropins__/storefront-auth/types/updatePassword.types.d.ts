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
import { InLineAlertInterface } from './notification.types';
type DefaultSlotContext = {
    isSuccessful: {
        userName: string;
        status: boolean;
    };
};
export interface UpdatePasswordProps {
    signInOnSuccess?: boolean;
    formSize?: 'default' | 'small';
    routeRedirectOnPasswordUpdate?: () => string;
    routeRedirectOnSignIn?: () => string;
    routeSignInPage?: () => string;
    routeWrongUrlRedirect?: () => string;
    onErrorCallback?: (value: unknown) => void;
    onSuccessCallback?: (value?: string) => void;
    slots?: {
        Title?: SlotProps<DefaultSlotContext>;
        Form?: SlotProps<DefaultSlotContext>;
        Buttons?: SlotProps<DefaultSlotContext>;
        SuccessNotification?: SlotProps<DefaultSlotContext>;
    };
}
export interface UpdatePasswordFormProps extends UpdatePasswordProps {
}
export interface UseUpdatePasswordFormProps extends Omit<UpdatePasswordFormProps, 'formSize' | 'slots'> {
    isEmailConfirmationRequired?: boolean;
    passwordConfigs?: {
        minLength: number;
        requiredCharacterClasses: number;
    } | null;
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
}
export {};
