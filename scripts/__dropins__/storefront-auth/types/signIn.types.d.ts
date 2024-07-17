import { VNode } from 'preact';
import { activeComponentType } from './authCombine.types';
import { inLineAlertInterface } from './notification.types';

export interface SignInProps {
    formSize?: 'default' | 'small';
    renderSignUpLink?: boolean;
    initialEmailValue?: string;
    enableEmailConfirmation?: boolean;
    hideCloseBtnOnEmailConfirmation?: boolean;
    routeRedirectOnEmailConfirmationClose?: () => string;
    routeForgotPassword?: () => string;
    routeSignUp?: () => string;
    routeRedirectOnSignIn?: () => string;
    successNotificationForm?: (userName: string) => VNode<any>;
    onSuccessCallback?: (value?: {
        userName: string;
        status: boolean;
    }) => Promise<void>;
    onErrorCallback?: (error?: unknown) => void;
    onSignUpLinkClick?: () => void;
}
export interface SignInFormProps extends SignInProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
}
export interface useSignInFormProps extends Omit<SignInFormProps, 'formSize' | 'successNotificationForm'> {
    handleSetInLineAlertProps: (value?: inLineAlertInterface) => void;
    emailConfirmationStatusMessage?: {
        text: string;
        status: '' | 'success' | 'error';
    };
    translations: any;
}
//# sourceMappingURL=signIn.types.d.ts.map