import { classes } from '@adobe/elsie/lib';
import '@/auth/components/ResetPasswordForm/ResetPasswordForm.css';
import { useResetPasswordForm } from '@/auth/hooks/components/useResetPasswordForm';
import { ChevronDown as ChevronLeft } from '@adobe/elsie/icons';
import { Form, Button } from '@/auth/components';
import { useInLineAlert } from '@/auth/hooks/useInLineAlert';
import { Header, InLineAlert } from '@adobe/elsie/components';
import { useText } from '@adobe/elsie/i18n';
import { simplifyTransformAttributesForm } from '@/auth/lib/simplifyTransformAttributesForm';
import { DEFAULT__RESET_PASSWORD_EMAIL_FIELD } from '@/auth/configs/defaultCreateUserConfigs';
export const ResetPasswordForm = ({ formSize = 'default', routeSignIn, setActiveComponent, onErrorCallback, ...props }) => {
    const translations = useText({
        title: 'Auth.ResetPasswordForm.title',
        buttonPrimary: 'Auth.ResetPasswordForm.buttonPrimary',
        buttonSecondary: 'Auth.ResetPasswordForm.buttonSecondary',
    });
    const { inLineAlertProps, handleSetInLineAlertProps } = useInLineAlert();
    const { isLoading, submitResetPassword, redirectToSignInPage } = useResetPasswordForm({
        routeSignIn,
        setActiveComponent,
        onErrorCallback,
        handleSetInLineAlertProps,
    });
    return (<div {...props} className={classes([
            'auth-reset-password-form',
            `auth-reset-password-form--${formSize}`,
        ])} data-testid="resetPasswordForm">
      <Header title={translations.title} divider={false} className="auth-reset-password-form__title"/>
      {inLineAlertProps.text ? (<InLineAlert className="auth-reset-password-form__notification" type={inLineAlertProps.type} variant="secondary" heading={inLineAlertProps.text} icon={inLineAlertProps.icon}/>) : null}
      <Form name="resetPassword_form" className="auth-reset-password-form__form" onSubmit={submitResetPassword} loading={isLoading} fieldsConfig={simplifyTransformAttributesForm(DEFAULT__RESET_PASSWORD_EMAIL_FIELD)}>
        <div className="auth-reset-password-form__buttons">
          <Button type="button" variant="tertiary" style={{ padding: '0' }} icon={<ChevronLeft style={{ transform: 'rotate(90deg)' }}/>} buttonText={translations.buttonSecondary} enableLoader={false} onClick={redirectToSignInPage}/>
          <Button type="submit" buttonText={translations.buttonPrimary} variant="primary" enableLoader={isLoading}/>
        </div>
      </Form>
      <div id="requestPasswordResetEmail"/>
    </div>);
};
