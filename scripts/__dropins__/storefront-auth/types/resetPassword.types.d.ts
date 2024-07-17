import { activeComponentType } from './authCombine.types';
import { inLineAlertInterface } from './notification.types';

export interface ResetPasswordProps {
    formSize?: 'default' | 'small';
    routeSignIn?: () => string;
    onErrorCallback?: (value?: unknown) => void;
}
export interface ResetPasswordFormProps extends ResetPasswordProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
}
export interface UseResetPasswordFormProps extends Omit<ResetPasswordFormProps, 'formSize'> {
    handleSetInLineAlertProps?: (value?: inLineAlertInterface) => void;
}
//# sourceMappingURL=resetPassword.types.d.ts.map