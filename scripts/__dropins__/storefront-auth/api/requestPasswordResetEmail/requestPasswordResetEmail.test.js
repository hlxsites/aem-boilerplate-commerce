import { requestPasswordResetEmail } from '@/auth/api/requestPasswordResetEmail';
jest.mock('@adobe/recaptcha', () => ({
    verifyReCaptcha: jest.fn().mockResolvedValue('token'),
}));
jest.mock('@/auth/lib/setReCaptchaToken');
// that return an object with a `fetchGraphQl` method that returns a promise
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(() => Promise.resolve({
                    data: {
                        requestPasswordResetEmail: true,
                    },
                    errors: [{ message: '' }],
                })),
            })),
        })),
    };
});
describe('[AUTH-API] - Password Reset Email', () => {
    test('returns Reset email status', async () => {
        const data = await requestPasswordResetEmail('bobloblaw@example.com');
        expect(data).toEqual({
            message: '',
            success: true,
        });
    });
});
