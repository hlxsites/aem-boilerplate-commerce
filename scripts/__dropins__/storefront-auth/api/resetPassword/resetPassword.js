import { handleNetworkError } from '@/auth/lib/network-error';
import { fetchGraphQl } from '../fetch-graphql';
import { RESET_PASSWORD } from './graphql/resetPassword.graphql';
import { transformResetPassword } from '@/auth/data/transforms/transform-reset-password';
import { setReCaptchaToken } from '@/auth/lib/setReCaptchaToken';
export const resetPassword = async (email, resetPasswordToken, newPassword) => {
    await setReCaptchaToken();
    return await fetchGraphQl(RESET_PASSWORD, {
        method: 'POST',
        variables: { email, resetPasswordToken, newPassword },
    })
        .then((response) => {
        return transformResetPassword(response);
    })
        .catch(handleNetworkError);
};
