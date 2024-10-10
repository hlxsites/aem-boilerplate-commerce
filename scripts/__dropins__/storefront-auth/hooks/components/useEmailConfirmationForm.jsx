import { resendConfirmationEmail } from '@/auth/api';
import { useCallback, useState } from 'preact/hooks';
import { useText } from '@adobe/elsie/i18n';
export const useEmailConfirmationForm = ({ userEmail, handleSetInLineAlertProps, }) => {
    const translations = useText({
        emailConfirmationMessage: 'Auth.Notification.emailConfirmationMessage',
        technicalErrorSendEmail: 'Auth.Notification.technicalErrors.technicalErrorSendEmail',
    });
    const [disabledButton, setDisabledButton] = useState(false);
    const handleEmailConfirmation = useCallback(async () => {
        setDisabledButton(true);
        if (userEmail) {
            const response = await resendConfirmationEmail(userEmail);
            if (response) {
                const errors = response?.errors?.length;
                const isEmailResend = response?.data?.resendConfirmationEmail;
                if (errors) {
                    handleSetInLineAlertProps({
                        type: 'error',
                        text: translations.technicalErrorSendEmail,
                    });
                }
                else {
                    handleSetInLineAlertProps({
                        type: isEmailResend ? 'success' : 'error',
                        text: translations.emailConfirmationMessage,
                    });
                }
            }
        }
        setDisabledButton(false);
    }, [handleSetInLineAlertProps, translations, userEmail]);
    return { handleEmailConfirmation, disabledButton };
};
