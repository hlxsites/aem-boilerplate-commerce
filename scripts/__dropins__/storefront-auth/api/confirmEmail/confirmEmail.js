import { fetchGraphQl } from '../fetch-graphql';
import { CONFIRM_EMAIL } from './graphql/confirmEmail.graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
export const confirmEmail = async ({ customerEmail, customerConfirmationKey, }) => {
    return await fetchGraphQl(CONFIRM_EMAIL, {
        method: 'POST',
        variables: {
            email: customerEmail,
            confirmation_key: customerConfirmationKey,
        },
    }).catch(handleNetworkError);
};
