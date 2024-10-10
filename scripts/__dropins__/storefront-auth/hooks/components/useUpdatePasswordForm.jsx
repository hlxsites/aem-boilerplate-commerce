import { resetPassword, getCustomerToken } from '@/auth/api';
import { getFormValues } from '@/auth/lib/getFormValues';
import { getUrlParam } from '@/auth/lib/getUrlParam';
import { validationUniqueSymbolsPassword } from '@/auth/lib/validationUniqueSymbolsPassword';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useText } from '@adobe/elsie/i18n';
import { checkIsFunction } from '@/auth/lib/checkIsFunction';
export const useUpdatePasswordForm = ({ isEmailConfirmationRequired, signInOnSuccess, passwordConfigs, routeRedirectOnSignIn, routeWrongUrlRedirect, onErrorCallback, onSuccessCallback, handleSetInLineAlertProps, routeRedirectOnPasswordUpdate, routeSignInPage, }) => {
    const translations = useText({
        errorNotification: 'Auth.Notification.errorNotification',
        updatePasswordMessage: 'Auth.Notification.updatePasswordMessage',
        updatePasswordActionMessage: 'Auth.Notification.updatePasswordActionMessage',
        customerTokenErrorMessage: 'Auth.Api.customerTokenErrorMessage',
    });
    const [isSuccessful, setIsSuccessful] = useState({
        userName: '',
        status: false,
    });
    const [updatePasswordValue, setUpdatePasswordValue] = useState('');
    const [isClickSubmit, setIsClickSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [additionalActionsAlert, setAdditionalActionsAlert] = useState([]);
    useEffect(() => {
        if (isClickSubmit && !additionalActionsAlert.length) {
            if (updatePasswordValue.length) {
                setPasswordError(false);
            }
            else {
                setPasswordError(true);
            }
        }
    }, [isClickSubmit, updatePasswordValue, additionalActionsAlert]);
    useEffect(() => {
        const { search } = window.location;
        if (!search.includes('token=') &&
            !search.includes('email=') &&
            checkIsFunction(routeWrongUrlRedirect)) {
            window.location.href = routeWrongUrlRedirect();
        }
        const url = decodeURIComponent(search);
        const tokenParam = getUrlParam(url, 'token');
        const emailParam = getUrlParam(url, 'email');
        setEmail(emailParam);
        setToken(tokenParam);
    }, [routeWrongUrlRedirect]);
    const submitUpdatePassword = useCallback(async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setAdditionalActionsAlert([]);
        const formValues = getFormValues(event.target);
        const validationData = formValues?.password && email && token;
        if (!formValues?.password) {
            setPasswordError(true);
            setIsLoading(false);
        }
        const requiredCharacterClasses = passwordConfigs?.requiredCharacterClasses ?? 0;
        const minLength = passwordConfigs?.minLength ?? 0;
        if (!validationUniqueSymbolsPassword(formValues?.password, requiredCharacterClasses) ||
            formValues.password.length < +minLength) {
            setIsClickSubmit(true);
            setIsLoading(false);
            return;
        }
        if (!validationData) {
            handleSetInLineAlertProps({
                type: 'error',
                text: translations.errorNotification,
            });
            setIsLoading(false);
            return;
        }
        const { message, success } = await resetPassword(email, token, formValues.password);
        if (success) {
            if (isEmailConfirmationRequired ||
                (!isEmailConfirmationRequired && !signInOnSuccess)) {
                onSuccessCallback?.();
                if (checkIsFunction(routeRedirectOnPasswordUpdate)) {
                    window.location.href = routeRedirectOnPasswordUpdate();
                }
                setIsClickSubmit(true);
                setIsLoading(false);
                setPasswordError(false);
                setUpdatePasswordValue('');
                setAdditionalActionsAlert([
                    {
                        label: translations.updatePasswordActionMessage,
                        onClick: () => {
                            window.location.href = routeSignInPage?.();
                        },
                    },
                ]);
                handleSetInLineAlertProps({
                    type: 'success',
                    text: translations.updatePasswordMessage,
                });
                return;
            }
            const loginResponse = await getCustomerToken({
                email,
                password: formValues.password,
                handleSetInLineAlertProps,
                onErrorCallback,
                translations,
            });
            if (loginResponse?.userName) {
                onSuccessCallback?.(loginResponse?.userName);
                if (checkIsFunction(routeRedirectOnSignIn)) {
                    window.location.href = routeRedirectOnSignIn();
                }
                else {
                    setIsSuccessful({
                        userName: loginResponse?.userName,
                        status: true,
                    });
                }
            }
        }
        else {
            handleSetInLineAlertProps({ type: 'error', text: message });
            onErrorCallback?.({ message, success });
        }
        setIsLoading(false);
    }, [
        email,
        token,
        passwordConfigs?.requiredCharacterClasses,
        passwordConfigs?.minLength,
        translations,
        isEmailConfirmationRequired,
        signInOnSuccess,
        routeSignInPage,
        onErrorCallback,
        onSuccessCallback,
        routeRedirectOnSignIn,
        handleSetInLineAlertProps,
        routeRedirectOnPasswordUpdate,
    ]);
    const handleSetUpdatePasswordValue = useCallback((value) => {
        setUpdatePasswordValue(value);
    }, []);
    return {
        additionalActionsAlert,
        passwordError,
        isSuccessful,
        updatePasswordValue,
        isClickSubmit,
        isLoading,
        submitUpdatePassword,
        handleSetUpdatePasswordValue,
    };
};
