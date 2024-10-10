import { requestPasswordResetEmail } from '@/auth/api';
import { getFormValues } from '@/auth/lib/getFormValues';
import { useCallback, useState } from 'preact/hooks';
import { useText } from '@adobe/elsie/i18n';
import { checkIsFunction } from '@/auth/lib/checkIsFunction';
export const useResetPasswordForm = ({ routeSignIn, onErrorCallback, setActiveComponent, handleSetInLineAlertProps, }) => {
    const translations = useText({
        successPasswordResetEmailNotification: 'Auth.Notification.successPasswordResetEmailNotification',
    });
    const [isLoading, setIsLoading] = useState(false);
    const submitResetPassword = useCallback(async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formValues = getFormValues(event.target);
        if (formValues && formValues.email) {
            const requestPasswordResetEmailResponse = await requestPasswordResetEmail(formValues.email);
            if (requestPasswordResetEmailResponse.success) {
                handleSetInLineAlertProps?.({
                    type: 'success',
                    text: translations.successPasswordResetEmailNotification.replace('{email}', formValues.email),
                });
            }
            else {
                onErrorCallback?.(requestPasswordResetEmailResponse);
                handleSetInLineAlertProps?.({
                    type: 'error',
                    text: requestPasswordResetEmailResponse.message,
                });
            }
        }
        setIsLoading(false);
    }, [
        handleSetInLineAlertProps,
        onErrorCallback,
        translations.successPasswordResetEmailNotification,
    ]);
    const redirectToSignInPage = useCallback(() => {
        if (checkIsFunction(setActiveComponent)) {
            setActiveComponent('signInForm');
            return;
        }
        if (checkIsFunction(routeSignIn)) {
            window.location.href = routeSignIn();
        }
    }, [setActiveComponent, routeSignIn]);
    return {
        isLoading,
        submitResetPassword,
        redirectToSignInPage,
    };
};
