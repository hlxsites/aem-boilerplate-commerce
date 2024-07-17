import { VNode } from 'preact';
import { inLineAlertInterface } from './notification.types';

export interface UpdatePasswordProps {
    signInOnSuccess?: boolean;
    formSize?: 'default' | 'small';
    routeRedirectOnPasswordUpdate?: () => string;
    routeRedirectOnSignIn?: () => string;
    routeWrongUrlRedirect?: () => string;
    onErrorCallback?: (value: unknown) => void;
    onSuccessCallback?: (value: string) => void;
    successNotificationForm?: (userName: string) => VNode<any>;
}
export interface UpdatePasswordFormProps extends UpdatePasswordProps {
}
export interface UseUpdatePasswordFormProps extends Omit<UpdatePasswordFormProps, 'formSize' | 'successNotificationForm'> {
    isEmailConfirmationRequired?: boolean;
    passwordConfigs?: {
        minLength: number;
        requiredCharacterClasses: number;
    } | null;
    handleSetInLineAlertProps: (value?: inLineAlertInterface) => void;
}
//# sourceMappingURL=updatePassword.types.d.ts.map