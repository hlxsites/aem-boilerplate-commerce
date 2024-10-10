import { fetchGraphQl } from '../fetch-graphql';
import { REVOKE_CUSTOMER_TOKEN } from './graphql/revokeCustomerToken.graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
import { transformRevokeCustomerToken } from '@/auth/data/transforms';
import { deleteCookie } from '@/auth/lib/cookieUtils';
import { events } from '@adobe/event-bus';
import { COOKIE_NAMES } from '@/auth/configs/cookieConfigs';
import { EventsList, publishEvents } from '@/auth/lib/acdl';
export const revokeCustomerToken = async () => {
    return await fetchGraphQl(REVOKE_CUSTOMER_TOKEN, {
        method: 'POST',
    })
        .then((response) => {
        const transformData = transformRevokeCustomerToken(response);
        if (transformData?.success) {
            [
                COOKIE_NAMES.auth_dropin_user_token,
                COOKIE_NAMES.auth_dropin_firstname,
            ].forEach((name) => {
                deleteCookie(name);
            });
            events.emit('authenticated', false);
            publishEvents(EventsList.SIGN_OUT, { logoutAttempt: true });
        }
        else {
            const errorMessage = `
          ERROR revokeCustomerToken: ${transformData.message}`;
            console.error(errorMessage);
        }
        return transformData;
    })
        .catch(handleNetworkError);
};
