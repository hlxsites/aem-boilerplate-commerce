import { getCustomerData } from '@/auth/api/getCustomerData';
import { fetchGraphQl, setFetchGraphQlHeader, config } from '@/auth/api';
import { waitFor } from '@adobe/elsie/lib/tests';
import { transformCustomerData } from '@/auth/data/transforms';
jest.mock('@adobe/recaptcha', () => ({
    verifyReCaptcha: jest.fn().mockResolvedValue('token'),
}));
jest.mock('@/auth/lib/setReCaptchaToken');
const mockCustomer = transformCustomerData({
    data: {
        customer: { email: 'bob@mail.com', firstname: 'Bob', lastname: 'Bob' },
    },
});
const mockErrors = [{ message: 'Error 1' }, { message: 'Error 2' }];
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
jest.mock('@/auth/api/initialize', () => {
    return {
        config: {
            getConfig: jest.fn(),
        },
    };
});
const testGetCustomerData = async (token) => {
    setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
    fetchGraphQl.mockResolvedValue({
        data: {
            customer: { email: 'bob@mail.com', firstname: 'Bob', lastname: 'Bob' },
        },
        errors: [],
    });
    const response = await getCustomerData(token);
    return response || null;
};
describe('[AUTH-API] - Get Customer Data', () => {
    test('returns user data', async () => {
        const token = 'gh80pkjGdsPyiXc0sUUXswX1uGN7crUr';
        config.getConfig.mockReturnValue({
            authHeaderConfig: {
                header: 'Authorization',
                tokenPrefix: 'Bearer',
            },
        });
        const response = await testGetCustomerData(token);
        await waitFor(() => {
            expect(response).toEqual(mockCustomer);
        });
    });
    test('Without token Throw error', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {},
            errors: mockErrors,
        });
        await expect(getCustomerData('')).rejects.toThrow('Error 1 Error 2');
    });
    test('called authHeaderConfig tokenPrefix is null', async () => {
        const token = 'gh80pkjGdsPyiXc0sUUXswX1uGN7crUr';
        config.getConfig.mockReturnValue({
            authHeaderConfig: {
                header: 'Authorization',
                tokenPrefix: null,
            },
        });
        const response = await testGetCustomerData(token);
        await waitFor(() => {
            expect(response).toEqual(mockCustomer);
        });
    });
});
