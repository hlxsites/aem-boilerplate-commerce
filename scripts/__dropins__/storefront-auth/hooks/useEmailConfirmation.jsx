import { useEffect, useState } from 'preact/hooks';
import { clearUrlAndReplace } from '../lib/clearUrlAndReplace';
import { confirmEmail } from '../api';
import { useText } from '@adobe/elsie/i18n';
// The client receives a confirmation of the validation via email. When the client follows the provided link, they are directed to the login page with three query parameters. If these parameters are present, we make a request to validate the status. This request returns a response that we display to the user.
export const useEmailConfirmation = ({ enableEmailConfirmation, }) => {
    const translations = useText({
        accountConfirmMessage: 'Auth.EmailConfirmationForm.accountConfirmMessage',
        accountConfirmationEmailSuccessMessage: 'Auth.EmailConfirmationForm.accountConfirmationEmailSuccessMessage',
    });
    const [emailConfirmationStatusMessage, setEmailConfirmationStatusMessage] = useState({
        text: '',
        status: '',
    });
    useEffect(() => {
        if (enableEmailConfirmation) {
            const { search } = window.location;
            if (search.includes('email=') && search.includes('key=')) {
                const validateEmailStatus = async () => {
                    const params = new URLSearchParams(search);
                    const response = await confirmEmail({
                        customerEmail: params.get('email'),
                        customerConfirmationKey: params.get('key'),
                    });
                    if (!response)
                        return null;
                    if (response?.errors?.length) {
                        setEmailConfirmationStatusMessage({
                            text: response?.errors[0].message,
                            status: 'error',
                        });
                    }
                    else {
                        setEmailConfirmationStatusMessage({
                            text: response.data.confirmEmail.customer.email
                                ? translations.accountConfirmationEmailSuccessMessage.replace('{email}', response?.data?.confirmEmail.customer?.email)
                                : translations.accountConfirmMessage,
                            status: 'success',
                        });
                        clearUrlAndReplace();
                    }
                };
                validateEmailStatus();
            }
        }
    }, [enableEmailConfirmation, translations]);
    return { emailConfirmationStatusMessage };
};
