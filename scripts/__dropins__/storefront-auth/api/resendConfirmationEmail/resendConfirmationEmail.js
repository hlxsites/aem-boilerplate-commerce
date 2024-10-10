import { fetchGraphQl } from '../fetch-graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
import { RESEND_CONFIRMATION_EMAIL } from './graphql/resendConfirmationEmail.graphql';
export const resendConfirmationEmail = async (customerEmail) => {
    return await fetchGraphQl(RESEND_CONFIRMATION_EMAIL, {
        method: 'POST',
        variables: {
            email: customerEmail,
        },
    }).catch(handleNetworkError);
};
