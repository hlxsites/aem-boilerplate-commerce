import { classes, Slot } from '@adobe/elsie/lib';
import '@/auth/components/SuccessNotificationForm/SuccessNotificationForm.css';
import { Button } from '@adobe/elsie/components';
import { useText } from '@adobe/elsie/i18n';
import { revokeCustomerToken } from '@/auth/api';
export const SuccessNotificationForm = ({ formSize = 'default', className = '', slots, labels }) => {
    const translations = useText({
        headingText: 'Auth.SuccessNotification.headingText',
        messageText: 'Auth.SuccessNotification.messageText',
        primaryButtonText: 'Auth.SuccessNotification.primaryButtonText',
        secondaryButtonText: 'Auth.SuccessNotification.secondaryButtonText',
    });
    return (<div className={classes([
            'auth-success-notification-form',
            `auth-success-notification-form--${formSize}`,
            className,
        ])}>
      <p className="auth-success-notification-form__title" data-testid="notification-title">
        {labels?.headingText || translations.headingText}
      </p>
      <p className="auth-success-notification-form__content-text" data-testid="notification-content">
        {labels?.messageText || translations.messageText}
      </p>
      {slots?.SuccessNotificationActions ? (<Slot data-testid="successNotificationActions" name="SuccessNotificationActions" slot={slots?.SuccessNotificationActions} context={{}}/>) : (<>
          <Button data-testid="primaryButton" type="button" className="auth-success-notification-form__button auth-success-notification-form__button--top" onClick={() => (window.location.href = '/')}>
            {translations.primaryButtonText}
          </Button>
          <Button data-testid="secondaryButton" type="button" variant="tertiary" onClick={async () => {
                await revokeCustomerToken();
                window.location.href = '/';
            }}>
            {translations.secondaryButtonText}
          </Button>
        </>)}
    </div>);
};
