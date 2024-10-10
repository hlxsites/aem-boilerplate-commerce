import { getCustomerToken } from '@/auth/api/getCustomerToken';
import { getCustomerData } from '@/auth/api/getCustomerData';
import { setFetchGraphQlHeader, fetchGraphQl } from '@/auth/api';
jest.mock('@/auth/lib/setReCaptchaToken');
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
jest.mock('@adobe/event-bus', () => ({
    events: {
        emit: jest.fn(),
    },
}));
jest.mock('@/auth/api/getCustomerData');
describe('[AUTH-API] - Get Customer Token', () => {
    const defaultErrorMessageText = 'Unable to log in. Please try again later or contact support if the issue persists.';
    const mockTranslation = {
        customerTokenErrorMessage: defaultErrorMessageText,
    };
    const email = 'bobloblaw@example.com';
    const password = 'b0bl0bl';
    const userConfig = {
        firstname: 'Bob',
        lastname: 'Bob_2',
        email: 'bobloblaw@example.com',
    };
    test('Login is Success', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                generateCustomerToken: {
                    token: 'ar4116zozoagxty1xjn4lj13kim36r6x',
                },
            },
        });
        setFetchGraphQlHeader('Authorization', `Bearer ar4116zozoagxty1xjn4lj13kim36r6x`);
        getCustomerData.mockResolvedValue(userConfig);
        const response = await getCustomerToken({
            email,
            password,
            onErrorCallback: jest.fn(),
            handleSetInLineAlertProps: jest.fn(),
            translations: mockTranslation,
        });
        if (!response) {
            throw new Error('No response received');
        }
        expect(response).toEqual({
            errorMessage: '',
            userName: userConfig.firstname,
        });
    });
    test('Login is Error (token null)', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                generateCustomerToken: {
                    token: null,
                },
            },
        });
        setFetchGraphQlHeader('Authorization', `Bearer ar4116zozoagxty1xjn4lj13kim36r6x`);
        getCustomerData.mockResolvedValue(userConfig);
        const response = await getCustomerToken({
            email,
            password,
            onErrorCallback: jest.fn(),
            handleSetInLineAlertProps: jest.fn(),
            translations: mockTranslation,
        });
        expect(response).toEqual({
            errorMessage: defaultErrorMessageText,
            userName: '',
        });
    });
    test('called error message if token null and errors message response true', async () => {
        fetchGraphQl.mockResolvedValue({
            data: null,
            errors: [{ message: 'Error' }],
        });
        const response = await getCustomerToken({
            email,
            password,
            onErrorCallback: jest.fn(),
            handleSetInLineAlertProps: jest.fn(),
            translations: {},
        });
        expect(response.errorMessage).toEqual('Error');
    });
    test('Login is Error (user data empty)', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                generateCustomerToken: {
                    token: 'ar4116zozoagxty1xjn4lj13kim36r6x',
                },
            },
        });
        setFetchGraphQlHeader('Authorization', `Bearer ar4116zozoagxty1xjn4lj13kim36r6x`);
        getCustomerData.mockResolvedValue({
            firstname: '',
            lastname: '',
            email: '',
        });
        const response = await getCustomerToken({
            email,
            password,
            onErrorCallback: jest.fn(),
            handleSetInLineAlertProps: jest.fn(),
            translations: mockTranslation,
        });
        expect(response).toEqual({
            errorMessage: defaultErrorMessageText,
            userName: '',
        });
    });
});
