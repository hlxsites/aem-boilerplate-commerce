import { verifyReCaptcha } from '@adobe/recaptcha';
import { setFetchGraphQlHeader } from '../api';
export const setReCaptchaToken = async () => {
    const token = await verifyReCaptcha();
    if (token) {
        setFetchGraphQlHeader('X-ReCaptcha', token);
    }
};
