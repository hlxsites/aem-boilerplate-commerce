import { createCustomer, createCustomerAddress, getCustomerToken, } from '@/auth/api';
import { getFormValues } from '@/auth/lib/getFormValues';
import { mergeFormObjects } from '@/auth/lib/mergeFormObjects';
import { validationUniqueSymbolsPassword } from '@/auth/lib/validationUniqueSymbolsPassword';
import { useCallback, useState } from 'preact/hooks';
import { EventsList, publishEvents } from '@/auth/lib/acdl';
import { checkIsFunction } from '@/auth/lib/checkIsFunction';
export const useSignUpForm = ({ addressesData, translations, isEmailConfirmationRequired, apiVersion2 = true, passwordConfigs, isAutoSignInEnabled, routeRedirectOnSignIn, routeSignIn, onErrorCallback, onSuccessCallback, setActiveComponent, handleSetInLineAlertProps, routeRedirectOnEmailConfirmationClose, }) => {
    const [userEmail, setUserEmail] = useState('');
    const [showEmailConfirmationForm, setShowEmailConfirmationForm] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState({
        userName: '',
        status: false,
    });
    const [signUpPasswordValue, setSignUpPasswordValue] = useState('');
    const [isClickSubmit, setIsClickSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isKeepMeLogged, setIsKeepMeLogged] = useState(true);
    const onKeepMeLoggedChange = useCallback(({ target }) => {
        setIsKeepMeLogged(target.checked);
    }, []);
    const signInButton = useCallback(() => {
        if (checkIsFunction(setActiveComponent)) {
            setActiveComponent('signInForm');
            return;
        }
        if (checkIsFunction(routeSignIn)) {
            window.location.href = routeSignIn();
        }
    }, [setActiveComponent, routeSignIn]);
    const handleSetSignUpPasswordValue = useCallback((value) => {
        setSignUpPasswordValue(value);
    }, []);
    const handleHideEmailConfirmationForm = useCallback(() => {
        handleSetInLineAlertProps();
        setSignUpPasswordValue('');
        if (checkIsFunction(routeRedirectOnEmailConfirmationClose)) {
            window.location.href = routeRedirectOnEmailConfirmationClose();
        }
        else {
            setShowEmailConfirmationForm(false);
            setActiveComponent?.('signInForm');
        }
    }, [
        handleSetInLineAlertProps,
        routeRedirectOnEmailConfirmationClose,
        setActiveComponent,
    ]);
    const onSubmitSignUp = async (event, isValid) => {
        handleSetInLineAlertProps();
        setIsLoading(true);
        if (!isValid) {
            setIsClickSubmit(true);
            setIsLoading(false);
            return;
        }
        const key = apiVersion2 ? 'createCustomerV2' : 'createCustomer';
        const formValues = getFormValues(event.target);
        const { email, password, is_subscribed } = formValues;
        const requiredCharacterClasses = passwordConfigs?.requiredCharacterClasses || 0;
        const requiredPasswordLength = passwordConfigs?.minLength || 1;
        // If password validation fails - stop execution, sign-up not possible
        if (!validationUniqueSymbolsPassword(password, requiredCharacterClasses) ||
            requiredPasswordLength > password?.length) {
            setIsClickSubmit(true);
            setIsLoading(false);
            return;
        }
        const formData = mergeFormObjects({
            ...formValues,
            is_subscribed: Boolean(is_subscribed) || false,
        }, apiVersion2);
        const { data, errors } = await createCustomer(formData, apiVersion2);
        const createCustomerUserName = data?.createCustomer?.customer?.firstname || '';
        if (errors && errors?.length) {
            handleSetInLineAlertProps?.({
                type: 'error',
                text: errors[0].message,
            });
            onErrorCallback?.(errors);
            publishEvents(EventsList.CREATE_ACCOUNT_EVENT, {
                updateProfile: false,
            });
            setUserEmail(email);
        }
        else {
            // Success, new account created
            const customerData = {
                email: '',
                ...data?.[key],
            };
            publishEvents(EventsList.CREATE_ACCOUNT_EVENT, {
                email: customerData?.email,
                updateProfile: true,
            });
            // If email confirmation enabled or auto sign-in disabled - stop execution, auto sign-in not possible
            if (isEmailConfirmationRequired || !isAutoSignInEnabled) {
                // Sign-up succeed, execute onSuccess callback
                onSuccessCallback?.({
                    userName: createCustomerUserName,
                    status: true,
                });
                // If email confirmation enabled - show email confirmation form and stop execution
                if (isEmailConfirmationRequired) {
                    event.target?.reset();
                    setSignUpPasswordValue('');
                    setShowEmailConfirmationForm(true);
                    setUserEmail(email);
                    setIsLoading(false);
                    return;
                }
                // If auto sign-in disabled - render success notification and stop execution
                if (!isAutoSignInEnabled) {
                    setIsLoading(false);
                    setIsSuccessful({
                        userName: createCustomerUserName,
                        status: true,
                    });
                    return;
                }
            }
            // Auto sign-in after sign-up
            const loginResponse = await getCustomerToken({
                email,
                password,
                translations,
                handleSetInLineAlertProps,
                onErrorCallback,
            });
            if (loginResponse?.userName) {
                if (addressesData?.length) {
                    for (const address of addressesData) {
                        try {
                            await createCustomerAddress(address);
                        }
                        catch (error) {
                            console.error(translations.failedCreateCustomerAddress, address, error);
                        }
                    }
                }
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
            else {
                // This is a fallback block, executed when registration succeed but sign-in for some reason failed
                onSuccessCallback?.({
                    userName: createCustomerUserName,
                    status: true,
                });
                setIsSuccessful({
                    userName: createCustomerUserName,
                    status: true,
                });
            }
        }
        setIsLoading(false);
    };
    return {
        isKeepMeLogged,
        userEmail,
        showEmailConfirmationForm,
        isSuccessful,
        isClickSubmit,
        signUpPasswordValue,
        isLoading,
        onSubmitSignUp,
        signInButton,
        handleSetSignUpPasswordValue,
        onKeepMeLoggedChange,
        handleHideEmailConfirmationForm,
    };
};
