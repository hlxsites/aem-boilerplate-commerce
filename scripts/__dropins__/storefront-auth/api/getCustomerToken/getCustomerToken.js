import { handleNetworkError } from '@/auth/lib/network-error';
import { fetchGraphQl } from '../fetch-graphql';
import { GET_CUSTOMER_TOKEN } from './graphql/getCustomerToken.graphql';
import { getCustomerData } from '../getCustomerData';
import { events } from '@adobe/event-bus';
import { COOKIE_NAMES } from '@/auth/configs/cookieConfigs';
import { getCookiesLifetime } from '@/auth/lib/cookieUtils';
import { publishEvents, EventsList } from '@/auth/lib/acdl';
import { setReCaptchaToken } from '@/auth/lib/setReCaptchaToken';
export const getCustomerToken = async ({ email, password, translations, onErrorCallback, handleSetInLineAlertProps, }) => {
    await setReCaptchaToken();
    const response = await fetchGraphQl(GET_CUSTOMER_TOKEN, {
        method: 'POST',
        variables: { email, password },
    }).catch(handleNetworkError);
    if (!response?.data?.generateCustomerToken?.token) {
        // Fallback error message
        const defaultErrorMessage = translations.customerTokenErrorMessage;
        const errorMessage = response?.errors
            ? response.errors[0].message
            : defaultErrorMessage;
        onErrorCallback?.(errorMessage);
        handleSetInLineAlertProps?.({ type: 'error', text: errorMessage });
        publishEvents(EventsList?.SIGN_IN, {});
        return { errorMessage, userName: '' };
    }
    const userToken = response?.data?.generateCustomerToken?.token;
    const responseCustomer = await getCustomerData(userToken);
    if (!responseCustomer?.firstname || !responseCustomer?.email) {
        const errorMessage = translations.customerTokenErrorMessage;
        onErrorCallback?.(errorMessage);
        handleSetInLineAlertProps?.({ type: 'error', text: errorMessage });
        publishEvents(EventsList?.SIGN_IN, {});
        return { errorMessage, userName: '' };
    }
    const userName = responseCustomer?.firstname;
    const userEmail = responseCustomer?.email;
    const cookiesLifetime = await getCookiesLifetime();
    document.cookie = `${COOKIE_NAMES.auth_dropin_firstname}=${userName}; path=/; ${cookiesLifetime}; `;
    document.cookie = `${COOKIE_NAMES.auth_dropin_user_token}=${userToken}; path=/; ${cookiesLifetime}; `;
    events.emit('authenticated', !!userToken);
    publishEvents(EventsList?.SIGN_IN, userEmail ? { email: userEmail } : {});
    return { errorMessage: '', userName };
};
