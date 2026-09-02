/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
import { activeComponentType } from './authCombine.types';
import { InLineAlertInterface } from './notification.types';
import { AddressFormProps } from './api/createCustomerAddress.types';
import { SlotProps } from '../../node_modules/@dropins/tools/src/lib';
export interface inputsDefaultValueSetProps {
    code: string;
    defaultValue: string;
}
type DefaultSlotContext = {
    isSuccessful: {
        userName: string;
        status: boolean;
    };
};
export interface SignUpProps {
    requireRetypePassword?: boolean;
    addressesData?: AddressFormProps[];
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
    fieldsConfigForApiVersion1?: any;
    apiVersion2?: boolean;
    isAutoSignInEnabled?: boolean;
    formSize?: 'default' | 'small';
    hideCloseBtnOnEmailConfirmation?: boolean;
    routeRedirectOnEmailConfirmationClose?: () => string;
    slots?: {
        Title?: SlotProps<DefaultSlotContext>;
        Form?: SlotProps<DefaultSlotContext>;
        Buttons?: SlotProps<DefaultSlotContext>;
        SuccessNotification?: SlotProps<DefaultSlotContext>;
        PrivacyPolicyConsent?: SlotProps;
        RemoteShoppingAssistanceConsent?: SlotProps;
    };
    routeSignIn?: () => string;
    routeRedirectOnSignIn?: () => string;
    onErrorCallback?: (value?: unknown) => void;
    onSuccessCallback?: (value?: {
        userName: string;
        userEmail: string;
        status: boolean;
    }) => Promise<void>;
}
export interface SignUpFormProps extends SignUpProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
    slot?: {
        PrivacyPolicyConsent?: SlotProps;
        RemoteShoppingAssistanceConsent?: SlotProps;
    };
}
export interface UseSingUpFormProps extends Omit<SignUpFormProps, 'formSize' | 'inputsDefaultValueSet' | 'slots'> {
    passwordConfigs?: {
        minLength: number;
        requiredCharacterClasses: number;
    } | null;
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
    isEmailConfirmationRequired?: boolean;
    translations: Record<string, string>;
}
export {};
