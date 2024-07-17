import { VNode } from 'preact';
import { activeComponentType } from './authCombine.types';
import { inLineAlertInterface } from './notification.types';
import { AddressFormProps } from './api/createCustomerAddress.types';

export interface inputsDefaultValueSetProps {
    code: string;
    defaultValue: string;
}
export interface SignUpProps {
    addressesData?: AddressFormProps[];
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
    fieldsConfigForApiVersion1?: any;
    apiVersion2?: boolean;
    displayTermsOfUseCheckbox?: boolean;
    displayNewsletterCheckbox?: boolean;
    formSize?: 'default' | 'small';
    hideCloseBtnOnEmailConfirmation?: boolean;
    routeRedirectOnEmailConfirmationClose?: () => string;
    successNotificationForm?: (userName: string) => VNode<any>;
    routeSignIn?: () => string;
    routeRedirectOnSignIn?: () => string;
    onErrorCallback?: (value?: unknown) => void;
    onSuccessCallback?: (value?: {
        userName: string;
        status: boolean;
    }) => Promise<void>;
}
export interface SignUpFormProps extends SignUpProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
}
export interface UseSingUpFormProps extends Omit<SignUpFormProps, 'formSize' | 'displayTermsOfUseCheckbox' | 'displayNewsletterCheckbox' | 'inputsDefaultValueSet' | 'successNotificationForm'> {
    passwordConfigs?: {
        minLength: number;
        requiredCharacterClasses: number;
    } | null;
    handleSetInLineAlertProps: (value?: inLineAlertInterface) => void;
    isEmailConfirmationRequired?: boolean;
    translations: Record<string, string>;
}
//# sourceMappingURL=signUp.types.d.ts.map