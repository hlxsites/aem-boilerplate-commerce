import { Button } from '@/auth/components';
import { classes } from '@adobe/elsie/lib';
import { Header, InLineAlert } from '@adobe/elsie/components';
import { useEmailConfirmationForm } from '@/auth/hooks/components/useEmailConfirmationForm';
import { useText } from '@adobe/elsie/i18n';
import '@/auth/components/EmailConfirmationForm/EmailConfirmationForm.css';
export const EmailConfirmationForm = ({ formSize, userEmail, inLineAlertProps, hideCloseBtnOnEmailConfirmation, handleSetInLineAlertProps, onPrimaryButtonClick, }) => {
    const translations = useText({
        title: 'Auth.EmailConfirmationForm.title',
        subtitle: 'Auth.EmailConfirmationForm.subtitle',
        mainText: 'Auth.EmailConfirmationForm.mainText',
        buttonPrimary: 'Auth.EmailConfirmationForm.buttonPrimary',
        buttonSecondary: 'Auth.EmailConfirmationForm.buttonSecondary',
    });
    const { handleEmailConfirmation, disabledButton } = useEmailConfirmationForm({
        userEmail,
        handleSetInLineAlertProps,
    });
    return (<div className={classes([
            'auth-email-confirmation-form',
            `auth-email-confirmation-form--${formSize}`,
        ])}>
      {inLineAlertProps.text ? (<InLineAlert className="auth-signInForm__notification" type={inLineAlertProps.type} variant="secondary" heading={inLineAlertProps.text} icon={inLineAlertProps.icon} data-testid="authInLineAlert"/>) : null}
      <Header title={translations.title} divider={false} className="auth-email-confirmation-form__title"/>
      {userEmail?.length ? (<span className="auth-email-confirmation-form__subtitle">{`${translations.subtitle} ${userEmail}`}</span>) : null}
      <span className="auth-email-confirmation-form__text">
        {translations.mainText}
      </span>
      <div className="auth-email-confirmation-form__buttons">
        <Button type="button" variant="tertiary" style={{ padding: 0 }} buttonText={translations.buttonSecondary} enableLoader={false} onClick={handleEmailConfirmation} disabled={disabledButton}/>
        {hideCloseBtnOnEmailConfirmation ? null : (<Button type="submit" buttonText={translations.buttonPrimary} variant="primary" enableLoader={false} disabled={disabledButton} onClick={onPrimaryButtonClick}/>)}
      </div>
    </div>);
};
