//@ts-nocheck
import { revokeCustomerToken } from '@/auth/api/revokeCustomerToken';
import { fetchGraphQl, setFetchGraphQlHeader } from '@/auth/api/fetch-graphql';
jest.mock('@/auth/api/fetch-graphql', () => ({
    fetchGraphQl: jest.fn(),
    setFetchGraphQlHeader: jest.fn(),
}));
describe('[AUTH-API] - Revoke Customer Token', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    test('returns success true on successful token revocation', async () => {
        fetchGraphQl.mockResolvedValue({
            data: { revokeCustomerToken: true },
            errors: [],
        });
        setFetchGraphQlHeader('Authorization', 'application/json');
        const result = await revokeCustomerToken();
        expect(result).toEqual({ message: '', success: true });
    });
    test('returns success false with error message on API error', async () => {
        fetchGraphQl.mockResolvedValue({
            data: { revokeCustomerToken: false },
            errors: [{ message: 'ERROR | API | revokeCustomerToken' }],
        });
        const result = await revokeCustomerToken();
        expect(result).toEqual({
            message: 'ERROR | API | revokeCustomerToken',
            success: false,
        });
    });
    test('returns success false with "Unknown error" when errors are undefined', async () => {
        fetchGraphQl.mockResolvedValue({
            data: { revokeCustomerToken: false },
            errors: [{ message: 'Unknown error' }],
        });
        const result = await revokeCustomerToken();
        expect(result).toEqual({
            message: 'Unknown error',
            success: false,
        });
    });
    test('errors are undefined', async () => {
        fetchGraphQl.mockResolvedValue({
            data: { revokeCustomerToken: null },
            errors: [{ message: 'Failed due to timeout' }],
        });
        await revokeCustomerToken();
        expect(console.error).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('ERROR revokeCustomerToken: Failed due to timeout'));
    });
});
