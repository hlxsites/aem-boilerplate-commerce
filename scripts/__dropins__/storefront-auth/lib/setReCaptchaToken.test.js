import { setReCaptchaToken } from '@/auth/lib/setReCaptchaToken';
import { setFetchGraphQlHeader } from '../api';
import { verifyReCaptcha } from '@adobe/recaptcha';
jest.mock('@adobe/recaptcha', () => ({
    verifyReCaptcha: jest.fn(),
}));
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                setFetchGraphQlHeader: jest.fn(),
            })),
        })),
    };
});
describe('[AUTH-LIB] - setReCaptchaToken', () => {
    test('should return a function', async () => {
        expect(typeof setReCaptchaToken).toBe('function');
    });
    test('called setReCaptchaToken with token', async () => {
        verifyReCaptcha.mockResolvedValue('token');
        setFetchGraphQlHeader('X-ReCaptcha', 'token');
        await setReCaptchaToken();
        expect(setFetchGraphQlHeader).toHaveBeenCalled();
    });
    test('not called setReCaptchaToken without token', async () => {
        verifyReCaptcha.mockResolvedValue('');
        const result = await setReCaptchaToken();
        expect(result).toBeUndefined();
    });
});
