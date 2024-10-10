import { resetPassword } from '@/auth/api/resetPassword';
import { fetchGraphQl } from '@/auth/api';
import { waitFor } from '@adobe/elsie/lib/tests';
jest.mock('@adobe/recaptcha', () => ({
    verifyReCaptcha: jest.fn().mockResolvedValue('token'),
}));
jest.mock('@/auth/lib/setReCaptchaToken');
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(),
                setFetchGraphQlHeader: jest.fn(),
            })),
        })),
    };
});
describe('[AUTH-API] - Reset Password', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('returns reset password status success', async () => {
        const expectedData = {
            message: '',
            success: true,
        };
        fetchGraphQl.mockResolvedValue({
            data: {
                resetPassword: true,
            },
            errors: [],
        });
        const data = await resetPassword('bobloblaw@example.com', 'gh80pkjGdsPyiXc0sUUXswX1uGN7crUr', 'b0bl0bl@w');
        await waitFor(() => {
            expect(data).toEqual(expectedData);
        });
    });
});
