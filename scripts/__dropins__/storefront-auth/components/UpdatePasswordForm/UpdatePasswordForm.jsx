import { classes, Slot } from '@adobe/elsie/lib';
import { useGetStoreConfigs } from '@/auth/hooks/api/useGetStoreConfigs';
import { usePasswordValidationMessage } from '@/auth/hooks/components/usePasswordValidationMessage';
import { useUpdatePasswordForm } from '@/auth/hooks/components/useUpdatePasswordForm';
import { useText } from '@adobe/elsie/i18n';
import { Form, Button } from '@/auth/components';
import { useInLineAlert } from '@/auth/hooks/useInLineAlert';
import { Header, InLineAlert, InputPassword } from '@adobe/elsie/components';
import '@/auth/components/UpdatePasswordForm/UpdatePasswordForm.css';
export const UpdatePasswordForm = ({ signInOnSuccess = true, formSize = 'default', routeRedirectOnSignIn, routeWrongUrlRedirect, routeSignInPage, slots, onErrorCallback, onSuccessCallback, routeRedirectOnPasswordUpdate, }) => {
    const translations = useText({
        title: 'Auth.UpdatePasswordForm.title',
        buttonPrimary: 'Auth.UpdatePasswordForm.buttonPrimary',
        placeholder: 'Auth.InputPassword.placeholder',
        floatingLabel: 'Auth.InputPassword.floatingLabel',
        requiredFieldError: 'Auth.FormText.requiredFieldError',
    });
    const { passwordConfigs, isEmailConfirmationRequired } = useGetStoreConfigs();
    const { inLineAlertProps, handleSetInLineAlertProps } = useInLineAlert();
    const { additionalActionsAlert, passwordError, isSuccessful, updatePasswordValue, isClickSubmit, isLoading, submitUpdatePassword, handleSetUpdatePasswordValue, } = useUpdatePasswordForm({
        isEmailConfirmationRequired,
        signInOnSuccess,
        passwordConfigs,
        routeRedirectOnSignIn,
        routeWrongUrlRedirect,
        onErrorCallback,
        onSuccessCallback,
        handleSetInLineAlertProps,
        routeRedirectOnPasswordUpdate,
        routeSignInPage,
    });
    const { isValidUniqueSymbols, defaultLengthMessage } = usePasswordValidationMessage({
        password: updatePasswordValue,
        isClickSubmit,
        passwordConfigs,
    });
    if (isSuccessful.status && slots?.SuccessNotification) {
        return (<Slot data-testid="successNotificationTestId" name="SuccessNotification" slot={slots?.SuccessNotification} context={{ isSuccessful }}/>);
    }
    return (<div className={classes([
            'auth-update-password-form',
            `auth-update-password-form--${formSize}`,
        ])}>
      <Header title={translations.title} divider={false} className="auth-update-password-form__title"/>
      <InLineAlert className={classes([
            'auth-update-password-form__notification',
            [
                'auth-update-password-form__notification--show',
                !!inLineAlertProps?.text,
            ],
        ])} variant="secondary" heading={inLineAlertProps?.text} icon={inLineAlertProps.icon} additionalActions={additionalActionsAlert}/>
      <Form name="updatePassword_form" className="auth-update-password-form__form" onSubmit={submitUpdatePassword} loading={isLoading} fieldsConfig={[]}>
        <div style="display: none;">
          <input type="text" id="username" name="username" autoComplete="username"/>
        </div>
        <InputPassword defaultValue={updatePasswordValue} onValue={handleSetUpdatePasswordValue} className="auth-update-password-form__form__item" autoComplete={'new-password'} name={'password'} errorMessage={passwordError ||
            isValidUniqueSymbols === 'error' ||
            defaultLengthMessage?.status === 'error'
            ? translations.requiredFieldError
            : undefined} minLength={passwordConfigs?.minLength} uniqueSymbolsStatus={isValidUniqueSymbols} validateLengthConfig={defaultLengthMessage} requiredCharacterClasses={passwordConfigs?.requiredCharacterClasses} placeholder={translations.placeholder} floatingLabel={translations.floatingLabel}/>

        <div className="auth-update-password-form__button">
          <Button type="submit" buttonText={translations.buttonPrimary} variant="primary" enableLoader={isLoading}/>
        </div>
      </Form>
    </div>);
};
