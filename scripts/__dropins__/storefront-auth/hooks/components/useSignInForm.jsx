import { getFormValues } from '@/auth/lib/getFormValues';
import { useCallback, useState, useMemo, useEffect } from 'preact/hooks';
import { getCustomerToken, resendConfirmationEmail } from '@/auth/api';
import { DEFAULT__SIGN_IN_EMAIL_FIELD } from '@/auth/configs/defaultCreateUserConfigs';
import { simplifyTransformAttributesForm } from '@/auth/lib/simplifyTransformAttributesForm';
import { checkIsFunction } from '@/auth/lib/checkIsFunction';
export const useSignInForm = ({ emailConfirmationStatusMessage, translations, initialEmailValue, routeSignUp, routeForgotPassword, routeRedirectOnSignIn, onErrorCallback, setActiveComponent, onSuccessCallback, onSignUpLinkClick, handleSetInLineAlertProps, routeRedirectOnEmailConfirmationClose, }) => {
    const [userEmail, setUserEmail] = useState('');
    const [showEmailConfirmationForm, setShowEmailConfirmationForm] = useState(false);
    const [signInPasswordValue, setSignInPasswordValue] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState({
        userName: '',
        status: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [additionalActionsAlert, setAdditionalActionsAlert] = useState([]);
    const actionsShowNotificationForm = useCallback(async (email) => {
        handleSetInLineAlertProps();
        setShowEmailConfirmationForm(true);
        setPasswordError(false);
        setAdditionalActionsAlert([]);
        await resendConfirmationEmail(email);
    }, [handleSetInLineAlertProps]);
    const handleSetPassword = useCallback((value) => {
        if (value.length) {
            setPasswordError(false);
        }
        else {
            setPasswordError(true);
        }
        setSignInPasswordValue(value);
    }, []);
    useEffect(() => {
        if (emailConfirmationStatusMessage?.text) {
            handleSetInLineAlertProps({
                text: emailConfirmationStatusMessage.text,
                type: emailConfirmationStatusMessage.status
                    ? emailConfirmationStatusMessage.status
                    : undefined,
            });
        }
    }, [emailConfirmationStatusMessage, handleSetInLineAlertProps]);
    const submitLogInUser = useCallback(async (event) => {
        handleSetInLineAlertProps();
        setIsLoading(true);
        const formValues = getFormValues(event.target);
        if (!formValues.password) {
            setPasswordError(true);
            setIsLoading(false);
        }
        if (formValues?.email && formValues?.password) {
            const { email, password } = formValues;
            const loginResponse = await getCustomerToken({
                email,
                password,
                handleSetInLineAlertProps,
                onErrorCallback,
                translations,
            });
            if (loginResponse?.errorMessage?.length) {
                setUserEmail(email);
                /**
                 * TODO: Use error code when available, instead of comparing to response text
                 *
                 * This implementation is a temporary solution.
                 * The backend functionality is planned to be improved to obtain accurate data that will help correctly identify error types and handle them.
                 */
                const isIncludesMessage = loginResponse.errorMessage.includes("This account isn't confirmed. Verify and try again.");
                const errorMessage = isIncludesMessage
                    ? translations.resendEmailInformationText
                    : loginResponse.errorMessage;
                if (isIncludesMessage) {
                    setAdditionalActionsAlert([
                        {
                            label: translations.resendEmailButtonText,
                            onClick: () => {
                                actionsShowNotificationForm(email);
                            },
                        },
                    ]);
                }
                else {
                    setAdditionalActionsAlert([]);
                }
                handleSetInLineAlertProps({
                    text: errorMessage,
                    type: 'error',
                });
                setSignInPasswordValue('');
            }
            if (loginResponse?.userName) {
                event.target.reset();
                if (checkIsFunction(routeRedirectOnSignIn)) {
                    window.location.href = routeRedirectOnSignIn();
                }
                else {
                    onSuccessCallback?.({
                        userName: loginResponse?.userName,
                        status: true,
                    });
                    setIsSuccessful({
                        userName: loginResponse?.userName,
                        status: true,
                    });
                }
            }
            setPasswordError(false);
        }
        setIsLoading(false);
    }, [
        handleSetInLineAlertProps,
        onErrorCallback,
        translations,
        actionsShowNotificationForm,
        routeRedirectOnSignIn,
        onSuccessCallback,
    ]);
    const forgotPasswordCallback = useCallback(() => {
        if (checkIsFunction(setActiveComponent)) {
            setActiveComponent('resetPasswordForm');
            return;
        }
        if (checkIsFunction(routeForgotPassword)) {
            window.location.href = routeForgotPassword();
        }
    }, [routeForgotPassword, setActiveComponent]);
    const onSignUpLinkClickCallback = useCallback(() => {
        if (checkIsFunction(onSignUpLinkClick)) {
            onSignUpLinkClick();
        }
        if (checkIsFunction(setActiveComponent)) {
            setActiveComponent('signUpForm');
            return;
        }
        if (checkIsFunction(routeSignUp)) {
            window.location.href = routeSignUp();
        }
    }, [onSignUpLinkClick, routeSignUp, setActiveComponent]);
    const defaultEnhancedEmailFields = useMemo(() => {
        const fieldsList = simplifyTransformAttributesForm(DEFAULT__SIGN_IN_EMAIL_FIELD);
        if (!initialEmailValue?.length)
            return fieldsList;
        return fieldsList?.map((el) => ({
            ...el,
            defaultValue: initialEmailValue,
        }));
    }, [initialEmailValue]);
    const handledOnPrimaryButtonClick = useCallback(() => {
        handleSetInLineAlertProps();
        if (checkIsFunction(routeRedirectOnEmailConfirmationClose)) {
            window.location.href = routeRedirectOnEmailConfirmationClose();
        }
        else {
            setShowEmailConfirmationForm(false);
        }
    }, [handleSetInLineAlertProps, routeRedirectOnEmailConfirmationClose]);
    return {
        additionalActionsAlert,
        userEmail,
        defaultEnhancedEmailFields,
        passwordError,
        isSuccessful,
        isLoading,
        signInPasswordValue,
        showEmailConfirmationForm,
        setShowEmailConfirmationForm,
        setSignInPasswordValue,
        submitLogInUser,
        forgotPasswordCallback,
        onSignUpLinkClickCallback,
        handledOnPrimaryButtonClick,
        handleSetPassword,
    };
};
