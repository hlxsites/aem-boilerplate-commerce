import { classes, Slot } from '@adobe/elsie/lib';
import { useSignInForm } from '@/auth/hooks/components/useSignInForm';
import { useEmailConfirmation } from '@/auth/hooks/useEmailConfirmation';
import EmailConfirmationForm from '../EmailConfirmationForm';
import { Form, Button } from '@/auth/components';
import { useInLineAlert } from '@/auth/hooks/useInLineAlert';
import { useText } from '@adobe/elsie/i18n';
import { Header, InLineAlert, InputPassword } from '@adobe/elsie/components';
import '@/auth/components/SignInForm/SignInForm.css';
export const SignInForm = ({ slots, labels, formSize = 'default', initialEmailValue = '', renderSignUpLink = false, enableEmailConfirmation = false, hideCloseBtnOnEmailConfirmation = false, routeRedirectOnEmailConfirmationClose, routeRedirectOnSignIn, routeForgotPassword, routeSignUp, onSuccessCallback, setActiveComponent, onErrorCallback, onSignUpLinkClick, }) => {
    const translations = useText({
        title: 'Auth.SignInForm.title',
        buttonPrimary: 'Auth.SignInForm.buttonPrimary',
        buttonSecondary: 'Auth.SignInForm.buttonSecondary',
        buttonTertiary: 'Auth.SignInForm.buttonTertiary',
        resendEmailInformationText: 'Auth.Notification.resendEmailNotification.informationText',
        resendEmailButtonText: 'Auth.Notification.resendEmailNotification.buttonText',
        customerTokenErrorMessage: 'Auth.Api.customerTokenErrorMessage',
        placeholder: 'Auth.InputPassword.placeholder',
        floatingLabel: 'Auth.InputPassword.floatingLabel',
        requiredFieldError: 'Auth.FormText.requiredFieldError',
    });
    const { emailConfirmationStatusMessage } = useEmailConfirmation({
        enableEmailConfirmation,
    });
    const { inLineAlertProps, handleSetInLineAlertProps } = useInLineAlert();
    const { userEmail, additionalActionsAlert, defaultEnhancedEmailFields, passwordError, isSuccessful, isLoading, signInPasswordValue, showEmailConfirmationForm, submitLogInUser, forgotPasswordCallback, onSignUpLinkClickCallback, handledOnPrimaryButtonClick, handleSetPassword, } = useSignInForm({
        translations,
        emailConfirmationStatusMessage,
        initialEmailValue,
        routeSignUp,
        routeForgotPassword,
        routeRedirectOnSignIn,
        setActiveComponent,
        onErrorCallback,
        onSuccessCallback,
        onSignUpLinkClick,
        handleSetInLineAlertProps,
        routeRedirectOnEmailConfirmationClose,
    });
    if (isSuccessful.status && slots?.SuccessNotification) {
        return (<Slot data-testid="successNotificationTestId" name="SuccessNotification" slot={slots?.SuccessNotification} context={{ isSuccessful }}/>);
    }
    if (showEmailConfirmationForm) {
        return (<EmailConfirmationForm formSize={formSize} userEmail={userEmail} inLineAlertProps={inLineAlertProps} hideCloseBtnOnEmailConfirmation={hideCloseBtnOnEmailConfirmation} handleSetInLineAlertProps={handleSetInLineAlertProps} onPrimaryButtonClick={handledOnPrimaryButtonClick}/>);
    }
    return (<div className={classes([
            'auth-sign-in-form',
            `auth-sign-in-form--${formSize}`,
        ])} data-testid="signInForm">
      <Header title={labels?.formTitleText ?? translations.title} divider={false} className="auth-sign-in-form__title"/>
      {inLineAlertProps.text ? (<InLineAlert data-testid="authInLineAlert" className="auth-sign-in-form__notification" type={inLineAlertProps.type} variant="secondary" heading={inLineAlertProps.text} icon={inLineAlertProps.icon} additionalActions={additionalActionsAlert}/>) : null}
      <Form name="signIn_form" className="auth-sign-in-form__form" onSubmit={submitLogInUser} loading={isLoading} fieldsConfig={defaultEnhancedEmailFields}>
        <InputPassword hideStatusIndicator className="auth-sign-in-form__form__password" autoComplete={'current-password'} errorMessage={passwordError ? translations.requiredFieldError : undefined} defaultValue={signInPasswordValue} onValue={handleSetPassword} placeholder={translations.placeholder} floatingLabel={translations.floatingLabel}/>
        <div className="auth-sign-in-form__form__buttons">
          <div className="auth-sign-in-form__form__buttons__combine">
            <Button type="button" variant="tertiary" style={{ padding: 0 }} buttonText={translations.buttonTertiary} className="auth-sign-in-form__button auth-sign-in-form__button--forgot" enableLoader={false} onClick={forgotPasswordCallback} data-testid="switchToSignUp"/>
            {renderSignUpLink ? <span /> : null}
            {renderSignUpLink ? (<Button type="button" variant="tertiary" style={{ padding: 0 }} buttonText={translations.buttonSecondary} className="auth-sign-in-form__button auth-sign-in-form__button--signup" enableLoader={false} onClick={onSignUpLinkClickCallback}/>) : null}
          </div>
          <Button type="submit" buttonText={labels?.primaryButtonText ?? translations.buttonPrimary} variant="primary" className="auth-sign-in-form__button auth-sign-in-form__button--submit" enableLoader={isLoading}/>
        </div>
      </Form>
      <div id="generateCustomerToken"/>
    </div>);
};
