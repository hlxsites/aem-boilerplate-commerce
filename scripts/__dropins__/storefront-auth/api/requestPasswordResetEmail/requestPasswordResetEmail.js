import { handleNetworkError } from '@/auth/lib/network-error';
import { fetchGraphQl } from '../fetch-graphql';
import { REQUEST_PASSWORD_RESET_EMAIL } from './graphql/requestPasswordResetEmail.graphql';
import { transformPasswordResetEmail } from '@/auth/data/transforms';
import { setReCaptchaToken } from '@/auth/lib/setReCaptchaToken';
export const requestPasswordResetEmail = async (email) => {
    await setReCaptchaToken();
    return await fetchGraphQl(REQUEST_PASSWORD_RESET_EMAIL, {
        method: 'POST',
        variables: { email },
    })
        .then((response) => {
        return transformPasswordResetEmail(response);
    })
        .catch(handleNetworkError);
};
